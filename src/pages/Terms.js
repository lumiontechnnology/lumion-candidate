import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';

function Terms() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Card className="frosted-card" sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Terms of Service
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            This prototype is provided “as-is” for demonstration purposes. Features operate locally with simulated data; no external services are invoked.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            By using this prototype, you agree not to upload sensitive personal information and understand that functionality may change before production release.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Final Terms of Service will be published prior to public launch.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Terms;