/**
 * Optimization Service
 * 
 * This service handles the optimization of resumes and cover letters for job applications.
 * It uses AI-based techniques to tailor content to specific job descriptions.
 */

// Mock data for keyword extraction
const commonJobKeywords = {
  'software engineer': ['JavaScript', 'React', 'Node.js', 'API', 'full-stack', 'frontend', 'backend', 'cloud', 'AWS', 'algorithms', 'data structures'],
  'data scientist': ['Python', 'R', 'machine learning', 'deep learning', 'statistics', 'data analysis', 'visualization', 'SQL', 'big data', 'models'],
  'product manager': ['roadmap', 'strategy', 'user research', 'agile', 'scrum', 'stakeholder', 'requirements', 'KPI', 'metrics', 'prioritization'],
  'marketing': ['campaigns', 'analytics', 'social media', 'content strategy', 'SEO', 'SEM', 'brand', 'audience', 'conversion', 'engagement'],
  'sales': ['negotiation', 'relationship building', 'pipeline', 'CRM', 'closing', 'quota', 'prospecting', 'client', 'revenue', 'targets'],
  'designer': ['UI', 'UX', 'user experience', 'wireframes', 'prototypes', 'Figma', 'Adobe', 'visual design', 'user research', 'accessibility'],
  'finance': ['analysis', 'forecasting', 'budgeting', 'reporting', 'Excel', 'accounting', 'financial modeling', 'compliance', 'risk management'],
  'human resources': ['recruitment', 'talent acquisition', 'employee relations', 'benefits', 'compensation', 'training', 'development', 'HRIS', 'policies'],
};

// Mock data for resume sections
const resumeSections = {
  summary: {
    title: 'Professional Summary',
    content: 'Experienced professional with a track record of delivering results...'
  },
  experience: [
    {
      title: 'Senior Developer',
      company: 'Tech Company Inc.',
      date: 'Jan 2020 - Present',
      bullets: [
        'Led development of key features resulting in 30% user growth',
        'Collaborated with cross-functional teams to deliver projects on time',
        'Mentored junior developers and conducted code reviews'
      ]
    },
    {
      title: 'Developer',
      company: 'Software Solutions LLC',
      date: 'Mar 2017 - Dec 2019',
      bullets: [
        'Developed and maintained web applications using React and Node.js',
        'Implemented RESTful APIs and integrated third-party services',
        'Participated in agile development process and sprint planning'
      ]
    }
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      date: '2013 - 2017'
    }
  ],
  skills: [
    'JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 
    'Docker', 'RESTful APIs', 'Agile Methodologies', 'Problem Solving'
  ]
};

/**
 * Analyzes a job description to extract key requirements and skills
 * @param {string} jobDescription - The job description text
 * @param {string} jobTitle - The job title
 * @returns {Object} - Extracted keywords and requirements
 */
const analyzeJobDescription = (jobDescription, jobTitle) => {
  // In a real implementation, this would use NLP or AI to extract keywords
  // For now, we'll use a simple keyword matching approach
  
  const keywords = [];
  const requirements = [];
  
  // Find the job category based on the title
  const jobCategory = Object.keys(commonJobKeywords).find(category => 
    jobTitle.toLowerCase().includes(category)
  ) || 'software engineer'; // Default to software engineer if no match
  
  // Get common keywords for this job category
  const categoryKeywords = commonJobKeywords[jobCategory] || [];
  
  // Simple keyword extraction (in a real app, this would be more sophisticated)
  categoryKeywords.forEach(keyword => {
    if (jobDescription.toLowerCase().includes(keyword.toLowerCase())) {
      keywords.push(keyword);
      
      // Extract sentences containing the keyword as potential requirements
      const sentences = jobDescription.split(/[.!?]+/);
      sentences.forEach(sentence => {
        if (sentence.toLowerCase().includes(keyword.toLowerCase())) {
          const requirement = sentence.trim();
          if (requirement && !requirements.includes(requirement)) {
            requirements.push(requirement);
          }
        }
      });
    }
  });
  
  return {
    keywords,
    requirements: requirements.slice(0, 5), // Limit to top 5 requirements
    jobCategory
  };
};

/**
 * Optimizes a resume based on job description analysis
 * @param {Object} resume - The user's resume data
 * @param {Object} jobAnalysis - Analysis of the job description
 * @returns {Object} - The optimized resume
 */
