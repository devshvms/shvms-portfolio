import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { IntroProps } from './types';
import { useVisitorTracking } from './hooks/useVisitorTracking';
import HeroSection from './components/HeroSection';
import WhatsNewSlider from './components/WhatsNewSlider';
import { useWhatsNewData } from '../../resources';

const Intro: React.FC<IntroProps> = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const visitorCount = useVisitorTracking();
  const whatsNewData = useWhatsNewData();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Auto-slide effect
  useEffect(() => {
    if (!Array.isArray(whatsNewData) || whatsNewData.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % whatsNewData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [whatsNewData]);

  const nextSlide = () => {
    if (!Array.isArray(whatsNewData) || whatsNewData.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % whatsNewData.length);
  };

  const prevSlide = () => {
    if (!Array.isArray(whatsNewData) || whatsNewData.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + whatsNewData.length) % whatsNewData.length);
  };

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  // Guard for missing or malformed data (after all hooks)
  if (!Array.isArray(whatsNewData) || whatsNewData.length === 0) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: 'red' }}>Error: No "What&apos;s New" data found. Please check your portfolioData.json.</h2>
      </Box>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <Box
      id="intro"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0A0A0A 0%, #1E1E1E 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <Grid container spacing={4} alignItems="center">
            <HeroSection visitorCount={visitorCount} />
            <WhatsNewSlider
              currentSlide={currentSlide}
              items={whatsNewData}
              onSlideChange={handleSlideChange}
              onNextSlide={nextSlide}
              onPrevSlide={prevSlide}
            />
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Intro; 