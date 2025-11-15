import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import siteContent from '../../data/siteContent';

export default function StatStrip() {
  const stats = siteContent.stats || [];
  return (
    <Box sx={{ py: 6, bgcolor: '#FFFFFF' }}>
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center">
          {stats.map((s, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>{s.value}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{s.label}</Typography>
                <Typography variant="body2" color="text.secondary">{s.subtext}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}