/**
 * Database Service
 * 
 * This service provides functions to interact with job roles and user profiles data.
 * It serves as a centralized data access layer for the application.
 */

import jobRoles, { getJobRolesByCategory, getJobCategories, searchJobRoles } from '../data/jobRolesData';
import userProfiles, { getUserProfilesByTitle, getUserProfilesByLocation, searchUserProfiles } from '../data/userProfilesData';

// Backend API base (for local dev, can be overridden via env)
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';

// Local storage keys
const SAVED_JOBS_KEY = 'lumion_saved_jobs';
const APPLIED_JOBS_KEY = 'lumion_applied_jobs';
const USER_PREFERENCES_KEY = 'lumion_user_preferences';
const USER_PROFILE_KEY = 'lumion_user_profile';

/**
 * Job Roles related functions
 */
export const getAllJobRoles = () => {
  return jobRoles;
};

export const getJobRoleById = (id) => {
  return jobRoles.find(role => role.id === id);
};

export const getJobRolesBySkill = (skill) => {
  return jobRoles.filter(role => role.skills.includes(skill));
};

export const getJobRolesBySalaryRange = (min, max) => {
  return jobRoles.filter(role => 
    role.averageSalary.min >= min && role.averageSalary.max <= max
  );
};

/**
 * User Profiles related functions
 */
export const getAllUserProfiles = () => {
  return userProfiles;
};

export const getUserProfileById = (id) => {
  return userProfiles.find(profile => profile.id === id);
};

export const getUserProfilesByExperience = (minYears) => {
  return userProfiles.filter(profile => profile.experience >= minYears);
};

export const getUserProfilesByJobSearchStatus = (status) => {
  return userProfiles.filter(profile => profile.jobSearchStatus === status);
};

export const getUserProfilesByPreferredRole = (role) => {
  return userProfiles.filter(profile => profile.preferredRoles.includes(role));
};

/**
 * User preferences and saved data
 */
export const saveUserPreferences = (preferences) => {
  localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(preferences));
  return preferences;
};

export const getUserPreferences = () => {
  const preferences = localStorage.getItem(USER_PREFERENCES_KEY);
  return preferences ? JSON.parse(preferences) : null;
};

export const saveUserProfile = (profile) => {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  return profile;
};

export const getUserProfile = () => {
  const profile = localStorage.getItem(USER_PROFILE_KEY);
  return profile ? JSON.parse(profile) : null;
};

export const saveJob = (job) => {
  const savedJobs = getSavedJobs();
  if (!savedJobs.some(savedJob => savedJob.id === job.id)) {
    savedJobs.push(job);
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobs));
  }
  return savedJobs;
};

export const getSavedJobs = () => {
  const savedJobs = localStorage.getItem(SAVED_JOBS_KEY);
  return savedJobs ? JSON.parse(savedJobs) : [];
};

export const removeSavedJob = (jobId) => {
  const savedJobs = getSavedJobs();
  const updatedJobs = savedJobs.filter(job => job.id !== jobId);
  localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updatedJobs));
  return updatedJobs;
};

export const saveAppliedJob = (job) => {
  const appliedJobs = getAppliedJobs();
  if (!appliedJobs.some(appliedJob => appliedJob.id === job.id)) {
    job.appliedDate = job.appliedDate || new Date().toISOString();
    job.status = job.status || 'Applied';
    appliedJobs.push(job);
    localStorage.setItem(APPLIED_JOBS_KEY, JSON.stringify(appliedJobs));
  }
  return appliedJobs;
};

export const getAppliedJobs = () => {
  const appliedJobs = localStorage.getItem(APPLIED_JOBS_KEY);
  return appliedJobs ? JSON.parse(appliedJobs) : [];
};

export const updateAppliedJobStatus = (jobId, status) => {
  const appliedJobs = getAppliedJobs();
  const updatedJobs = appliedJobs.map(job => {
    if (job.id === jobId) {
      return { ...job, status };
    }
    return job;
  });
  localStorage.setItem(APPLIED_JOBS_KEY, JSON.stringify(updatedJobs));
  return updatedJobs;
};

/**
 * Statistics and analytics
 */
export const getApplicationStatistics = () => {
  const appliedJobs = getAppliedJobs();
  
  // Count applications by status
  const statusCounts = appliedJobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});
  
  // Count applications by source
  const sourceCounts = appliedJobs.reduce((acc, job) => {
    acc[job.source] = (acc[job.source] || 0) + 1;
    return acc;
  }, {});
  
  // Applications over time (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const applicationsByDay = appliedJobs
    .filter(job => new Date(job.appliedDate) >= thirtyDaysAgo)
    .reduce((acc, job) => {
      const date = new Date(job.appliedDate).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
  
  return {
    total: appliedJobs.length,
    byStatus: statusCounts,
    bySource: sourceCounts,
    byDay: applicationsByDay
  };
};

// Async fetchers from backend with graceful fallback to local computations
export const fetchApplicationStatistics = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/stats`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    return getApplicationStatistics();
  }
};

// Applied jobs backend integration with graceful fallbacks
export const fetchAppliedJobs = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/applications`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return Array.isArray(json.items) ? json.items : [];
  } catch (e) {
    return getAppliedJobs();
  }
};

