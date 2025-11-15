import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Stack, Button, Chip, Divider } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function TagPill({ children }) {
  return (
    <Box
      sx={{
        bgcolor: 'rgba(0,51,160,0.08)',
        color: '#0033A0',
        px: 1,
        py: 0.5,
        borderRadius: 999,
        fontSize: '0.75rem',
      }}
    >
      {children}
    </Box>
  );
}

export default function JobCard({ title, company, location, type, salary, tags = [], to = '/job-search' }) {
  return (
    <Card className="frosted-card glow-hover" sx={{ p: 2.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
          {title}
        </Typography>
        {type && (
          <Chip label={type} size="small" sx={{ borderRadius: 1, bgcolor: 'rgba(0,51,160,0.08)', color: '#0033A0' }} />
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.75, gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
          <BusinessIcon fontSize="small" sx={{ mr: 0.5 }} /> {company}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} /> {location}
        </Typography>
        {salary && (
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {salary}
          </Typography>
        )}
      </Box>

      {tags && tags.length > 0 && (
        <Stack direction="row" spacing={1} sx={{ mt: 1.25, flexWrap: 'wrap' }}>
          {tags.map((t) => (
            <TagPill key={t}>{t}</TagPill>
          ))}
        </Stack>
      )}

      <Divider sx={{ my: 1.5 }} />

      <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
        <Button component={RouterLink} to={to} variant="contained" size="small">Apply</Button>
        <Button component={RouterLink} to={to} variant="outlined" size="small">View</Button>
      </Stack>
    </Card>
  );
}