import React from 'react';
import {
  Box,
  Typography,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { VisitorCounterProps } from '../types';

const VisitorCounter: React.FC<VisitorCounterProps> = ({ count }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Chip
        icon={<VisibilityIcon />}
        label={`${count} visitors`}
        sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          fontSize: '0.9rem',
          fontWeight: 500,
          '& .MuiChip-icon': {
            color: 'primary.contrastText',
          },
        }}
      />
    </motion.div>
  );
};

export default VisitorCounter; 