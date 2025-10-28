/**
 * Authentication Service
 * 
 * This service handles user authentication, registration, and profile management.
 * In a production environment, this would integrate with Firebase Auth or another authentication provider.
 */

// Mock user data for demonstration purposes
const mockUsers = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'password123', // In a real app, passwords would be hashed and never stored in plain text
    name: 'Demo User',
    profileComplete: true,
    profile: {
      firstName: 'Demo',
      lastName: 'User',
      phone: '(123) 456-7890',
      location: 'New York, NY',
      title: 'Software Engineer',
      experience: '5 years',
      education: [
        {
          degree: 'Bachelor of Science in Computer Science',
          institution: 'University of Technology',
          graduationYear: '2018'
        }
      ],
      skills: [
        'JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 
        'Docker', 'RESTful APIs', 'Agile Methodologies', 'Problem Solving'
      ],
      resumeUrl: 'resume.pdf',
      coverLetterUrl: 'cover_letter.pdf',
      preferences: {
        jobTitles: ['Software Engineer', 'Frontend Developer', 'Full Stack Developer'],
        locations: ['New York, NY', 'Remote'],
        salary: [80000, 150000],
        workMode: ['Remote', 'Hybrid'],
        autoApply: true,
        emailNotifications: true
      }
    }
  }
];

// Local storage keys
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

/**
 * Simulates an API call with a delay
 * @param {Function} callback - The function to execute after delay
 * @param {number} delay - Delay in milliseconds
 * @returns {Promise} - Promise that resolves with callback result
 */
const simulateApiCall = (callback, delay = 800) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(callback());
    }, delay);
  });
};

/**
 * Generates a mock authentication token
 * @param {string} userId - The user ID
 * @returns {string} - A mock JWT token
 */
const generateToken = (userId) => {
  // In a real app, this would be a proper JWT token
  return `mock-jwt-token-${userId}-${Date.now()}`;
};

/**
 * Registers a new user
 * @param {Object} userData - User registration data
 * @returns {Promise} - Promise that resolves with user data and token
 */
const register = (userData) => {
  return simulateApiCall(() => {
    // Check if user already exists
    const existingUser = mockUsers.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser = {
      id: `${mockUsers.length + 1}`,
      email: userData.email,
      password: userData.password, // In a real app, this would be hashed
      name: `${userData.firstName} ${userData.lastName}`,
      profileComplete: false,
      profile: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone || '',
        location: userData.location || '',
        title: userData.title || '',
        experience: '',
        education: [],
        skills: [],
        resumeUrl: '',
        coverLetterUrl: '',
        preferences: {
          jobTitles: [],
          locations: [],
          salary: [0, 200000],
          workMode: ['Any'],
          autoApply: false,
          emailNotifications: true
        }
      }
    };
    
    // Add to mock database
    mockUsers.push(newUser);
    
    // Generate token
    const token = generateToken(newUser.id);
    
    // Store in local storage
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      profileComplete: newUser.profileComplete
    }));
    
    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        profileComplete: newUser.profileComplete
      },
      token
    };
  });
};

/**
 * Logs in an existing user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Promise that resolves with user data and token
 */
const login = (email, password) => {
  return simulateApiCall(() => {
    // Find user
    const user = mockUsers.find(user => user.email === email);
    
    // Check if user exists and password matches
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    // Generate token
    const token = generateToken(user.id);
    
    // Store in local storage
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      profileComplete: user.profileComplete
    }));
    
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profileComplete: user.profileComplete
      },
      token
    };
  });
};

/**
 * Logs out the current user
 * @returns {Promise} - Promise that resolves when logout is complete
 */
const logout = () => {
  return simulateApiCall(() => {
    // Clear local storage
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return true;
  });
};

/**
 * Checks if a user is currently authenticated
 * @returns {boolean} - True if user is authenticated
 */
const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

/**
 * Gets the current user data
 * @returns {Object|null} - User data or null if not authenticated
 */
const getCurrentUser = () => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

/**
 * Gets the user profile data
 * @returns {Promise} - Promise that resolves with user profile data
 */
const getUserProfile = () => {
  return simulateApiCall(() => {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      throw new Error('Not authenticated');
    }
    
    const user = mockUsers.find(user => user.id === currentUser.id);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user.profile;
  });
};

/**
 * Updates the user profile
 * @param {Object} profileData - Updated profile data
 * @returns {Promise} - Promise that resolves with updated profile
 */
const updateProfile = (profileData) => {
  return simulateApiCall(() => {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      throw new Error('Not authenticated');
    }
    
    const userIndex = mockUsers.findIndex(user => user.id === currentUser.id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Update profile
    mockUsers[userIndex].profile = {
      ...mockUsers[userIndex].profile,
      ...profileData
    };
    
    // Mark profile as complete if it has all required fields
    const profile = mockUsers[userIndex].profile;
    const isComplete = !!(
      profile.firstName && 
      profile.lastName && 
      profile.phone && 
      profile.title && 
      profile.skills.length > 0
    );
    
    mockUsers[userIndex].profileComplete = isComplete;
    
    // Update local storage
    const updatedUserData = {
      id: mockUsers[userIndex].id,
      email: mockUsers[userIndex].email,
      name: mockUsers[userIndex].name,
      profileComplete: isComplete
    };
    
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUserData));
    
    return mockUsers[userIndex].profile;
  });
};

/**
 * Updates user preferences
 * @param {Object} preferences - Updated preferences
 * @returns {Promise} - Promise that resolves with updated preferences
 */
const updatePreferences = (preferences) => {
  return simulateApiCall(() => {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      throw new Error('Not authenticated');
    }
    
    const userIndex = mockUsers.findIndex(user => user.id === currentUser.id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Update preferences
    mockUsers[userIndex].profile.preferences = {
      ...mockUsers[userIndex].profile.preferences,
      ...preferences
    };
    
    return mockUsers[userIndex].profile.preferences;
  });
};

/**
 * Uploads a resume or cover letter file
 * @param {File} file - The file to upload
 * @param {string} type - The file type ('resume' or 'coverLetter')
 * @returns {Promise} - Promise that resolves with file URL
 */
const uploadFile = (file, type) => {
  return simulateApiCall(() => {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      throw new Error('Not authenticated');
    }
    
    const userIndex = mockUsers.findIndex(user => user.id === currentUser.id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // In a real app, this would upload the file to storage
    // For now, we'll just store the filename
    const fileUrl = `${file.name}`;
    
    // Update user profile with file URL
    if (type === 'resume') {
      mockUsers[userIndex].profile.resumeUrl = fileUrl;
    } else if (type === 'coverLetter') {
      mockUsers[userIndex].profile.coverLetterUrl = fileUrl;
    }
    
    return fileUrl;
  });
};

/**
 * Resets a user's password
 * @param {string} email - The user's email
 * @returns {Promise} - Promise that resolves when password reset email is sent
 */
const resetPassword = (email) => {
  return simulateApiCall(() => {
    const user = mockUsers.find(user => user.email === email);
    
    if (!user) {
      throw new Error('No user found with this email');
    }
    
    // In a real app, this would send a password reset email
    return { success: true, message: 'Password reset email sent' };
  });
};

const authService = {
  register,
  login,
  logout,
  isAuthenticated,
  getCurrentUser,
  getUserProfile,
  updateProfile,
  updatePreferences,
  uploadFile,
  resetPassword
};

export default authService;