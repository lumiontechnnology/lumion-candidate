import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';

function Privacy() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Card className="frosted-card" sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Privacy Policy
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            We value your privacy. This prototype processes data locally in your browser for search, preferences, and application workflows. No personal data is transmitted to external services.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Information you provide (such as job preferences and resume details) is used to improve matching and user experience within this prototype. You can clear local data anytime by refreshing the page or using your browser tools.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            For production release, we will publish a complete Privacy Policy describing storage, security, and data rights.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Privacy;