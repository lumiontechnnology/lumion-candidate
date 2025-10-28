import axios from 'axios';

// Base API configuration
const api = axios.create({
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// LinkedIn API integration
export const linkedInApi = {
  // Search for jobs based on user preferences
  searchJobs: async (preferences) => {
    try {
      // In a real implementation, this would use the LinkedIn API
      // For now, we'll simulate the API response with mock data
      console.log('Searching LinkedIn jobs with preferences:', preferences);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response data
      return {
        success: true,
        data: generateMockLinkedInJobs(preferences),
      };
    } catch (error) {
      console.error('LinkedIn API error:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch jobs from LinkedIn',
      };
    }
  },
  
  // Apply to a job on LinkedIn
  applyToJob: async (jobId, applicationData) => {
    try {
      // In a real implementation, this would use the LinkedIn API
      console.log('Applying to LinkedIn job:', jobId, applicationData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock response
      return {
        success: true,
        data: {
          applicationId: 'LI-' + Math.floor(Math.random() * 1000000),
          jobId,
          status: 'applied',
          appliedAt: new Date().toISOString(),
        }
      };
    } catch (error) {
      console.error('LinkedIn application error:', error);
      return {
        success: false,
        error: error.message || 'Failed to apply for job on LinkedIn',
      };
    }
  }
};

// Indeed API integration
export const indeedApi = {
  // Search for jobs based on user preferences
  searchJobs: async (preferences) => {
    try {
      // In a real implementation, this would use the Indeed API
      console.log('Searching Indeed jobs with preferences:', preferences);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response data
      return {
        success: true,
        data: generateMockIndeedJobs(preferences),
      };
    } catch (error) {
      console.error('Indeed API error:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch jobs from Indeed',
      };
    }
  },
  
  // Apply to a job on Indeed
  applyToJob: async (jobId, applicationData) => {
    try {
      // In a real implementation, this would use the Indeed API
      console.log('Applying to Indeed job:', jobId, applicationData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response
      return {
        success: true,
        data: {
          applicationId: 'IN-' + Math.floor(Math.random() * 1000000),
          jobId,
          status: 'applied',
          appliedAt: new Date().toISOString(),
        }
      };
    } catch (error) {
      console.error('Indeed application error:', error);
      return {
        success: false,
        error: error.message || 'Failed to apply for job on Indeed',
      };
    }
  }
};

// Email application service
export const emailApplicationService = {
  // Send application via email
  sendApplication: async (jobData, applicationData) => {
    try {
      // In a real implementation, this would use an email service API
      console.log('Sending email application:', jobData, applicationData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      return {
        success: true,
        data: {
          messageId: 'EMAIL-' + Math.floor(Math.random() * 1000000),
          sentTo: jobData.contactEmail,
          status: 'sent',
          sentAt: new Date().toISOString(),
        }
      };
    } catch (error) {
      console.error('Email application error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send application email',
      };
    }
  }
};

// Form submission service
export const formSubmissionService = {
  // Fill and submit application forms
  submitApplicationForm: async (formUrl, formData) => {
    try {
      // In a real implementation, this would handle form submissions
      console.log('Submitting application form:', formUrl, formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response
      return {
        success: true,
        data: {
          submissionId: 'FORM-' + Math.floor(Math.random() * 1000000),
          formUrl,
          status: 'submitted',
          submittedAt: new Date().toISOString(),
        }
      };
    } catch (error) {
      console.error('Form submission error:', error);
      return {
        success: false,
        error: error.message || 'Failed to submit application form',
      };
    }
  }
};

// Unified job search API
export const jobSearchApi = {
  // Search for jobs across multiple platforms
  searchAllPlatforms: async (preferences) => {
    try {
      // Search both LinkedIn and Indeed in parallel
      const [linkedInResults, indeedResults] = await Promise.all([
        linkedInApi.searchJobs(preferences),
        indeedApi.searchJobs(preferences)
      ]);
      
      // Combine and return results
      return {
        success: true,
        data: {
          linkedin: linkedInResults.success ? linkedInResults.data : [],
          indeed: indeedResults.success ? indeedResults.data : [],
          timestamp: new Date().toISOString(),
        }
      };
    } catch (error) {
      console.error('Job search error:', error);
      return {
        success: false,
        error: error.message || 'Failed to search for jobs',
      };
    }
  }
};

// Helper function to generate mock LinkedIn jobs
function generateMockLinkedInJobs(preferences) {
  const jobCount = Math.floor(Math.random() * 10) + 5; // 5-15 jobs
  const jobs = [];
  
  const companies = [
    'Tech Innovations Inc.', 'Global Solutions', 'Future Tech', 
    'Innovative Systems', 'Digital Creations', 'Tech Solutions',
    'Cloud Innovations', 'Data Systems', 'Mobile Technologies', 'AI Solutions'
  ];
  
  const locations = preferences.locations || [
    'New York, NY', 'San Francisco, CA', 'Remote', 'Boston, MA', 
    'Chicago, IL', 'Austin, TX', 'Seattle, WA', 'Los Angeles, CA'
  ];
  
  const jobTitles = preferences.jobTitles || [
    'Frontend Developer', 'Backend Developer', 'Full Stack Engineer',
    'Software Engineer', 'UI/UX Designer', 'DevOps Engineer',
    'Data Scientist', 'Mobile Developer', 'Machine Learning Engineer'
  ];
  
  for (let i = 0; i < jobCount; i++) {
    const randomSalaryMin = Math.floor(Math.random() * 50) + 50; // $50k-$100k
    const randomSalaryMax = randomSalaryMin + Math.floor(Math.random() * 50) + 20; // $20k-$70k more than min
    
    jobs.push({
      id: 'LI-JOB-' + Math.floor(Math.random() * 1000000),
      title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      description: `This is a mock job description for a position at a great company. 
        We're looking for talented individuals to join our team and help us build amazing products.
        Requirements include experience with relevant technologies and a passion for innovation.`,
      salary: {
        min: randomSalaryMin * 1000,
        max: randomSalaryMax * 1000,
        currency: 'USD'
      },
      postedDate: new Date(Date.now() - Math.floor(Math.random() * 14) * 86400000).toISOString(), // 0-14 days ago
      applicationUrl: 'https://linkedin.com/jobs/mock-job-' + i,
      source: 'LinkedIn',
      workMode: ['Remote', 'Hybrid', 'On-site'][Math.floor(Math.random() * 3)],
      experienceLevel: ['Entry Level', 'Mid Level', 'Senior Level'][Math.floor(Math.random() * 3)]
    });
  }
  
  return jobs;
}

// Helper function to generate mock Indeed jobs
function generateMockIndeedJobs(preferences) {
  const jobCount = Math.floor(Math.random() * 10) + 5; // 5-15 jobs
  const jobs = [];
  
  const companies = [
    'Innovative Tech', 'Software Solutions', 'Digital Future', 
    'Tech Systems', 'Creative Digital', 'Cloud Solutions',
    'Data Innovations', 'Mobile Systems', 'AI Technologies', 'Web Creations'
  ];
  
  const locations = preferences.locations || [
    'New York, NY', 'San Francisco, CA', 'Remote', 'Boston, MA', 
    'Chicago, IL', 'Austin, TX', 'Seattle, WA', 'Los Angeles, CA'
  ];
  
  const jobTitles = preferences.jobTitles || [
    'Frontend Developer', 'Backend Developer', 'Full Stack Engineer',
    'Software Engineer', 'UI/UX Designer', 'DevOps Engineer',
    'Data Scientist', 'Mobile Developer', 'Machine Learning Engineer'
  ];
  
  for (let i = 0; i < jobCount; i++) {
    const randomSalaryMin = Math.floor(Math.random() * 50) + 50; // $50k-$100k
    const randomSalaryMax = randomSalaryMin + Math.floor(Math.random() * 50) + 20; // $20k-$70k more than min
    
    jobs.push({
      id: 'IN-JOB-' + Math.floor(Math.random() * 1000000),
      title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      description: `We are seeking a talented professional to join our team. 
        This role offers competitive compensation and benefits.
        The ideal candidate will have relevant experience and strong communication skills.`,
      salary: {
        min: randomSalaryMin * 1000,
        max: randomSalaryMax * 1000,
        currency: 'USD'
      },
      postedDate: new Date(Date.now() - Math.floor(Math.random() * 14) * 86400000).toISOString(), // 0-14 days ago
      applicationUrl: 'https://indeed.com/jobs/mock-job-' + i,
      source: 'Indeed',
      workMode: ['Remote', 'Hybrid', 'On-site'][Math.floor(Math.random() * 3)],
      experienceLevel: ['Entry Level', 'Mid Level', 'Senior Level'][Math.floor(Math.random() * 3)],
      applicationMethod: ['direct', 'email', 'form'][Math.floor(Math.random() * 3)]
    });
  }
  
  return jobs;
}

export default api;