const optimizeResume = (resume, jobAnalysis) => {
  const { keywords, jobCategory } = jobAnalysis;
  
  // Create a deep copy of the resume to avoid modifying the original
  const optimizedResume = JSON.parse(JSON.stringify(resume));
  
  // Optimize the summary section
  if (optimizedResume.summary) {
    let newSummary = optimizedResume.summary.content;
    
    // Add relevant keywords if they're not already in the summary
    keywords.forEach(keyword => {
      if (!newSummary.toLowerCase().includes(keyword.toLowerCase())) {
        // In a real implementation, this would use more sophisticated NLP to integrate keywords naturally
        newSummary = newSummary.replace(
          'results...', 
          `results in ${jobCategory} with expertise in ${keyword}...`
        );
      }
    });
    
    optimizedResume.summary.content = newSummary;
  }
  
  // Optimize experience bullet points
  if (optimizedResume.experience && optimizedResume.experience.length > 0) {
    optimizedResume.experience.forEach(job => {
      // Enhance bullet points with relevant keywords
      job.bullets = job.bullets.map(bullet => {
        // Find a keyword that's relevant but not already in this bullet
        const relevantKeyword = keywords.find(
          keyword => !bullet.toLowerCase().includes(keyword.toLowerCase())
        );
        
        if (relevantKeyword) {
          // In a real implementation, this would use more sophisticated NLP
          return bullet.includes('using') 
            ? bullet.replace('using', `using ${relevantKeyword} and`) 
            : `${bullet} utilizing ${relevantKeyword}`;
        }
        
        return bullet;
      });
    });
  }
  
  // Reorder skills to prioritize relevant ones
  if (optimizedResume.skills && optimizedResume.skills.length > 0) {
    const relevantSkills = [];
    const otherSkills = [];
    
    optimizedResume.skills.forEach(skill => {
      if (keywords.some(keyword => 
        skill.toLowerCase().includes(keyword.toLowerCase()) || 
        keyword.toLowerCase().includes(skill.toLowerCase())
      )) {
        relevantSkills.push(skill);
      } else {
        otherSkills.push(skill);
      }
    });
    
    optimizedResume.skills = [...relevantSkills, ...otherSkills];
  }
  
  return optimizedResume;
};

/**
 * Generates a tailored cover letter based on resume, job description, and company
 * @param {Object} resume - The user's resume data
 * @param {string} jobDescription - The job description
 * @param {string} jobTitle - The job title
 * @param {string} company - The company name
 * @returns {string} - The generated cover letter
 */
const generateCoverLetter = (resume, jobDescription, jobTitle, company) => {
  // Analyze the job description
  const jobAnalysis = analyzeJobDescription(jobDescription, jobTitle);
  
  // In a real implementation, this would use AI to generate a personalized cover letter
  // For now, we'll use a template-based approach
  
  const { keywords, requirements, jobCategory } = jobAnalysis;
  
  // Extract user information from resume
  const userName = resume.name || 'Applicant';
  const userExperience = resume.experience && resume.experience.length > 0 
    ? resume.experience[0].title 
    : 'professional';
  
  // Select relevant skills from resume that match job keywords
  const relevantSkills = resume.skills
    ? resume.skills.filter(skill => 
        keywords.some(keyword => 
          skill.toLowerCase().includes(keyword.toLowerCase()) || 
          keyword.toLowerCase().includes(skill.toLowerCase())
        )
      ).slice(0, 3)
    : [];
  
  // Generate the cover letter
  const coverLetter = `
Dear Hiring Manager at ${company},

I am writing to express my interest in the ${jobTitle} position at ${company}. With my background as a ${userExperience} and expertise in ${relevantSkills.join(', ')}, I am confident in my ability to make significant contributions to your team.

Throughout my career, I have developed strong skills in ${jobCategory}, with particular focus on ${keywords.slice(0, 3).join(', ')}. I was particularly excited to see that you are looking for someone who ${requirements[0] || 'can contribute to your team'}. In my previous role, I have demonstrated this by ${resume.experience && resume.experience[0].bullets ? resume.experience[0].bullets[0] : 'delivering exceptional results'}.

${requirements[1] ? `I also noted that you require experience with ${requirements[1]}. During my time at ${resume.experience ? resume.experience[0].company : 'my previous company'}, I ${resume.experience && resume.experience[0].bullets ? resume.experience[0].bullets[1] || 'successfully implemented solutions' : 'successfully implemented solutions'} that align perfectly with this requirement.` : ''}

I am particularly drawn to ${company} because of your reputation for ${jobCategory === 'software engineer' ? 'innovative technology solutions' : 'excellence in the industry'}. I am excited about the possibility of bringing my ${relevantSkills[0] || 'expertise'} skills to your team and helping to ${jobCategory === 'software engineer' ? 'build cutting-edge solutions' : 'achieve your business objectives'}.

Thank you for considering my application. I look forward to the opportunity to discuss how my background, skills, and experiences would be an ideal fit for the ${jobTitle} position at ${company}.

Sincerely,
${userName}
  `;
  
  return coverLetter.trim();
};

