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
  Snackbar,
  Skeleton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FilterListIcon from '@mui/icons-material/FilterList';
import BusinessIcon from '@mui/icons-material/Business';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

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
  const [activeSource, setActiveSource] = useState('All');
  const [savedJobs, setSavedJobs] = useState([]);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  // Normalize local job role data into a realistic job listing shape
  const mapRoleToJob = (role) => {
    const companies = [
      'Lumion Labs',
      'Pioneer Tech',
      'Riverstone Analytics',
      'Northstar Systems',
      'OrbitWorks',
      'Summit Digital',
      'Brightline Software',
      'Blueleaf Cloud',
      'Nimbus AI',
      'Crescent Apps'
    ];
    const locations = [
      'Remote — US',
      'San Francisco, CA',
      'New York, NY',
      'Austin, TX',
      'Seattle, WA',
      'Boston, MA',
      'Chicago, IL',
      'Denver, CO',
      'Los Angeles, CA',
      'Remote — Worldwide'
    ];
    const sources = ['LinkedIn', 'Indeed', 'Glassdoor'];
    const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level'];
    const workModes = ['Remote', 'Hybrid', 'On-site'];

    const seed = (role.id + role.title).split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const company = companies[seed % companies.length];
    const location = locations[seed % locations.length];
    const source = sources[seed % sources.length];
    const experienceLevel = experienceLevels[seed % experienceLevels.length];
    const workMode = workModes[seed % workModes.length];
    const postedDaysAgo = (seed % 14) + 1; // 1–14 days ago
    const postedDate = new Date(Date.now() - postedDaysAgo * 24 * 60 * 60 * 1000).toISOString();

    const salaryRange = role.averageSalary
      ? { min: role.averageSalary.min, max: role.averageSalary.max, currency: 'USD' }
      : { min: 60000, max: 120000, currency: 'USD' };

    return {
      id: role.id,
      title: role.title,
      company,
      location,
      description: role.description,
      skills: role.skills,
      experienceLevel,
      salary: salaryRange,
      workMode,
      source,
      postedDate,
    };
  };

  // Load job roles from database service on component mount
  useEffect(() => {
    const loadInitialJobs = async () => {
      const roles = await getAllJobRoles();
      // Normalize into job listing shape
      setLocalJobs(roles.slice(0, 10).map(mapRoleToJob));
    };
    
    loadInitialJobs();
  }, []);

  // Load saved jobs from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('lumion_saved_jobs');
      if (raw) setSavedJobs(JSON.parse(raw));
    } catch {}
  }, []);

  const persistSaved = (jobs) => {
    setSavedJobs(jobs);
    try {
      localStorage.setItem('lumion_saved_jobs', JSON.stringify(jobs));
    } catch {}
  };

  const isSaved = (job) => savedJobs.some((j) => j.id === job.id);
  const toggleSaveJob = (job) => {
    if (isSaved(job)) {
      const updated = savedJobs.filter((j) => j.id !== job.id);
      persistSaved(updated);
      setNotification({ open: true, message: 'Removed from saved jobs', severity: 'info' });
    } else {
      const updated = [{ ...job }, ...savedJobs];
      persistSaved(updated);
      setNotification({ open: true, message: 'Saved job', severity: 'success' });
    }
  };
  
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
    const searchResults = searchJobRoles(filters.keywords || '');
    setLocalJobs(searchResults.map(mapRoleToJob));
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

  const handleOpenDetails = (job) => {
    setSelectedJob(job);
    setDetailsDialogOpen(true);
  };
  const handleCloseDetails = () => setDetailsDialogOpen(false);
  
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

  const sourcePool = (localJobs.length > 0 ? localJobs : jobs);
  const filteredJobs = activeSource === 'Saved'
    ? savedJobs
    : sourcePool.filter((job) => activeSource === 'All' || job.source === activeSource);

  const getSourceBadgeSx = (src) => {
    const styles = {
      LinkedIn: { bgcolor: '#0A66C2', color: 'white' },
      Indeed: { bgcolor: '#1346A1', color: 'white' },
      Glassdoor: { bgcolor: '#0CAA41', color: 'white' },
    };
    return { ...(styles[src] || {}), mb: 1 };
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

      {/* Source Tabs */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['All','LinkedIn','Indeed','Glassdoor','Saved'].map((src) => (
              <Chip
                key={src}
                label={src}
                clickable
                onClick={() => setActiveSource(src)}
                sx={{
                  borderRadius: 2,
                  ...(src === 'LinkedIn' && { bgcolor: '#0A66C2', color: 'white' }),
                  ...(src === 'Indeed' && { bgcolor: '#1346A1', color: 'white' }),
                  ...(src === 'Glassdoor' && { bgcolor: '#0CAA41', color: 'white' }),
                  ...(src === 'Saved' && {
                    bgcolor: activeSource === 'Saved' ? 'secondary.main' : 'background.paper',
                    color: activeSource === 'Saved' ? 'white' : 'text.primary',
                  }),
                  ...(src === 'All' && {
                    bgcolor: activeSource === 'All' ? 'primary.main' : 'background.paper',
                    color: activeSource === 'All' ? 'white' : 'text.primary',
                  }),
                  boxShadow: activeSource === src ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                }}
              />
            ))}
          </Box>
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
        <Grid container spacing={3}>
          {[1,2,3,4].map((i) => (
            <Grid item xs={12} key={i}>
              <Card className="frosted-card">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Skeleton variant="text" width={240} height={28} />
                      <Skeleton variant="text" width={180} />
                      <Skeleton variant="text" width={160} />
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Skeleton variant="rounded" width={64} height={24} />
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="80%" />
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <Skeleton variant="rounded" width={100} height={28} />
                      <Skeleton variant="rounded" width={120} height={28} />
                      <Skeleton variant="rounded" width={90} height={28} />
                    </Box>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <Skeleton variant="rounded" width={100} height={32} />
                  <Skeleton variant="rounded" width={100} height={32} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {filteredJobs.map((job) => (
            <Grid item xs={12} key={job.id}>
              <Card className="frosted-card glow-hover">
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
                        size="small"
                        sx={getSourceBadgeSx(job.source)}
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
                  <Button size="small" onClick={() => handleOpenDetails(job)}>View Details</Button>
                  <Button size="small" onClick={() => toggleSaveJob(job)} startIcon={isSaved(job) ? <BookmarkIcon /> : <BookmarkBorderIcon />}>
                    {isSaved(job) ? 'Saved' : 'Save'}
                  </Button>
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

      {/* Details Dialog */}
      <Dialog open={detailsDialogOpen} onClose={handleCloseDetails} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedJob?.title} — {selectedJob?.company}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Chip label={selectedJob?.source} sx={getSourceBadgeSx(selectedJob?.source || 'LinkedIn')} />
            <Typography variant="body2" color="text.secondary">Posted {selectedJob ? formatRelativeDate(selectedJob.postedDate) : ''}</Typography>
          </Box>
          {/* Overview chips */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            <Chip icon={<WorkIcon />} label={selectedJob?.experienceLevel} />
            <Chip icon={<AttachMoneyIcon />} label={selectedJob?.salary ? formatSalary(selectedJob.salary) : 'Not specified'} />
            <Chip label={selectedJob?.workMode} />
            <Chip label={selectedJob?.location} />
          </Box>

          {/* Full Description */}
          <Typography variant="h6" sx={{ mt: 1 }}>About the role</Typography>
          <Typography variant="body1" paragraph>
            {selectedJob?.description}
          </Typography>

          {/* Work Model */}
          <Typography variant="h6" sx={{ mt: 2 }}>Work Model</Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            This role is {String(selectedJob?.workMode || '').toLowerCase()}. Specific scheduling and office expectations may vary by team and location.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            <Chip label={selectedJob?.workMode} color="primary" variant="outlined" />
            <Chip label={selectedJob?.location} variant="outlined" />
          </Box>

          {/* Required Skills */}
          {selectedJob?.skills?.length ? (
            <>
              <Typography variant="h6" sx={{ mt: 2 }}>Required skills</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {selectedJob.skills.map((skill) => (
                  <Chip key={skill} label={skill} variant="outlined" />
                ))}
              </Box>
            </>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
          <Button onClick={() => toggleSaveJob(selectedJob)} startIcon={selectedJob && isSaved(selectedJob) ? <BookmarkIcon /> : <BookmarkBorderIcon /> }>
            {selectedJob && isSaved(selectedJob) ? 'Saved' : 'Save'}
          </Button>
          <Button onClick={() => { handleCloseDetails(); handleOpenApplyDialog(selectedJob); }} variant="contained" color="primary">
            Apply Now
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