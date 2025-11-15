import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Stack, Chip, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import siteContent from '../../data/siteContent';

function CircularCard({ job }) {
  return (
    <Card className="frosted-card rounded-3" sx={{ p: 2.5 }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
        {job.tags.map((t) => (
          <Chip key={t} label={t} size="small" variant="outlined" className="chip-rounded" />
        ))}
      </Stack>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>{job.title}</Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 1, color: 'text.secondary' }}>
        <Typography variant="body2">🕒 {job.postedAgo}</Typography>
        <Typography variant="body2">💰 {job.salary}</Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ mt: 1, color: 'text.secondary', alignItems: 'center' }}>
        <Typography variant="body2">🏢 {job.company}</Typography>
        <Typography variant="body2">📍 {job.country}</Typography>
      </Stack>
      <Button
        component={RouterLink}
        to={job.to || '/job-search'}
        variant="contained"
        className="cta-primary"
        sx={{ mt: 2 }}
        size="small"
      >
        Apply Position
      </Button>
    </Card>
  );
}

export default function JobCirculars() {
  const jobs = siteContent.jobCirculars || [];
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, textAlign: 'center' }}>
          {siteContent.jobCircularsTitle}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
          {siteContent.jobCircularsSubtitle}
        </Typography>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {jobs.map((job) => (
            <Grid item xs={12} md={3} key={`${job.title}-${job.company}`}>
              <CircularCard job={job} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}