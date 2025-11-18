const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// In-memory proposals store for development
const proposals = [];

// GET /api/proposals - list proposals (optional by freelancerId or jobId)
router.get('/', (req, res) => {
  const { freelancerId, jobId } = req.query;
  let results = proposals;
  if (freelancerId) {
    results = results.filter((p) => p.freelancerId === freelancerId);
  }
  if (jobId) {
    results = results.filter((p) => p.jobId === jobId);
  }
  res.json({ proposals: results });
});

// POST /api/proposals - create a new proposal
router.post('/', (req, res) => {
  const { jobId, freelancerId, proposalText, samples = [], introType = null } = req.body;
  if (!jobId || !freelancerId || !proposalText) {
    return res.status(400).json({ error: 'jobId, freelancerId and proposalText are required' });
  }
  const proposal = {
    id: uuidv4(),
    jobId,
    freelancerId,
    proposalText,
    samples,
    introType, // 'voice' | 'screen' | null
    status: 'submitted', // submitted | viewed | shortlisted | rejected | accepted
    createdAt: new Date().toISOString(),
  };
  proposals.push(proposal);
  res.status(201).json({ proposal });
});

// PATCH /api/proposals/:id - update proposal status or content
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const idx = proposals.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });

  const allowed = ['status', 'proposalText', 'samples'];
  for (const key of allowed) {
    if (req.body[key] !== undefined) {
      proposals[idx][key] = req.body[key];
    }
  }
  proposals[idx].updatedAt = new Date().toISOString();
  res.json({ proposal: proposals[idx] });
});

module.exports = router;