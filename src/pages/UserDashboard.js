import React, { useEffect, useState } from 'react';
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
import useNotifications from '../hooks/useNotifications';
import useRecommendedVacancies from '../hooks/useRecommendedVacancies';
import { getApplicationStatistics, fetchApplicationStatistics, fetchSavedJobs } from '../services/databaseService';
import ApplicationsTrendChart from '../components/dashboard/ApplicationsTrendChart';
import StatusDistributionChart from '../components/dashboard/StatusDistributionChart';
import SourceBreakdownChart from '../components/dashboard/SourceBreakdownChart';
 

// Data is provided by hooks; local mock arrays removed

export default function UserDashboard() {
  const location = useLocation();
  const { items: notifications, loading: notifLoading } = useNotifications();
  const { items: vacancies, loading: vacLoading } = useRecommendedVacancies(5);
  const [stats, setStats] = useState(getApplicationStatistics());
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const s = await fetchApplicationStatistics();
        if (!cancelled) setStats(s);
      } catch {}
      try {
        const saved = await fetchSavedJobs();
        if (!cancelled) setSavedCount((saved || []).length);
      } catch {}
    };
    load();
    return () => { cancelled = true; };
  }, []);
  const interviewCount = Object.entries(stats?.byStatus || {})
    .filter(([key]) => key.toLowerCase().includes('interview'))
    .reduce((acc, [, val]) => acc + (val || 0), 0);
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
      </Box>

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
          <Paper className="rounded-3" sx={{ p: 2.5, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Quick Stats</Typography>
              <Chip label={`Total: ${stats?.total || 0}`} color="primary" size="small" />
            </Box>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              <Chip label={`Saved: ${savedCount}`} variant="outlined" />
              <Chip label={`Interviews: ${interviewCount}`} variant="outlined" color={interviewCount ? 'success' : 'default'} />
              <Chip label={`Awaiting: ${(stats?.byStatus?.Applied || 0) + (stats?.byStatus?.Submitted || 0)}`} variant="outlined" />
            </Stack>
          </Paper>

          <Paper className="rounded-3" sx={{ p: 2.5, mb: 3 }}>
            <ApplicationsTrendChart byDay={stats?.byDay} />
          </Paper>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper className="rounded-3" sx={{ p: 2.5, mb: 3 }}>
                <SourceBreakdownChart bySource={stats?.bySource} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className="rounded-3" sx={{ p: 2.5, mb: 3 }}>
                <StatusDistributionChart byStatus={stats?.byStatus} />
              </Paper>
            </Grid>
          </Grid>

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
