import React, { useState, useEffect } from 'react';
import { useJobSearch } from '../context/JobSearchContext';
import { getAllJobRoles } from '../services/databaseService';
import { searchJobRoles } from '../data/jobRolesData';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FilterListIcon from '@mui/icons-material/FilterList';
import BusinessIcon from '@mui/icons-material/Business';
import lumionLogo from '../assets/lumion-logo.svg';

function JobSearch() {
  const { 
    jobs, 
    loading, 
    error, 
    filters, 
    searchJobs, 
    applyToJob, 
    updateFilters 
  } = useJobSearch();
  
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [localJobs, setLocalJobs] = useState([]);

  // Load job roles from database service on component mount
  useEffect(() => {
    const loadInitialJobs = async () => {
      const roles = await getAllJobRoles();
      setLocalJobs(roles.slice(0, 10)); // Show first 10 jobs initially
    };
    
    loadInitialJobs();
  }, []);
  
  // Format salary as currency
  const formatSalary = (salary) => {
    if (!salary) return 'Not specified';
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: salary.currency || 'USD',
      maximumFractionDigits: 0,
    });
    
    return `${formatter.format(salary.min)} - ${formatter.format(salary.max)}`;
  };
  
  // Format date to relative time (e.g., "2 days ago")
  const formatRelativeDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };
  
  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    
    // Get user preferences from filters
    const preferences = {
      keywords: filters.keywords,
      locations: [filters.location],
      jobTitles: filters.keywords ? [filters.keywords] : undefined,
      experienceLevel: filters.experienceLevel !== 'all' ? filters.experienceLevel : undefined,
      salary: filters.salary,
      workMode: filters.workMode !== 'all' ? filters.workMode : undefined,
    };
    
    // Use database service to search job roles
    const searchResults = searchJobRoles(filters.keywords, filters.location);
    setLocalJobs(searchResults);
    setSearchPerformed(true);
    
    // Also use the context search for API integration
    searchJobs(preferences);
  };
  
  // Handle filter changes
  const handleFilterChange = (name, value) => {
    updateFilters({ [name]: value });
  };
  
  // Open apply dialog
  const handleOpenApplyDialog = (job) => {
    setSelectedJob(job);
    setApplyDialogOpen(true);
  };
  
  // Close apply dialog
  const handleCloseApplyDialog = () => {
    setApplyDialogOpen(false);
  };
  
  // Handle job application
  const handleApplyToJob = async () => {
    if (!selectedJob) return;
    
    // In a real app, we would collect user's resume and cover letter
    // For now, we'll use mock data
    const applicationData = {
      resume: 'user_resume.pdf',
      coverLetter: 'user_cover_letter.pdf',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(123) 456-7890',
    };
    
    const result = await applyToJob(selectedJob, applicationData);
    
    if (result.success) {
      setNotification({
        open: true,
        message: `Successfully applied to ${selectedJob.title} at ${selectedJob.company}!`,
        severity: 'success'
      });
    } else {
      setNotification({
        open: true,
        message: `Failed to apply: ${result.error}`,
        severity: 'error'
      });
    }
    
    handleCloseApplyDialog();
  };
  
  // Close notification
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Job Search
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Find and apply to jobs that match your preferences across multiple platforms.
      </Typography>
      
      {/* Search Form */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box component="form" onSubmit={handleSearch} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Keywords"
                  variant="outlined"
                  value={filters.keywords}
                  onChange={(e) => handleFilterChange('keywords', e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Job title, skills, or company"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Location"
                  variant="outlined"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="City, state, or remote"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  size="large"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Search Jobs'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      
      {/* Advanced Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <FilterListIcon sx={{ mr: 1 }} /> Advanced Filters
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="job-type-label">Job Type</InputLabel>
                <Select
                  labelId="job-type-label"
                  value={filters.jobType}
                  label="Job Type"
                  onChange={(e) => handleFilterChange('jobType', e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="full-time">Full-time</MenuItem>
                  <MenuItem value="part-time">Part-time</MenuItem>
                  <MenuItem value="contract">Contract</MenuItem>
                  <MenuItem value="internship">Internship</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="experience-level-label">Experience Level</InputLabel>
                <Select
                  labelId="experience-level-label"
                  value={filters.experienceLevel}
                  label="Experience Level"
                  onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                >
                  <MenuItem value="all">All Levels</MenuItem>
                  <MenuItem value="Entry Level">Entry Level</MenuItem>
                  <MenuItem value="Mid Level">Mid Level</MenuItem>
                  <MenuItem value="Senior Level">Senior Level</MenuItem>
                  <MenuItem value="Executive">Executive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="work-mode-label">Work Mode</InputLabel>
                <Select
                  labelId="work-mode-label"
                  value={filters.workMode}
                  label="Work Mode"
                  onChange={(e) => handleFilterChange('workMode', e.target.value)}
                >
                  <MenuItem value="all">All Modes</MenuItem>
                  <MenuItem value="Remote">Remote</MenuItem>
                  <MenuItem value="Hybrid">Hybrid</MenuItem>
                  <MenuItem value="On-site">On-site</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Typography gutterBottom>
                Salary Range (USD)
              </Typography>
              <Box sx={{ px: 2 }}>
                <Slider
                  value={filters.salary}
                  onChange={(e, newValue) => handleFilterChange('salary', newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={200000}
                  step={10000}
                  marks={[
                    { value: 0, label: '$0' },
                    { value: 50000, label: '$50k' },
                    { value: 100000, label: '$100k' },
                    { value: 150000, label: '$150k' },
                    { value: 200000, label: '$200k' },
                  ]}
                  valueLabelFormat={(value) => `$${value.toLocaleString()}`}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="posted-within-label">Posted Within</InputLabel>
                <Select
                  labelId="posted-within-label"
                  value={filters.postedWithin}
                  label="Posted Within"
                  onChange={(e) => handleFilterChange('postedWithin', e.target.value)}
                >
                  <MenuItem value="all">Any Time</MenuItem>
                  <MenuItem value="day">Past 24 Hours</MenuItem>
                  <MenuItem value="week">Past Week</MenuItem>
                  <MenuItem value="month">Past Month</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* Search Results */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {searchPerformed && !loading && localJobs.length === 0 && jobs.length === 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          No jobs found matching your criteria. Try adjusting your search filters.
        </Alert>
      )}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {(localJobs.length > 0 ? localJobs : jobs).map((job) => (
            <Grid item xs={12} key={job.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Box>
                      <Typography variant="h6" component="div">
                        {job.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <BusinessIcon fontSize="small" sx={{ mr: 0.5 }} />
                        {job.company}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                        {job.location}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip 
                        label={job.source} 
                        color={job.source === 'LinkedIn' ? 'primary' : 'secondary'} 
                        size="small" 
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Posted {formatRelativeDate(job.postedDate)}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {job.description.substring(0, 200)}...
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                      <Chip 
                        icon={<WorkIcon />} 
                        label={job.experienceLevel} 
                        variant="outlined" 
                        size="small" 
                      />
                      <Chip 
                        icon={<AttachMoneyIcon />} 
                        label={formatSalary(job.salary)} 
                        variant="outlined" 
                        size="small" 
                      />
                      <Chip 
                        label={job.workMode} 
                        variant="outlined" 
                        size="small" 
                      />
                    </Box>
                  </Box>
                </CardContent>
                
                <Divider />
                
                <CardActions>
                  <Button 
                    size="small" 
                    color="primary"
                    onClick={() => handleOpenApplyDialog(job)}
                  >
                    Apply Now
                  </Button>
                  <Button size="small">View Details</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Apply Dialog */}
      <Dialog open={applyDialogOpen} onClose={handleCloseApplyDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Apply to {selectedJob?.title} at {selectedJob?.company}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            You're about to apply for this position using your saved resume and cover letter.
            The system will automatically optimize your application materials for this role.
          </Typography>
          
          <Typography variant="subtitle2" gutterBottom>
            Job Details:
          </Typography>
          <Typography variant="body2">
            <strong>Company:</strong> {selectedJob?.company}
          </Typography>
          <Typography variant="body2">
            <strong>Location:</strong> {selectedJob?.location}
          </Typography>
          <Typography variant="body2">
            <strong>Salary:</strong> {selectedJob?.salary ? formatSalary(selectedJob.salary) : 'Not specified'}
          </Typography>
          <Typography variant="body2">
            <strong>Source:</strong> {selectedJob?.source}
          </Typography>
          
          <Alert severity="info" sx={{ mt: 2 }}>
            Your resume and cover letter will be automatically tailored to match this job description.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseApplyDialog}>Cancel</Button>
          <Button onClick={handleApplyToJob} variant="contained" color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default JobSearch;