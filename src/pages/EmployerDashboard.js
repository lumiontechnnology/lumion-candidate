import React from 'react';
import { Box, Container, Grid, Paper, Typography, Card, CardContent, Button, Divider, List, ListItem, ListItemText, Chip } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import PostAddIcon from '@mui/icons-material/PostAdd';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Link as RouterLink } from 'react-router-dom';

function StatCard({ title, value, subtitle }) {
  return (
    <Card className="stat-card">
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">{subtitle}</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>{value}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>{title}</Typography>
      </CardContent>
    </Card>
  );
}

export default function EmployerDashboard() {
  const stats = [
    { title: 'Active Listings', value: 6, subtitle: 'Jobs Live' },
    { title: 'Applications Today', value: 128, subtitle: 'Candidate Flow' },
    { title: 'Interviews Scheduled', value: 12, subtitle: 'This Week' },
    { title: 'Offer Rate', value: '27%', subtitle: 'Conversion' },
  ];

  const listings = [
    { id: 'e1', title: 'Senior Frontend Engineer', status: 'Live', applicants: 42 },
    { id: 'e2', title: 'Product Designer', status: 'Live', applicants: 31 },
    { id: 'e3', title: 'Data Analyst (Contract)', status: 'Paused', applicants: 18 },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Employer Dashboard</Typography>
          <Typography variant="body1" color="text.secondary">Manage job postings, review candidates, and track hiring performance.</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button component={RouterLink} to="/job-search" variant="outlined" className="cta-outline" startIcon={<WorkIcon />}>Browse Talent</Button>
          <Button component={RouterLink} to="/automated-application" variant="contained" className="cta-primary" startIcon={<TrendingUpIcon />}>Auto-Apply Insights</Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Your Listings</Typography>
              <Button component={RouterLink} to="/post-job" variant="contained" className="cta-primary" startIcon={<PostAddIcon />}>Post a Job</Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <List>
              {listings.map((l) => (
                <ListItem key={l.id} secondaryAction={<Chip label={`${l.applicants} applicants`} />}>
                  <ListItemText primary={l.title} secondary={`Status: ${l.status}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            {stats.map((s) => (
              <Grid item xs={12} key={s.title}>
                <StatCard title={s.title} value={s.value} subtitle={s.subtitle} />
              </Grid>
            ))}
          </Grid>
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6">Candidate Pipeline</Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip icon={<GroupIcon />} label="New" color="primary" />
              <Chip label="Screening" variant="outlined" />
              <Chip label="Interview" variant="outlined" />
              <Chip label="Offer" variant="outlined" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}