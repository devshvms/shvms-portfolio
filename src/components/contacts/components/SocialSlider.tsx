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
} from '@mui/material';
import { motion } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import { SocialSliderProps } from '../../contacts/types';

// Map icon string to MUI icon component
const iconMap: Record<string, React.ReactNode> = {
  LinkedInIcon: <LinkedInIcon fontSize="large" />,
  GitHubIcon: <GitHubIcon fontSize="large" />,
  InstagramIcon: <InstagramIcon fontSize="large" />,
  TwitterIcon: <TwitterIcon fontSize="large" />,
  EmailIcon: <EmailIcon fontSize="large" />,
};

const SocialSlider: React.FC<SocialSliderProps> = ({
  currentSlide,
  socialProfiles,
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
                Connect with me
              </Typography>
                {/* Social Media Slider */}
                <Box sx={{ textAlign: 'center', mb: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ position: 'relative', mb: 3, flex: 1 }}>
                  <Paper
                    sx={{
                      p: 4,
                      backgroundColor: 'background.default',
                      borderRadius: 3,
                      minHeight: 400,
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
                      }}
                    >
                      {/* All Social Profiles */}
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          backgroundColor: socialProfiles[currentSlide].color,
                          mb: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                        onClick={() => {
                          window.open(socialProfiles[currentSlide].url, '_blank');
                        }}
                      >
                        {iconMap[socialProfiles[currentSlide].icon as string]}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'text.primary',
                          mb: 1,
                          fontWeight: 600,
                        }}
                      >
                        {socialProfiles[currentSlide].name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          textAlign: 'center',
                          maxWidth: 200,
                        }}
                      >
                        {socialProfiles[currentSlide].description}
                      </Typography>
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
                    {socialProfiles.map((_, index) => (
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

                {/* Quick Social Links */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                  {socialProfiles.map((social, index) => (
                    <motion.div
                      key={social.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconButton
                        onClick={() => window.open(social.url, '_blank')}
                        sx={{
                          backgroundColor: 'background.default',
                          color: social.color,
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '&:hover': {
                            backgroundColor: social.color,
                            color: 'white',
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {iconMap[social.icon as string]}
                      </IconButton>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Grid>
  );
};

export default SocialSlider; 