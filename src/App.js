import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AIChatWidget from './components/layout/AIChatWidget';

// Pages
import HomeLanding from './pages/HomeLanding';
import UserDashboard from './pages/UserDashboard';
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
import EmployerDashboard from './pages/EmployerDashboard';

// Context Providers
import { JobSearchProvider } from './context/JobSearchContext';

// Theme — aligned to Lumion brand system
function App() {
  const [mode, setMode] = React.useState('light');
  // Manage head tags in React (title, theme-color, favicons)
  React.useEffect(() => {
    document.title = 'Lumion';
    const ensureMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    const ensureLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };
    ensureMeta('theme-color', '#0033A0');
    ensureMeta('description', 'Career Accelerator - Automated job application platform');
    const markOnly = 'https://raw.githubusercontent.com/lumiontechnnology/lumion-candidate/master/public/Logo__mark%20(1).png';
    ensureLink('icon', markOnly);
    ensureLink('apple-touch-icon', markOnly);
  }, []);
  const theme = React.useMemo(() => createTheme({
    palette: {
      primary: {
        main: '#0033A0',
      },
      secondary: {
        main: '#001B44',
      },
      background: {
        default: '#F9FAFB', // Snow White
        paper: '#FFFFFF',
      },
      text: {
        primary: '#001B44', // Deep Navy
        secondary: '#6B7280', // Slate Grey
      },
      success: { main: '#059669' },
      error: { main: '#DC2626' },
      mode,
    },
    typography: {
      fontFamily: 'Inter, Arial, sans-serif', // Secondary font for body
      h1: {
        fontFamily: 'Poppins, Arial, sans-serif',
        fontWeight: 700,
        fontSize: '3rem', // 48px
        color: '#0033A0',
      },
      h2: {
        fontFamily: 'Poppins, Arial, sans-serif',
        fontWeight: 600,
        fontSize: '2rem', // 32px
        color: '#001B44',
      },
      body1: {
        fontFamily: 'Inter, Arial, sans-serif',
        fontSize: '1rem', // 16px
        color: '#6B7280',
      },
      button: {
        fontFamily: 'Poppins, Arial, sans-serif',
        fontWeight: 700,
        fontSize: '0.875rem', // 14px
        textTransform: 'none',
      },
    },
    shape: { borderRadius: 8 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            transition: 'all 0.25s ease-in-out',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            '&:hover': { transform: 'scale(1.03)' },
          },
          containedPrimary: {
            backgroundColor: '#0033A0',
            color: '#FFFFFF',
            '&:hover': { backgroundColor: '#0047CC' },
          },
          outlined: {
            borderColor: '#0033A0',
            color: '#0033A0',
            '&:hover': { backgroundColor: 'rgba(77,166,255,0.12)' },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 6px 16px rgba(0,0,0,0.05)',
            borderRadius: 8,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4DA6FF',
              boxShadow: '0 0 0 2px #4DA6FF',
            },
          },
        },
      },
    },
  }), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Removed cosmic overlay to align with Snow White brand background */}
      <JobSearchProvider>
        <Navbar onToggleTheme={() => setMode((m) => (m === 'light' ? 'dark' : 'light'))} mode={mode} />
        <Routes>
          <Route path="/" element={<HomeLanding />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
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