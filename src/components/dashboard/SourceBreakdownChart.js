import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

function normalizeBySource(bySource) {
  if (!bySource) return [];
  const entries = Object.entries(bySource).map(([source, count]) => ({ source, count }));
  // Sort descending by count
  entries.sort((a, b) => b.count - a.count);
  return entries;
}

export default function SourceBreakdownChart({ bySource }) {
  const data = normalizeBySource(bySource);
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Applications by Source
      </Typography>
      <Box sx={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="source" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="count" fill="#2e7d32" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}