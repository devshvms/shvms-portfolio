import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import { HeroSectionProps } from '../types';
import VisitorCounter from './VisitorCounter';

const HeroSection: React.FC<HeroSectionProps> = ({ visitorCount }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <Grid item xs={12} md={6}>
      <motion.div variants={itemVariants}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(45deg, #EFC430 30%, #F4D675 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
          }}
        >
          Hello, I'm{' '}
          <Box component="span" sx={{ color: 'primary.main' }}>
            Shivam Singh
          </Box>
        </Typography>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Typography
          variant="h2"
          sx={{
            color: 'text.secondary',
            mb: 3,
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 300,
          }}
        >
          Software Developer
        </Typography>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 4,
            fontSize: '1.1rem',
            lineHeight: 1.8,
            maxWidth: '600px',
          }}
        >
          Thriving in challenging work environments where I can make a meaningful impact. 
          I am empowered by challenge to grow as a professional and contribute to 
          organizational success.
        </Typography>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <VisitorCounter count={visitorCount} />
          <Button
            variant="outlined"
            size="large"
            startIcon={<EmailIcon />}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Contact
          </Button>
        </Box>
      </motion.div>
    </Grid>
  );
};

export default HeroSection; 