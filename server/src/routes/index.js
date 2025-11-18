const express = require('express');
const stats = require('./stats');
const jobs = require('./jobs');
const notifications = require('./notifications');
const applications = require('./applications');

const router = express.Router();

router.use('/stats', stats);
router.use('/jobs', jobs);
router.use('/notifications', notifications);
router.use('/applications', applications);

module.exports = router;