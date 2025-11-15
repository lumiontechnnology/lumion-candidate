import { useEffect, useState } from 'react';
import {
  getUserProfile,
  getUserPreferences,
  getRecommendedJobs,
} from '../services/databaseService';

// Recommend vacancies using local user profile/preferences and static job roles.
// Replace or extend with a real backend search when available.
export default function useRecommendedVacancies(limit = 5) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        const profile = getUserProfile();
        const prefs = getUserPreferences();

        // Use profile first, preferences as a weak fallback
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

        setItems(mapped);
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } catch (e) {
      setError(e?.message || 'Failed to load recommended vacancies');
      setLoading(false);
    }
  }, [limit]);

  return { items, loading, error };
}