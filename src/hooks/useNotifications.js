import { useEffect, useState } from 'react';
import {
  getAppliedJobs,
  getSavedJobs,
  getApplicationStatistics,
  fetchSavedJobs,
} from '../services/databaseService';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';

// Simple client-side notifications derived from local application data.
// Replace or extend with a real backend when available.
export default function useNotifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/notifications`);
        if (res.ok) {
          const json = await res.json();
          if (!cancelled) {
            setItems(Array.isArray(json.items) ? json.items : []);
            setLoading(false);
          }
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      } catch (e) {
        // Fallback: derive notifications, preferring backend saved jobs
        const applied = getAppliedJobs();
        let saved = [];
        try {
          saved = await fetchSavedJobs();
        } catch {
          saved = getSavedJobs();
        }
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
        if (!cancelled) {
          setItems(derived);
          setLoading(false);
        }
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/notifications`);
      if (res.ok) {
        const json = await res.json();
        setItems(Array.isArray(json.items) ? json.items : []);
        setLoading(false);
        return;
      }
      throw new Error(`HTTP ${res.status}`);
    } catch (e) {
      // Fallback to derived notifications, preferring backend saved jobs
      const applied = getAppliedJobs();
      let saved = [];
      try {
        saved = await fetchSavedJobs();
      } catch {
        saved = getSavedJobs();
      }
      const stats = getApplicationStatistics();
      const derived = [];
      if (stats?.total) derived.push({ type: 'applications', message: `You have ${stats.total} applications submitted.`, time: 'Just now' });
      const interviewCount = (stats?.byStatus?.Interview || 0) + (stats?.byStatus?.Interviewing || 0);
      if (interviewCount > 0) derived.push({ type: 'interviews', message: `You have ${interviewCount} interviews scheduled.`, time: 'Today' });
      const awaitingCount = (stats?.byStatus?.Applied || 0) + (stats?.byStatus?.Submitted || 0);
      if (awaitingCount > 0) derived.push({ type: 'status', message: `${awaitingCount} applications awaiting response.`, time: 'This week' });
      if (saved?.length) derived.push({ type: 'saved', message: `You have ${saved.length} saved jobs to review.`, time: 'Just now' });
      if (derived.length === 0) derived.push({ type: 'general', message: 'No new notifications. Explore vacancies to find matches.', time: '—' });
      setItems(derived);
      setLoading(false);
    }
  };

  return { items, loading, error, refresh };
}