import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SkillsSlider from './components/SkillsSlider';

const Skills: React.FC = () => {
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
      id="skills"
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
                Technical Skills
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
                My expertise spans across backend development, system architecture, data flow design, 
                and cloud technologies. I specialize in building scalable, maintainable, and high-performance solutions.
              </Typography>
            </motion.div>
          </Box>

          {/* Unified Skills Slider */}
          <motion.div variants={cardVariants}>
            <SkillsSlider />
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Skills; 