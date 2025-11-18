import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Stack, TextField, Button, Alert, Card, CardContent, Chip, Snackbar } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { marketplaceApi } from '../services/api';

const PostJob = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [skillsCsv, setSkillsCsv] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [createdJob, setCreatedJob] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [navigateTimer, setNavigateTimer] = useState(null);

  const validate = (vals) => {
    const errs = {};
    const t = (vals.title || '').trim();
    const d = (vals.description || '').trim();
    const b = (vals.budget || '').toString().trim();
    const tl = (vals.timeline || '').trim();
    const skills = (vals.skillsCsv || '').split(',').map(s => s.trim()).filter(Boolean);

    if (!t) errs.title = 'Title is required';
    else if (t.length < 5) errs.title = 'Title should be at least 5 characters';
    else if (t.length > 80) errs.title = 'Title should be at most 80 characters';

    if (!d) errs.description = 'Description is required';
    else if (d.length < 30) errs.description = 'Description should be at least 30 characters';
    else if (d.length > 2000) errs.description = 'Description should be at most 2000 characters';

    if (!b) errs.budget = 'Budget is required';
    else if (isNaN(Number(b)) || Number(b) <= 0) errs.budget = 'Budget must be a positive number';
    else if (Number(b) < 50) errs.budget = 'Budget must be at least $50';
    else if (Number(b) > 250000) errs.budget = 'Budget must be at most $250,000';

    if (tl) {
      const pattern = /^\d+\s*(day|days|week|weeks|month|months)$/i;
      if (!pattern.test(tl)) errs.timeline = 'Use format like "3 weeks" or "10 days"';
    }

    if (skills.some(s => s.length < 2)) errs.skillsCsv = 'Each skill should have at least 2 characters';
    return errs;
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);
      const currentErrors = validate({ title, description, budget, timeline, skillsCsv });
      setErrors(currentErrors);
      setTouched({ title: true, description: true, budget: true, timeline: true, skillsCsv: true });
      if (Object.keys(currentErrors).length > 0) {
        throw new Error('Please fix form errors before submitting');
      }
      const skills = skillsCsv.split(',').map(s => s.trim()).filter(Boolean);
      const job = await marketplaceApi.createJob({ title, description, budget: Number(budget), timeline, skills });
      setSuccess(`Job created: ${job.title}`);
      setCreatedJob(job);
      setToastOpen(true);
      setTitle('');
      setDescription('');
      setBudget('');
      setTimeline('');
      setSkillsCsv('');
      setErrors({});
      setTouched({});
    } catch (e) {
      setError(e?.message || 'Failed to create job');
    } finally {
      setSubmitting(false);
    }
  };

  // Auto-navigate to Job Feed a few seconds after success
  useEffect(() => {
    if (success) {
      const t = setTimeout(() => navigate('/freelancer'), 3000);
      setNavigateTimer(t);
    }
    return () => {
      if (navigateTimer) clearTimeout(navigateTimer);
    };
  }, [success]);

  // Persist last used form values in local storage and restore on mount
  useEffect(() => {
    const saved = localStorage.getItem('postJobForm.lastValues');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTitle(parsed.title || '');
        setDescription(parsed.description || '');
        setBudget(parsed.budget ?? '');
        setTimeline(parsed.timeline || '');
        setSkillsCsv(parsed.skillsCsv || '');
      } catch {}
    }
  }, []);

  useEffect(() => {
    const payload = { title, description, budget, timeline, skillsCsv };
    try {
      localStorage.setItem('postJobForm.lastValues', JSON.stringify(payload));
    } catch {}
  }, [title, description, budget, timeline, skillsCsv]);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Post a Job</Typography>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => {
              const v = e.target.value;
              setTitle(v);
              setErrors(prev => ({ ...prev, ...validate({ title: v, description, budget, timeline, skillsCsv }) }));
            }}
            onBlur={() => setTouched(prev => ({ ...prev, title: true }))}
            error={Boolean(touched.title && errors.title)}
            helperText={touched.title && errors.title ? errors.title : 'Clear, concise role name (max 80 chars)'}
            inputProps={{ maxLength: 80 }}
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => {
              const v = e.target.value;
              setDescription(v);
              setErrors(prev => ({ ...prev, ...validate({ title, description: v, budget, timeline, skillsCsv }) }));
            }}
            onBlur={() => setTouched(prev => ({ ...prev, description: true }))}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description ? errors.description : 'Describe scope, deliverables, and requirements (max 2000 chars)'}
            multiline
            minRows={4}
            inputProps={{ maxLength: 2000 }}
            fullWidth
          />
          <TextField
            label="Budget (USD)"
            value={budget}
            onChange={(e) => {
              const v = e.target.value;
              setBudget(v);
              setErrors(prev => ({ ...prev, ...validate({ title, description, budget: v, timeline, skillsCsv }) }));
            }}
            onBlur={() => setTouched(prev => ({ ...prev, budget: true }))}
            error={Boolean(touched.budget && errors.budget)}
            helperText={touched.budget && errors.budget ? errors.budget : 'Enter a positive amount between $50 and $250,000'}
            type="number"
            inputProps={{ min: 50, max: 250000 }}
            fullWidth
          />
          <TextField
            label="Timeline"
            value={timeline}
            onChange={(e) => {
              const v = e.target.value;
              setTimeline(v);
              setErrors(prev => ({ ...prev, ...validate({ title, description, budget, timeline: v, skillsCsv }) }));
            }}
            onBlur={() => setTouched(prev => ({ ...prev, timeline: true }))}
            error={Boolean(touched.timeline && errors.timeline)}
            helperText={touched.timeline && errors.timeline ? errors.timeline : 'E.g., 3 weeks or 10 days'}
            placeholder="e.g., 3 weeks"
            fullWidth
          />
          <TextField
            label="Skills (comma-separated)"
            value={skillsCsv}
            onChange={(e) => {
              const v = e.target.value;
              setSkillsCsv(v);
              setErrors(prev => ({ ...prev, ...validate({ title, description, budget, timeline, skillsCsv: v }) }));
            }}
            onBlur={() => setTouched(prev => ({ ...prev, skillsCsv: true }))}
            error={Boolean(touched.skillsCsv && errors.skillsCsv)}
            helperText={touched.skillsCsv && errors.skillsCsv ? errors.skillsCsv : 'Comma-separated skills, e.g., React, Node.js'}
            placeholder="React, Node.js"
            fullWidth
          />
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitting || Object.keys(validate({ title, description, budget, timeline, skillsCsv })).length > 0}
          >
            Create Job
          </Button>
        </Stack>
      </Paper>
      {createdJob && (
        <Card variant="outlined" sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Job Created</Typography>
            <Typography variant="subtitle1" color="text.primary">{createdJob.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {createdJob.description?.slice(0, 200)}{createdJob.description?.length > 200 ? '…' : ''}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Typography variant="body2"><strong>Budget:</strong> ${createdJob.budget}</Typography>
              {createdJob.timeline && (
                <Typography variant="body2"><strong>Timeline:</strong> {createdJob.timeline}</Typography>
              )}
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
              {(createdJob.skills || []).map((s, idx) => (
                <Chip key={`${s}-${idx}`} label={s} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
              ))}
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button component={RouterLink} to="/freelancer" variant="outlined">Go to Job Feed</Button>
            </Stack>
          </CardContent>
        </Card>
      )}

      <Snackbar
        open={toastOpen}
        autoHideDuration={2500}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {success && (
          <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: '100%' }}>
            {success} — Redirecting to Job Feed…
          </Alert>
        )}
      </Snackbar>
    </Container>
  );
};

export default PostJob;