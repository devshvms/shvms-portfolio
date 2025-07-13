import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Paper,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import { WhatsNewItem } from '../types';

interface WhatsNewSliderProps {
  currentSlide: number;
  items: WhatsNewItem[];
  onSlideChange: (index: number) => void;
  onNextSlide: () => void;
  onPrevSlide: () => void;
}

const WhatsNewSlider: React.FC<WhatsNewSliderProps> = ({
  currentSlide,
  items,
  onSlideChange,
  onNextSlide,
  onPrevSlide,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <Grid item xs={12} md={6}>
      <motion.div variants={cardVariants}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            sx={{
              width: '100%',
              maxWidth: 600,
              backgroundColor: 'background.paper',
              borderRadius: 4,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, color: 'text.primary', fontWeight: 600 }}>
                  Upcoming ➝
                </Typography> 
                
                {/* Project Slider */}
                <Box sx={{ position: 'relative', mb: 3 }}>
                  <Paper
                    sx={{
                      p: 4,
                      backgroundColor: 'background.default',
                      borderRadius: 3,
                      minHeight: 320,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Slide Content */}
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'text.primary',
                          mb: 2,
                          fontWeight: 600,
                          fontSize: '1.25rem',
                        }}
                      >
                        {items[currentSlide].name}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          mb: 3,
                          lineHeight: 1.6,
                          maxWidth: 400,
                          fontSize: '0.95rem',
                        }}
                      >
                        {items[currentSlide].description}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center', mb: 3 }}>
                        {items[currentSlide].technologies.map((tech: string, idx: number) => (
                          <Chip
                            key={idx}
                            label={tech}
                            size="small"
                            sx={{
                              backgroundColor: 'primary.main',
                              color: 'primary.contrastText',
                              fontSize: '0.75rem',
                              fontWeight: 500,
                            }}
                          />
                        ))}
                      </Box>

                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {items[currentSlide].githubUrl && (
                          <Button
                            variant="outlined"
                            startIcon={<GitHubIcon />}
                            onClick={() => window.open(items[currentSlide].githubUrl, '_blank')}
                            sx={{
                              borderColor: 'primary.main',
                              color: 'primary.main',
                              '&:hover': {
                                borderColor: 'primary.dark',
                                backgroundColor: 'primary.main',
                                color: 'primary.contrastText',
                              },
                            }}
                          >
                            View Code
                          </Button>
                        )}
                        {items[currentSlide].liveUrl && (
                          <Button
                            variant="contained"
                            startIcon={<LaunchIcon />}
                            onClick={() => window.open(items[currentSlide].liveUrl, '_blank')}
                            sx={{
                              backgroundColor: 'primary.main',
                              color: 'primary.contrastText',
                              '&:hover': {
                                backgroundColor: 'primary.dark',
                              },
                            }}
                          >
                            Live Demo
                          </Button>
                        )}
                      </Box>
                    </motion.div>

                    {/* Navigation Arrows */}
                    <IconButton
                      onClick={onPrevSlide}
                      sx={{
                        position: 'absolute',
                        left: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.7)',
                        },
                      }}
                    >
                      <ChevronLeftIcon />
                    </IconButton>
                    <IconButton
                      onClick={onNextSlide}
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.7)',
                        },
                      }}
                    >
                      <ChevronRightIcon />
                    </IconButton>
                  </Paper>

                  {/* Slide Indicators */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                    {items.map((_, index) => (
                      <Box
                        key={index}
                        onClick={() => onSlideChange(index)}
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: index === currentSlide ? 'primary.main' : 'text.secondary',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: index === currentSlide ? 'primary.dark' : 'text.primary',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </motion.div>
    </Grid>
  );
};

export default WhatsNewSlider; 