const express = require('express');
const notifications = require('../data/notifications.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ total: notifications.length, items: notifications });
});

module.exports = router;