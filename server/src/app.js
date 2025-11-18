const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const allowedOriginsRaw = process.env.CLIENT_ORIGINS || process.env.CLIENT_ORIGIN || '';
const allowedOrigins = allowedOriginsRaw.split(',').map(s => s.trim()).filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.length === 0) return callback(null, true); // dev: allow all if none specified
    return callback(null, allowedOrigins.includes(origin));
  },
  credentials: true,
}));
app.use(express.json());

app.use('/api', routes);

app.get('/health', (req, res) => res.json({ ok: true }));

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;