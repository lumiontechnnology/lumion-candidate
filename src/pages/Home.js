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
import lumionLogo from '../assets/lumion-logo.svg';

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
          background: 'linear-gradient(135deg, #0047FF 0%, #60A5FA 100%)',
          color: 'white',
          pt: 10,
          pb: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={lumionLogo}
          alt="Lumion watermark"
          sx={{
            position: 'absolute',
            right: { xs: -40, md: 40 },
            top: { xs: -40, md: 40 },
            opacity: 0.05,
            height: { xs: 160, md: 240 },
            pointerEvents: 'none',
          }}
        />
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                color="inherit"
                gutterBottom
              >
                Lumion — Intelligent Job Matching
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                A data-driven HR ecosystem connecting people and opportunities across Africa.
                Minimal, responsive, and futuristic — with motion that feels alive.
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
                  color="primary"
                  size="large"
                  className="glow-hover"
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
                  boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                  animation: 'pulseGlow 2s ease-in-out infinite',
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
          Streamline your job search and applications with AI precision
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
            Join professionals saving time and landing better jobs with Lumion.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              color="primary"
              size="large"
              className="glow-hover"
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