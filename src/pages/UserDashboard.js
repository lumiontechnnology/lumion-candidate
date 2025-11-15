import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  LinearProgress,
  Tabs,
  Tab,
  Chip,
  Stack,
  CircularProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import lumionLogo from '../assets/lumion-logo.svg';
import useNotifications from '../hooks/useNotifications';
import useRecommendedVacancies from '../hooks/useRecommendedVacancies';

// Data is provided by hooks; local mock arrays removed

export default function UserDashboard() {
  const location = useLocation();
  const { items: notifications, loading: notifLoading } = useNotifications();
  const { items: vacancies, loading: vacLoading } = useRecommendedVacancies(5);
  const tabs = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Vacancies', to: '/job-search' },
    { label: 'Application Tracker', to: '/history' },
    { label: 'My Resume', to: '/resume-builder' },
    { label: 'AI Toolbox', to: '/interview-simulator' },
  ];
  const currentTab = Math.max(
    0,
    tabs.findIndex((t) => location.pathname === t.to)
  );
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Top Tabs - visual only */}
      <Paper className="rounded-3" sx={{ p: 1, mb: 3 }}>
        <Tabs value={currentTab} variant="scrollable" scrollButtons allowScrollButtonsMobile>
          {tabs.map((t) => (
            <Tab key={t.label} label={t.label} component={RouterLink} to={t.to} />
          ))}
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Career Map */}
          <Paper
            className="rounded-3"
            sx={{ p: 2.5, mb: 3, bgcolor: '#10151A', color: 'white' }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Career Map</Typography>
              <Chip label="Applied" color="success" size="small" />
            </Box>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip label="Resume" variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} />
              <Chip label="LinkedIn" variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} />
              <Chip label="Indeed" variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} />
            </Stack>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
              <img src={lumionLogo} alt="Lumion" style={{ width: 120, opacity: 0.9 }} />
            </Box>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              Loading...
            </Typography>
          </Paper>

          {/* Progress of the Goal */}
          <Paper className="rounded-3" sx={{ p: 2.5, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h6">Progress of the Goal</Typography>
                <Typography variant="caption" color="text.secondary">Loading...</Typography>
              </Box>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate" value={75} size={80} />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6">75%</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Progress Days */}
          <Paper className="rounded-3" sx={{ p: 2.5, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Progress
            </Typography>
            <Stack direction="row" spacing={1}>
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => (
                <Chip
                  key={d}
                  label={d}
                  color={d === 'Sat' ? 'primary' : 'default'}
                  variant={d === 'Sat' ? 'filled' : 'outlined'}
                />
              ))}
            </Stack>
          </Paper>

          {/* Today's Tasks */}
          <Paper className="rounded-3" sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6">Today’s Task’s</Typography>
              <Typography variant="body2" color="text.secondary">120/140</Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">Loading...</Typography>
            <LinearProgress variant="determinate" value={85} sx={{ my: 2 }} />

            <List>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText primary="Find 5 vacancies" secondary="Search relevant positions that match your skills" />
              </ListItem>
              <Divider />
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <PendingIcon color="warning" />
                </ListItemIcon>
                <ListItemText primary="Apply to 5 vacancies" secondary="Prepare tailored applications for selected jobs" />
              </ListItem>
              <Divider />
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <PendingIcon color="info" />
                </ListItemIcon>
                <ListItemText primary="Schedule interviews" secondary="Confirm times and prepare materials" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Notifications */}
          <Paper className="rounded-3" sx={{ p: 2.5, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6">Notifications</Typography>
              <Button size="small" variant="text" component={RouterLink} to="/history">See All</Button>
            </Box>
            {notifLoading ? (
              <Box sx={{ py: 2, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={24} />
              </Box>
            ) : (
              <List>
                {notifications.map((n, idx) => (
                  <React.Fragment key={idx}>
                    <ListItem disableGutters>
                      <ListItemText primary={n.message || n} secondary={n.time || 'Just now'} />
                    </ListItem>
                    {idx < notifications.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>

          {/* Vacancies */}
          <Paper className="rounded-3" sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6">Vacancies</Typography>
              <Button size="small" variant="text" component={RouterLink} to="/job-search">See All</Button>
            </Box>
            {vacLoading ? (
              <Box sx={{ py: 2, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={24} />
              </Box>
            ) : (
              <Stack spacing={2}>
                {vacancies.map((v, idx) => (
                  <Paper key={v.id || idx} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{v.role}</Typography>
                        <Typography variant="body2" color="text.secondary">{v.company} • {v.location}</Typography>
                      </Box>
                      <Chip label={`${v.matchScore ?? 0}% match`} color="primary" size="small" />
                    </Box>
                  </Paper>
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
