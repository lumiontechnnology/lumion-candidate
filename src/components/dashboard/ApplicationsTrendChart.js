import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

function normalizeByDay(byDay) {
  if (!byDay) return [];
  const entries = Object.entries(byDay).map(([date, count]) => ({ date, count }));
  entries.sort((a, b) => new Date(a.date) - new Date(b.date));
  return entries;
}

export default function ApplicationsTrendChart({ byDay }) {
  const data = normalizeByDay(byDay);
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Applications Over Time (30 days)
      </Typography>
      <Box sx={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#1976d2" strokeWidth={2} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}