/**
 * Calculates a match score between a resume and job description
 * @param {Object} resume - The user's resume data
 * @param {string} jobDescription - The job description
 * @param {string} jobTitle - The job title
 * @returns {Object} - Match score and breakdown
 */
const calculateMatchScore = (resume, jobDescription, jobTitle) => {
  const jobAnalysis = analyzeJobDescription(jobDescription, jobTitle);
  const { keywords, requirements } = jobAnalysis;
  
  let keywordScore = 0;
  let skillScore = 0;
  let experienceScore = 0;
  
  // Calculate keyword match score
  if (resume.skills) {
    const matchedSkills = resume.skills.filter(skill => 
      keywords.some(keyword => 
        skill.toLowerCase().includes(keyword.toLowerCase()) || 
        keyword.toLowerCase().includes(skill.toLowerCase())
      )
    );
    
    skillScore = Math.min(100, Math.round((matchedSkills.length / keywords.length) * 100));
  }
  
  // Calculate experience match score
  if (resume.experience) {
    const experienceText = resume.experience
      .map(job => `${job.title} ${job.bullets ? job.bullets.join(' ') : ''}`)
      .join(' ');
    
    const matchedKeywords = keywords.filter(keyword => 
      experienceText.toLowerCase().includes(keyword.toLowerCase())
    );
    
    keywordScore = Math.min(100, Math.round((matchedKeywords.length / keywords.length) * 100));
  }
  
  // Calculate requirements match score
  if (resume.experience) {
    const experienceText = resume.experience
      .map(job => `${job.title} ${job.bullets ? job.bullets.join(' ') : ''}`)
      .join(' ');
    
    const matchedRequirements = requirements.filter(req => {
      const reqWords = req.toLowerCase().split(' ').filter(word => word.length > 3);
      return reqWords.some(word => experienceText.toLowerCase().includes(word));
    });
    
    experienceScore = Math.min(100, Math.round((matchedRequirements.length / requirements.length) * 100));
  }
  
  // Calculate overall score
  const overallScore = Math.round((keywordScore + skillScore + experienceScore) / 3);
  
  return {
    overall: overallScore,
    breakdown: {
      keywordMatch: keywordScore,
      skillMatch: skillScore,
      experienceMatch: experienceScore
    },
    matchedKeywords: keywords.filter(keyword => 
      resume.skills && resume.skills.some(skill => 
        skill.toLowerCase().includes(keyword.toLowerCase()) || 
        keyword.toLowerCase().includes(skill.toLowerCase())
      )
    ),
    missingKeywords: keywords.filter(keyword => 
      !resume.skills || !resume.skills.some(skill => 
        skill.toLowerCase().includes(keyword.toLowerCase()) || 
        keyword.toLowerCase().includes(skill.toLowerCase())
      )
    )
  };
};

/**
 * Provides suggestions to improve a resume based on job match analysis
 * @param {Object} resume - The user's resume data
 * @param {Object} matchAnalysis - The match analysis result
 * @returns {Array} - List of improvement suggestions
 */
const getSuggestions = (resume, matchAnalysis) => {
  const suggestions = [];
  
  // Suggest adding missing keywords
  if (matchAnalysis.missingKeywords && matchAnalysis.missingKeywords.length > 0) {
    suggestions.push({
      type: 'missing_keywords',
      title: 'Add Missing Keywords',
      description: `Consider adding these keywords to your resume: ${matchAnalysis.missingKeywords.join(', ')}`,
      priority: 'high'
    });
  }
  
  // Suggest improving summary if keyword score is low
  if (matchAnalysis.breakdown.keywordMatch < 70) {
    suggestions.push({
      type: 'improve_summary',
      title: 'Enhance Your Professional Summary',
      description: 'Your summary could better highlight relevant experience. Include more industry-specific terminology.',
      priority: 'medium'
    });
  }
  
  // Suggest quantifying achievements
  suggestions.push({
    type: 'quantify_achievements',
    title: 'Quantify Your Achievements',
    description: 'Add metrics and specific results to your experience bullets (e.g., "increased sales by 20%").',
    priority: 'medium'
  });
  
  // Suggest skills reorganization if skill match is low
  if (matchAnalysis.breakdown.skillMatch < 60) {
    suggestions.push({
      type: 'reorganize_skills',
      title: 'Reorganize Skills Section',
      description: 'Place most relevant skills first to catch the recruiter\'s attention.',
      priority: 'low'
    });
  }
  
  return suggestions;
};

const optimizationService = {
  analyzeJobDescription,
  optimizeResume,
  generateCoverLetter,
  calculateMatchScore,
  getSuggestions,
  
  // For demo purposes only - would not be in production code
  getMockResume: () => resumeSections
};

export default optimizationService;