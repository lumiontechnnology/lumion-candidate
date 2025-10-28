import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import JobPreferences from './pages/JobPreferences';
import ResumeBuilder from './pages/ResumeBuilder';
import ApplicationHistory from './pages/ApplicationHistory';
import JobSearch from './pages/JobSearch';
import AutomatedApplication from './pages/AutomatedApplication';

// Context Providers
import { JobSearchProvider } from './context/JobSearchContext';

// Theme - Updated with Lumion branding colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#0033CC', // Lumion blue
      light: '#3355DD',
      dark: '#002299',
    },
    secondary: {
      main: '#FF6600', // Complementary orange
      light: '#FF8833',
      dark: '#CC5500',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    success: {
      main: '#4CAF50',
    },
    info: {
      main: '#2196F3',
    },
    warning: {
      main: '#FF9800',
    },
    error: {
      main: '#F44336',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 1px 3px 0px rgba(0,0,0,0.06)',
    // ... rest of the shadows remain default
  ],
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <JobSearchProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/preferences" element={<JobPreferences />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/history" element={<ApplicationHistory />} />
          <Route path="/job-search" element={<JobSearch />} />
          <Route path="/automated-application" element={<AutomatedApplication />} />
        </Routes>
        <Footer />
      </JobSearchProvider>
    </ThemeProvider>
  );
}

export default App;