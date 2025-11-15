import React from 'react';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Contact() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Card className="frosted-card rounded-3" sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Have questions or feedback? Drop us a note — we’re listening.
          </Typography>
          <Button component={RouterLink} to="/" variant="contained" className="cta-primary">
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Contact;