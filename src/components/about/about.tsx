import React from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AboutProps } from './types';
import { useExperienceExpansion } from './hooks/useExperienceExpansion';
import ExperienceTimeline from './ExperienceTimeline';
import { usePortfolioData } from '../../resources';

const About: React.FC<AboutProps> = () => {
  const theme = useTheme();
  const { expandedId, handleExpandClick } = useExperienceExpansion();
  const { data: portfolioData, loading, error } = usePortfolioData();
  const experiences = portfolioData?.experiences || [];
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: 'gray' }}>Loading experiences...</h2>
      </Box>
    );
  }
  if (error || !Array.isArray(experiences) || experiences.length === 0) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: 'red' }}>Error: No experiences data found. Please check your Firestore portfolio/main document.</h2>
      </Box>
    );
  }

  return (
    <Box
      id="about"
      sx={{
        py: 8,
        backgroundColor: 'background.paper',
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
                Professional Experiences
              </Typography>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  maxWidth: '800px',
                  margin: '0 auto',
                }}
              >
                A journey of continuous growth and technical excellence across multiple organizations, 
                specializing in backend development, system architecture, and scalable solutions.
              </Typography>
            </motion.div>
          </Box>

          <ExperienceTimeline
            experiences={experiences || []}
            expandedId={expandedId}
            onExpandClick={handleExpandClick}
          />
        </motion.div>
      </Container>
    </Box>
  );
};

export default About; 