import { useEffect, useState } from 'react';
import {
  getAppliedJobs,
  getSavedJobs,
  getApplicationStatistics,
} from '../services/databaseService';

// Simple client-side notifications derived from local application data.
// Replace or extend with a real backend when available.
export default function useNotifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Simulate async fetch to keep API shape consistent
      const timer = setTimeout(() => {
        const applied = getAppliedJobs();
        const saved = getSavedJobs();
        const stats = getApplicationStatistics();

        const derived = [];

        if (stats?.total) {
          derived.push({
            type: 'applications',
            message: `You have ${stats.total} applications submitted.`,
            time: 'Just now',
          });
        }

        const interviewCount = (stats?.byStatus?.Interview || 0) + (stats?.byStatus?.Interviewing || 0);
        if (interviewCount > 0) {
          derived.push({
            type: 'interviews',
            message: `You have ${interviewCount} interviews scheduled.`,
            time: 'Today',
          });
        }

        const awaitingCount = (stats?.byStatus?.Applied || 0) + (stats?.byStatus?.Submitted || 0);
        if (awaitingCount > 0) {
          derived.push({
            type: 'status',
            message: `${awaitingCount} applications awaiting response.`,
            time: 'This week',
          });
        }

        if (saved?.length) {
          derived.push({
            type: 'saved',
            message: `You have ${saved.length} saved jobs to review.`,
            time: 'Just now',
          });
        }

        // If nothing was derived, show a friendly default
        if (derived.length === 0) {
          derived.push({
            type: 'general',
            message: 'No new notifications. Explore vacancies to find matches.',
            time: '—',
          });
        }

        setItems(derived);
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } catch (e) {
      setError(e?.message || 'Failed to build notifications');
      setLoading(false);
    }
  }, []);

  const refresh = () => {
    setLoading(true);
    setError(null);
    // Re-run the effect logic quickly
    const applied = getAppliedJobs();
    const saved = getSavedJobs();
    const stats = getApplicationStatistics();
    const derived = [];
    if (stats?.total) {
      derived.push({ type: 'applications', message: `You have ${stats.total} applications submitted.`, time: 'Just now' });
    }
    const interviewCount = (stats?.byStatus?.Interview || 0) + (stats?.byStatus?.Interviewing || 0);
    if (interviewCount > 0) {
      derived.push({ type: 'interviews', message: `You have ${interviewCount} interviews scheduled.`, time: 'Today' });
    }
    const awaitingCount = (stats?.byStatus?.Applied || 0) + (stats?.byStatus?.Submitted || 0);
    if (awaitingCount > 0) {
      derived.push({ type: 'status', message: `${awaitingCount} applications awaiting response.`, time: 'This week' });
    }
    if (saved?.length) {
      derived.push({ type: 'saved', message: `You have ${saved.length} saved jobs to review.`, time: 'Just now' });
    }
    if (derived.length === 0) {
      derived.push({ type: 'general', message: 'No new notifications. Explore vacancies to find matches.', time: '—' });
    }
    setItems(derived);
    setLoading(false);
  };

  return { items, loading, error, refresh };
}