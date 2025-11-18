const express = require('express');
const stats = require('./stats');
const jobs = require('./jobs');
const notifications = require('./notifications');
const applications = require('./applications');
const proposals = require('./proposals');

const router = express.Router();

router.use('/stats', stats);
router.use('/jobs', jobs);
router.use('/notifications', notifications);
router.use('/applications', applications);
router.use('/proposals', proposals);

module.exports = router;