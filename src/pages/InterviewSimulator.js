import React, { useState, useMemo } from 'react';
import { Container, Typography, Box, Paper, Grid, TextField, Button, Chip, Divider, Stack, LinearProgress } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TimerIcon from '@mui/icons-material/Timer';
import GradeIcon from '@mui/icons-material/Grade';
import interviewService from '../services/interviewService';

function ScoreChips({ evalResult }) {
  if (!evalResult) return null;
  return (
    <Stack direction="row" spacing={1} sx={{ my: 1, flexWrap: 'wrap' }}>
      <Chip label={`Overall ${evalResult.overall}%`} color={evalResult.overall >= 75 ? 'success' : 'warning'} />
      <Chip label={`Keywords ${evalResult.keywordCoverage}%`} />
      <Chip label={`Clarity ${evalResult.clarity}%`} />
      <Chip label={`Structure ${evalResult.structure}%`} />
      <Chip label={`Depth ${evalResult.depth}%`} />
    </Stack>
  );
}

export default function InterviewSimulator() {
  const roles = interviewService.getRoles();
  const levels = interviewService.getLevels();
  const [role, setRole] = useState(roles[0]);
  const [level, setLevel] = useState(levels[1]);
  const [sessionType, setSessionType] = useState('mixed');
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [summary, setSummary] = useState(null);

  const currentQuestion = useMemo(() => questions[current], [questions, current]);

  const startSession = () => {
    const qs = interviewService.getQuestionBank(role, sessionType);
    setQuestions(qs);
    setStarted(true);
    setCurrent(0);
    setAnswers({});
    setEvaluations({});
    setSummary(null);
  };

  const evaluateCurrent = () => {
    const answer = answers[currentQuestion.id] || '';
    const evalResult = interviewService.evaluateAnswer(answer, currentQuestion);
    setEvaluations(prev => ({ ...prev, [currentQuestion.id]: evalResult }));
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      const evalList = questions.map(q => evaluations[q.id]).filter(Boolean);
      setSummary(interviewService.summarizeSession(evalList));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Corbel, -apple-system, Segoe UI, Calibri, Trebuchet MS, Arial, sans-serif' }}>
          Interview Simulator
        </Typography>
        <Typography color="text.secondary">
          Role-specific practice with instant, targeted feedback. Prepare like a pro.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2 }} className="frosted-card">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PsychologyIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Session Setup</Typography>
            </Box>
            <Typography variant="subtitle2" gutterBottom>Role</Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 2 }}>
              {roles.map(r => (
                <Chip key={r} label={r} color={r === role ? 'primary' : 'default'} onClick={() => setRole(r)} />
              ))}
            </Stack>
            <Typography variant="subtitle2" gutterBottom>Level</Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 2 }}>
              {levels.map(l => (
                <Chip key={l} label={l} color={l === level ? 'primary' : 'default'} onClick={() => setLevel(l)} />
              ))}
            </Stack>
            <Typography variant="subtitle2" gutterBottom>Session Type</Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 2 }}>
              {['technical', 'behavioral', 'system', 'mixed'].map(t => (
                <Chip key={t} label={t} color={t === sessionType ? 'primary' : 'default'} onClick={() => setSessionType(t)} />
              ))}
            </Stack>
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <Button variant="contained" color="primary" onClick={startSession} className="glow-hover">Start Session</Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }} className="frosted-card">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TimerIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Practice Arena</Typography>
            </Box>
            {!started ? (
              <Typography color="text.secondary">Select role, level, and type, then start your session.</Typography>
            ) : (
              <Box>
                <Typography variant="subtitle2" gutterBottom>Question {current + 1} of {questions.length}</Typography>
                <Typography variant="body1" paragraph>{currentQuestion?.prompt}</Typography>
                <TextField
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => setAnswers(prev => ({ ...prev, [currentQuestion.id]: e.target.value }))}
                  multiline fullWidth minRows={6}
                  placeholder="Type your answer here using key concepts and STAR where appropriate"
                />
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button variant="outlined" onClick={evaluateCurrent}>Evaluate</Button>
                  <Button variant="contained" onClick={next}>Next</Button>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2">Instant Feedback</Typography>
                <ScoreChips evalResult={evaluations[currentQuestion.id]} />
                {(evaluations[currentQuestion.id]?.suggestions || []).map((s, idx) => (
                  <Typography key={idx} variant="body2">• {s}</Typography>
                ))}
              </Box>
            )}
          </Paper>

          {summary && (
            <Paper sx={{ p: 3, borderRadius: 2, mt: 3 }} className="frosted-card">
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GradeIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Session Summary</Typography>
              </Box>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 2 }}>
                <Chip label={`Overall ${summary.overall}%`} color={summary.overall >= 75 ? 'success' : 'warning'} />
                <Chip label={`Keywords ${summary.keywordCoverage}%`} />
                <Chip label={`Clarity ${summary.clarity}%`} />
                <Chip label={`Structure ${summary.structure}%`} />
                <Chip label={`Depth ${summary.depth}%`} />
              </Stack>
              <Box sx={{ my: 2 }}>
                <Typography variant="caption" color="text.secondary">Progress</Typography>
                <LinearProgress variant="determinate" value={summary.overall} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              <Typography variant="body2" color="text.secondary">Save and review before interviews. We can add voice simulation and mock interviewer next.</Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}