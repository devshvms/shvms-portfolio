import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <LinkedInIcon />,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/shivamsingh361',
    },
    {
      icon: <GitHubIcon />,
      name: 'GitHub',
      url: 'https://github.com/dev.shvms',
    },
    {
      icon: <TwitterIcon />,
      name: 'Twitter',
      url: 'https://twitter.com/dev.shvms',
    },
    {
      icon: <InstagramIcon />,
      name: 'Instagram',
      url: 'https://instagram.com/singh.shvm',
    },
    {
      icon: <EmailIcon />,
      name: 'Email',
      url: 'mailto:dev.shvms@gmail.com',
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        py: 4,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                mb: 1,
              }}
            >
              Shivam Singh
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                maxWidth: '400px',
              }}
            >
              Software Developer passionate about creating efficient, scalable, and user-friendly applications. 
              Always eager to learn and take on new challenges.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.primary',
                  mb: 2,
                  fontWeight: 600,
                }}
              >
                Connect With Me
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      onClick={() => window.open(social.url, '_blank')}
                      sx={{
                        color: 'text.secondary',
                        backgroundColor: 'background.default',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText',
                        },
                        transition: 'all 0.3s ease',
                      }}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            © {currentYear} Shivam Singh. All rights reserved.
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textAlign: { xs: 'center', sm: 'right' },
            }}
          >
            Built with Cursor
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 