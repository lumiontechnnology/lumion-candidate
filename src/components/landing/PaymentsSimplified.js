import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import siteContent from '../../data/siteContent';

export default function PaymentsSimplified() {
  const { title, cards } = siteContent.payments || { title: '', cards: [] };
  return (
    <Box className="section-muted-bg rounded-3" sx={{ py: 6, mx: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
          {title}
        </Typography>
        <Grid container spacing={3}>
          {cards.map((c) => (
            <Grid item xs={12} md={4} key={c.title}>
              <Card className="frosted-card rounded-3" sx={{ p: 2.5 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{c.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{c.body}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}