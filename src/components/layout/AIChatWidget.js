import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Fab, Tooltip, Paper, Typography, TextField, IconButton, Chip, Stack, Divider, CircularProgress, Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import { useJobSearch } from '../../context/JobSearchContext';
// import { getAllJobRoles } from '../../services/databaseService';
import { searchJobRoles } from '../../data/jobRolesData';

function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I’m Lumion Assistant. I can find roles, suggest improvements, and guide applications. What are you looking for today?' },
  ]);
  const navigate = useNavigate();
  const { searchJobs, filters } = useJobSearch();
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const quickPrompts = useMemo(() => [
    { label: 'Find remote frontend jobs', query: 'Find remote frontend jobs' },
    { label: 'Tailor my resume', query: 'Help tailor my resume' },
    { label: 'Show my application history', query: 'Open application history' },
  ], []);

  const handleSend = async (text) => {
    const content = (text ?? input).trim();
    if (!content) return;
    setMessages((m) => [...m, { role: 'user', text: content }]);
    setInput('');
    setTyping(true);

    // Simulated local intelligence
    const reply = await generateReply(content);
    setTyping(false);
    setMessages((m) => [...m, reply]);
  };

  const generateReply = async (content) => {
    const lower = content.toLowerCase();

    // Navigation intents
    if (lower.includes('history')) {
      return { role: 'assistant', text: 'Opening your application history...' , action: () => navigate('/history') };
    }
    if (lower.includes('resume')) {
      return {
        role: 'assistant',
        text: 'I can help you refine your resume summary and bullet points. Opening Resume Builder...'
        , action: () => navigate('/resume-builder')
      };
    }

    // Search intents
    if (lower.includes('frontend') || lower.includes('engineer') || lower.includes('developer') || lower.includes('remote')) {
      const keywords = lower.includes('frontend') ? 'Frontend' : lower.includes('developer') ? 'Developer' : lower.includes('engineer') ? 'Engineer' : filters.keywords || 'Developer';
      const location = lower.includes('remote') ? 'Remote' : filters.location || '';
      const local = searchJobRoles(keywords, location).slice(0, 3);
      // Also seed context search (non-blocking)
      searchJobs({ keywords, locations: [location], workMode: location === 'Remote' ? 'Remote' : undefined });

      if (local.length === 0) {
        return { role: 'assistant', text: `I couldn’t find local matches right now. Try adjusting keywords or location.` };
      }

      const lines = local.map((j) => `• ${j.title} at ${j.company} — ${j.location}`);
      return {
        role: 'assistant',
        text: `Here are some roles I found:
${lines.join('\n')}

Want to view more details on Job Search?`,
        actionLabel: 'Open Job Search',
        action: () => navigate('/job-search')
      };
    }

    // Default general help
    return { role: 'assistant', text: 'Tell me a role, location, or ask about Resume Builder, Preferences, or Application History.' };
  };

  return (
    <Box sx={{ position: 'fixed', right: 24, bottom: 24, zIndex: 1300 }}>
      <Tooltip title={open ? 'Assistant active' : 'Chat with Lumion AI'} placement="left">
        <Fab
          color="primary"
          aria-label="lumion-ai-chat"
          onClick={() => setOpen(!open)}
          sx={{
            background: 'linear-gradient(135deg, #0047FF 0%, #60A5FA 100%)',
            boxShadow: '0 8px 24px rgba(0,71,255,0.35)',
            animation: 'pulseGlow 2s ease-in-out infinite',
          }}
        >
          {open ? <KeyboardArrowDownIcon /> : <ChatIcon />}
        </Fab>
      </Tooltip>

      {open && (
        <Paper
          elevation={6}
          role="dialog"
          aria-label="Lumion AI chat panel"
          sx={{
            position: 'fixed',
            right: 24,
            bottom: 96,
            width: 380,
            maxWidth: '92vw',
            bgcolor: 'background.paper',
            borderRadius: 2,
            backdropFilter: 'blur(10px)',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: 2, background: 'linear-gradient(135deg, #0047FF 0%, #60A5FA 100%)', color: 'white' }}>
            <Typography variant="subtitle1" fontWeight={600}>Lumion Assistant</Typography>
            <Typography variant="caption">Local prototype — smart suggestions and navigation</Typography>
          </Box>
          <Box ref={containerRef} sx={{ maxHeight: 300, overflowY: 'auto', p: 2 }}>
            {messages.map((m, i) => (
              <Box key={i} sx={{ mb: 1.5, display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <Box sx={{
                  px: 1.5, py: 1,
                  borderRadius: 2,
                  bgcolor: m.role === 'user' ? 'primary.main' : 'background.paper',
                  color: m.role === 'user' ? 'white' : 'text.primary',
                  boxShadow: m.role === 'user' ? '0 2px 8px rgba(0,71,255,0.35)' : '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                  <Typography variant="body2" whiteSpace="pre-line">{m.text}</Typography>
                  {m.action && (
                    <Box sx={{ mt: 1 }}>
                      <Button size="small" variant="contained" color="primary" onClick={m.action} className="glow-hover">
                        {m.actionLabel || 'Open'}
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
            {typing && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                <CircularProgress size={16} />
                <Typography variant="caption">Thinking…</Typography>
              </Box>
            )}
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
              {quickPrompts.map((qp) => (
                <Chip key={qp.label} label={qp.label} onClick={() => handleSend(qp.query)} clickable size="small" />
              ))}
            </Stack>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                size="small"
                placeholder="Ask for roles, resume tips, or navigation"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <IconButton color="primary" onClick={() => handleSend()} aria-label="send">
                <SendIcon />
              </IconButton>
            </Stack>
          </Box>
        </Paper>
      )}
    </Box>
  );
}

export default AIChatWidget;