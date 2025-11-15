import React from 'react';
import { Box, Container, Typography, Link, Grid, Stack, IconButton, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import siteContent from '../../data/siteContent';

function Footer() {
  const data = siteContent.footerDark;
  return (
    <Box component="footer" className="footer-dark rounded-3" sx={{ py: 8, mt: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          {data.title} <span className="brand-accent">↗</span>
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>{data.brand.name}</Typography>
            <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,0.8)' }}>{data.brand.description}</Typography>
            <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
              <IconButton href="#" sx={{ bgcolor: '#7C5CFF', color: '#fff', '&:hover': { bgcolor: '#6A4BFF' } }} size="small"><FacebookIcon fontSize="small" /></IconButton>
              <IconButton href="#" sx={{ bgcolor: '#7C5CFF', color: '#fff', '&:hover': { bgcolor: '#6A4BFF' } }} size="small"><InstagramIcon fontSize="small" /></IconButton>
              <IconButton href="#" sx={{ bgcolor: '#7C5CFF', color: '#fff', '&:hover': { bgcolor: '#6A4BFF' } }} size="small"><TwitterIcon fontSize="small" /></IconButton>
              <IconButton href="#" sx={{ bgcolor: '#7C5CFF', color: '#fff', '&:hover': { bgcolor: '#6A4BFF' } }} size="small"><PinterestIcon fontSize="small" /></IconButton>
            </Stack>
          </Grid>
          {data.columns.map((col) => (
            <Grid key={col.title} item xs={12} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{col.title}</Typography>
              <Stack sx={{ mt: 1 }}>
                {col.links.map((lnk) => (
                  <Link key={lnk.label} component={RouterLink} to={lnk.to} sx={{ my: 0.5, color: '#EDEDED' }}>
                    {lnk.label}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
        <Typography variant="body2" align="center" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          {data.copyright}
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;