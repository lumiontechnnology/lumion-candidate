/**
 * User Profiles Data
 * 
 * This file contains mock data for user profiles.
 * Used for testing, development, and demonstration purposes.
 */

const userProfiles = [
  {
    id: 'user-1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    location: 'New York, NY',
    title: 'Senior Software Engineer',
    experience: 8,
    education: [
      {
        degree: 'Master of Science',
        field: 'Computer Science',
        institution: 'New York University',
        year: 2015
      },
      {
        degree: 'Bachelor of Science',
        field: 'Computer Engineering',
        institution: 'University of Michigan',
        year: 2013
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
    preferredRoles: ['Software Engineer', 'Full Stack Developer', 'DevOps Engineer'],
    preferredLocations: ['New York, NY', 'Remote', 'Boston, MA'],
    preferredSalary: { min: 120000, max: 160000 },
    workMode: 'Hybrid',
    jobSearchStatus: 'Actively looking',
    applicationHistory: [
      {
        company: 'Tech Innovations Inc.',
        role: 'Senior Software Engineer',
        date: '2023-05-15',
        status: 'Interview scheduled'
      },
      {
        company: 'Digital Solutions LLC',
        role: 'Lead Developer',
        date: '2023-05-10',
        status: 'Application submitted'
      }
    ]
  },
  {
    id: 'user-2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 987-6543',
    location: 'San Francisco, CA',
    title: 'Product Manager',
    experience: 6,
    education: [
      {
        degree: 'MBA',
        field: 'Business Administration',
        institution: 'Stanford University',
        year: 2017
      },
      {
        degree: 'Bachelor of Arts',
        field: 'Economics',
        institution: 'UC Berkeley',
        year: 2014
      }
    ],
    skills: ['Product Strategy', 'User Research', 'Agile', 'Roadmapping', 'Data Analysis'],
    preferredRoles: ['Product Manager', 'Product Owner', 'Program Manager'],
    preferredLocations: ['San Francisco, CA', 'Seattle, WA', 'Remote'],
    preferredSalary: { min: 130000, max: 170000 },
    workMode: 'In-office',
    jobSearchStatus: 'Open to opportunities',
    applicationHistory: [
      {
        company: 'InnovateTech',
        role: 'Senior Product Manager',
        date: '2023-06-02',
        status: 'Second interview'
      }
    ]
  },
  {
    id: 'user-3',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.c@example.com',
    phone: '(555) 234-5678',
    location: 'Austin, TX',
    title: 'Data Scientist',
    experience: 4,
    education: [
      {
        degree: 'Ph.D.',
        field: 'Statistics',
        institution: 'University of Texas',
        year: 2019
      },
      {
        degree: 'Master of Science',
        field: 'Applied Mathematics',
        institution: 'Rice University',
        year: 2016
      }
    ],
    skills: ['Python', 'R', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistical Analysis'],
    preferredRoles: ['Data Scientist', 'Machine Learning Engineer', 'Data Analyst'],
    preferredLocations: ['Austin, TX', 'Remote', 'Houston, TX'],
    preferredSalary: { min: 110000, max: 150000 },
    workMode: 'Remote',
    jobSearchStatus: 'Actively looking',
    applicationHistory: [
      {
        company: 'DataTech Solutions',
        role: 'Senior Data Scientist',
        date: '2023-05-20',
        status: 'Offer received'
      },
      {
        company: 'AI Innovations',
        role: 'Machine Learning Engineer',
        date: '2023-05-15',
        status: 'Application rejected'
      }
    ]
  },
  {
    id: 'user-4',
    firstName: 'Emily',
    lastName: 'Garcia',
    email: 'emily.g@example.com',
    phone: '(555) 345-6789',
    location: 'Chicago, IL',
    title: 'Marketing Manager',
    experience: 7,
    education: [
      {
        degree: 'Bachelor of Science',
        field: 'Marketing',
        institution: 'Northwestern University',
        year: 2016
      }
    ],
    skills: ['Digital Marketing', 'Campaign Management', 'SEO/SEM', 'Social Media', 'Content Strategy'],
    preferredRoles: ['Marketing Manager', 'Digital Marketing Director', 'Brand Manager'],
    preferredLocations: ['Chicago, IL', 'Remote', 'New York, NY'],
    preferredSalary: { min: 90000, max: 120000 },
    workMode: 'Hybrid',
    jobSearchStatus: 'Casually looking',
    applicationHistory: [
      {
        company: 'Brand Builders Inc.',
        role: 'Senior Marketing Manager',
        date: '2023-06-05',
        status: 'Application submitted'
      }
    ]
  },
  {
    id: 'user-5',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.w@example.com',
    phone: '(555) 456-7890',
    location: 'Seattle, WA',
    title: 'UX/UI Designer',
    experience: 5,
    education: [
      {
        degree: 'Bachelor of Fine Arts',
        field: 'Graphic Design',
        institution: 'Rhode Island School of Design',
        year: 2018
      }
    ],
    skills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
    preferredRoles: ['UX Designer', 'UI Designer', 'Product Designer'],
    preferredLocations: ['Seattle, WA', 'Portland, OR', 'Remote'],
    preferredSalary: { min: 95000, max: 130000 },
    workMode: 'Remote',
    jobSearchStatus: 'Actively looking',
    applicationHistory: [
      {
        company: 'Design Innovations',
        role: 'Senior UX Designer',
        date: '2023-05-25',
        status: 'Interview scheduled'
      },
      {
        company: 'Creative Solutions',
        role: 'UI/UX Designer',
        date: '2023-05-18',
        status: 'Application submitted'
      }
    ]
  },
  {
    id: 'user-6',
    firstName: 'Jessica',
    lastName: 'Brown',
    email: 'jessica.b@example.com',
    phone: '(555) 567-8901',
    location: 'Denver, CO',
    title: 'Project Manager',
    experience: 9,
    education: [
      {
        degree: 'Master of Business Administration',
        field: 'Project Management',
        institution: 'University of Colorado',
        year: 2014
      },
      {
        degree: 'Bachelor of Science',
        field: 'Business Administration',
        institution: 'Colorado State University',
        year: 2011
      }
    ],
    skills: ['Project Planning', 'Agile', 'Scrum', 'Risk Management', 'Stakeholder Communication'],
    preferredRoles: ['Project Manager', 'Program Manager', 'Scrum Master'],
    preferredLocations: ['Denver, CO', 'Boulder, CO', 'Remote'],
    preferredSalary: { min: 100000, max: 140000 },
    workMode: 'Hybrid',
    jobSearchStatus: 'Open to opportunities',
    applicationHistory: [
      {
        company: 'Project Solutions Inc.',
        role: 'Senior Project Manager',
        date: '2023-06-01',
        status: 'Application submitted'
      }
    ]
  },
  {
    id: 'user-7',
    firstName: 'Robert',
    lastName: 'Taylor',
    email: 'robert.t@example.com',
    phone: '(555) 678-9012',
    location: 'Boston, MA',
    title: 'Financial Analyst',
    experience: 6,
    education: [
      {
        degree: 'Master of Finance',
        field: 'Finance',
        institution: 'Boston University',
        year: 2017
      },
      {
        degree: 'Bachelor of Science',
        field: 'Economics',
        institution: 'University of Massachusetts',
        year: 2015
      }
    ],
    skills: ['Financial Modeling', 'Excel', 'Data Analysis', 'Forecasting', 'Budgeting'],
    preferredRoles: ['Financial Analyst', 'Investment Analyst', 'Financial Consultant'],
    preferredLocations: ['Boston, MA', 'New York, NY', 'Remote'],
    preferredSalary: { min: 85000, max: 120000 },
    workMode: 'In-office',
    jobSearchStatus: 'Actively looking',
    applicationHistory: [
      {
        company: 'Financial Partners LLC',
        role: 'Senior Financial Analyst',
        date: '2023-05-22',
        status: 'Second interview'
      },
      {
        company: 'Investment Solutions',
        role: 'Financial Analyst',
        date: '2023-05-15',
        status: 'Application rejected'
      }
    ]
  },
  {
    id: 'user-8',
    firstName: 'Amanda',
    lastName: 'Lee',
    email: 'amanda.l@example.com',
    phone: '(555) 789-0123',
    location: 'Los Angeles, CA',
    title: 'Content Writer',
    experience: 4,
    education: [
      {
        degree: 'Bachelor of Arts',
        field: 'English Literature',
        institution: 'UCLA',
        year: 2019
      }
    ],
    skills: ['Copywriting', 'Content Strategy', 'SEO', 'Editing', 'Social Media', 'Storytelling'],
    preferredRoles: ['Content Writer', 'Content Strategist', 'Copywriter'],
    preferredLocations: ['Los Angeles, CA', 'San Diego, CA', 'Remote'],
    preferredSalary: { min: 65000, max: 90000 },
    workMode: 'Remote',
    jobSearchStatus: 'Casually looking',
    applicationHistory: [
      {
        company: 'Content Creators Inc.',
        role: 'Senior Content Writer',
        date: '2023-06-03',
        status: 'Application submitted'
      }
    ]
  },
  {
    id: 'user-9',
    firstName: 'Thomas',
    lastName: 'Martinez',
    email: 'thomas.m@example.com',
    phone: '(555) 890-1234',
    location: 'Atlanta, GA',
    title: 'Sales Manager',
    experience: 10,
    education: [
      {
        degree: 'Bachelor of Business Administration',
        field: 'Marketing',
        institution: 'Georgia State University',
        year: 2013
      }
    ],
    skills: ['Sales Strategy', 'Team Leadership', 'CRM', 'Negotiation', 'Client Relationship Management'],
    preferredRoles: ['Sales Manager', 'Sales Director', 'Business Development Manager'],
    preferredLocations: ['Atlanta, GA', 'Charlotte, NC', 'Remote'],
    preferredSalary: { min: 110000, max: 150000 },
    workMode: 'Hybrid',
    jobSearchStatus: 'Open to opportunities',
    applicationHistory: [
      {
        company: 'Sales Solutions Inc.',
        role: 'Regional Sales Manager',
        date: '2023-05-28',
        status: 'Interview scheduled'
      }
    ]
  },
  {
    id: 'user-10',
    firstName: 'Lisa',
    lastName: 'Wang',
    email: 'lisa.w@example.com',
    phone: '(555) 901-2345',
    location: 'Philadelphia, PA',
    title: 'Human Resources Manager',
    experience: 7,
    education: [
      {
        degree: 'Master of Human Resources',
        field: 'Human Resources Management',
        institution: 'Temple University',
        year: 2016
      },
      {
        degree: 'Bachelor of Arts',
        field: 'Psychology',
        institution: 'Penn State University',
        year: 2013
      }
    ],
    skills: ['Recruitment', 'Employee Relations', 'Performance Management', 'Benefits Administration', 'HR Policies'],
    preferredRoles: ['HR Manager', 'HR Director', 'Talent Acquisition Manager'],
    preferredLocations: ['Philadelphia, PA', 'New York, NY', 'Remote'],
    preferredSalary: { min: 90000, max: 130000 },
    workMode: 'In-office',
    jobSearchStatus: 'Actively looking',
    applicationHistory: [
      {
        company: 'HR Solutions LLC',
        role: 'Senior HR Manager',
        date: '2023-05-20',
        status: 'Second interview'
      },
      {
        company: 'Talent Innovations',
        role: 'HR Business Partner',
        date: '2023-05-12',
        status: 'Application rejected'
      }
    ]
  },
  {
    id: 'user-11',
    firstName: 'James',
    lastName: 'Anderson',
    email: 'james.a@example.com',
    phone: '(555) 012-3456',
    location: 'Miami, FL',
    title: 'Graphic Designer',
    experience: 5,
    education: [
      {
        degree: 'Bachelor of Fine Arts',
        field: 'Graphic Design',
        institution: 'Miami International University of Art & Design',
        year: 2018
      }
    ],
    skills: ['Adobe Creative Suite', 'Typography', 'Visual Design', 'Branding', 'Illustration'],
    preferredRoles: ['Graphic Designer', 'Visual Designer', 'Brand Designer'],
    preferredLocations: ['Miami, FL', 'Orlando, FL', 'Remote'],
    preferredSalary: { min: 60000, max: 85000 },
    workMode: 'Remote',
    jobSearchStatus: 'Actively looking',
    applicationHistory: [
      {
        company: 'Creative Designs Inc.',
        role: 'Senior Graphic Designer',
        date: '2023-06-05',
        status: 'Application submitted'
      },
      {
        company: 'Design Studio',
        role: 'Graphic Designer',
        date: '2023-05-30',
        status: 'Interview scheduled'
      }
    ]
  },
  {
    id: 'user-12',
    firstName: 'Olivia',
    lastName: 'Davis',
    email: 'olivia.d@example.com',
    phone: '(555) 123-4567',
    location: 'Portland, OR',
    title: 'Environmental Scientist',
    experience: 6,
    education: [
      {
        degree: 'Master of Science',
        field: 'Environmental Science',
        institution: 'Oregon State University',
        year: 2017
      },
      {
        degree: 'Bachelor of Science',
        field: 'Biology',
        institution: 'University of Oregon',
        year: 2015
      }
    ],
    skills: ['Environmental Sampling', 'Data Analysis', 'Regulatory Compliance', 'Field Work', 'Report Writing'],
    preferredRoles: ['Environmental Scientist', 'Environmental Consultant', 'Sustainability Specialist'],
    preferredLocations: ['Portland, OR', 'Seattle, WA', 'Remote'],
    preferredSalary: { min: 70000, max: 95000 },
    workMode: 'Hybrid',
    jobSearchStatus: 'Open to opportunities',
    applicationHistory: [
      {
        company: 'Environmental Solutions',
        role: 'Senior Environmental Scientist',
        date: '2023-05-25',
        status: 'Application submitted'
      }
    ]
  },
  {
    id: 'user-13',
    firstName: 'William',
    lastName: 'Thompson',
    email: 'william.t@example.com',
    phone: '(555) 234-5678',
    location: 'Dallas, TX',
    title: 'Civil Engineer',
    experience: 8,
    education: [
      {
        degree: 'Master of Engineering',
        field: 'Civil Engineering',
        institution: 'Texas A&M University',
        year: 2015
      },
      {
        degree: 'Bachelor of Science',
        field: 'Civil Engineering',
        institution: 'University of Texas',
        year: 2013
      }
    ],
    skills: ['Structural Analysis', 'AutoCAD', 'Project Management', 'Construction Methods', 'Technical Drawing'],
    preferredRoles: ['Civil Engineer', 'Structural Engineer', 'Project Engineer'],
    preferredLocations: ['Dallas, TX', 'Houston, TX', 'Austin, TX'],
    preferredSalary: { min: 95000, max: 130000 },
    workMode: 'In-office',
    jobSearchStatus: 'Actively looking',
    applicationHistory: [
      {
        company: 'Engineering Solutions Inc.',
        role: 'Senior Civil Engineer',
        date: '2023-06-02',
        status: 'Interview scheduled'
      },
      {
        company: 'Construction Partners',
        role: 'Project Engineer',
        date: '2023-05-20',
        status: 'Application rejected'
      }
    ]
  },
  {
    id: 'user-14',
    firstName: 'Sophia',
    lastName: 'Kim',
    email: 'sophia.k@example.com',
    phone: '(555) 345-6789',
    location: 'San Diego, CA',
    title: 'Registered Nurse',
    experience: 5,
    education: [
      {
        degree: 'Bachelor of Science',
        field: 'Nursing',
        institution: 'University of California, San Diego',
        year: 2018
      }
    ],
    skills: ['Patient Care', 'Medical Records', 'Clinical Procedures', 'Critical Thinking', 'Communication'],
    preferredRoles: ['Registered Nurse', 'Clinical Nurse', 'Nurse Practitioner'],
    preferredLocations: ['San Diego, CA', 'Los Angeles, CA', 'Remote'],
    preferredSalary: { min: 80000, max: 110000 },
    workMode: 'In-office',
    jobSearchStatus: 'Casually looking',
    applicationHistory: [
      {
        company: 'Pacific Healthcare',
        role: 'Senior Registered Nurse',
        date: '2023-05-28',
        status: 'Application submitted'
      }
    ]
  },
  {
    id: 'user-15',
    firstName: 'Daniel',
    lastName: 'Rodriguez',
    email: 'daniel.r@example.com',
    phone: '(555) 456-7890',
    location: 'Phoenix, AZ',
    title: 'Accountant',
    experience: 7,
    education: [
      {
        degree: 'Master of Accounting',
        field: 'Accounting',
        institution: 'Arizona State University',
        year: 2016
      },
      {
        degree: 'Bachelor of Science',
        field: 'Finance',
        institution: 'University of Arizona',
        year: 2014
      }
    ],
    skills: ['Financial Reporting', 'Tax Preparation', 'Auditing', 'Bookkeeping', 'Excel'],
    preferredRoles: ['Accountant', 'Financial Controller', 'Tax Specialist'],
    preferredLocations: ['Phoenix, AZ', 'Tucson, AZ', 'Remote'],
    preferredSalary: { min: 75000, max: 100000 },
    workMode: 'Hybrid',
    jobSearchStatus: 'Actively looking',
    applicationHistory: [
      {
        company: 'Accounting Partners',
        role: 'Senior Accountant',
        date: '2023-06-01',
        status: 'Second interview'
      },
      {
        company: 'Financial Services LLC',
        role: 'Tax Accountant',
        date: '2023-05-15',
        status: 'Application submitted'
      }
    ]
  },
  {
    id: 'user-16',
    firstName: 'Emma',
    lastName: 'Wilson',
    email: 'emma.w@example.com',
    phone: '(555) 567-8901',
    location: 'Minneapolis, MN',
    title: 'Elementary School Teacher',
    experience: 6,
    education: [
      {
        degree: 'Master of Education',
        field: 'Elementary Education',
        institution: 'University of Minnesota',
        year: 2017
      },
      {
        degree: 'Bachelor of Arts',
        field: 'Education',
        institution: 'St. Olaf College',
        year: 2015
      }
    ],
    skills: ['Curriculum Development', 'Classroom Management', 'Assessment', 'Differentiated Instruction'],
    preferredRoles: ['Elementary Teacher', 'Education Specialist', 'Curriculum Developer'],
    preferredLocations: ['Minneapolis, MN', 'St. Paul, MN', 'Remote'],
    preferredSalary: { min: 55000, max: 75000 },
    workMode: 'In-office',
    jobSearchStatus: 'Open to opportunities',
    applicationHistory: [
      {
        company: 'Riverside Elementary',
        role: 'Lead Teacher',
        date: '2023-05-20',
        status: 'Application submitted'
      }
    ]
  },
  {
    id: 'user-17',
    firstName: 'Alexander',
    lastName: 'Clark',
    email: 'alexander.c@example.com',
    phone: '(555) 678-9012',
    location: 'Washington, DC',
    title: 'Public Relations Specialist',
    experience: 5,
    education: [
      {
        degree: 'Bachelor of Arts',
        field: 'Communications',
        institution: 'Georgetown University',
        year: 2018
      }
    ],
    skills: ['Media Relations', 'Crisis Management', 'Writing', 'Event Planning', 'Strategic Communications'],
    preferredRoles: ['PR Specialist', 'Communications Manager', 'Media Relations Manager'],
    preferredLocations: ['Washington, DC', 'New York, NY', 'Remote'],
    preferredSalary: { min: 70000, max: 95000 },
    workMode: 'Hybrid',
    jobSearchStatus: 'Actively looking',
    applicationHistory: [
      {
        company: 'PR Solutions',
        role: 'Senior PR Specialist',
        date: '2023-06-03',
        status: 'Interview scheduled'
      },
      {
        company: 'Media Partners',
        role: 'Communications Specialist',
        date: '2023-05-25',
        status: 'Application submitted'
      }
    ]
  },
  {
    id: 'user-18',
    firstName: 'Natalie',
    lastName: 'Martin',
    email: 'natalie.m@example.com',
    phone: '(555) 789-0123',
    location: 'Nashville, TN',
    title: 'Event Planner',
    experience: 4,
    education: [
      {
        degree: 'Bachelor of Science',
        field: 'Hospitality Management',
        institution: 'Vanderbilt University',
        year: 2019
      }
    ],
    skills: ['Event Coordination', 'Vendor Management', 'Budgeting', 'Negotiation', 'Customer Service'],
    preferredRoles: ['Event Planner', 'Event Coordinator', 'Wedding Planner'],
    preferredLocations: ['Nashville, TN', 'Atlanta, GA', 'Remote'],
    preferredSalary: { min: 50000, max: 75000 },
    workMode: 'Remote',
    jobSearchStatus: 'Casually looking',
    applicationHistory: [
      {
        company: 'Event Solutions',
        role: 'Senior Event Planner',
        date: '2023-05-30',
        status: 'Application submitted'
      }
    ]
  },
  {
    id: 'user-19',
    firstName: 'Christopher',
    lastName: 'Lewis',
    email: 'christopher.l@example.com',
    phone: '(555) 890-1234',
    location: 'Detroit, MI',
    title: 'Mechanical Engineer',
    experience: 9,
    education: [
      {
        degree: 'Master of Engineering',
        field: 'Mechanical Engineering',
        institution: 'University of Michigan',
        year: 2014
      },
      {
        degree: 'Bachelor of Science',
        field: 'Mechanical Engineering',
        institution: 'Michigan State University',
        year: 2012
      }
    ],
    skills: ['CAD', 'Thermodynamics', 'Product Design', 'Manufacturing Processes', 'Material Science'],
    preferredRoles: ['Mechanical Engineer', 'Design Engineer', 'Product Development Engineer'],
    preferredLocations: ['Detroit, MI', 'Chicago, IL', 'Remote'],
    preferredSalary: { min: 95000, max: 130000 },
    workMode: 'In-office',
    jobSearchStatus: 'Actively looking',
    applicationHistory: [
      {
        company: 'Engineering Innovations',
        role: 'Senior Mechanical Engineer',
        date: '2023-06-02',
        status: 'Second interview'
      },
      {
        company: 'Automotive Design LLC',
        role: 'Lead Engineer',
        date: '2023-05-20',
        status: 'Application rejected'
      }
    ]
  },
  {
    id: 'user-20',
    firstName: 'Rachel',
    lastName: 'Green',
    email: 'rachel.g@example.com',
    phone: '(555) 901-2345',
    location: 'Denver, CO',
    title: 'Digital Marketing Specialist',
    experience: 5,
    education: [
      {
        degree: 'Bachelor of Business Administration',
        field: 'Marketing',
        institution: 'University of Colorado Denver',
        year: 2018
      }
    ],
    skills: ['SEO', 'SEM', 'Social Media Marketing', 'Content Marketing', 'Analytics', 'Email Marketing'],
    preferredRoles: ['Digital Marketing Specialist', 'SEO Specialist', 'Marketing Coordinator'],
    preferredLocations: ['Denver, CO', 'Boulder, CO', 'Remote'],
    preferredSalary: { min: 65000, max: 90000 },
    workMode: 'Remote',
    jobSearchStatus: 'Open to opportunities',
    applicationHistory: [
      {
        company: 'Digital Marketing Solutions',
        role: 'Senior Digital Marketing Specialist',
        date: '2023-05-28',
        status: 'Application submitted'
      }
    ]
  },
  {
    id: 'user-21',
    firstName: 'Kevin',
    lastName: 'Patel',
    email: 'kevin.p@example.com',
    phone: '(555) 012-3456',
    location: 'Raleigh, NC',
    title: 'Research Scientist',
    experience: 7,
    education: [
      {
        degree: 'Ph.D.',
        field: 'Biochemistry',
        institution: 'Duke University',
        year: 2016
      },
      {
        degree: 'Master of Science',
        field: 'Chemistry',
        institution: 'North Carolina State University',
        year: 2013
      }
    ],
    skills: ['Research Design', 'Data Analysis', 'Lab Techniques', 'Scientific Writing', 'Grant Writing'],
    preferredRoles: ['Research Scientist', 'Laboratory Manager', 'Research Director'],
    preferredLocations: ['Raleigh, NC', 'Durham, NC', 'Remote'],
    preferredSalary: { min: 85000, max: 120000 },
    workMode: 'In-office',
    jobSearchStatus: 'Actively looking',
    applicationHistory: [
      {
        company: 'BioResearch Inc.',
        role: 'Senior Research Scientist',
        date: '2023-06-01',
        status: 'Interview scheduled'
      },
      {
        company: 'Pharmaceutical Solutions',
        role: 'Research Lead',
        date: '2023-05-15',
        status: 'Application submitted'
      }
    ]
  },
  {
    id: 'user-22',
    firstName: 'Stephanie',
    lastName: 'Baker',
    email: 'stephanie.b@example.com',
    phone: '(555) 123-4567',
    location: 'Salt Lake City, UT',
    title: 'UX Researcher',
    experience: 4,
    education: [
      {
        degree: 'Master of Human-Computer Interaction',
        field: 'Human-Computer Interaction',
        institution: 'University of Utah',
        year: 2019
      },
      {
        degree: 'Bachelor of Arts',
        field: 'Psychology',
        institution: 'Brigham Young University',
        year: 2017
      }
    ],
    skills: ['User Research', 'Usability Testing', 'Interviews', 'Surveys', 'Data Analysis', 'Personas'],
    preferredRoles: ['UX Researcher', 'User Researcher', 'UX Analyst'],
    preferredLocations: ['Salt Lake City, UT', 'Denver, CO', 'Remote'],
    preferredSalary: { min: 75000, max: 100000 },
    workMode: 'Remote',
    jobSearchStatus: 'Casually looking',
    applicationHistory: [
      {
        company: 'UX Solutions',
        role: 'Senior UX Researcher',
        date: '2023-05-25',
        status: 'Application submitted'
      }
    ]
  },
  {
    id: 'user-23',
    firstName: 'Brandon',
    lastName: 'Wright',
    email: 'brandon.w@example.com',
    phone: '(555) 234-5678',
    location: 'Las Vegas, NV',
    title: 'Hotel Manager',
    experience: 8,
    education: [
      {
        degree: 'Bachelor of Science',
        field: 'Hospitality Management',
        institution: 'University of Nevada, Las Vegas',
        year: 2015
      }
    ],
    skills: ['Customer Service', 'Staff Management', 'Budgeting', 'Operations', 'Problem Solving'],
    preferredRoles: ['Hotel Manager', 'Hospitality Manager', 'Operations Manager'],
    preferredLocations: ['Las Vegas, NV', 'Phoenix, AZ', 'Remote'],
    preferredSalary: { min: 70000, max: 100000 },
    workMode: 'In-office',
    jobSearchStatus: 'Open to opportunities',
    applicationHistory: [
      {
        company: 'Luxury Hotels Inc.',
        role: 'Senior Hotel Manager',
        date: '2023-06-03',
        status: 'Second interview'
      }
    ]
  },
  {
    id: 'user-24',
    firstName: 'Michelle',
    lastName: 'Turner',
    email: 'michelle.t@example.com',
    phone: '(555) 345-6789',
    location: 'Pittsburgh, PA',
    title: 'Electrical Engineer',
    experience: 6,
    education: [
      {
        degree: 'Master of Science',
        field: 'Electrical Engineering',
        institution: 'Carnegie Mellon University',
        year: 2017
      },
      {
        degree: 'Bachelor of Science',
        field: 'Electrical Engineering',
        institution: 'University of Pittsburgh',
        year: 2015
      }
    ],
    skills: ['Circuit Design', 'Power Systems', 'Electronics', 'Signal Processing', 'Control Systems'],
    preferredRoles: ['Electrical Engineer', 'Power Systems Engineer', 'Electronics Engineer'],
    preferredLocations: ['Pittsburgh, PA', 'Philadelphia, PA', 'Remote'],
    preferredSalary: { min: 90000, max: 125000 },
    workMode: 'Hybrid',
    jobSearchStatus: 'Actively looking',
    applicationHistory: [
      {
        company: 'Electrical Solutions Inc.',
        role: 'Senior Electrical Engineer',
        date: '2023-05-30',
        status: 'Interview scheduled'
      },
      {
        company: 'Power Systems LLC',
        role: 'Lead Engineer',
        date: '2023-05-20',
        status: 'Application submitted'
      }
    ]
  },
  {
    id: 'user-25',
    firstName: 'Jonathan',
    lastName: 'Adams',
    email: 'jonathan.a@example.com',
    phone: '(555) 456-7890',
    location: 'Columbus, OH',
    title: 'Business Analyst',
    experience: 5,
    education: [
      {
        degree: 'Master of Business Administration',
        field: 'Business Analytics',
        institution: 'Ohio State University',
        year: 2018
      },
      {
        degree: 'Bachelor of Science',
        field: 'Information Systems',
        institution: 'Miami University',
        year: 2016
      }
    ],
    skills: ['Requirements Gathering', 'Process Modeling', 'Data Analysis', 'SQL', 'Excel', 'Stakeholder Management'],
    preferredRoles: ['Business Analyst', 'Systems Analyst', 'Process Analyst'],
    preferredLocations: ['Columbus, OH', 'Cincinnati, OH', 'Remote'],
    preferredSalary: { min: 75000, max: 100000 },
    workMode: 'Remote',
    jobSearchStatus: 'Open to opportunities',
    applicationHistory: [
      {
        company: 'Business Solutions Inc.',
        role: 'Senior Business Analyst',
        date: '2023-06-02',
        status: 'Application submitted'
      }
    ]
  },
  {
    id: 'user-26',
    firstName: 'Nicole',
    lastName: 'Campbell',
    email: 'nicole.c@example.com',
    phone: '(555) 567-8901',
    location: 'Kansas City, MO',
    title: 'Social Media Manager',
    experience: 4,
    education: [
      {
        degree: 'Bachelor of Arts',
        field: 'Communications',
        institution: 'University of Missouri',
        year: 2019
      }
    ],
    skills: ['Content Creation', 'Community Management', 'Analytics', 'Campaign Planning', 'Trend Awareness'],
    preferredRoles: ['Social Media Manager', 'Digital Content Manager', 'Community Manager'],
    preferredLocations: ['Kansas City, MO', 'St. Louis, MO', 'Remote'],
    preferredSalary: { min: 55000, max: 80000 },
    workMode: 'Remote',
    jobSearchStatus: 'Actively looking',
    applicationHistory: [
      {
        company: 'Digital Media Solutions',
        role: 'Senior Social Media Manager',
        date: '2023-05-28',
        status: 'Interview scheduled'
      },
      {
        company: 'Content Creators LLC',
        role: 'Social Media Specialist',
        date: '2023-05-15',
        status: 'Application rejected'
      }
    ]
  },
  {
    id: 'user-27',
    firstName: 'Eric',
    lastName: 'Mitchell',
    email: 'eric.m@example.com',
    phone: '(555) 678-9012',
    location: 'Charlotte, NC',
    title: 'Financial Advisor',
    experience: 7,
    education: [
      {
        degree: 'Master of Finance',
        field: 'Finance',
        institution: 'University of North Carolina',
        year: 2016
      },
      {
        degree: 'Bachelor of Science',
        field: 'Economics',
        institution: 'Wake Forest University',
        year: 2014
      }
    ],
    skills: ['Financial Planning', 'Investment Management', 'Client Relations', 'Risk Assessment', 'Retirement Planning'],
    preferredRoles: ['Financial Advisor', 'Wealth Manager', 'Investment Consultant'],
    preferredLocations: ['Charlotte, NC', 'Raleigh, NC', 'Remote'],
    preferredSalary: { min: 85000, max: 130000 },
    workMode: 'Hybrid',
    jobSearchStatus: 'Open to opportunities',
    applicationHistory: [
      {
        company: 'Financial Partners',
        role: 'Senior Financial Advisor',
        date: '2023-06-01',
        status: 'Application submitted'
      }
    ]
  },
  {
    id: 'user-28',
    firstName: 'Samantha',
    lastName: 'Roberts',
    email: 'samantha.r@example.com',
    phone: '(555) 789-0123',
    location: 'Indianapolis, IN',
    title: 'Paralegal',
    experience: 5,
    education: [
      {
        degree: 'Associate of Science',
        field: 'Paralegal Studies',
        institution: 'Indiana University',
        year: 2018
      },
      {
        degree: 'Bachelor of Arts',
        field: 'Political Science',
        institution: 'Butler University',
        year: 2016
      }
    ],
    skills: ['Legal Research', 'Document Preparation', 'Case Management', 'Client Communication', 'Filing Procedures'],
    preferredRoles: ['Paralegal', 'Legal Assistant', 'Legal Support Specialist'],
    preferredLocations: ['Indianapolis, IN', 'Chicago, IL', 'Remote'],
    preferredSalary: { min: 50000, max: 70000 },
    workMode: 'In-office',
    jobSearchStatus: 'Actively looking',
    applicationHistory: [
      {
        company: 'Legal Partners LLC',
        role: 'Senior Paralegal',
        date: '2023-05-25',
        status: 'Second interview'
      },
      {
        company: 'Law Associates',
        role: 'Paralegal Specialist',
        date: '2023-05-10',
        status: 'Application submitted'
      }
    ]
  },
  {
    id: 'user-29',
    firstName: 'Andrew',
    lastName: 'Phillips',
    email: 'andrew.p@example.com',
    phone: '(555) 890-1234',
    location: 'Baltimore, MD',
    title: 'Architect',
    experience: 8,
    education: [
      {
        degree: 'Master of Architecture',
        field: 'Architecture',
        institution: 'University of Maryland',
        year: 2015
      },
      {
        degree: 'Bachelor of Science',
        field: 'Architectural Studies',
        institution: 'Virginia Tech',
        year: 2013
      }
    ],
    skills: ['Architectural Design', 'CAD', 'Building Codes', 'Project Management', 'Client Communication'],
    preferredRoles: ['Architect', 'Project Architect', 'Design Manager'],
    preferredLocations: ['Baltimore, MD', 'Washington, DC', 'Remote'],
    preferredSalary: { min: 90000, max: 130000 },
    workMode: 'Hybrid',
    jobSearchStatus: 'Casually looking',
    applicationHistory: [
      {
        company: 'Architectural Innovations',
        role: 'Senior Architect',
        date: '2023-06-03',
        status: 'Application submitted'
      }
    ]
  },
  {
    id: 'user-30',
    firstName: 'Laura',
    lastName: 'Scott',
    email: 'laura.s@example.com',
    phone: '(555) 901-2345',
    location: 'Sacramento, CA',
    title: 'Compliance Officer',
    experience: 6,
    education: [
      {
        degree: 'Juris Doctor',
        field: 'Law',
        institution: 'University of California, Davis',
        year: 2017
      },
      {
        degree: 'Bachelor of Arts',
        field: 'Political Science',
        institution: 'California State University, Sacramento',
        year: 2014
      }
    ],
    skills: ['Regulatory Knowledge', 'Risk Assessment', 'Policy Development', 'Auditing', 'Reporting'],
    preferredRoles: ['Compliance Officer', 'Regulatory Affairs Manager', 'Compliance Manager'],
    preferredLocations: ['Sacramento, CA', 'San Francisco, CA', 'Remote'],
    preferredSalary: { min: 85000, max: 120000 },
    workMode: 'Remote',
    jobSearchStatus: 'Actively looking',
    applicationHistory: [
      {
        company: 'Regulatory Solutions',
        role: 'Senior Compliance Officer',
        date: '2023-05-30',
        status: 'Interview scheduled'
      },
      {
        company: 'Financial Compliance LLC',
        role: 'Compliance Specialist',
        date: '2023-05-15',
        status: 'Application submitted'
      }
    ]
  }
];

// Helper function to get user profiles by job title
export const getUserProfilesByTitle = (title) => {
  return userProfiles.filter(profile => profile.title === title);
};

// Helper function to get user profiles by location
export const getUserProfilesByLocation = (location) => {
  return userProfiles.filter(profile => profile.location === location);
};

// Helper function to search user profiles by name or skills
export const searchUserProfiles = (query) => {
  const lowerCaseQuery = query.toLowerCase();
  return userProfiles.filter(profile => 
    `${profile.firstName} ${profile.lastName}`.toLowerCase().includes(lowerCaseQuery) || 
    profile.skills.some(skill => skill.toLowerCase().includes(lowerCaseQuery))
  );
};

export default userProfiles;