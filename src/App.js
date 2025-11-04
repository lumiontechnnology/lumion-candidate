import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AIChatWidget from './components/layout/AIChatWidget';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import JobPreferences from './pages/JobPreferences';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumeTailor from './pages/ResumeTailor';
import ApplicationHistory from './pages/ApplicationHistory';
import JobSearch from './pages/JobSearch';
import AutomatedApplication from './pages/AutomatedApplication';
import InterviewSimulator from './pages/InterviewSimulator';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';

// Context Providers
import { JobSearchProvider } from './context/JobSearchContext';

// Theme — aligned to Lumion brand system
function App() {
  const [mode, setMode] = React.useState('dark');
  const theme = React.useMemo(() => createTheme({
    palette: {
      primary: {
        main: '#0047FF',
        dark: '#1E3A8A',
        light: '#60A5FA',
      },
      secondary: {
        main: '#1E3A8A',
        light: '#4F63B5',
        dark: '#152861',
      },
      background: {
        default: '#0B1020',
        paper: '#101527',
      },
      text: {
        primary: '#E5E7EB',
        secondary: '#9CA3AF',
      },
      mode,
    },
    typography: {
      fontFamily: 'Corbel, -apple-system, Segoe UI, Calibri, Trebuchet MS, Arial, sans-serif',
      h1: { fontFamily: 'Corbel, -apple-system, Segoe UI, Calibri, Trebuchet MS, Arial, sans-serif', fontWeight: 700 },
      h2: { fontFamily: 'Corbel, -apple-system, Segoe UI, Calibri, Trebuchet MS, Arial, sans-serif', fontWeight: 700 },
      h3: { fontFamily: 'Corbel, -apple-system, Segoe UI, Calibri, Trebuchet MS, Arial, sans-serif', fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
          containedPrimary: {
            background: 'linear-gradient(135deg, #0047FF 0%, #60A5FA 100%)',
            color: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(0, 71, 255, 0.25)',
          },
          outlined: {
            borderColor: '#0047FF',
            color: '#0047FF',
            '&:hover': { backgroundColor: 'rgba(96,165,250,0.12)' },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: { transition: 'background-color 0.3s ease, box-shadow 0.3s ease' },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 8px 28px rgba(0,71,255,0.25)',
            borderRadius: 12,
            border: '1px solid rgba(96,165,250,0.18)'
          },
        },
      },
    },
  }), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {mode === 'dark' && <div className="cosmic-bg" />}
      <JobSearchProvider>
        <Navbar onToggleTheme={() => setMode((m) => (m === 'light' ? 'dark' : 'light'))} mode={mode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/preferences" element={<JobPreferences />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/resume-tailor" element={<ResumeTailor />} />
          <Route path="/history" element={<ApplicationHistory />} />
          <Route path="/job-search" element={<JobSearch />} />
          <Route path="/automated-application" element={<AutomatedApplication />} />
          <Route path="/interview-simulator" element={<InterviewSimulator />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <AIChatWidget />
        <Footer />
      </JobSearchProvider>
    </ThemeProvider>
  );
}

export default App;