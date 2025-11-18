import React from 'react';
import { Box, Typography, Stack, Chip } from '@mui/material';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

const COLORS = ['#1976d2', '#2e7d32', '#ed6c02', '#9c27b0', '#e91e63', '#00acc1'];

function normalizeByStatus(byStatus) {
  if (!byStatus) return [];
  const entries = Object.entries(byStatus).map(([name, value]) => ({ name, value }));
  // Sort descending by value
  entries.sort((a, b) => b.value - a.value);
  return entries;
}

export default function StatusDistributionChart({ byStatus }) {
  const data = normalizeByStatus(byStatus);
  const total = data.reduce((acc, d) => acc + d.value, 0);
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Application Status Distribution
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
        {data.slice(0, 4).map((d) => (
          <Chip key={d.name} label={`${d.name}: ${d.value}`} size="small" />
        ))}
        {data.length > 4 && <Chip label={`+${data.length - 4} more`} size="small" />}
        {total === 0 && <Chip label="No applications yet" size="small" />}
      </Stack>
      <Box sx={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}