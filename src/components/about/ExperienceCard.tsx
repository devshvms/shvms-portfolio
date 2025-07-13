import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Collapse,
  IconButton,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Experience } from './types';

interface ExperienceCardProps {
  experience: Experience;
  isExpanded: boolean;
  onExpandClick: (id: string) => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  isExpanded,
  onExpandClick,
}) => {
  return (
    <Card
      sx={{
        backgroundColor: 'background.default',
        borderRadius: 3,
        boxShadow: isExpanded 
          ? '0 16px 48px rgba(239, 196, 48, 0.2)' 
          : '0 8px 32px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        border: isExpanded ? '2px solid' : 'none',
        borderColor: isExpanded ? 'primary.main' : 'transparent',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <BusinessIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: 'primary.main',
                fontSize: '1.1rem',
              }}
            >
              {experience.company}
            </Typography>
          </Box>
          <IconButton
            onClick={() => onExpandClick(experience.id)}
            sx={{
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(239, 196, 48, 0.1)',
              },
            }}
          >
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: 'text.primary',
            fontSize: '1.25rem',
          }}
        >
          {experience.position}
        </Typography>
        
        {!isExpanded && (
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontStyle: 'italic',
              fontSize: '0.85rem',
            }}
          >
            Click to view details
          </Typography>
        )}
        
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Box sx={{ mb: 2 }}>
            {experience.description.map((desc, idx) => (
              <Typography
                key={idx}
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.7,
                  mb: 1,
                  fontSize: '0.9rem',
                }}
              >
                • {desc}
              </Typography>
            ))}
          </Box>

          {experience.achievements && (
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: 'primary.main',
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StarIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                Key Achievements
              </Typography>
              {experience.achievements.map((achievement, idx) => (
                <Typography
                  key={idx}
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    mb: 0.5,
                    fontSize: '0.85rem',
                    fontStyle: 'italic',
                  }}
                >
                  ✨ {achievement}
                </Typography>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {experience.technologies.map((tech) => (
              <Chip
                key={tech}
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
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard; 