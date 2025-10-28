import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';

const features = [
  {
    title: 'Automated Applications',
    description: 'Our platform automatically applies to jobs on LinkedIn and Indeed based on your preferences.',
    icon: <AutorenewIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Customizable Preferences',
    description: 'Set your preferred salary range, work mode, location, and roles to find the perfect match.',
    icon: <SettingsIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Resume Optimization',
    description: 'Our AI automatically tailors your resume and cover letter for each application to increase your chances.',
    icon: <DescriptionIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Email Integration',
    description: 'Automatically sends emails on your behalf for applications that require email submissions.',
    icon: <EmailIcon fontSize="large" color="primary" />,
  },
];

function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                color="inherit"
                gutterBottom
              >
                Lumion Career Accelerator
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Automate your job applications and climb the career ladder faster with Lumion's AI-powered platform.
                Let us handle the tedious application process while you focus on preparing for interviews.
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  Get Started
                </Button>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  color="inherit"
                  size="large"
                >
                  Login
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                sx={{
                  width: '100%',
                  maxHeight: 400,
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
                alt="Career growth illustration"
                src="https://via.placeholder.com/600x400?text=Career+Growth"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          How It Works
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Our platform streamlines your job search and application process
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    pt: 3,
                  }}
                >
                  {feature.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3" align="center">
                    {feature.title}
                  </Typography>
                  <Typography align="center">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: 'secondary.main',
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            Ready to supercharge your job search?
          </Typography>
          <Typography variant="h6" align="center" paragraph>
            Join thousands of professionals who are saving time and landing better jobs with Career Accelerator.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              color="primary"
              size="large"
              sx={{ bgcolor: 'white', color: 'secondary.main' }}
            >
              Sign Up Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;