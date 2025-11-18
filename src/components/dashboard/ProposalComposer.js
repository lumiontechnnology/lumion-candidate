import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { marketplaceApi } from '../../services/api';

const ProposalComposer = ({ open, onClose, job }) => {
  const [proposalText, setProposalText] = useState('');
  const [sampleLinks, setSampleLinks] = useState('');
  const [introType, setIntroType] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!job) return;
    try {
      setSubmitting(true);
      setError(null);
      const samples = sampleLinks.split(',').map(s => s.trim()).filter(Boolean);
      // For demo: hardcode freelancerId
      await marketplaceApi.submitProposal({
        jobId: job.id,
        freelancerId: 'freelancer-demo',
        proposalText,
        samples,
        introType,
      });
      onClose();
      setProposalText('');
      setSampleLinks('');
      setIntroType(null);
    } catch (e) {
      setError(e?.message || 'Failed to submit proposal');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Submit Proposal {job ? `— ${job.title}` : ''}</DialogTitle>
      <DialogContent>
        {!job && (
          <Typography variant="body2" color="text.secondary">Select a job from the feed to apply.</Typography>
        )}
        {job && (
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Proposal"
              placeholder="Describe your approach, timeline, and relevant experience"
              multiline
              minRows={4}
              value={proposalText}
              onChange={(e) => setProposalText(e.target.value)}
              fullWidth
            />
            <TextField
              label="Sample Links (comma-separated)"
              placeholder="https://sample1.com, https://sample2.com"
              value={sampleLinks}
              onChange={(e) => setSampleLinks(e.target.value)}
              fullWidth
            />
            <ToggleButtonGroup
              value={introType}
              exclusive
              onChange={(e, val) => setIntroType(val)}
              aria-label="intro-type"
            >
              <ToggleButton value={null} aria-label="none">No Intro</ToggleButton>
              <ToggleButton value="voice" aria-label="voice">Voice Intro</ToggleButton>
              <ToggleButton value="screen" aria-label="screen">Screen Intro</ToggleButton>
            </ToggleButtonGroup>
            {error && <Typography color="error">{error}</Typography>}
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!job || !proposalText || submitting}>Submit Proposal</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProposalComposer;