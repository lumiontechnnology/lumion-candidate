import React, { useEffect, useMemo, useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { marketplaceApi } from '../../services/api';
import aiMatchService from '../../services/aiMatchService';

export default function AIMatchAssistant({ freelancerId = 'demo-freelancer' }) {
  const [skillsCsv, setSkillsCsv] = useState('React, JavaScript, UI/UX');
  const [loading, setLoading] = useState(false);
  const [ranked, setRanked] = useState([]);
  const [results, setResults] = useState([]);
  const [progress, setProgress] = useState(0);

  const startMatching = async () => {
    if (loading) return;
    setLoading(true);
    setProgress(15);
    try {
      const jobs = await marketplaceApi.fetchJobs(skillsCsv);
      setProgress(40);
      const profileRun = await aiMatchService.autoSubmitTopMatches({
        jobs,
        freelancerId,
        topN: 5,
        weights: { skills: 0.55, keywords: 0.25, title: 0.1, budget: 0.07, timeline: 0.03 },
        style: { tone: 'concise', length: 'short', includePilot: true, includeMetrics: true },
        threshold: 70,
      });
      setRanked(profileRun.ranked);
      setResults(profileRun.results);
      setProgress(100);
    } catch (e) {
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const successCount = useMemo(() => results.filter(r => r.ok).length, [results]);
  const failureCount = useMemo(() => results.filter(r => !r.ok).length, [results]);

  return (
    <Paper sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          <Typography variant="h6">Lummy</Typography>
          <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 500 }}>Your job-winning copilot</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Chip label="Lummy" color="primary" size="small" />
          <Chip label={`Skills: ${skillsCsv}`} variant="outlined" size="small" />
          <Chip label={`Success: ${successCount}`} color="success" size="small" />
          <Chip label={`Failed: ${failureCount}`} color="warning" size="small" />
        </Stack>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Lummy scans jobs, ranks by skill-fit, and auto-sends tailored proposals with portfolio.
      </Typography>

      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <Button onClick={startMatching} disabled={loading} variant="contained" startIcon={<PlayArrowIcon />} className="glow-hover">
          Ask Lummy to Match
        </Button>
        <Button disabled={!ranked.length} variant="outlined" startIcon={<VisibilityIcon />}>
          Preview Results
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>{loading && <LinearProgress variant="determinate" value={progress} />}</Box>

      {!!ranked.length && (
        <Box sx={{ mt: 2 }}>
          <Divider sx={{ mb: 1 }} />
          <Typography variant="subtitle2" gutterBottom>Top Matches</Typography>
          <List>
            {ranked.map((item, idx) => (
              <React.Fragment key={idx}>
                <ListItem alignItems="flex-start" disableGutters>
                  <ListItemText
                    primary={`${item.job.title} • Score ${item.score}`}
                    secondary={
                      <Box>
                        <Typography variant="caption" color="text.secondary">{item.job.company || item.job.client?.name || 'Unknown'}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>{item.proposalText.slice(0, 160)}…</Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {idx < ranked.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}

      {!!results.length && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Submission Results</Typography>
          <Stack spacing={1}>
            {results.map((r, idx) => (
              <Chip key={idx} label={`${r.ok ? 'Submitted' : 'Failed'}: ${r.job.title}`} color={r.ok ? 'success' : 'warning'} variant={r.ok ? 'filled' : 'outlined'} />
            ))}
          </Stack>
        </Box>
      )}
    </Paper>
  );
}