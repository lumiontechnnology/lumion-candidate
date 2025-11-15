import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Chip } from '@mui/material';
import siteContent from '../../data/siteContent';

export default function CategoryGrid() {
  const categories = siteContent.categories || [];
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
          {siteContent.categoriesSectionTitle}
        </Typography>
        <Grid container spacing={3}>
          {categories.map((cat, idx) => (
            <Grid item xs={12} md={idx === 0 ? 6 : 4} key={cat.title}>
              <Card className="frosted-card rounded-3" sx={{ p: 2.5 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{cat.title}</Typography>
                    <Chip label={idx === 0 ? '↗' : '↗'} size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {cat.description}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2, color: '#7C5CFF', fontWeight: 600 }}>
                    • {cat.jobsAvailable} Job Available
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}