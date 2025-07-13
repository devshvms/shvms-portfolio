import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { motion } from 'framer-motion';
import { SkillFrequency, generateSkillsData, getExperienceSkills, getWorksSkills } from '../data/skillsData';

interface SkillsGraphProps {
  data: SkillFrequency[];
  title: string;
  type: 'bar' | 'pie';
}

const SkillsGraph: React.FC<SkillsGraphProps> = ({ data, title, type }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          sx={{
            p: 2,
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {label}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Frequency: {payload[0].value}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  if (type === 'pie') {
    return (
      <Card
        sx={{
          height: '100%',
          backgroundColor: 'background.paper',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 3,
              color: 'text.primary',
              textAlign: 'center',
            }}
          >
            {title}
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="frequency"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        height: '100%',
        backgroundColor: 'background.paper',
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 3,
            color: 'text.primary',
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: '#888' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 12, fill: '#888' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="frequency" fill="#8884d8" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const SkillsGraphContainer: React.FC = () => {
  const [viewType, setViewType] = useState<'combined' | 'experience' | 'works'>('combined');
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  const getData = () => {
    switch (viewType) {
      case 'experience':
        return getExperienceSkills();
      case 'works':
        return getWorksSkills();
      default:
        return generateSkillsData();
    }
  };

  const getTitle = () => {
    switch (viewType) {
      case 'experience':
        return 'Skills from Experience';
      case 'works':
        return 'Skills from Works';
      default:
        return 'Combined Skills Frequency';
    }
  };

  const data = getData();

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
        <ToggleButtonGroup
          value={viewType}
          exclusive
          onChange={(_, newValue) => newValue && setViewType(newValue)}
          sx={{
            '& .MuiToggleButton-root': {
              color: 'text.secondary',
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
            },
          }}
        >
          <ToggleButton value="combined">Combined</ToggleButton>
          <ToggleButton value="experience">Experience</ToggleButton>
          <ToggleButton value="works">Works</ToggleButton>
        </ToggleButtonGroup>
        
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={(_, newValue) => newValue && setChartType(newValue)}
          sx={{
            '& .MuiToggleButton-root': {
              color: 'text.secondary',
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
            },
          }}
        >
          <ToggleButton value="bar">Bar Chart</ToggleButton>
          <ToggleButton value="pie">Pie Chart</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SkillsGraph data={data} title={getTitle()} type={chartType} />
      </motion.div>
    </Box>
  );
};

export default SkillsGraphContainer; 