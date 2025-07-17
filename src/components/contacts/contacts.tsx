import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Snackbar,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Contact } from '../../types';
import SocialSlider from './components/SocialSlider';
import { usePortfolioData } from '../../resources';

const Contacts: React.FC = () => {
  const [formData, setFormData] = useState<Contact>({
    name: '',
    email: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: portfolioData, loading, error } = usePortfolioData();
  const socialProfiles = portfolioData?.social?.profiles || [];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (!Array.isArray(socialProfiles) || socialProfiles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % socialProfiles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [socialProfiles]);
  
  // For nextSlide and prevSlide:
  const nextSlide = () => {
    if (!Array.isArray(socialProfiles) || socialProfiles.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % socialProfiles.length);
  };
  
  const prevSlide = () => {
    if (!Array.isArray(socialProfiles) || socialProfiles.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + socialProfiles.length) % socialProfiles.length);
  };

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSnackbar({
        open: true,
        message: 'Please fill in all fields',
        severity: 'error',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid email address',
        severity: 'error',
      });
      return;
    }

    try {
      // Here you would typically send the form data to your backend or email service
      // For now, we'll just simulate a successful submission
      console.log('Form submitted:', formData);
      
      setSnackbar({
        open: true,
        message: 'Thank you for your message! I\'ll get back to you soon.',
        severity: 'success',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Something went wrong. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: 'gray' }}>Loading contact data...</h2>
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: 'red' }}>Error loading contact data. Please check your Firestore portfolio/main document.</h2>
      </Box>
    );
  }

  if (!Array.isArray(socialProfiles) || socialProfiles.length === 0) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: 'red' }}>Error: No social profiles found. Please check your portfolioData.json.</h2>
      </Box>
    );
  }

  return (
    <Box
      id="contact"
      sx={{
        py: 8,
        backgroundColor: 'background.default',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: 'text.primary',
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                Get In Touch
              </Typography>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                I'm always interested in hearing about new opportunities and exciting projects. 
                Feel free to reach out if you'd like to connect!
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Card
                  sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    height: '100%',
                    minHeight: 600,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 600,
                        mb: 3,
                        color: 'text.primary',
                      }}
                    >
                      Send Message
                    </Typography>
                    
                    <Box component="form" onSubmit={handleSubmit} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        sx={{ mb: 3 }}
                        required
                      />
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        sx={{ mb: 3 }}
                        required
                      />
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        sx={{ mb: 3, flex: 1, minHeight: 120 }}
                        required
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText',
                          py: 1.5,
                          fontSize: '1.1rem',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                          },
                        }}
                      >
                        Send Message
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <SocialSlider
              currentSlide={currentSlide}
              socialProfiles={socialProfiles}
              onSlideChange={handleSlideChange}
              onNextSlide={nextSlide}
              onPrevSlide={prevSlide}
            />
          </Grid>
        </motion.div>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contacts; 