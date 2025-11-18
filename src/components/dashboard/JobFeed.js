import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, Chip, Button, Divider, CircularProgress } from '@mui/material';
import { marketplaceApi } from '../../services/api';

const JobCard = ({ job, onApply }) => (
  <Box sx={{ p: 2, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
      <Box>
        <Typography variant="subtitle1">{job.title}</Typography>
        <Typography variant="body2" color="text.secondary">{job.client?.name} • {job.timeline} • ${job.budget}</Typography>
      </Box>
      <Button variant="contained" size="small" onClick={() => onApply(job)}>Apply</Button>
    </Stack>
    <Typography variant="body2" sx={{ mt: 1 }}>{job.description}</Typography>
    <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
      {(job.skills || []).map((sk) => (
        <Chip key={`${job.id}-${sk}`} label={sk} size="small" />
      ))}
    </Stack>
  </Box>
);

const JobFeed = ({ onApply }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await marketplaceApi.fetchJobs();
        if (mounted) setJobs(data);
      } catch (e) {
        setError(e?.message || 'Failed to load jobs');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <Stack alignItems="center" sx={{ py: 4 }}><CircularProgress size={24} /></Stack>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Stack spacing={2}>
      {jobs.length === 0 && (
        <Typography variant="body2" color="text.secondary">No jobs available right now.</Typography>
      )}
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onApply={onApply} />
      ))}
    </Stack>
  );
};

export default JobFeed;