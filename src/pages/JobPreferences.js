import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Slider,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CommuteIcon from '@mui/icons-material/Commute';

// Mock data
const jobCategories = [
  'Software Development',
  'Data Science',
  'Product Management',
  'UX/UI Design',
  'Marketing',
  'Sales',
  'Customer Support',
  'Human Resources',
  'Finance',
  'Operations',
];

const workModes = [
  'Remote',
  'Hybrid',
  'On-site',
  'Any',
];

const experienceLevels = [
  'Entry Level',
  'Mid Level',
  'Senior Level',
  'Manager',
  'Director',
  'Executive',
];

function JobPreferences() {
  const [jobTitles, setJobTitles] = useState(['Software Engineer', 'Frontend Developer']);
  const [jobTitle, setJobTitle] = useState('');
  const [category, setCategory] = useState('Software Development');
  const [workMode, setWorkMode] = useState('Any');
  const [locations, setLocations] = useState(['New York', 'San Francisco', 'Remote']);
  const [location, setLocation] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Mid Level');
  const [salaryRange, setSalaryRange] = useState([60000, 150000]);
  const [autoApply, setAutoApply] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [applicationLimit, setApplicationLimit] = useState(10);

  const handleAddJobTitle = () => {
    if (jobTitle && !jobTitles.includes(jobTitle)) {
      setJobTitles([...jobTitles, jobTitle]);
      setJobTitle('');
    }
  };

  const handleDeleteJobTitle = (titleToDelete) => {
    setJobTitles(jobTitles.filter((title) => title !== titleToDelete));
  };

  const handleAddLocation = () => {
    if (location && !locations.includes(location)) {
      setLocations([...locations, location]);
      setLocation('');
    }
  };

  const handleDeleteLocation = (locationToDelete) => {
    setLocations(locations.filter((loc) => loc !== locationToDelete));
  };

  const handleSalaryRangeChange = (event, newValue) => {
    setSalaryRange(newValue);
  };

  const handleSavePreferences = () => {
    // This would connect to the backend to save preferences
    console.log({
      jobTitles,
      category,
      workMode,
      locations,
      experienceLevel,
      salaryRange,
      autoApply,
      emailNotifications,
      applicationLimit,
    });
    
    // Show success message or redirect
    alert('Preferences saved successfully!');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Job Preferences
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Set your job search criteria to help us find and apply to the best matching positions for you.
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <WorkIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">Job Details</Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Job Titles */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Job Titles
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
              {jobTitles.map((title) => (
                <Chip
                  key={title}
                  label={title}
                  onDelete={() => handleDeleteJobTitle(title)}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex' }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Add job title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={handleAddJobTitle}
                sx={{ ml: 1 }}
              >
                Add
              </Button>
            </Box>
            <FormHelperText>
              Add multiple job titles you're interested in
            </FormHelperText>
          </Grid>

          {/* Job Category */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Job Category</InputLabel>
              <Select
                labelId="category-label"
                value={category}
                label="Job Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {jobCategories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Experience Level */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="experience-label">Experience Level</InputLabel>
              <Select
                labelId="experience-label"
                value={experienceLevel}
                label="Experience Level"
                onChange={(e) => setExperienceLevel(e.target.value)}
              >
                {experienceLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <LocationOnIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">Location Preferences</Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Locations */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Preferred Locations
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
              {locations.map((loc) => (
                <Chip
                  key={loc}
                  label={loc}
                  onDelete={() => handleDeleteLocation(loc)}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex' }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Add location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={handleAddLocation}
                sx={{ ml: 1 }}
              >
                Add
              </Button>
            </Box>
            <FormHelperText>
              Add cities, states, or "Remote" if you're interested in remote work
            </FormHelperText>
          </Grid>

          {/* Work Mode */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="workmode-label">Work Mode</InputLabel>
              <Select
                labelId="workmode-label"
                value={workMode}
                label="Work Mode"
                onChange={(e) => setWorkMode(e.target.value)}
              >
                {workModes.map((mode) => (
                  <MenuItem key={mode} value={mode}>
                    {mode}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Max Commute Distance */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CommuteIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Max commute distance: 25 miles
              </Typography>
            </Box>
            <Slider
              defaultValue={25}
              aria-label="Max commute distance"
              valueLabelDisplay="auto"
              step={5}
              marks
              min={5}
              max={50}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">Compensation</Typography>
        </Box>

        {/* Salary Range */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Salary Range: ${salaryRange[0].toLocaleString()} - ${salaryRange[1].toLocaleString()}
            </Typography>
            <Slider
              value={salaryRange}
              onChange={handleSalaryRangeChange}
              valueLabelDisplay="auto"
              min={30000}
              max={300000}
              step={5000}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Application Settings
        </Typography>

        <Grid container spacing={3}>
          {/* Auto Apply */}
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={autoApply}
                  onChange={(e) => setAutoApply(e.target.checked)}
                  color="primary"
                />
              }
              label="Auto-apply to matching jobs"
            />
            <FormHelperText>
              Automatically apply to jobs that match your criteria
            </FormHelperText>
          </Grid>

          {/* Email Notifications */}
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  color="primary"
                />
              }
              label="Email notifications"
            />
            <FormHelperText>
              Receive email updates about your applications
            </FormHelperText>
          </Grid>

          {/* Daily Application Limit */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Daily Application Limit"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 50 } }}
              value={applicationLimit}
              onChange={(e) => setApplicationLimit(parseInt(e.target.value))}
              helperText="Maximum number of applications per day"
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            onClick={handleSavePreferences}
          >
            Save Preferences
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default JobPreferences;