export const saveAppliedJobToBackend = async (job) => {
  try {
    const res = await fetch(`${API_BASE}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    // Return current list for consistency with local helper
    return Array.isArray(json.items) ? json.items : getAppliedJobs();
  } catch (e) {
    return saveAppliedJob(job);
  }
};

export const updateAppliedJobStatusBackend = async (id, payload = {}) => {
  try {
    const res = await fetch(`${API_BASE}/api/applications/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return Array.isArray(json.items) ? json.items : getAppliedJobs();
  } catch (e) {
    const status = payload.status ?? 'Applied';
    return updateAppliedJobStatus(id, status);
  }
};

export const fetchSavedJobs = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/jobs/saved`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return Array.isArray(json.items) ? json.items : [];
  } catch (e) {
    return getSavedJobs();
  }
};

// Save a job to backend, fallback to local storage
export const saveJobToBackend = async (job) => {
  try {
    const res = await fetch(`${API_BASE}/api/jobs/saved`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return Array.isArray(json.items) ? json.items : [];
  } catch (e) {
    return saveJob(job);
  }
};

// Remove a saved job from backend, fallback to local storage
export const removeSavedJobFromBackend = async (jobId) => {
  try {
    const res = await fetch(`${API_BASE}/api/jobs/saved/${jobId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return Array.isArray(json.items) ? json.items : [];
  } catch (e) {
    return removeSavedJob(jobId);
  }
};

export const fetchRecommendedVacancies = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/jobs/recommended`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return Array.isArray(json.items) ? json.items : [];
  } catch (e) {
    return [];
  }
};

/**
 * Job matching and recommendations
 */
export const getJobMatchScore = (jobRole, userProfile) => {
  if (!jobRole || !userProfile) return 0;
  
  let score = 0;
  const maxScore = 100;
  
  // Match by skills (50% of score)
  const skillsMatch = userProfile.skills.filter(skill => 
    jobRole.skills.includes(skill)
  ).length;
  
  const skillsScore = (skillsMatch / Math.max(jobRole.skills.length, 1)) * 50;
  
  // Match by preferred roles (30% of score)
  const roleMatch = userProfile.preferredRoles.includes(jobRole.title) ? 30 : 0;
  
  // Match by salary (20% of score)
  let salaryScore = 0;
  if (userProfile.preferredSalary && jobRole.averageSalary) {
    if (jobRole.averageSalary.min >= userProfile.preferredSalary.min && 
        jobRole.averageSalary.max <= userProfile.preferredSalary.max) {
      salaryScore = 20;
    } else if (jobRole.averageSalary.max >= userProfile.preferredSalary.min || 
               jobRole.averageSalary.min <= userProfile.preferredSalary.max) {
      salaryScore = 10;
    }
  }
  
  score = skillsScore + roleMatch + salaryScore;
  return Math.min(Math.round(score), maxScore);
};

export const getRecommendedJobs = (userProfile, limit = 10) => {
  if (!userProfile) return [];
  
  const allJobs = getAllJobRoles();
  
  // Calculate match score for each job
  const jobsWithScores = allJobs.map(job => ({
    ...job,
    matchScore: getJobMatchScore(job, userProfile)
  }));
  
  // Sort by match score (descending) and take the top 'limit' jobs
  return jobsWithScores
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
};

export default {
  // Re-export all functions
  getAllJobRoles,
  getJobRoleById,
  getJobRolesByCategory,
  getJobCategories,
  searchJobRoles,
  getJobRolesBySkill,
  getJobRolesBySalaryRange,
  
  getAllUserProfiles,
  getUserProfileById,
  getUserProfilesByTitle,
  getUserProfilesByLocation,
  searchUserProfiles,
  getUserProfilesByExperience,
  getUserProfilesByJobSearchStatus,
  getUserProfilesByPreferredRole,
  
  saveUserPreferences,
  getUserPreferences,
  saveUserProfile,
  getUserProfile,
  
  saveJob,
  getSavedJobs,
  removeSavedJob,
  saveAppliedJob,
  getAppliedJobs,
  updateAppliedJobStatus,
  
  getApplicationStatistics,
  fetchApplicationStatistics,
  fetchAppliedJobs,
  saveAppliedJobToBackend,
  updateAppliedJobStatusBackend,
  fetchSavedJobs,
  saveJobToBackend,
  removeSavedJobFromBackend,
  fetchRecommendedVacancies,
  getJobMatchScore,
  getRecommendedJobs
};