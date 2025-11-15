import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import siteContent from '../../data/siteContent';

export default function Testimonials() {
  const data = siteContent.testimonials;
  return (
    <Box sx={{ py: 10, backgroundColor: '#1C1A24' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            borderRadius: 4,
            p: { xs: 3, md: 4 },
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.25) 100%), url(https://images.unsplash.com/photo-1529336953121-1a1d8b68c8f2?auto=format&fit=crop&w=1400&q=60)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#fff' }}>
            {data.titleStrong} <br /> {data.titleSuffix} <span style={{ color: '#7C5CFF' }}>{data.titleAccent}</span>
          </Typography>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            {data.items.map((t, idx) => (
              <Grid key={idx} item xs={12} md={4}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Stack direction="row" spacing={0.5} sx={{ color: '#FFC107' }}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <StarIcon key={i} fontSize="small" />
                      ))}
                    </Stack>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      “{t.quote}”
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 2, alignItems: 'center' }}>
                      <Box sx={{ width: 36, height: 36, borderRadius: '50%', background: '#EDE7FF' }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{t.author}</Typography>
                        <Typography variant="caption" color="text.secondary">{t.role}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}