// Content aligned to the "Hiring Creative Job Board" concept
// Centralized JSON so UI renders in React without static HTML

const siteContent = {
  hero: {
    eyebrow: 'Start Free Trial',
    titleStrong: 'Modernizing Job',
    titleAccent: 'Search Experience',
    titleAccentBadge: 'verified',
    description:
      '10248 Job Listed Here! The compliant, blazing-fast way to discover, hire and Manage Freelance talent.',
    searchPlaceholder: 'etc: Search Your Needs',
    popularChips: ['Business', 'eCommerce', 'Health & Wellness', 'Portfolio'],
    trustedBy: ['1M+ Business','Luminous','Lightbox','FocalPoint','Polymath','Alt+Shift','Nietzsche','Acme Corp'],
    // Optional header images to display on the right side of the hero
    images: [
      'https://raw.githubusercontent.com/lumiontechnnology/lumion-candidate/master/undraw_remote-worker_0l91.svg',
    ],
  },
  globalReach: {
    titleStrong: 'Onboard Your',
    titleAccent: 'Freelancers',
    titleSuffix: 'From 186 Countries',
    description:
      'Onboard your own talent pool to Lumion, invite them to projects, sign contracts and kick off the projects. Employers can post job listings, access a pool of interview tips.',
    bullets: [
      'Fast Freelance Onboarding',
      'Onboarding Available from 186 countries',
      'Built-in freelance identity verification',
      'Contracts, NDAs and IP agreements',
    ],
    cta: 'Explore More',
    overlayCard: {
      country: 'Belgium',
      title: 'Growing with our office in Belgium',
      body:
        'Employers can post job listings, access a pool of interview tips, and career advice articles.',
    },
  },
  testimonials: {
    titleStrong: 'Reviewed by the Community.',
    titleSuffix: 'Trusted by',
    titleAccent: 'Professionals',
    items: [
      {
        rating: 5,
        quote:
          "Our AI image solutions have exceeded our customers' expectations. Onboard your own talent pool to Lumion, simpler than ever.",
        author: 'Anmul Islam',
        role: 'Co-Founder, GC Innovation Hub',
      },
      {
        rating: 5,
        quote:
          'They appreciate the opportunities and speed. Contracts and onboarding are smooth and reliable.',
        author: 'Anmul Islam',
        role: 'Co-Founder, GC Innovation Hub',
      },
      {
        rating: 5,
        quote:
          'Kick off projects faster with built-in verification and agreements. Great experience overall.',
        author: 'Anmul Islam',
        role: 'Co-Founder, GC Innovation Hub',
      },
    ],
  },
  footerDark: {
    title: "Let's Contact",
    brand: {
      name: 'Lumion',
      description:
        'Onboard your own talent pool to Lumion, invite them to projects, sign contracts and kick off the projects simpler than ever.',
      socials: [
        { name: 'facebook', url: '#' },
        { name: 'instagram', url: '#' },
        { name: 'twitter', url: '#' },
        { name: 'pinterest', url: '#' },
      ],
    },
    columns: [
      {
        title: 'Support',
        links: [
          { label: 'How it Work', to: '#' },
          { label: 'Features', to: '#' },
          { label: 'Pricing', to: '#' },
          { label: 'Download', to: '#' },
        ],
      },
      {
        title: 'Useful Links',
        links: [
          { label: 'About', to: '/about' },
          { label: 'Services', to: '#' },
          { label: 'Blog', to: '#' },
          { label: 'Contact', to: '/contact' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'FAQS', to: '#' },
          { label: 'Term & Conditions', to: '/terms' },
          { label: 'Privacy policy', to: '/privacy' },
          { label: 'Help Center', to: '#' },
        ],
      },
    ],
    copyright: '© 2023 Lumion. All Rights Reserved.',
  },
  stats: [
    { value: '45k+', label: 'Skill Aligned', subtext: 'episodes are scanned Every day, World-Wide' },
    { value: '15min+', label: 'New Podcast', subtext: 'episodes are scanned Every day, World-Wide' },
    { value: '2000+', label: 'New Podcast', subtext: 'episodes are scanned Every day, World-Wide' },
  ],
  categoriesSectionTitle: 'Popular Job Categories',
  categories: [
    { title: 'Design & Development', description: 'Keep track of tenant information and lease agreements without hassle. Our app allows you to store and manage all necessary details.', jobsAvailable: 49 },
    { title: 'Business & Consulting', description: 'Keep track of tenant information and Our app allows all necessary.', jobsAvailable: 49 },
    { title: 'Production Operation', description: 'Keep track of tenant information and Our app allows all necessary.', jobsAvailable: 49 },
    { title: 'Education & Training', description: 'Keep track of tenant information and Our app allows all necessary.', jobsAvailable: 49 },
    { title: 'Marketing & Sales', description: 'Keep track of tenant information and Our app allows all necessary.', jobsAvailable: 49 },
  ],
  companies: [
    'Lumion Labs', 'Orbit Media', 'BluePeak Studios', 'North & Co.', 'Flow Labs', 'Pioneer Creative', 'Summit Design', 'Brightline Studio', 'Nimbus Motion', 'Crescent Works',
  ],
  jobCircularsTitle: 'Featured Job Circulars',
  jobCircularsSubtitle: '10248 Job Listed Here! The compliant, blazing-fast way to discover, hire and Manage Freelance talent.',
  jobCirculars: [
    {
      title: 'Data Manager Analyst',
      company: 'Apple Inc.',
      country: 'United State of America',
      postedAgo: '06 Hours Ago',
      salary: '$45k–$65k',
      tags: ['Php','Website Developer'],
      to: '/job-search',
    },
    {
      title: 'Sr. UI Designer',
      company: 'Microsoft Inc',
      country: 'United State of America',
      postedAgo: '06 Hours Ago',
      salary: '$45k–$65k',
      tags: ['Wireframe','Prototype'],
      to: '/job-search',
    },
    {
      title: 'Graphics Designer',
      company: 'Microsoft Inc',
      country: 'United State of America',
      postedAgo: '06 Hours Ago',
      salary: '$45k–$65k',
      tags: ['UI','Design','Website'],
      to: '/job-search',
    },
    {
      title: 'WordPress Developer',
      company: 'Behance',
      country: 'United State of America',
      postedAgo: '06 Hours Ago',
      salary: '$45k–$65k',
      tags: ['UI','Design','Website'],
      to: '/job-search',
    },
    
  ],
  homeTestimonials: [
    {
      quote:
        'We hired two designers in under two weeks. The process was effortless and the candidates were incredible.',
      author: 'Head of Design, Orbit Media',
    },
    {
      quote:
        'I found my dream role with a portfolio-first application experience. Highly recommend to creatives.',
      author: 'Product Designer, BluePeak Studios',
    },
  ],
  newsletter: {
    title: 'Get weekly creative jobs in your inbox',
    subtitle: 'Curated roles and hiring tips from top studios and startups.',
    ctaLabel: 'Subscribe',
  },
  payments: {
  title: 'Payments Simplified with Lumion',
    cards: [
      { title: 'Calm Invoicing Chaos', body: '10248 Job Listed Here! The compliant, blazing-fast way to discover, hire and Manage Freelance talent.' },
      { title: 'Multi-Currency Payments System', body: '10248 Job Listed Here! The compliant, blazing-fast way to discover, hire and Manage Freelance talent.' },
      { title: 'No More Over-Budget Surprises', body: '10248 Job Listed Here! The compliant, blazing-fast way to discover, hire and Manage Freelance talent.' },
    ],
  },
};

export default siteContent;