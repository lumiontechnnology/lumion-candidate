import { emailApplicationService, formSubmissionService } from './api';

// Automated submission service
const submissionService = {
  // Submit an application based on job type and method
  submitApplication: async (job, userData, optimizedMaterials) => {
    try {
      console.log('Submitting application for job:', job.id);
      
      // Prepare application data
      const applicationData = {
        ...userData,
        resume: optimizedMaterials.resume || userData.resume,
        coverLetter: optimizedMaterials.coverLetter || userData.coverLetter,
        applicationDate: new Date().toISOString(),
      };
      
      let response;
      let submissionMethod;
      
      // Determine submission method based on job application type
      if (job.applicationMethod === 'email' || job.source === 'Email') {
        // Email application
        response = await emailApplicationService.sendApplication(job, applicationData);
        submissionMethod = 'email';
      } else if (job.applicationMethod === 'form' || job.source === 'Form') {
        // Form submission
        response = await formSubmissionService.submitApplicationForm(job.applicationUrl, applicationData);
        submissionMethod = 'form';
      } else {
        // Direct API submission (LinkedIn, Indeed, etc.)
        if (job.source === 'LinkedIn') {
          // Use LinkedIn API
          const linkedInApi = (await import('./api')).linkedInApi;
          response = await linkedInApi.applyToJob(job.id, applicationData);
        } else if (job.source === 'Indeed') {
          // Use Indeed API
          const indeedApi = (await import('./api')).indeedApi;
          response = await indeedApi.applyToJob(job.id, applicationData);
        } else {
          // Default to form submission for unknown sources
          response = await formSubmissionService.submitApplicationForm(job.applicationUrl, applicationData);
        }
        submissionMethod = 'api';
      }
      
      if (response.success) {
        return {
          success: true,
          data: {
            ...response.data,
            submissionMethod,
            applicationData
          }
        };
      } else {
        throw new Error(response.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Application submission error:', error);
      return {
        success: false,
        error: error.message || 'Failed to submit application',
      };
    }
  },
  
  // Batch submit multiple applications
  batchSubmitApplications: async (jobs, userData, optimizationEnabled = true) => {
    const results = [];
    const errors = [];
    
    console.log(`Starting batch submission for ${jobs.length} jobs`);
    
    for (const job of jobs) {
      try {
        // Optimize materials for this specific job if enabled
        let optimizedMaterials = { resume: userData.resume, coverLetter: userData.coverLetter };
        
        if (optimizationEnabled) {
          // In a real implementation, this would call the optimization service
          // For now, we'll simulate optimization
          optimizedMaterials = await simulateOptimization(job, userData);
        }
        
        // Submit the application
        const result = await submissionService.submitApplication(job, userData, optimizedMaterials);
        
        if (result.success) {
          results.push({
            jobId: job.id,
            company: job.company,
            position: job.title,
            status: 'applied',
            submissionId: result.data.applicationId || result.data.submissionId || result.data.messageId,
            submissionMethod: result.data.submissionMethod,
            timestamp: new Date().toISOString(),
          });
        } else {
          errors.push({
            jobId: job.id,
            company: job.company,
            position: job.title,
            error: result.error,
            timestamp: new Date().toISOString(),
          });
        }
        
        // Add a small delay between submissions to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        errors.push({
          jobId: job.id,
          company: job.company,
          position: job.title,
          error: error.message || 'Unknown error',
          timestamp: new Date().toISOString(),
        });
      }
    }
    
    return {
      success: errors.length === 0,
      successCount: results.length,
      failureCount: errors.length,
      results,
      errors,
    };
  },
  
  // Schedule applications to be submitted at optimal times
  scheduleApplications: async (jobs, userData, schedule) => {
    // In a real implementation, this would use a scheduling system
    // For now, we'll just return a mock response
    
    const scheduledJobs = jobs.map((job, index) => {
      // Calculate a scheduled time based on the schedule preferences
      const now = new Date();
      const scheduledTime = new Date(now.getTime() + (index + 1) * 3600000); // 1 hour apart
      
      return {
        jobId: job.id,
        company: job.company,
        position: job.title,
        scheduledTime: scheduledTime.toISOString(),
        status: 'scheduled',
      };
    });
    
    return {
      success: true,
      scheduledCount: scheduledJobs.length,
      scheduledJobs,
    };
  },
  
  // Track application status
  trackApplicationStatus: async (applicationId) => {
    // In a real implementation, this would check the status with the relevant API
    // For now, we'll return a mock status
    
    const statuses = ['Applied', 'Under Review', 'Interview Scheduled', 'Offer Received', 'Rejected'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      success: true,
      data: {
        applicationId,
        status: randomStatus,
        lastUpdated: new Date().toISOString(),
      }
    };
  }
};

// Helper function to simulate resume and cover letter optimization
async function simulateOptimization(job, userData) {
  // In a real implementation, this would use an AI service to optimize the materials
  console.log('Optimizing materials for job:', job.title);
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Extract keywords from job description
  const keywords = extractKeywords(job.description);
  
  // Create "optimized" versions by adding a note about the optimization
  // In a real implementation, this would actually modify the content
  const optimizedResume = `${userData.resume}\n\n[Optimized for ${job.title} at ${job.company} with keywords: ${keywords.join(', ')}]`;
  
  const optimizedCoverLetter = `Dear Hiring Manager at ${job.company},\n\n` +
    `I am excited to apply for the ${job.title} position at ${job.company}.\n\n` +
    `[Cover letter optimized with keywords: ${keywords.join(', ')}]\n\n` +
    `Thank you for your consideration.\n\nSincerely,\n${userData.name}`;
  
  return {
    resume: optimizedResume,
    coverLetter: optimizedCoverLetter,
  };
}

// Helper function to extract keywords from job description
function extractKeywords(description) {
  // In a real implementation, this would use NLP to extract relevant keywords
  // For now, we'll just split the text and take some words
  const words = description.split(/\s+/);
  const filteredWords = words.filter(word => 
    word.length > 4 && 
    !['and', 'with', 'the', 'for', 'this', 'that', 'have', 'from'].includes(word.toLowerCase())
  );
  
  // Get unique words and limit to 5
  return [...new Set(filteredWords)].slice(0, 5);
}

export default submissionService;