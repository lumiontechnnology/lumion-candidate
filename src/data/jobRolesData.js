/**
 * Job Roles Data
 * 
 * This file contains data for various job roles across different industries.
 * Used for job search, matching, and application processes.
 */

const jobRoles = [
  // Technology Roles
  {
    id: 'tech-1',
    title: 'Software Engineer',
    category: 'Technology',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS'],
    description: 'Develop and maintain software applications using various programming languages and frameworks.',
    averageSalary: { min: 80000, max: 150000 }
  },
  {
    id: 'tech-2',
    title: 'Frontend Developer',
    category: 'Technology',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue.js', 'Angular', 'UI/UX'],
    description: 'Create responsive and interactive user interfaces for web applications.',
    averageSalary: { min: 75000, max: 140000 }
  },
  {
    id: 'tech-3',
    title: 'Backend Developer',
    category: 'Technology',
    skills: ['Node.js', 'Python', 'Java', 'C#', 'SQL', 'NoSQL', 'API Design'],
    description: 'Build server-side logic, databases, and APIs for web applications.',
    averageSalary: { min: 85000, max: 150000 }
  },
  {
    id: 'tech-4',
    title: 'Full Stack Developer',
    category: 'Technology',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'HTML/CSS', 'Git'],
    description: 'Develop both client and server software for web applications.',
    averageSalary: { min: 90000, max: 160000 }
  },
  {
    id: 'tech-5',
    title: 'DevOps Engineer',
    category: 'Technology',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Azure', 'Linux', 'Terraform'],
    description: 'Implement and manage infrastructure automation and deployment pipelines.',
    averageSalary: { min: 95000, max: 165000 }
  },
  {
    id: 'tech-6',
    title: 'Data Scientist',
    category: 'Technology',
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization', 'Big Data'],
    description: 'Analyze and interpret complex data to help organizations make better decisions.',
    averageSalary: { min: 90000, max: 170000 }
  },
  {
    id: 'tech-7',
    title: 'Machine Learning Engineer',
    category: 'Technology',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'NLP', 'Computer Vision', 'Mathematics'],
    description: 'Design and implement machine learning models and systems.',
    averageSalary: { min: 100000, max: 180000 }
  },
  {
    id: 'tech-8',
    title: 'Cloud Architect',
    category: 'Technology',
    skills: ['AWS', 'Azure', 'GCP', 'Cloud Security', 'Networking', 'Serverless', 'Microservices'],
    description: 'Design and oversee the implementation of cloud computing strategies.',
    averageSalary: { min: 120000, max: 190000 }
  },
  {
    id: 'tech-9',
    title: 'QA Engineer',
    category: 'Technology',
    skills: ['Test Automation', 'Selenium', 'Jest', 'Cypress', 'Manual Testing', 'JIRA', 'Bug Tracking'],
    description: 'Ensure software quality through testing and quality assurance processes.',
    averageSalary: { min: 70000, max: 120000 }
  },
  {
    id: 'tech-10',
    title: 'UI/UX Designer',
    category: 'Technology',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
    description: 'Create intuitive and engaging user experiences for digital products.',
    averageSalary: { min: 75000, max: 130000 }
  },
  {
    id: 'tech-11',
    title: 'Cybersecurity Analyst',
    category: 'Technology',
    skills: ['Network Security', 'Penetration Testing', 'Security Audits', 'SIEM', 'Encryption', 'Risk Assessment'],
    description: 'Protect systems and data from cyber threats and security breaches.',
    averageSalary: { min: 85000, max: 150000 }
  },
  {
    id: 'tech-12',
    title: 'Database Administrator',
    category: 'Technology',
    skills: ['SQL', 'Oracle', 'MySQL', 'PostgreSQL', 'MongoDB', 'Database Design', 'Performance Tuning'],
    description: 'Manage and optimize database systems for organizations.',
    averageSalary: { min: 80000, max: 140000 }
  },
  
  // Business & Management Roles
  {
    id: 'biz-1',
    title: 'Product Manager',
    category: 'Business',
    skills: ['Product Strategy', 'User Research', 'Roadmapping', 'Agile', 'Data Analysis', 'Stakeholder Management'],
    description: 'Lead the development and launch of products from conception to market.',
    averageSalary: { min: 90000, max: 160000 }
  },
  {
    id: 'biz-2',
    title: 'Project Manager',
    category: 'Business',
    skills: ['Project Planning', 'Budgeting', 'Risk Management', 'Agile', 'Scrum', 'Stakeholder Communication'],
    description: 'Plan, execute, and close projects while ensuring they are delivered on time and within budget.',
    averageSalary: { min: 80000, max: 140000 }
  },
  {
    id: 'biz-3',
    title: 'Business Analyst',
    category: 'Business',
    skills: ['Requirements Gathering', 'Process Modeling', 'Data Analysis', 'SQL', 'Excel', 'Stakeholder Management'],
    description: 'Analyze business processes and systems to recommend improvements and solutions.',
    averageSalary: { min: 75000, max: 130000 }
  },
  {
    id: 'biz-4',
    title: 'Marketing Manager',
    category: 'Business',
    skills: ['Marketing Strategy', 'Campaign Management', 'Digital Marketing', 'Analytics', 'Content Strategy', 'SEO/SEM'],
    description: 'Develop and implement marketing strategies to promote products or services.',
    averageSalary: { min: 80000, max: 150000 }
  },
  {
    id: 'biz-5',
    title: 'Sales Manager',
    category: 'Business',
    skills: ['Sales Strategy', 'Team Leadership', 'CRM', 'Negotiation', 'Client Relationship Management', 'Forecasting'],
    description: 'Lead sales teams and develop strategies to achieve revenue targets.',
    averageSalary: { min: 85000, max: 160000 }
  },
  {
    id: 'biz-6',
    title: 'Human Resources Manager',
    category: 'Business',
    skills: ['Recruitment', 'Employee Relations', 'Performance Management', 'Benefits Administration', 'HR Policies'],
    description: 'Oversee HR functions including recruitment, employee relations, and policy development.',
    averageSalary: { min: 75000, max: 140000 }
  },
  {
    id: 'biz-7',
    title: 'Financial Analyst',
    category: 'Business',
    skills: ['Financial Modeling', 'Excel', 'Data Analysis', 'Forecasting', 'Budgeting', 'Accounting Principles'],
    description: 'Analyze financial data and provide insights to guide business decisions.',
    averageSalary: { min: 70000, max: 130000 }
  },
  {
    id: 'biz-8',
    title: 'Operations Manager',
    category: 'Business',
    skills: ['Process Improvement', 'Supply Chain', 'Team Management', 'Budgeting', 'Quality Control', 'KPI Tracking'],
    description: 'Oversee daily operations and ensure efficiency and effectiveness of business processes.',
    averageSalary: { min: 80000, max: 150000 }
  },
  
  // Creative & Design Roles
  {
    id: 'creative-1',
    title: 'Graphic Designer',
    category: 'Creative',
    skills: ['Adobe Creative Suite', 'Typography', 'Visual Design', 'Branding', 'Illustration', 'Layout Design'],
    description: 'Create visual concepts to communicate ideas that inspire, inform, or captivate consumers.',
    averageSalary: { min: 50000, max: 90000 }
  },
  {
    id: 'creative-2',
    title: 'Content Writer',
    category: 'Creative',
    skills: ['Copywriting', 'SEO', 'Content Strategy', 'Editing', 'Research', 'Storytelling', 'Brand Voice'],
    description: 'Create engaging written content for various platforms and audiences.',
    averageSalary: { min: 45000, max: 85000 }
  },
  {
    id: 'creative-3',
    title: 'Video Editor',
    category: 'Creative',
    skills: ['Adobe Premiere Pro', 'Final Cut Pro', 'After Effects', 'Storytelling', 'Color Grading', 'Audio Editing'],
    description: 'Edit and assemble recorded raw material into a finished product suitable for broadcasting.',
    averageSalary: { min: 55000, max: 95000 }
  },
  {
    id: 'creative-4',
    title: 'UX Researcher',
    category: 'Creative',
    skills: ['User Research', 'Usability Testing', 'Interviews', 'Surveys', 'Data Analysis', 'Personas', 'Journey Mapping'],
    description: 'Conduct research to understand user behaviors, needs, and motivations to inform design decisions.',
    averageSalary: { min: 70000, max: 120000 }
  },
  {
    id: 'creative-5',
    title: 'Art Director',
    category: 'Creative',
    skills: ['Visual Design', 'Creative Direction', 'Team Leadership', 'Brand Development', 'Concept Development'],
    description: 'Lead the visual style and creative direction of projects across various media.',
    averageSalary: { min: 80000, max: 140000 }
  },
  
  // Healthcare Roles
  {
    id: 'health-1',
    title: 'Registered Nurse',
    category: 'Healthcare',
    skills: ['Patient Care', 'Medical Records', 'Clinical Procedures', 'Critical Thinking', 'Communication'],
    description: 'Provide and coordinate patient care, educate patients about health conditions.',
    averageSalary: { min: 65000, max: 110000 }
  },
  {
    id: 'health-2',
    title: 'Physician Assistant',
    category: 'Healthcare',
    skills: ['Patient Assessment', 'Medical Diagnosis', 'Treatment Planning', 'Clinical Procedures', 'Electronic Health Records'],
    description: 'Practice medicine under the supervision of physicians and surgeons.',
    averageSalary: { min: 90000, max: 130000 }
  },
  {
    id: 'health-3',
    title: 'Physical Therapist',
    category: 'Healthcare',
    skills: ['Rehabilitation', 'Patient Assessment', 'Treatment Planning', 'Anatomy', 'Exercise Prescription'],
    description: 'Help injured or ill people improve movement and manage pain.',
    averageSalary: { min: 75000, max: 100000 }
  },
  {
    id: 'health-4',
    title: 'Healthcare Administrator',
    category: 'Healthcare',
    skills: ['Healthcare Operations', 'Policy Development', 'Budgeting', 'Staff Management', 'Regulatory Compliance'],
    description: 'Plan, direct, and coordinate medical and health services.',
    averageSalary: { min: 70000, max: 120000 }
  },
  
  // Education Roles
  {
    id: 'edu-1',
    title: 'Elementary School Teacher',
    category: 'Education',
    skills: ['Curriculum Development', 'Classroom Management', 'Assessment', 'Differentiated Instruction', 'Communication'],
    description: 'Educate young students in basic subjects like math and reading.',
    averageSalary: { min: 45000, max: 75000 }
  },
  {
    id: 'edu-2',
    title: 'High School Teacher',
    category: 'Education',
    skills: ['Subject Expertise', 'Curriculum Planning', 'Student Assessment', 'Classroom Management', 'Technology Integration'],
    description: 'Teach students in public or private schools at the secondary level.',
    averageSalary: { min: 50000, max: 85000 }
  },
  {
    id: 'edu-3',
    title: 'College Professor',
    category: 'Education',
    skills: ['Research', 'Academic Writing', 'Lecturing', 'Curriculum Development', 'Student Mentoring'],
    description: 'Instruct students in postsecondary institutions and conduct research.',
    averageSalary: { min: 60000, max: 130000 }
  },
  {
    id: 'edu-4',
    title: 'Education Administrator',
    category: 'Education',
    skills: ['Leadership', 'Budget Management', 'Policy Development', 'Staff Supervision', 'Program Evaluation'],
    description: 'Plan, direct, and coordinate activities of schools or educational organizations.',
    averageSalary: { min: 70000, max: 120000 }
  },
  
  // Finance Roles
  {
    id: 'finance-1',
    title: 'Accountant',
    category: 'Finance',
    skills: ['Financial Reporting', 'Tax Preparation', 'Auditing', 'Bookkeeping', 'Excel', 'Accounting Software'],
    description: 'Prepare and examine financial records, ensuring accuracy and compliance with regulations.',
    averageSalary: { min: 55000, max: 100000 }
  },
  {
    id: 'finance-2',
    title: 'Financial Advisor',
    category: 'Finance',
    skills: ['Financial Planning', 'Investment Management', 'Client Relations', 'Risk Assessment', 'Retirement Planning'],
    description: 'Provide advice on investments, insurance, mortgages, college savings, and retirement.',
    averageSalary: { min: 60000, max: 150000 }
  },
  {
    id: 'finance-3',
    title: 'Investment Banker',
    category: 'Finance',
    skills: ['Financial Modeling', 'Valuation', 'Deal Structuring', 'Client Management', 'Market Analysis', 'Negotiation'],
    description: 'Help companies and governments raise capital by issuing securities and facilitating M&A.',
    averageSalary: { min: 100000, max: 200000 }
  },
  {
    id: 'finance-4',
    title: 'Risk Analyst',
    category: 'Finance',
    skills: ['Risk Assessment', 'Statistical Analysis', 'Financial Modeling', 'Regulatory Compliance', 'Data Analysis'],
    description: 'Identify and analyze potential risks that could affect an organization\'s financial health.',
    averageSalary: { min: 70000, max: 120000 }
  },
  
  // Engineering Roles
  {
    id: 'eng-1',
    title: 'Civil Engineer',
    category: 'Engineering',
    skills: ['Structural Analysis', 'AutoCAD', 'Project Management', 'Construction Methods', 'Technical Drawing'],
    description: 'Design, develop, and supervise infrastructure projects and systems.',
    averageSalary: { min: 70000, max: 120000 }
  },
  {
    id: 'eng-2',
    title: 'Mechanical Engineer',
    category: 'Engineering',
    skills: ['CAD', 'Thermodynamics', 'Product Design', 'Manufacturing Processes', 'Material Science'],
    description: 'Design, develop, build, and test mechanical devices and systems.',
    averageSalary: { min: 75000, max: 130000 }
  },
  {
    id: 'eng-3',
    title: 'Electrical Engineer',
    category: 'Engineering',
    skills: ['Circuit Design', 'Power Systems', 'Electronics', 'Signal Processing', 'Control Systems'],
    description: 'Design, develop, and test electrical equipment and systems.',
    averageSalary: { min: 80000, max: 140000 }
  },
  {
    id: 'eng-4',
    title: 'Chemical Engineer',
    category: 'Engineering',
    skills: ['Process Design', 'Thermodynamics', 'Fluid Mechanics', 'Chemical Reactions', 'Process Safety'],
    description: 'Apply principles of chemistry, biology, and physics to solve problems involving chemicals.',
    averageSalary: { min: 85000, max: 140000 }
  },
  
  // Marketing & Communications Roles
  {
    id: 'mktg-1',
    title: 'Digital Marketing Specialist',
    category: 'Marketing',
    skills: ['SEO', 'SEM', 'Social Media Marketing', 'Content Marketing', 'Analytics', 'Email Marketing'],
    description: 'Plan and execute digital marketing campaigns across various channels.',
    averageSalary: { min: 50000, max: 90000 }
  },
  {
    id: 'mktg-2',
    title: 'Public Relations Specialist',
    category: 'Marketing',
    skills: ['Media Relations', 'Crisis Management', 'Writing', 'Event Planning', 'Strategic Communications'],
    description: 'Create and maintain a favorable public image for organizations or individuals.',
    averageSalary: { min: 55000, max: 95000 }
  },
  {
    id: 'mktg-3',
    title: 'Brand Manager',
    category: 'Marketing',
    skills: ['Brand Strategy', 'Market Research', 'Product Development', 'Campaign Management', 'Analytics'],
    description: 'Develop and implement marketing strategies to increase brand awareness and loyalty.',
    averageSalary: { min: 70000, max: 130000 }
  },
  {
    id: 'mktg-4',
    title: 'Social Media Manager',
    category: 'Marketing',
    skills: ['Content Creation', 'Community Management', 'Analytics', 'Campaign Planning', 'Trend Awareness'],
    description: 'Develop and implement social media strategies to increase engagement and brand awareness.',
    averageSalary: { min: 50000, max: 90000 }
  },
  
  // Legal Roles
  {
    id: 'legal-1',
    title: 'Attorney',
    category: 'Legal',
    skills: ['Legal Research', 'Contract Drafting', 'Negotiation', 'Client Counseling', 'Litigation'],
    description: 'Advise and represent individuals, businesses, or government agencies on legal issues or disputes.',
    averageSalary: { min: 80000, max: 180000 }
  },
  {
    id: 'legal-2',
    title: 'Paralegal',
    category: 'Legal',
    skills: ['Legal Research', 'Document Preparation', 'Case Management', 'Client Communication', 'Filing Procedures'],
    description: 'Assist lawyers by investigating facts, preparing legal documents, and conducting research.',
    averageSalary: { min: 45000, max: 75000 }
  },
  {
    id: 'legal-3',
    title: 'Compliance Officer',
    category: 'Legal',
    skills: ['Regulatory Knowledge', 'Risk Assessment', 'Policy Development', 'Auditing', 'Reporting'],
    description: 'Ensure an organization complies with internal policies and regulatory requirements.',
    averageSalary: { min: 65000, max: 120000 }
  },
  
  // Science Roles
  {
    id: 'sci-1',
    title: 'Research Scientist',
    category: 'Science',
    skills: ['Research Design', 'Data Analysis', 'Lab Techniques', 'Scientific Writing', 'Grant Writing'],
    description: 'Plan and conduct scientific experiments and investigations to advance knowledge.',
    averageSalary: { min: 70000, max: 130000 }
  },
  {
    id: 'sci-2',
    title: 'Environmental Scientist',
    category: 'Science',
    skills: ['Environmental Sampling', 'Data Analysis', 'Regulatory Compliance', 'Report Writing', 'Field Work'],
    description: 'Study environmental problems and develop solutions to protect the environment.',
    averageSalary: { min: 60000, max: 100000 }
  },
  {
    id: 'sci-3',
    title: 'Biologist',
    category: 'Science',
    skills: ['Laboratory Techniques', 'Research', 'Data Analysis', 'Microscopy', 'Experimental Design'],
    description: 'Study living organisms and their relationship to the environment.',
    averageSalary: { min: 55000, max: 95000 }
  },
  
  // Hospitality Roles
  {
    id: 'hosp-1',
    title: 'Hotel Manager',
    category: 'Hospitality',
    skills: ['Customer Service', 'Staff Management', 'Budgeting', 'Operations', 'Problem Solving'],
    description: 'Oversee all aspects of running a hotel, from staff management to customer satisfaction.',
    averageSalary: { min: 50000, max: 90000 }
  },
  {
    id: 'hosp-2',
    title: 'Event Planner',
    category: 'Hospitality',
    skills: ['Event Coordination', 'Vendor Management', 'Budgeting', 'Negotiation', 'Customer Service'],
    description: 'Plan and coordinate all aspects of events and professional meetings.',
    averageSalary: { min: 45000, max: 80000 }
  },
  
  // Construction Roles
  {
    id: 'const-1',
    title: 'Construction Manager',
    category: 'Construction',
    skills: ['Project Management', 'Budgeting', 'Blueprint Reading', 'Contract Management', 'Safety Compliance'],
    description: 'Plan, coordinate, budget, and supervise construction projects from start to finish.',
    averageSalary: { min: 70000, max: 120000 }
  },
  {
    id: 'const-2',
    title: 'Architect',
    category: 'Construction',
    skills: ['Architectural Design', 'CAD', 'Building Codes', 'Project Management', 'Client Communication'],
    description: 'Design buildings and other structures, considering appearance, functionality, and safety.',
    averageSalary: { min: 70000, max: 130000 }
  }
];

// Helper function to get job roles by category
export const getJobRolesByCategory = (category) => {
  return jobRoles.filter(role => role.category === category);
};

// Helper function to get all job categories
export const getJobCategories = () => {
  return [...new Set(jobRoles.map(role => role.category))];
};

// Helper function to search job roles by title or skills
export const searchJobRoles = (query) => {
  const lowerCaseQuery = query.toLowerCase();
  return jobRoles.filter(role => 
    role.title.toLowerCase().includes(lowerCaseQuery) || 
    role.skills.some(skill => skill.toLowerCase().includes(lowerCaseQuery))
  );
};

export default jobRoles;