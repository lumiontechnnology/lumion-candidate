const express = require('express');
const { computeStats } = require('../utils/stats');
const applications = require('../data/applications.json');

const router = express.Router();

router.get('/', (req, res) => {
  const stats = computeStats(applications);
  res.json(stats);
});

module.exports = router;