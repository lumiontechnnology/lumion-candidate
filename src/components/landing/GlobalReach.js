import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Stack, Button, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PublicIcon from '@mui/icons-material/Public';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import siteContent from '../../data/siteContent';

export default function GlobalReach() {
  const data = siteContent.globalReach;
  return (
    <Box className="section-muted-bg" sx={{ py: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Decorative gradient orb */}
      <Box
        sx={{
          position: 'absolute',
          top: -120,
          right: -160,
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, rgba(124,92,255,0.18), rgba(124,92,255,0.0) 60%)',
          filter: 'blur(6px)',
        }}
      />
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
              {/* Floating badges */}
              <Chip
                icon={<PublicIcon />}
                label="186 Countries"
                color="primary"
                variant="filled"
                sx={{ position: 'absolute', bottom: 24, left: 24, fontWeight: 600 }}
              />
              <Chip
                icon={<VerifiedUserIcon />}
                label="Identity Verified"
                color="success"
                variant="filled"
                sx={{ position: 'absolute', bottom: 24, right: 24, fontWeight: 600 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
              {data.titleStrong} <span className="brand-accent">{data.titleAccent}</span> {data.titleSuffix}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              {data.description}
            </Typography>
            <Stack spacing={1.2} sx={{ mt: 2 }}>
              {data.bullets.map((b) => {
                let Icon = RocketLaunchIcon;
                const t = String(b).toLowerCase();
                if (t.includes('186')) Icon = PublicIcon;
                else if (t.includes('identity')) Icon = VerifiedUserIcon;
                else if (t.includes('contracts') || t.includes('ndas') || t.includes('agreements')) Icon = AssignmentTurnedInIcon;
                return (
                  <Stack key={b} direction="row" spacing={1} alignItems="center">
                    <Icon fontSize="small" color="primary" />
                    <Typography variant="body2">{b}</Typography>
                  </Stack>
                );
              })}
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button component={RouterLink} to="/freelancer" className="cta-primary" variant="contained">{data.cta}</Button>
              <Button component={RouterLink} to="/post-job" variant="outlined">Post a Job</Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}