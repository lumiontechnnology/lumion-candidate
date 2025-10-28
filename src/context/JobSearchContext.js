import React, { createContext, useContext, useState, useReducer } from 'react';
import { jobSearchApi, linkedInApi, indeedApi, emailApplicationService, formSubmissionService } from '../services/api';

// Create context
const JobSearchContext = createContext();

// Initial state for job search
const initialState = {
  jobs: [],
  loading: false,
  error: null,
  filters: {
    keywords: '',
    location: '',
    jobType: 'all',
    experienceLevel: 'all',
    salary: [0, 200000],
    workMode: 'all',
    postedWithin: 'all',
  },
  applications: [],
  applicationHistory: [],
  applicationStats: {
    total: 0,
    pending: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
  }
};

// Reducer for job search actions
function jobSearchReducer(state, action) {
  switch (action.type) {
    case 'SEARCH_JOBS_START':
      return { ...state, loading: true, error: null };
    case 'SEARCH_JOBS_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        jobs: action.payload,
      };
    case 'SEARCH_JOBS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'APPLY_TO_JOB_START':
      return { ...state, loading: true, error: null };
    case 'APPLY_TO_JOB_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        applicationHistory: [...state.applicationHistory, action.payload],
        applicationStats: {
          ...state.applicationStats,
          total: state.applicationStats.total + 1,
          pending: state.applicationStats.pending + 1,
        }
      };
    case 'APPLY_TO_JOB_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_APPLICATION_STATUS':
      const updatedHistory = state.applicationHistory.map(app => 
        app.id === action.payload.id ? { ...app, status: action.payload.status } : app
      );
      
      // Recalculate stats
      const stats = updatedHistory.reduce((acc, app) => {
        acc.total = updatedHistory.length;
        if (app.status === 'Applied') acc.pending++;
        if (app.status === 'Interview Scheduled') acc.interviews++;
        if (app.status === 'Offer Received') acc.offers++;
        if (app.status === 'Rejected') acc.rejected++;
        return acc;
      }, { total: 0, pending: 0, interviews: 0, offers: 0, rejected: 0 });
      
      return { 
        ...state, 
        applicationHistory: updatedHistory,
        applicationStats: stats
      };
    default:
      return state;
  }
}

// Provider component
export const JobSearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobSearchReducer, initialState);
  
  // Search for jobs across platforms
  const searchJobs = async (preferences) => {
    try {
      dispatch({ type: 'SEARCH_JOBS_START' });
      
      const response = await jobSearchApi.searchAllPlatforms(preferences);
      
      if (response.success) {
        // Combine LinkedIn and Indeed jobs
        const allJobs = [
          ...(response.data.linkedin || []),
          ...(response.data.indeed || [])
        ];
        
        dispatch({ 
          type: 'SEARCH_JOBS_SUCCESS', 
          payload: allJobs
        });
        
        return allJobs;
      } else {
        throw new Error(response.error || 'Failed to search for jobs');
      }
    } catch (error) {
      dispatch({ 
        type: 'SEARCH_JOBS_FAILURE', 
        payload: error.message 
      });
      return [];
    }
  };
  
  // Apply to a job
  const applyToJob = async (job, applicationData) => {
    try {
      dispatch({ type: 'APPLY_TO_JOB_START' });
      
      let response;
      
      // Determine which API to use based on job source
      if (job.source === 'LinkedIn') {
        response = await linkedInApi.applyToJob(job.id, applicationData);
      } else if (job.source === 'Indeed') {
        // Check application method
        if (job.applicationMethod === 'email') {
          response = await emailApplicationService.sendApplication(job, applicationData);
        } else if (job.applicationMethod === 'form') {
          response = await formSubmissionService.submitApplicationForm(job.applicationUrl, applicationData);
        } else {
          response = await indeedApi.applyToJob(job.id, applicationData);
        }
      } else {
        // Default to form submission for other sources
        response = await formSubmissionService.submitApplicationForm(job.applicationUrl, applicationData);
      }
      
      if (response.success) {
        const applicationRecord = {
          id: response.data.applicationId || `APP-${Date.now()}`,
          jobId: job.id,
          company: job.company,
          position: job.title,
          location: job.location,
          appliedDate: new Date().toISOString(),
          status: 'Applied',
          source: job.source,
          applicationData
        };
        
        dispatch({ 
          type: 'APPLY_TO_JOB_SUCCESS', 
          payload: applicationRecord
        });
        
        return { success: true, data: applicationRecord };
      } else {
        throw new Error(response.error || 'Failed to apply for job');
      }
    } catch (error) {
      dispatch({ 
        type: 'APPLY_TO_JOB_FAILURE', 
        payload: error.message 
      });
      
      return { success: false, error: error.message };
    }
  };
  
  // Update application status
  const updateApplicationStatus = (applicationId, newStatus) => {
    dispatch({
      type: 'UPDATE_APPLICATION_STATUS',
      payload: { id: applicationId, status: newStatus }
    });
  };
  
  // Update search filters
  const updateFilters = (newFilters) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      payload: newFilters
    });
  };
  
  return (
    <JobSearchContext.Provider
      value={{
        jobs: state.jobs,
        loading: state.loading,
        error: state.error,
        filters: state.filters,
        applications: state.applicationHistory,
        applicationStats: state.applicationStats,
        searchJobs,
        applyToJob,
        updateApplicationStatus,
        updateFilters
      }}
    >
      {children}
    </JobSearchContext.Provider>
  );
};

// Custom hook to use the job search context
export const useJobSearch = () => {
  const context = useContext(JobSearchContext);
  if (!context) {
    throw new Error('useJobSearch must be used within a JobSearchProvider');
  }
  return context;
};

export default JobSearchContext;