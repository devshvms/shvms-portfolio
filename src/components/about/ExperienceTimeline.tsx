import React from 'react';
import { Box } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import { motion } from 'framer-motion';
import WorkIcon from '@mui/icons-material/Work';
import { Experience } from './types';
import ExperienceCard from './ExperienceCard';

interface ExperienceTimelineProps {
  experiences: Experience[];
  expandedId: string;
  onExpandClick: (id: string) => void;
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences,
  expandedId,
  onExpandClick,
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <Box sx={{ mt: 6 }}>
      <Timeline position="alternate">
        {experiences.map((experience, index) => (
          <motion.div key={experience.id} variants={itemVariants}>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{
                  m: 'auto 0',
                  color: 'text.secondary',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                }}
              >
                {experience.duration}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                  }}
                >
                  <WorkIcon />
                </TimelineDot>
                {index < experiences.length - 1 && (
                  <TimelineConnector sx={{ backgroundColor: 'primary.main' }} />
                )}
              </TimelineSeparator>
              <TimelineContent>
                <ExperienceCard
                  experience={experience}
                  isExpanded={expandedId === experience.id}
                  onExpandClick={onExpandClick}
                />
              </TimelineContent>
            </TimelineItem>
          </motion.div>
        ))}
      </Timeline>
    </Box>
  );
};

export default ExperienceTimeline; 