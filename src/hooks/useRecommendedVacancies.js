import { useEffect, useState } from 'react';
import {
  getUserProfile,
  getUserPreferences,
  getRecommendedJobs,
  fetchRecommendedVacancies,
} from '../services/databaseService';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';

// Recommend vacancies using local user profile/preferences and static job roles.
// Replace or extend with a real backend search when available.
export default function useRecommendedVacancies(limit = 5) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const items = await fetchRecommendedVacancies();
        if (!cancelled) {
          setItems(items.slice(0, limit));
          setLoading(false);
        }
      } catch (e) {
        // Fallback: compute locally using user profile/preferences
        const profile = getUserProfile();
        const prefs = getUserPreferences();
        const sourceProfile = profile || (prefs ? {
          preferredRoles: prefs.jobTitles || [],
          skills: prefs.keywords ? [prefs.keywords] : [],
          preferredSalary: prefs.salary || undefined,
        } : null);
        const recommended = getRecommendedJobs(sourceProfile, limit) || [];
        const mapped = recommended.map((job) => ({
          id: job.id,
          role: job.title,
          company: 'Various',
          location: 'Flexible',
          matchScore: job.matchScore ?? 0,
        }));
        if (!cancelled) {
          setItems(mapped);
          setLoading(false);
        }
      }
    };
    load();
    return () => { cancelled = true; };
  }, [limit]);

  return { items, loading, error };
}