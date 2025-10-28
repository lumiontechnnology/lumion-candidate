import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Tabs,
  Tab,
  Divider,
  Card,
  CardContent,
  IconButton,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`resume-tabpanel-${index}`}
      aria-labelledby={`resume-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function ResumeBuilder() {
  const [tabValue, setTabValue] = useState(0);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(123) 456-7890',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/johndoe',
      website: 'johndoe.com',
    },
    summary: 'Experienced software engineer with 5+ years of experience in full-stack development. Proficient in React, Node.js, and cloud technologies.',
    experience: [
      {
        id: 1,
        title: 'Senior Software Engineer',
        company: 'Tech Solutions Inc.',
        location: 'New York, NY',
        startDate: '2020-01',
        endDate: 'Present',
        description: 'Led development of cloud-based applications using React and Node.js. Improved system performance by 40%.',
      },
      {
        id: 2,
        title: 'Software Developer',
        company: 'Digital Innovations',
        location: 'Boston, MA',
        startDate: '2018-03',
        endDate: '2019-12',
        description: 'Developed and maintained web applications for enterprise clients.',
      },
    ],
    education: [
      {
        id: 1,
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Technology',
        location: 'Boston, MA',
        startDate: '2014-09',
        endDate: '2018-05',
        description: 'GPA: 3.8/4.0. Relevant coursework: Data Structures, Algorithms, Web Development.',
      },
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Git', 'Agile Methodologies'],
  });
  
  const [coverLetter, setCoverLetter] = useState({
    greeting: 'Dear Hiring Manager,',
    introduction: 'I am writing to express my interest in the Software Engineer position at your company. With my background in full-stack development and cloud technologies, I believe I would be a valuable addition to your team.',
    body: 'Throughout my career, I have developed expertise in building scalable web applications using modern technologies like React and Node.js. At Tech Solutions Inc., I led the development of cloud-based applications that improved system performance by 40%. I am passionate about creating efficient, user-friendly software solutions that solve real-world problems.',
    closing: 'I am excited about the opportunity to bring my technical skills and passion for innovation to your company. Thank you for considering my application. I look forward to discussing how my experience aligns with your needs.',
    signature: 'Sincerely,\nJohn Doe',
  });
  
  const [optimizationTarget, setOptimizationTarget] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationSuccess, setOptimizationSuccess] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value,
      },
    });
  };

  const handleSummaryChange = (e) => {
    setResumeData({
      ...resumeData,
      summary: e.target.value,
    });
  };

  const handleExperienceChange = (id, field, value) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const addExperience = () => {
    const newId = Math.max(0, ...resumeData.experience.map((exp) => exp.id)) + 1;
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          id: newId,
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    });
  };

  const removeExperience = (id) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    });
  };

  const handleEducationChange = (id, field, value) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const addEducation = () => {
    const newId = Math.max(0, ...resumeData.education.map((edu) => edu.id)) + 1;
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: newId,
          degree: '',
          institution: '',
          location: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    });
  };

  const removeEducation = (id) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    });
  };

  const handleSkillsChange = (e) => {
    setResumeData({
      ...resumeData,
      skills: e.target.value.split(',').map((skill) => skill.trim()),
    });
  };

  const handleCoverLetterChange = (field, value) => {
    setCoverLetter({
      ...coverLetter,
      [field]: value,
    });
  };

  const handleOptimize = () => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    setTimeout(() => {
      setIsOptimizing(false);
      setOptimizationSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setOptimizationSuccess(false);
      }, 3000);
    }, 2000);
  };

  const handleSaveResume = () => {
    // This would connect to backend to save resume data
    console.log('Saving resume:', resumeData);
    alert('Resume saved successfully!');
  };

  const handleSaveCoverLetter = () => {
    // This would connect to backend to save cover letter
    console.log('Saving cover letter:', coverLetter);
    alert('Cover letter saved successfully!');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Resume & Cover Letter Builder
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Create and optimize your resume and cover letter for each job application.
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="resume builder tabs">
          <Tab label="Resume" />
          <Tab label="Cover Letter" />
          <Tab label="AI Optimization" />
        </Tabs>
      </Box>

      {/* Resume Tab */}
      <TabPanel value={tabValue} index={0}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={resumeData.personalInfo.name}
                onChange={handlePersonalInfoChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={resumeData.personalInfo.email}
                onChange={handlePersonalInfoChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={resumeData.personalInfo.phone}
                onChange={handlePersonalInfoChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={resumeData.personalInfo.location}
                onChange={handlePersonalInfoChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="LinkedIn"
                name="linkedin"
                value={resumeData.personalInfo.linkedin}
                onChange={handlePersonalInfoChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Website"
                name="website"
                value={resumeData.personalInfo.website}
                onChange={handlePersonalInfoChange}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Professional Summary
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={resumeData.summary}
            onChange={handleSummaryChange}
            placeholder="Write a brief summary of your professional background and key qualifications..."
          />

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Work Experience</Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={addExperience}
              variant="outlined"
              size="small"
            >
              Add Experience
            </Button>
          </Box>

          {resumeData.experience.map((exp) => (
            <Card key={exp.id} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton
                    size="small"
                    onClick={() => removeExperience(exp.id)}
                    aria-label="delete experience"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Job Title"
                      value={exp.title}
                      onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Company"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Location"
                      value={exp.location}
                      onChange={(e) => handleExperienceChange(exp.id, 'location', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Start Date"
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="End Date"
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Description"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                      placeholder="Describe your responsibilities and achievements..."
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Education</Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={addEducation}
              variant="outlined"
              size="small"
            >
              Add Education
            </Button>
          </Box>

          {resumeData.education.map((edu) => (
            <Card key={edu.id} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton
                    size="small"
                    onClick={() => removeEducation(edu.id)}
                    aria-label="delete education"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Degree"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Institution"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Location"
                      value={edu.location}
                      onChange={(e) => handleEducationChange(edu.id, 'location', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Start Date"
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="End Date"
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      label="Description"
                      value={edu.description}
                      onChange={(e) => handleEducationChange(edu.id, 'description', e.target.value)}
                      placeholder="GPA, relevant coursework, achievements..."
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Skills
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            value={resumeData.skills.join(', ')}
            onChange={handleSkillsChange}
            placeholder="Enter skills separated by commas (e.g., JavaScript, React, Node.js)"
            helperText="Enter skills separated by commas"
          />

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
            >
              Upload Resume
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveResume}
            >
              Save Resume
            </Button>
          </Box>
        </Paper>
      </TabPanel>

      {/* Cover Letter Tab */}
      <TabPanel value={tabValue} index={1}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Cover Letter Template
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Customize your cover letter template. Our AI will help tailor it for specific job applications.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Greeting"
                value={coverLetter.greeting}
                onChange={(e) => handleCoverLetterChange('greeting', e.target.value)}
                placeholder="Dear Hiring Manager,"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Introduction"
                value={coverLetter.introduction}
                onChange={(e) => handleCoverLetterChange('introduction', e.target.value)}
                placeholder="Introduce yourself and express interest in the position..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={5}
                label="Body"
                value={coverLetter.body}
                onChange={(e) => handleCoverLetterChange('body', e.target.value)}
                placeholder="Highlight relevant experience and skills..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Closing"
                value={coverLetter.closing}
                onChange={(e) => handleCoverLetterChange('closing', e.target.value)}
                placeholder="Thank the reader and express interest in an interview..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Signature"
                value={coverLetter.signature}
                onChange={(e) => handleCoverLetterChange('signature', e.target.value)}
                placeholder="Sincerely,\nYour Name"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
            >
              Upload Cover Letter
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveCoverLetter}
            >
              Save Cover Letter
            </Button>
          </Box>
        </Paper>
      </TabPanel>

      {/* AI Optimization Tab */}
      <TabPanel value={tabValue} index={2}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            AI Resume & Cover Letter Optimization
          </Typography>
          <Typography variant="body1" paragraph>
            Our AI can optimize your resume and cover letter for specific job descriptions to increase your chances of getting an interview.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Paste Job Description"
                value={optimizationTarget}
                onChange={(e) => setOptimizationTarget(e.target.value)}
                placeholder="Paste the job description here to optimize your resume and cover letter..."
              />
            </Grid>
          </Grid>

          {optimizationSuccess && (
            <Alert severity="success" sx={{ mt: 3 }}>
              Optimization complete! Your resume and cover letter have been tailored to match the job description.
            </Alert>
          )}

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AutoFixHighIcon />}
              onClick={handleOptimize}
              disabled={!optimizationTarget || isOptimizing}
              sx={{ px: 4, py: 1 }}
            >
              {isOptimizing ? 'Optimizing...' : 'Optimize for This Job'}
            </Button>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Optimization Tips
            </Typography>
            <Typography variant="body2" paragraph>
              • Include relevant keywords from the job description in your resume
            </Typography>
            <Typography variant="body2" paragraph>
              • Quantify your achievements with numbers and percentages
            </Typography>
            <Typography variant="body2" paragraph>
              • Tailor your professional summary to match the job requirements
            </Typography>
            <Typography variant="body2" paragraph>
              • In your cover letter, address specific requirements mentioned in the job posting
            </Typography>
            <Typography variant="body2">
              • Highlight experiences that directly relate to the responsibilities in the job description
            </Typography>
          </Box>
        </Paper>
      </TabPanel>
    </Container>
  );
}

export default ResumeBuilder;