import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import WorksSlider from './components/WorksSlider';

const Works: React.FC = () => {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <Box
      id="works"
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
            <motion.div variants={cardVariants}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: 'text.primary',
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                My Works
              </Typography>
            </motion.div>
            <motion.div variants={cardVariants}>
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
                Here are some of my recent works that showcase my skills in web development, 
                problem-solving, and creating user-friendly applications.
              </Typography>
            </motion.div>
          </Box>

          {/* Works Slider */}
          <motion.div variants={cardVariants}>
            <WorksSlider />
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Works; 