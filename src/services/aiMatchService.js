// AI Matching and Proposal Generation Service
// Computes match scores between a freelancer profile and jobs,
// generates tailored proposals, and orchestrates auto-submission.

import { marketplaceApi } from './api';
import userProfiles from '../data/userProfilesData';

// Default scoring weights (can be overridden per run)
const DEFAULT_WEIGHTS = {
  skills: 0.55,
  keywords: 0.2,
  title: 0.1,
  budget: 0.1,
  timeline: 0.05,
};

// Select an active freelancer profile (demo: first one)
function getActiveProfile() {
  const profile = Array.isArray(userProfiles) && userProfiles.length > 0 ? userProfiles[0] : null;
  return profile || {
    id: 'demo-freelancer',
    firstName: 'Demo',
    lastName: 'User',
    title: 'Software Engineer',
    skills: ['JavaScript','React','Node.js','UI/UX','API Integration'],
    preferredSalary: { min: 80000, max: 150000 },
    workMode: 'Remote',
    portfolioUrls: ['https://example.com/portfolio', 'https://example.com/case-study']
  };
}

// Basic tokenizer for matching keywords
function tokenize(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

// Compute match score based on skill overlap, keywords, and simple budget/timeline heuristics
export function computeMatchScore(job, profile, weights = DEFAULT_WEIGHTS) {
  const jobSkills = Array.isArray(job.skills) ? job.skills.map(s => s.toLowerCase()) : [];
  const userSkills = (profile.skills || []).map(s => s.toLowerCase());
  const descriptionTokens = tokenize(job.description);
  const titleTokens = tokenize(job.title);

  // Skill overlap
  const overlap = userSkills.filter(s => jobSkills.includes(s));
  const skillScore = Math.min(100, overlap.length * 20); // 5 overlapping skills → 100

  // Keyword relevance
  const keywordHits = userSkills.filter(s => descriptionTokens.includes(s) || titleTokens.includes(s));
  const keywordScore = Math.min(50, keywordHits.length * 10);

  // Title relevance (match profile title words against job title)
  const profileTitleTokens = tokenize(profile.title);
  const titleHits = profileTitleTokens.filter(t => titleTokens.includes(t));
  const titleScore = Math.min(40, titleHits.length * 10);

  // Budget heuristic (prefer jobs within range)
  let budgetScore = 20; // neutral
  const budget = Number(job.budget || 0);
  const minPref = Number(profile.preferredSalary?.min || 0);
  const maxPref = Number(profile.preferredSalary?.max || 0);
  if (budget > 0 && minPref > 0) {
    if (budget >= minPref && (maxPref ? budget <= maxPref : true)) budgetScore = 30;
    else if (budget >= minPref * 0.7) budgetScore = 25;
    else budgetScore = 10;
  }

  // Timeline heuristic (short timelines slightly favored)
  const tl = String(job.timeline || '').toLowerCase();
  const timelineScore = tl.includes('week') ? 25 : tl.includes('month') ? 20 : 15;

  // Aggregate with caps
  const total = Math.round(
    skillScore * (weights.skills ?? DEFAULT_WEIGHTS.skills) +
    keywordScore * (weights.keywords ?? DEFAULT_WEIGHTS.keywords) +
    titleScore * (weights.title ?? DEFAULT_WEIGHTS.title) +
    budgetScore * (weights.budget ?? DEFAULT_WEIGHTS.budget) +
    timelineScore * (weights.timeline ?? DEFAULT_WEIGHTS.timeline)
  );
  return Math.min(100, total);
}

// Generate tailored proposal text using profile and job details
// Proposal generation with tunable tone and length
// tone: 'professional' | 'concise' | 'technical' | 'friendly'
// length: 'short' | 'medium' | 'long'
export function generateProposal(job, profile, { tone = 'professional', length = 'medium', includePilot = true, includeMetrics = true } = {}) {
  const name = `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'Experienced Freelancer';
  const role = profile.title || 'Software Engineer';
  const skills = (profile.skills || []).slice(0, 8).join(', ');
  const company = job.client?.name || job.company || 'your team';
  const jobTitle = job.title || 'project';
  const jobStack = (job.skills || []).slice(0, 5).join(', ') || 'your tech stack';

  const opening = tone === 'friendly'
    ? `Hi ${company},`
    : `Hello ${company},`;

  const intro = tone === 'concise'
    ? `I’m ${name}, a ${role}. Your ${jobTitle} aligns well with my experience in ${skills}.`
    : tone === 'technical'
    ? `I’m ${name}, a ${role} with deep experience across ${skills}. The ${jobTitle} requirements map well to my background, particularly in ${jobStack}.`
    : `I’m ${name}, a ${role} specializing in ${skills}. I reviewed your ${jobTitle} and believe I’m a strong match.`;

  const deliverables = [
    'Requirements analysis and plan within 48 hours',
    'Iterative delivery with milestones and demos',
    'Clean, tested code with documentation and handoff',
  ];

  const highlights = [
    `Relevant experience with ${jobStack}`,
    'Strong UI and performance focus',
    'Excellent communication and reliability',
  ];

  const metricsLine = includeMetrics ? 'Measured outcomes: performance gains, defect rate, and delivery cadence.' : null;
  const pilotLine = includePilot ? 'Happy to start with a small pilot to validate fit.' : null;

  const bodySections = [
    length === 'short' ? null : 'Here’s how I’ll deliver:',
    length === 'short' ? null : `- ${deliverables.join('\n- ')}`,
    'Highlights:',
    `- ${highlights.join('\n- ')}`,
    metricsLine,
    pilotLine,
  ].filter(Boolean).join('\n');

  const closing = `\n\nBest regards,\n${name}`;
  return `${opening}\n\n${intro}\n\n${bodySections}${closing}`;
}

// Choose portfolio samples (demo selects first few urls)
export function selectPortfolioSamples(profile, limit = 2) {
  const urls = profile.portfolioUrls || [];
  return urls.slice(0, limit).map((u, idx) => ({ title: `Sample ${idx+1}`, url: u }));
}

// Rank jobs and return top N with scores and generated proposals
export function rankJobs(jobs, profile, { topN = 5, weights = DEFAULT_WEIGHTS, style } = {}) {
  const scored = jobs.map(job => {
    const score = computeMatchScore(job, profile, weights);
    const proposalText = generateProposal(job, profile, style);
    const samples = selectPortfolioSamples(profile, 2);
    return { job, score, proposalText, samples };
  });
  return scored.sort((a,b) => b.score - a.score).slice(0, topN);
}

// Auto-submit proposals for ranked jobs
export async function autoSubmitTopMatches({ jobs, freelancerId, topN = 5, weights = DEFAULT_WEIGHTS, style, threshold }) {
  const profile = getActiveProfile();
  const ranked = rankJobs(jobs, profile, { topN, weights, style });
  const toSubmit = typeof threshold === 'number' ? ranked.filter(r => r.score >= threshold) : ranked;
  const results = [];
  for (const item of toSubmit) {
    try {
      const proposal = await marketplaceApi.submitProposal({
        jobId: item.job.id || item.job._id || String(item.jobId || item.job.id || Date.now()),
        freelancerId: freelancerId || profile.id || 'demo-freelancer',
        proposalText: item.proposalText,
        samples: item.samples,
        introType: null,
      });
      results.push({ ok: true, job: item.job, proposal });
    } catch (e) {
      results.push({ ok: false, job: item.job, error: e?.message || 'Failed to submit' });
    }
  }
  return { ranked, results };
}

// Fetch jobs and run full pipeline (skillsCsv optional)
export async function runAIMatchingPipeline({ skillsCsv = '' , freelancerId, topN = 5, weights = DEFAULT_WEIGHTS, style, threshold }) {
  const jobs = await marketplaceApi.fetchJobs(skillsCsv);
  return autoSubmitTopMatches({ jobs, freelancerId, topN, weights, style, threshold });
}

export default {
  computeMatchScore,
  generateProposal,
  selectPortfolioSamples,
  rankJobs,
  autoSubmitTopMatches,
  runAIMatchingPipeline,
};