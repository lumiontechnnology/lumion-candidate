import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  LinearProgress,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Link as RouterLink } from 'react-router-dom';
import lumionLogo from '../assets/lumion-logo.svg';

// Mock data - would be replaced with actual API data
const stats = {
  totalApplications: 42,
  pendingApplications: 15,
  interviewInvites: 5,
  applicationRate: 85,
};

const recentApplications = [
  {
    id: 1,
    company: 'Tech Solutions Inc.',
    position: 'Senior Frontend Developer',
    date: '2023-05-10',
    status: 'Applied',
  },
  {
    id: 2,
    company: 'Global Innovations',
    position: 'Full Stack Engineer',
    date: '2023-05-09',
    status: 'Interview Scheduled',
  },
  {
    id: 3,
    company: 'Digital Creations',
    position: 'UI/UX Designer',
    date: '2023-05-08',
    status: 'Applied',
  },
  {
    id: 4,
    company: 'Future Technologies',
    position: 'Product Manager',
    date: '2023-05-07',
    status: 'Rejected',
  },
];

function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: 'primary.light',
              color: 'white',
            }}
          >
            <Typography component="h2" variant="h6" gutterBottom>
              Total Applications
            </Typography>
            <Typography component="p" variant="h3">
              {stats.totalApplications}
            </Typography>
            <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center' }}>
              <WorkIcon />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Last 30 days
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: 'warning.light',
              color: 'white',
            }}
          >
            <Typography component="h2" variant="h6" gutterBottom>
              Pending Applications
            </Typography>
            <Typography component="p" variant="h3">
              {stats.pendingApplications}
            </Typography>
            <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center' }}>
              <PendingIcon />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Awaiting response
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: 'success.light',
              color: 'white',
            }}
          >
            <Typography component="h2" variant="h6" gutterBottom>
              Interview Invites
            </Typography>
            <Typography component="p" variant="h3">
              {stats.interviewInvites}
            </Typography>
            <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Positive responses
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: 'info.light',
              color: 'white',
            }}
          >
            <Typography component="h2" variant="h6" gutterBottom>
              Application Rate
            </Typography>
            <Typography component="p" variant="h3">
              {stats.applicationRate}%
            </Typography>
            <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center' }}>
              <TrendingUpIcon />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Job match rate
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Recent Applications */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Recent Applications</Typography>
              <Button 
                component={RouterLink} 
                to="/history" 
                variant="outlined" 
                size="small"
              >
                View All
              </Button>
            </Box>
            <List>
              {recentApplications.map((app, index) => (
                <React.Fragment key={app.id}>
                  <ListItem>
                    <ListItemIcon>
                      <WorkIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${app.position} at ${app.company}`}
                      secondary={`Applied on ${app.date} • Status: ${app.status}`}
                    />
                  </ListItem>
                  {index < recentApplications.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        
        {/* Job Search Progress */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Job Search Progress
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Resume Optimization</Typography>
                <Typography variant="body2">90%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={90} color="success" />
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Job Preferences</Typography>
                <Typography variant="body2">75%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={75} color="primary" />
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">LinkedIn Integration</Typography>
                <Typography variant="body2">100%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={100} color="success" />
            </Box>
            
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Indeed Integration</Typography>
                <Typography variant="body2">60%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={60} color="warning" />
            </Box>
            
            <Button
              component={RouterLink}
              to="/preferences"
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
            >
              Update Preferences
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;