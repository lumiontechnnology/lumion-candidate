import React from 'react';
import { Paper, Box, Typography, LinearProgress, Stack, Chip } from '@mui/material';

const FreelancerOverview = () => {
  // Demo data; later wire to profile & reputation APIs
  const profileCompletion = 80;
  const reputation = {
    quality: 4.6,
    communication: 4.7,
    timeliness: 4.5,
    professionalism: 4.8,
  };

  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Overview</Typography>
      <Typography variant="body2" color="text.secondary">Profile completion</Typography>
      <LinearProgress variant="determinate" value={profileCompletion} sx={{ my: 1 }} />
      <Typography variant="caption" color="text.secondary">{profileCompletion}% complete</Typography>
      <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
        <Chip label={`Quality ${reputation.quality.toFixed(1)}`} size="small" />
        <Chip label={`Comm ${reputation.communication.toFixed(1)}`} size="small" />
        <Chip label={`Time ${reputation.timeliness.toFixed(1)}`} size="small" />
        <Chip label={`Pro ${reputation.professionalism.toFixed(1)}`} size="small" />
      </Stack>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        Transparent scoring: quality, communication, timeliness, professionalism.
      </Typography>
    </Paper>
  );
};

export default FreelancerOverview;