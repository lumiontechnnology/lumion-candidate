const express = require('express');
const initialApplications = require('../data/applications.json');

const router = express.Router();

// In-memory applications store for dev. Resets on server restart.
let applications = Array.isArray(initialApplications) ? [...initialApplications] : [];

// GET /applications - list all applications
router.get('/', (req, res) => {
  res.json({ total: applications.length, items: applications });
});

// POST /applications - create/add an application record
router.post('/', (req, res) => {
  const payload = req.body || {};

  // Accept minimal job info; normalize
  const nowIso = new Date().toISOString();
  const newApp = {
    id: payload.id || `APP-${Date.now()}`,
    jobId: payload.jobId || payload.id || undefined,
    company: payload.company || 'Unknown Company',
    position: payload.position || payload.title || 'Unknown Role',
    location: payload.location || 'Unknown',
    appliedDate: payload.appliedDate || nowIso,
    status: payload.status || 'Applied',
    source: payload.source || 'Unknown',
  };

  applications.unshift(newApp);
  return res.status(201).json({ item: newApp, total: applications.length, items: applications });
});

// PATCH /applications/:id - update an application's status (and optional fields)
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const payload = req.body || {};
  let updated = null;

  applications = applications.map(app => {
    if (String(app.id) === String(id)) {
      updated = { ...app, ...payload };
      return updated;
    }
    return app;
  });

  if (!updated) {
    return res.status(404).json({ error: 'Application not found' });
  }
  return res.json({ item: updated, total: applications.length, items: applications });
});

// DELETE /applications/:id - remove an application by id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const before = applications.length;
  applications = applications.filter(app => String(app.id) !== String(id));
  const removed = applications.length < before;
  return res.json({ removed, total: applications.length, items: applications });
});

module.exports = router;