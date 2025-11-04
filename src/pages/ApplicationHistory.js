import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { getAppliedJobs } from '../services/databaseService';

// Load applications from local storage persistence
const loadApplied = () => getAppliedJobs();

// Status chip colors
const statusColors = {
  'Applied': 'default',
  'Interview Scheduled': 'primary',
  'Offer Received': 'success',
  'Rejected': 'error',
  'Failed': 'error',
};

function ApplicationHistory() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [applications, setApplications] = useState(loadApplied());

  useEffect(() => {
    const interval = setInterval(() => {
      // Refresh applied jobs periodically to reflect Run Engine updates
      setApplications(loadApplied());
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };

  const handleSourceFilterChange = (event) => {
    setSourceFilter(event.target.value);
    setPage(0);
  };

  const handleDeleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  // Filter applications based on search term and filters
  const filteredApplications = applications.filter((app) => {
    const matchesSearch = 
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.title || app.position || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesSource = sourceFilter === 'All' || app.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  // Get unique statuses and sources for filters
  const statuses = ['All', ...new Set(applications.map(app => app.status))];
  const sources = ['All', ...new Set(applications.map(app => app.source))];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Application History
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Track and manage all your job applications in one place.
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ flexGrow: 1, minWidth: '200px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search by company, position, or location"
          />
          
          <FormControl size="small" sx={{ minWidth: '150px' }}>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={statusFilter}
              label="Status"
              onChange={handleStatusFilterChange}
              startAdornment={
                <InputAdornment position="start">
                  <FilterListIcon fontSize="small" />
                </InputAdornment>
              }
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: '150px' }}>
            <InputLabel id="source-filter-label">Source</InputLabel>
            <Select
              labelId="source-filter-label"
              value={sourceFilter}
              label="Source"
              onChange={handleSourceFilterChange}
              startAdornment={
                <InputAdornment position="start">
                  <FilterListIcon fontSize="small" />
                </InputAdornment>
              }
            >
              {sources.map((source) => (
                <MenuItem key={source} value={source}>
                  {source}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="applications table">
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Applied Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Fail Reason</TableCell>
                <TableCell>Fix Suggestion</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredApplications
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>{app.company}</TableCell>
                    <TableCell>{app.title || app.position}</TableCell>
                    <TableCell>{app.location}</TableCell>
                    <TableCell>{app.appliedDate}</TableCell>
                    <TableCell>
                      <Chip 
                        label={app.status} 
                        color={statusColors[app.status] || 'default'} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>{app.source}</TableCell>
                    <TableCell>{app.status === 'Failed' ? (app.failureReason || 'Unknown') : '-'}</TableCell>
                    <TableCell>{app.status === 'Failed' ? (app.fixSuggestion || 'Retry later') : '-'}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small" aria-label="view">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        aria-label="delete"
                        onClick={() => handleDeleteApplication(app.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredApplications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No applications found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredApplications.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Application Statistics
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4">{applications.length}</Typography>
              <Typography variant="body2" color="text.secondary">Total Applications</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4">
                {applications.filter(app => app.status === 'Applied').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">Pending</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4">
                {applications.filter(app => app.status === 'Interview Scheduled').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">Interviews</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4">
                {applications.filter(app => app.status === 'Offer Received').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">Offers</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ApplicationHistory;