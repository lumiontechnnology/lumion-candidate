import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Stack, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import siteContent from '../../data/siteContent';

export default function GlobalReach() {
  const data = siteContent.globalReach;
  return (
    <Box className="section-muted-bg" sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 4,
                height: { xs: 280, md: 360 },
                background:
                  'radial-gradient(800px 320px at 30% 30%, rgba(124,92,255,0.10) 0%, rgba(124,92,255,0.0) 70%), linear-gradient(135deg, #FAFBFF 0%, #EEF2FF 100%)',
              }}
            >
              <Card className="frosted-card rounded-3" sx={{ position: 'absolute', top: 24, left: 24, maxWidth: 360 }}>
                <CardContent>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{data.overlayCard.country}</Typography>
                  <Typography variant="body1" sx={{ mt: 1, fontWeight: 600 }}>{data.overlayCard.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{data.overlayCard.body}</Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
              {data.titleStrong} <span className="brand-accent">{data.titleAccent}</span> {data.titleSuffix}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              {data.description}
            </Typography>
            <Stack component="ul" spacing={1.2} sx={{ mt: 2, pl: 2 }}>
              {data.bullets.map((b) => (
                <Typography key={b} component="li" variant="body2">
                  {b}
                </Typography>
              ))}
            </Stack>
            <Button component={RouterLink} to="/job-search" className="cta-primary" variant="contained" sx={{ mt: 3 }}>{data.cta}</Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}