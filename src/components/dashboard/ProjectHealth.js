import React from 'react';
import { Paper, Typography, Grid, LinearProgress, Box } from '@mui/material';

const HealthItem = ({ title, value }) => (
  <Box sx={{ p: 1 }}>
    <Typography variant="body2" color="text.secondary">{title}</Typography>
    <LinearProgress variant="determinate" value={value} sx={{ my: 1 }} />
    <Typography variant="caption" color="text.secondary">{value}%</Typography>
  </Box>
);

const ProjectHealth = () => {
  // Demo values; later wire to active projects & milestones
  const health = [
    { title: 'Progress', value: 60 },
    { title: 'Deadline adherence', value: 80 },
    { title: 'Files exchanged', value: 40 },
    { title: 'Payments made', value: 20 },
  ];

  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Project Health</Typography>
      <Grid container spacing={2}>
        {health.map((h) => (
          <Grid key={h.title} item xs={12} md={3}>
            <HealthItem title={h.title} value={h.value} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        See progress, deadlines, files, payments — no micromanagement.
      </Typography>
    </Paper>
  );
};

export default ProjectHealth;