import React, { useState } from 'react';
import { Container, Typography, Box, Paper, TextField, Button, Grid, Chip, Divider, Stack } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DescriptionIcon from '@mui/icons-material/Description';
import optimizationService from '../services/optimizationService';

function ResumeTailor() {
  const mockResume = optimizationService.getMockResume();
  const [jobTitle, setJobTitle] = useState('Frontend Developer');
  const [jobDescription, setJobDescription] = useState('We are seeking a Frontend Developer with strong React, JavaScript, and UI/UX skills. Experience with APIs, performance optimization, and accessibility is required. Familiarity with cloud platforms like AWS is a plus.');
  const [analysis, setAnalysis] = useState(null);
  const [optimizedResume, setOptimizedResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');

  const handleAnalyze = () => {
    const match = optimizationService.calculateMatchScore(mockResume, jobDescription, jobTitle);
    const suggestions = optimizationService.getSuggestions(mockResume, match);
    const opt = optimizationService.optimizeResume(mockResume, { keywords: match.matchedKeywords.concat(match.missingKeywords), jobCategory: 'software engineer' });
    const letter = optimizationService.generateCoverLetter(mockResume, jobDescription, jobTitle, 'Target Company');
    setAnalysis({ match, suggestions });
    setOptimizedResume(opt);
    setCoverLetter(letter);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Corbel, -apple-system, Segoe UI, Calibri, Trebuchet MS, Arial, sans-serif' }}>
          Resume Tailor
        </Typography>
        <Typography color="text.secondary">
          Analyze a job description, score fit, and auto-tailor your resume and cover letter.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }} className="frosted-card">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AssessmentIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Job Inputs</Typography>
            </Box>
            <TextField label="Job Title" fullWidth sx={{ mb: 2 }} value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
            <TextField label="Job Description" fullWidth multiline minRows={8} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <Button variant="contained" color="primary" onClick={handleAnalyze} className="glow-hover">Analyze & Tailor</Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }} className="frosted-card">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AutoFixHighIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Match & Suggestions</Typography>
            </Box>
            {!analysis ? (
              <Typography color="text.secondary">Run analysis to see your match score and improvements.</Typography>
            ) : (
              <Box>
                <Typography variant="subtitle2">Overall Match</Typography>
                <Stack direction="row" spacing={1} sx={{ my: 1 }}>
                  <Chip label={`Score: ${analysis.match.overall}%`} color={analysis.match.overall >= 70 ? 'success' : 'warning'} />
                  <Chip label={`Keywords: ${analysis.match.breakdown.keywordMatch}%`} />
                  <Chip label={`Skills: ${analysis.match.breakdown.skillMatch}%`} />
                  <Chip label={`Experience: ${analysis.match.breakdown.experienceMatch}%`} />
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2">Suggestions</Typography>
                {analysis.suggestions.map((s, idx) => (
                  <Box key={idx} sx={{ mb: 1 }}>
                    <Typography variant="body2"><strong>{s.title}:</strong> {s.description}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }} className="frosted-card">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <DescriptionIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Optimized Resume (Summary & Top Bullets)</Typography>
            </Box>
            {!optimizedResume ? (
              <Typography color="text.secondary">Analysis will generate tailored content here.</Typography>
            ) : (
              <Box>
                <Typography variant="subtitle2" gutterBottom>{optimizedResume.summary.title}</Typography>
                <Typography variant="body2" paragraph>{optimizedResume.summary.content}</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" gutterBottom>Recent Experience Highlights</Typography>
                {optimizedResume.experience.slice(0,1).flatMap(job => job.bullets.slice(0,3)).map((b, idx) => (
                  <Typography key={idx} variant="body2">• {b}</Typography>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }} className="frosted-card">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <DescriptionIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Generated Cover Letter</Typography>
            </Box>
            {!coverLetter ? (
              <Typography color="text.secondary">Analysis will produce a tailored cover letter here.</Typography>
            ) : (
              <TextField value={coverLetter} multiline fullWidth minRows={10} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ResumeTailor;