import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  Button,
  Stack,
  Card,
  CardContent,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SendIcon from '@mui/icons-material/Send';
import EventIcon from '@mui/icons-material/Event';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import JobFeed from '../components/dashboard/JobFeed';
  import ProjectHealth from '../components/dashboard/ProjectHealth';
  import FreelancerOverview from '../components/dashboard/FreelancerOverview';
  import ProposalComposer from '../components/dashboard/ProposalComposer';
  import AIMatchAssistant from '../components/dashboard/AIMatchAssistant';

const FreelancerDashboard = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [composerOpen, setComposerOpen] = useState(false);

  const handleApply = (job) => {
    setSelectedJob(job);
    setComposerOpen(true);
  };

  const handleCloseComposer = () => {
    setComposerOpen(false);
    setSelectedJob(null);
  };

  const stats = [
    { label: 'Proposals', value: 12 },
    { label: 'Interviews', value: 3 },
    { label: 'Offers', value: 1 },
    { label: 'Saved Jobs', value: 8 },
  ];

  const quickActions = [
    { icon: <WorkIcon color="primary" />, text: 'Find Jobs', to: '/job-search' },
    { icon: <SendIcon color="success" />, text: 'Compose Proposal', to: '/job-search' },
    { icon: <BookmarkIcon color="secondary" />, text: 'Saved Jobs', to: '/job-search?saved=true' },
    { icon: <EventIcon color="warning" />, text: 'Interview Prep', to: '/interview-simulator' },
  ];

  const recentActivity = [
    { primary: 'Submitted proposal to “Landing Page Revamp”', secondary: '2h ago' },
    { primary: 'Saved “React Dashboard Specialist”', secondary: '5h ago' },
    { primary: 'Employer viewed profile', secondary: 'Yesterday' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(25,118,210,0.08), rgba(156,39,176,0.08))',
          border: '1px solid rgba(0,0,0,0.06)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>F</Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>Freelancer Workspace</Typography>
              <Typography variant="body2" color="text.secondary">
                Track proposals, discover jobs, and grow your reputation.
              </Typography>
            </Box>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button
              component={RouterLink}
              to="/job-search"
              variant="contained"
              startIcon={<RocketLaunchIcon />}
              className="cta-primary"
            >
              Find Jobs
            </Button>
            <Button component={RouterLink} to="/resume-builder" variant="outlined" className="cta-outline">
              Update Profile
            </Button>
          </Stack>
        </Box>
        <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap' }}>
          <Chip label="Identity Verified" color="success" size="small" />
          <Chip label="Portfolio Ready" color="primary" size="small" variant="outlined" />
        </Stack>
      </Paper>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 1 }}>
        {stats.map((s, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card elevation={1} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="overline" color="text.secondary">{s.label}</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{s.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left column: Overview + AI Assistant + Quick Actions + Recent Activity */}
        <Grid item xs={12} md={4}>
          <FreelancerOverview />
          <Box sx={{ mt: 3 }}>
            <AIMatchAssistant />
          </Box>
          <Paper elevation={1} sx={{ p: 2, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <List>
              {quickActions.map((qa, i) => (
                <ListItem key={i} disableGutters button component={RouterLink} to={qa.to}>
                  <ListItemIcon sx={{ minWidth: 36 }}>{qa.icon}</ListItemIcon>
                  <ListItemText primary={qa.text} />
                </ListItem>
              ))}
            </List>
          </Paper>

          <Paper elevation={1} sx={{ p: 2, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              {recentActivity.map((a, i) => (
                <React.Fragment key={i}>
                  <ListItem disableGutters>
                    <ListItemText primary={a.primary} secondary={a.secondary} />
                  </ListItem>
                  {i < recentActivity.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Right column: Job Feed */}
        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Job Feed
            </Typography>
            <JobFeed onApply={handleApply} />
          </Paper>
        </Grid>

        {/* Project Health */}
        <Grid item xs={12}>
          <ProjectHealth />
        </Grid>
      </Grid>

      <ProposalComposer open={composerOpen} job={selectedJob} onClose={handleCloseComposer} />
    </Container>
  );
};

export default FreelancerDashboard;