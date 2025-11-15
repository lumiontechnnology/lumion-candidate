import React from 'react';
import { Box, Container, Typography, Stack, Chip, TextField, InputAdornment, Button, Card, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import siteContent from '../../data/siteContent';

export default function Hero() {
  const hero = siteContent.hero;
  const images = hero.images || [];
  return (
    <Box className="section-hero-bg" sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Chip label={hero.eyebrow} color="secondary" variant="outlined" className="chip-rounded" sx={{ mb: 2 }} />
            <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
              {hero.titleStrong} <span className="brand-accent">{hero.titleAccent}</span>
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2, maxWidth: 720 }}>
              {hero.description}
            </Typography>

            <Card className="frosted-card rounded-3" sx={{ px: 2, py: 2, mt: 3 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                <TextField
                  fullWidth
                  placeholder={hero.searchPlaceholder}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button component={RouterLink} to="/job-search" className="cta-primary" variant="contained" size="large">Search</Button>
            </Stack>
          </Card>

            <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
              {hero.popularChips.map((c) => (
                <Chip key={c} label={c} variant="outlined" className="chip-rounded" />
              ))}
            </Stack>

            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'nowrap', overflowX: 'auto', pb: 0.5 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ flex: '0 0 auto' }}>
                Trusted By
              </Typography>
              {hero.trustedBy.map((n) => (
                <Chip key={n} label={n} className="chip-rounded" sx={{ flex: '0 0 auto' }} />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {images.length === 1 ? (
              <Box className="rounded-3" sx={{ position: 'relative', overflow: 'hidden' }}>
                <Box className="overlay-blur-accent" />
                <Box
                  component="img"
                  src={images[0]}
                  alt="header-illustration"
                  className="image-framed"
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    height: { xs: 240, sm: 300, md: 360 },
                    objectFit: 'contain'
                  }}
                />
              </Box>
            ) : images.length > 1 ? (
              <Grid container spacing={2}>
                {images.map((src, idx) => (
                  <Grid key={`${src}-${idx}`} item xs={6} md={4}>
                    <Box
                      component="img"
                      src={src}
                      alt={`header-${idx}`}
                      className="rounded-3"
                      sx={{
                        width: '100%',
                        height: { xs: 140, sm: 180, md: 200 },
                        objectFit: 'cover',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box className="bg-radial-panel rounded-3" sx={{ width: '100%', height: { xs: 220, md: 320 }, boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}