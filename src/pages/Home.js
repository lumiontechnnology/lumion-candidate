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
  Stack,
  Chip,
} from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';
import lumionLogo from '../assets/lumion-logo.svg';
import siteContent from '../data/siteContent';
import JobCard from '../components/jobs/JobCard';

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
                {siteContent.hero.title}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {siteContent.hero.subtitle}
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Button
                  component={RouterLink}
                  to={siteContent.hero.primaryCta.to}
                  variant="contained"
                  color="primary"
                  size="large"
                  className="glow-hover"
                >
                  {siteContent.hero.primaryCta.label}
                </Button>
                <Button
                  component={RouterLink}
                  to={siteContent.hero.secondaryCta.to}
                  variant="outlined"
                  color="inherit"
                  size="large"
                >
                  {siteContent.hero.secondaryCta.label}
                </Button>
              </Stack>
              <Stack direction="row" spacing={1.5} sx={{ mt: 4, flexWrap: 'wrap' }}>
                {siteContent.categories.map((cat) => (
                  <Box
                    key={cat}
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.15)',
                      color: 'white',
                      px: 1.5,
                      py: 0.75,
                      borderRadius: 999,
                      fontFamily: 'Poppins, Arial, sans-serif',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                    }}
                  >
                    {cat}
                  </Box>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: '100%',
                  height: 340,
                  borderRadius: 2,
                  boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                  background:
                    'radial-gradient(1200px 520px at 20% 20%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.0) 70%), linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                }}
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

      {/* Featured Jobs */}
      {/* Featured Companies */}
      <Container sx={{ py: 6 }} maxWidth="lg">
        <Typography component="h2" variant="h5" align="center" color="text.secondary" gutterBottom>
          Featured Companies
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
          {siteContent.companies?.map((name) => (
            <Chip key={name} label={name} sx={{ borderRadius: 2 }} />
          ))}
        </Box>
      </Container>

      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography component="h2" variant="h3" align="center" color="text.primary" gutterBottom>
          Featured Jobs
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Curated roles from leading studios and startups
        </Typography>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {siteContent.featuredJobs.map((job) => (
            <Grid item key={`${job.title}-${job.company}`} xs={12} sm={6} md={3}>
              <JobCard {...job} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button component={RouterLink} to="/job-search" variant="outlined" size="large">
            Browse All Jobs
          </Button>
        </Box>
      </Container>

      {/* Testimonials */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={3}>
          {siteContent.homeTestimonials.map((t) => (
            <Grid item xs={12} md={6} key={t.author}>
              <Card className="frosted-card" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontStyle: 'italic' }}>
                  “{t.quote}”
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  — {t.author}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Newsletter CTA */}
      <Box
        sx={{
          bgcolor: 'secondary.main',
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            {siteContent.newsletter.title}
          </Typography>
          <Typography variant="h6" align="center" paragraph>
            {siteContent.newsletter.subtitle}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button variant="contained" color="primary" size="large" className="glow-hover">
              {siteContent.newsletter.ctaLabel}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;