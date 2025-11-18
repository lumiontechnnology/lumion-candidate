const express = require('express');
const router = express.Router();

// In-memory job store for development
const jobs = [
  {
    id: 'job-1',
    title: 'React Frontend Developer',
    description: 'Build dashboards and UI components for a SaaS product.',
    budget: 2500,
    timeline: '3 weeks',
    skills: ['React', 'JavaScript', 'CSS', 'API Integration'],
    client: { id: 'client-1', name: 'Acme Corp' },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'job-2',
    title: 'Node.js API Engineer',
    description: 'Design REST APIs and integrate payment gateway.',
    budget: 4000,
    timeline: '6 weeks',
    skills: ['Node.js', 'Express', 'MongoDB', 'Payments'],
    client: { id: 'client-2', name: 'Zephyr Labs' },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'job-3',
    title: 'Full-Stack Freelancer for MVP',
    description: 'Ship a small MVP with auth, CRUD, and dashboard.',
    budget: 5000,
    timeline: '8 weeks',
    skills: ['React', 'Node.js', 'PostgreSQL', 'Auth'],
    client: { id: 'client-3', name: 'BrightPath' },
    createdAt: new Date().toISOString(),
  },
];

// Basic rate limiting and duplicate-submission protection (in-memory, dev-only)
const RATE_WINDOW_MS = 60 * 1000; // 1 minute window
const RATE_LIMIT = 5; // max 5 create requests per window per IP
const DUPLICATE_WINDOW_MS = 2 * 60 * 1000; // 2 minutes window for duplicate detection
const requestLog = new Map(); // ip -> [timestamps]
const recentSubmissions = new Map(); // key(ip:title:desc) -> timestamp

function rateLimit(req, res, next) {
  const now = Date.now();
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  const list = requestLog.get(ip) || [];
  const filtered = list.filter((ts) => now - ts < RATE_WINDOW_MS);
  if (filtered.length >= RATE_LIMIT) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute before posting more jobs.' });
  }
  filtered.push(now);
  requestLog.set(ip, filtered);
  next();
}

function normalizeStr(str) {
  return String(str || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function dedupeProtect(req, res, next) {
  const now = Date.now();
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  const { title, description } = req.body || {};
  const key = `${ip}:${normalizeStr(title)}:${normalizeStr(description)}`;
  const lastTs = recentSubmissions.get(key);
  if (lastTs && now - lastTs < DUPLICATE_WINDOW_MS) {
    return res.status(409).json({
      error: 'Duplicate submission detected. Please modify the job or try again later.',
    });
  }
  recentSubmissions.set(key, now);
  next();
}

// GET /api/jobs - list jobs (optionally filter by skills)
router.get('/', (req, res) => {
  const { skills } = req.query; // comma-separated string
  if (!skills) {
    return res.json({ jobs });
  }
  const skillList = skills.split(',').map((s) => s.trim().toLowerCase());
  const filtered = jobs.filter((job) =>
    job.skills.some((sk) => skillList.includes(sk.toLowerCase()))
  );
  res.json({ jobs: filtered });
});

// POST /api/jobs - create a new job (in-memory dev)
router.post('/', rateLimit, dedupeProtect, (req, res) => {
  const { title, description, budget, timeline, skills = [], client } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'title and description are required' });
  }
  const job = {
    id: 'job-' + Math.random().toString(36).slice(2),
    title,
    description,
    budget: Number(budget) || 0,
    timeline: timeline || 'TBD',
    skills: Array.isArray(skills) ? skills : String(skills).split(',').map(s => s.trim()).filter(Boolean),
    client: client || { id: 'client-demo', name: 'Demo Client' },
    createdAt: new Date().toISOString(),
  };
  jobs.unshift(job);
  res.status(201).json({ job });
});

module.exports = router;