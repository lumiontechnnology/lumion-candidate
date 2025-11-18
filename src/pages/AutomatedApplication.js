import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Button, Chip, LinearProgress, Divider, List, ListItem, ListItemText, Stack } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { jobSearchApi } from '../services/api';
import submissionService from '../services/submissionService';
import { getUserPreferences, saveAppliedJob, updateAppliedJobStatus, getAppliedJobs, saveAppliedJobToBackend, updateAppliedJobStatusBackend } from '../services/databaseService';

function AutomatedApplication() {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle | searching | applying | tracking | done
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [platformCounts, setPlatformCounts] = useState({ LinkedIn: 0, Indeed: 0, Glassdoor: 0 });
  const [appliedSummary, setAppliedSummary] = useState({ success: 0, failure: 0 });
  const [openPositions, setOpenPositions] = useState([]);

  const addLog = (text) => {
    setLogs((prev) => [{ ts: new Date().toISOString(), text }, ...prev].slice(0, 50));
  };

  const startRun = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setPhase('searching');
    setProgress(5);
    addLog('Run Engine started. Gathering jobs from LinkedIn, Indeed, and Glassdoor…');

    // Preferences (fallback to sensible defaults)
    const prefs = getUserPreferences() || {
      keywords: 'frontend developer',
      locations: ['Remote', 'New York, NY', 'San Francisco, CA'],
      jobTitles: ['Frontend Developer','Software Engineer','Full Stack Engineer']
    };

    // 1) Search both platforms
    const search = await jobSearchApi.searchAllPlatforms(prefs);
    if (!search.success) {
      addLog('Search failed. Please try again.');
      setIsRunning(false);
      setPhase('idle');
      setProgress(0);
      return;
    }

    const linkedinJobs = search.data.linkedin || [];
    const indeedJobs = search.data.indeed || [];
    const glassdoorJobs = search.data.glassdoor || [];
    setPlatformCounts({ LinkedIn: linkedinJobs.length, Indeed: indeedJobs.length, Glassdoor: glassdoorJobs.length });
    addLog(`Found ${linkedinJobs.length} LinkedIn, ${indeedJobs.length} Indeed, and ${glassdoorJobs.length} Glassdoor jobs.`);
    setProgress(25);

    // Combine and take a subset for demo run
    const combinedJobs = [...linkedinJobs, ...indeedJobs, ...glassdoorJobs].slice(0, 10);
    setOpenPositions(combinedJobs);

    // 2) Apply in batch
    setPhase('applying');
    addLog(`Submitting ${combinedJobs.length} applications with optimized materials…`);
    setProgress(45);

    const userData = { name: 'John Doe', email: 'john.doe@example.com', resume: 'user_resume.pdf', coverLetter: 'user_cover_letter.pdf' };
    const batch = await submissionService.batchSubmitApplications(combinedJobs, userData, true);

    // Build a lookup to recover full job details
    const jobById = Object.fromEntries(combinedJobs.map(j => [j.id, j]));

    // Persist successes to Application History
    let successCount = 0;
    let failureCount = 0;
    for (const res of (batch.results || [])) {
      const job = jobById[res.jobId];
      if (!job) continue;
      const appliedJob = {
        id: job.id,
        company: job.company,
        title: job.title,
        location: job.location,
        source: job.source,
        appliedDate: res.timestamp || new Date().toISOString(),
        status: 'Applied'
      };
      try {
        await saveAppliedJobToBackend(appliedJob);
      } catch (e) {
        saveAppliedJob(appliedJob);
      }
      successCount++;
    }

    // Persist failures with reason and suggested fix
    const suggestFix = (error) => {
      const msg = (error || '').toLowerCase();
      if (msg.includes('email')) return 'Check contact email or use form method.';
      if (msg.includes('form')) return 'Verify application URL and required fields.';
      if (msg.includes('indeed')) return 'Retry later; may be throttled. Ensure job still open.';
      if (msg.includes('linkedin')) return 'Re-authenticate and confirm job allows direct apply.';
      return 'Retry with updated resume/cover letter; verify job link.';
    };
    for (const err of (batch.errors || [])) {
      const job = jobById[err.jobId];
      if (!job) continue;
      const failedJob = {
        id: job.id,
        company: job.company,
        title: job.title,
        location: job.location,
        source: job.source,
        appliedDate: err.timestamp || new Date().toISOString(),
        status: 'Failed',
        failureReason: err.error,
        fixSuggestion: suggestFix(err.error)
      };
      try {
        await saveAppliedJobToBackend(failedJob);
      } catch (e) {
        saveAppliedJob(failedJob);
      }
    }
    failureCount = (batch.failureCount || (batch.errors || []).length);
    setAppliedSummary({ success: successCount, failure: failureCount });
    addLog(`Applied to ${successCount} jobs. ${failureCount} failed.`);
    setProgress(70);

    // 3) Simulate status tracking updates
    setPhase('tracking');
    addLog('Tracking application statuses across platforms…');

    const statuses = ['Under Review', 'Interview Scheduled', 'Rejected', 'Offer Received'];
    const applied = getAppliedJobs();
    let tick = 0;
    const tracker = setInterval(() => {
      tick++;
      // Randomly update 2 applications per tick
      const updates = (applied.slice(0, 6)).sort(() => 0.5 - Math.random()).slice(0, 2);
      updates.forEach((job) => {
        const next = statuses[Math.floor(Math.random() * statuses.length)];
        // Update backend status with local fallback
        updateAppliedJobStatusBackend(job.id, { status: next }).catch(() => {
          updateAppliedJobStatus(job.id, next);
        });
        addLog(`${job.source}: ${job.title} at ${job.company} → ${next}`);
      });
      setProgress(Math.min(95, 70 + tick * 5));
      if (tick >= 4) {
        clearInterval(tracker);
        setPhase('done');
        setIsRunning(false);
        setProgress(100);
        addLog('Run Engine completed. View Application History for full details.');
        // Auto-navigate to history after short delay
        setTimeout(() => {
          window.location.href = '/history';
        }, 1200);
      }
    }, 1200);
  };

  const providerColor = (source) => {
    switch (source) {
      case 'LinkedIn': return { bgcolor: '#0A66C2', color: 'white' };
      case 'Indeed': return { bgcolor: '#1346A1', color: 'white' };
      case 'Glassdoor': return { bgcolor: '#0CAA41', color: 'white' };
      default: return { bgcolor: 'grey.700', color: 'white' };
    }
  };

  const goPrepare = (job) => {
    const q = new URLSearchParams({
      title: job.title || '',
      company: job.company || '',
      source: job.source || '',
      id: job.id || ''
    }).toString();
    window.location.href = `/resume-tailor?${q}`;
  };

  const applySingle = async (job) => {
    addLog(`Applying to ${job.title} at ${job.company} via ${job.source}…`);
    const userData = { name: 'John Doe', email: 'john.doe@example.com', resume: 'user_resume.pdf', coverLetter: 'user_cover_letter.pdf' };
    const res = await submissionService.submitApplication(job, userData, true);
    if (res.success) {
      setAppliedSummary((s) => ({ ...s, success: s.success + 1 }));
      addLog(`Success: ${job.source} → ${job.title} at ${job.company}`);
    } else {
      setAppliedSummary((s) => ({ ...s, failure: s.failure + 1 }));
      addLog(`Failed: ${job.source} → ${job.title} at ${job.company}. Reason: ${res.error || 'Unknown error'}`);
    }
  };

  const stopRun = () => {
    setIsRunning(false);
    setPhase('idle');
    setProgress(0);
    addLog('Run Engine stopped by user.');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Corbel, -apple-system, Segoe UI, Calibri, Trebuchet MS, Arial, sans-serif' }}>
          Automated Applications
        </Typography>
        <Typography color="text.secondary">
          Simulate AI‑powered job discovery and auto‑apply across LinkedIn and Indeed.
        </Typography>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 2 }} className="frosted-card">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AutorenewIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Run Engine</Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Chip label={`LinkedIn: ${platformCounts.LinkedIn}`} sx={{ bgcolor: '#0A66C2', color: 'white' }} />
            <Chip label={`Indeed: ${platformCounts.Indeed}`} sx={{ bgcolor: '#1346A1', color: 'white' }} />
            <Chip label={`Glassdoor: ${platformCounts.Glassdoor}`} sx={{ bgcolor: '#0CAA41', color: 'white' }} />
          </Stack>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button onClick={startRun} disabled={isRunning} variant="contained" color="primary" startIcon={<PlayArrowIcon />} className="glow-hover">
            Start Run
          </Button>
          <Button onClick={stopRun} disabled={!isRunning} variant="outlined" color="secondary" startIcon={<StopIcon />}>Stop</Button>
          <Button href="/history" variant="text" startIcon={<VisibilityIcon />}>View History</Button>
        </Box>

        <Box sx={{ mt: 3 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {phase === 'idle' && 'Idle'}
            {phase === 'searching' && 'Searching platforms…'}
            {phase === 'applying' && 'Submitting applications…'}
            {phase === 'tracking' && 'Tracking statuses…'}
            {phase === 'done' && 'Completed'}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="subtitle1" gutterBottom>Open Positions (sample)</Typography>
          <List dense>
            {openPositions.map((job) => (
              <ListItem key={job.id} alignItems="flex-start" sx={{ flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle2">{job.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{job.company} • {job.location}</Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Chip size="small" label={job.source} sx={providerColor(job.source)} />
                    {job.applicationMethod && (
                      <Chip size="small" label={job.applicationMethod} variant="outlined" />
                    )}
                  </Stack>
                </Box>
                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                  <Button size="small" variant="outlined" onClick={() => goPrepare(job)}>Prepare</Button>
                  <Button size="small" variant="contained" onClick={() => applySingle(job)}>Apply Now</Button>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box>
          <Typography variant="subtitle1" gutterBottom>Run Logs</Typography>
          <List dense>
            {logs.map((l, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={l.text} secondary={new Date(l.ts).toLocaleTimeString()} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="subtitle1" gutterBottom>Summary</Typography>
          <Stack direction="row" spacing={2}>
            <Chip label={`Applied: ${appliedSummary.success}`} color="success" variant="outlined" />
            <Chip label={`Failed: ${appliedSummary.failure}`} color="error" variant="outlined" />
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}

export default AutomatedApplication;