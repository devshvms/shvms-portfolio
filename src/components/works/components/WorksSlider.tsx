import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Stack,
  IconButton,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import { useWorksData } from '../../../resources';

const WorksSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const worksData = useWorksData();

  const nextSlide = () => {
    if (!Array.isArray(worksData) || worksData.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % worksData.length);
  };

  const prevSlide = () => {
    if (!Array.isArray(worksData) || worksData.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + worksData.length) % worksData.length);
  };

  const currentWork = worksData?.[currentSlide];

  // Guard clause for missing data
  if (!Array.isArray(worksData) || worksData.length === 0 || !currentWork) {
    return (
      <Box sx={{ mb: 4, textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No works data available
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      {/* Main Slider Container */}
      <Card
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          height: '100%',
          minHeight: 600,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 3,
              color: 'text.primary',
              textAlign: 'center',
            }}
          >
            {currentWork.title}
          </Typography>

          {/* Slide Content */}
          <Box sx={{ flex: 1, position: 'relative', minHeight: 450, height: { xs: 450, md: 600 } }}>
            <AnimatePresence mode="wait">
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
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {/* Project Image */}
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={currentWork.image}
                      alt={currentWork.title}
                      sx={{
                        objectFit: 'cover',
                        borderRadius: 2,
                        backgroundColor: 'background.default',
                        width: '100%',
                        maxWidth: '600px',
                        margin: '0 auto',
                      }}
                    />
                  </Box>

                  {/* Project Description */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.7,
                      textAlign: 'center',
                      mb: 3,
                      px: 2,
                      flex: 1,
                    }}
                  >
                    {currentWork.description}
                  </Typography>

                  {/* Technologies */}
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Stack 
                      direction="row" 
                      spacing={1} 
                      sx={{ justifyContent: 'center' }} 
                      flexWrap="wrap"
                    >
                      {currentWork.technologies.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            fontSize: '0.75rem',
                            mb: 1,
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  {/* Action Buttons */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Stack 
                      direction="row" 
                      spacing={2} 
                      sx={{ justifyContent: 'center' }}
                    >
                      {currentWork.githubUrl && (
                        <Button
                          variant="outlined"
                          size="medium"
                          startIcon={<GitHubIcon />}
                          onClick={() => window.open(currentWork.githubUrl, '_blank')}
                          sx={{
                            color: 'primary.main',
                            borderColor: 'primary.main',
                            '&:hover': {
                              backgroundColor: 'primary.main',
                              color: 'white',
                            },
                          }}
                        >
                          View Code
                        </Button>
                      )}
                      {currentWork.isArticle && currentWork.articleUrl && (
                        <Button
                          variant="contained"
                          size="medium"
                          startIcon={<LaunchIcon />}
                          onClick={() => window.open(currentWork.articleUrl, '_blank')}
                          sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': {
                              backgroundColor: 'primary.dark',
                            },
                          }}
                        >
                          View Article
                        </Button>
                      )}
                      {!currentWork.isArticle && currentWork.liveUrl && (
                        <Button
                          variant="contained"
                          size="medium"
                          startIcon={<LaunchIcon />}
                          onClick={() => window.open(currentWork.liveUrl, '_blank')}
                          sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': {
                              backgroundColor: 'primary.dark',
                            },
                          }}
                        >
                          Live Demo
                        </Button>
                      )}
                    </Stack>
                  </Box>
                </Box>
              </motion.div>
            </AnimatePresence>
          </Box>
        </CardContent>

        {/* Navigation Arrows */}
        <IconButton
          onClick={prevSlide}
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
          onClick={nextSlide}
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
      </Card>

      {/* Slide Indicators */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 3 }}>
        {worksData.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentSlide(index)}
            sx={{
              width: 12,
              height: 12,
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
  );
};

export default WorksSlider; 