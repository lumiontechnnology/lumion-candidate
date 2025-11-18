import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// Removed theme toggle icons for cleaner header per branding
// Use mark-only logo in header per user request
const lumionLogo = 'https://raw.githubusercontent.com/lumiontechnnology/lumion-candidate/master/public/Logo__mark%20(1).png';

const settings = ['Profile', 'Account', 'Logout'];

function Navbar({ onToggleTheme, mode }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth state
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      sx={{
        backgroundColor: '#FFFFFF',
        boxShadow: isScrolled ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2 }}>
            <Box
              component="img"
              sx={{
                mr: 2,
                height: 40,
                width: 'auto',
                objectFit: 'contain',
                verticalAlign: 'middle',
              }}
              src={lumionLogo}
              alt="Lumion"
            />
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Poppins, Arial, sans-serif',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: '#001B44',
                textDecoration: 'none',
                lineHeight: 1,
              }}
            >
              LUMION
            </Typography>
          </Box>

          {/* Mobile menu removed per request: no Dashboard/Product entries */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'none' } }} />
          
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', mr: 1, flexGrow: 1 }}>
            <Box
              component="img"
              sx={{
                mr: 2,
                height: 30,
                width: 'auto',
                objectFit: 'contain',
                verticalAlign: 'middle'
              }}
              src={lumionLogo}
              alt="Lumion"
            />
            <Typography
              variant="h5"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                display: { xs: 'flex', md: 'none' },
                fontFamily: 'Poppins, Arial, sans-serif',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: '#001B44',
                textDecoration: 'none',
                lineHeight: 1,
              }}
            >
              LUMION
            </Typography>
          </Box>
          
          {/* Desktop navigation removed per request: Dashboard/Product */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }} />

          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
              <Button
                component={RouterLink}
                to="/automated-application"
                variant="outlined"
                color="primary"
                className="cta-outline"
                sx={{ mr: 1 }}
              >
                Auto-Apply
              </Button>
              <Button
                component={RouterLink}
                to="/login?role=employer"
                variant="outlined"
                color="primary"
                className="cta-outline"
                sx={{ mr: 1 }}
              >
                Employer
              </Button>
              <Button
                component={RouterLink}
                to="/post-job"
                variant="outlined"
                color="primary"
                className="cta-outline"
                sx={{ mr: 1 }}
              >
                Post a Job
              </Button>
              <Button
                component={RouterLink}
                to="/login"
                className="link-nav"
                sx={{ mr: 1 }}
              >
                Login
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                color="primary"
                className="cta-primary"
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;