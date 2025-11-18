const express = require('express');
const savedJobsData = require('../data/saved-jobs.json');
const vacancies = require('../data/vacancies.json');

const router = express.Router();

// In-memory saved jobs store for dev. Resets on server restart.
let savedJobs = Array.isArray(savedJobsData) ? [...savedJobsData] : [];

router.get('/saved', (req, res) => {
  res.json({ total: savedJobs.length, items: savedJobs });
});

router.get('/recommended', (req, res) => {
  res.json({ total: vacancies.length, items: vacancies });
});

// Save a job
router.post('/saved', (req, res) => {
  const job = req.body || {};
  if (!job.id) {
    return res.status(400).json({ error: 'Job id is required' });
  }
  const exists = savedJobs.some(j => j.id === job.id);
  if (!exists) {
    // Normalize minimal shape
    const normalized = {
      id: job.id,
      role: job.role || job.title || 'Unknown Role',
      company: job.company || 'Unknown Company',
      location: job.location || 'Unknown',
    };
    savedJobs.unshift(normalized);
  }
  return res.json({ total: savedJobs.length, items: savedJobs });
});

// Remove a saved job by id
router.delete('/saved/:id', (req, res) => {
  const { id } = req.params;
  const before = savedJobs.length;
  savedJobs = savedJobs.filter(j => String(j.id) !== String(id));
  const removed = savedJobs.length < before;
  return res.json({ removed, total: savedJobs.length, items: savedJobs });
});

module.exports = router;