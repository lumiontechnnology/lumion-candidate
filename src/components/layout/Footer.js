import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[900],
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Career Accelerator
            </Typography>
            <Typography variant="body2">
              Automating your job search and application process to help you move up the career ladder faster.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/dashboard" color="inherit" display="block" sx={{ mb: 1 }}>
              Dashboard
            </Link>
            <Link component={RouterLink} to="/preferences" color="inherit" display="block" sx={{ mb: 1 }}>
              Job Preferences
            </Link>
            <Link component={RouterLink} to="/resume-builder" color="inherit" display="block">
              Resume Builder
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Link component={RouterLink} to="/privacy" color="inherit" display="block" sx={{ mb: 1 }}>
              Privacy Policy
            </Link>
            <Link component={RouterLink} to="/terms" color="inherit" display="block" sx={{ mb: 1 }}>
              Terms of Service
            </Link>
            <Link component={RouterLink} to="/contact" color="inherit" display="block">
              Contact Us
            </Link>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' Career Accelerator. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;