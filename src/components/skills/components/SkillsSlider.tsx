import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
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
  Cell,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Skill } from '../../../types';
import { usePortfolioData } from '../../../resources';
import { generateSkillsData, getExperienceSkills, getWorksSkills, SkillFrequency } from '../data/skillsData';
import beStack from '../../../assets/beStack.png';
import feStack from '../../../assets/frontendStack.png';
import softSkill from '../../../assets/softSkill.png';
import systemDesign from '../../../assets/systemDesign.png';
import devopsStack from '../../../assets/devopsStack.png';

const skillsData: Skill[] = [
  {
    id: 'system-design',
    title: 'Data Flow & Software System Design',
    description: 'As a data flow and software system designer, I help companies build systems that efficiently move and process data. I do this by listening to the needs of the users and stakeholders, designing a data flow architecture, choosing the right data storage and processing technologies, and designing the system\'s user interface and APIs.',
    image: systemDesign,
  },
  {
    id: 'backend',
    title: 'Backend Web Development',
    description: 'As a REST API developer, I specialize in building the digital bridges that allow different software applications to communicate and share data seamlessly. I play a key role in making sure these interactions happen flawlessly. I\'m passionate about crafting elegant and reliable APIs that enhance the functionality of digital experiences.',
    image: beStack,
  },
  {
    id: 'frontend',
    title: 'Frontend Web Development',
    description: 'As a beginner front-end developer, I help companies build the user-facing interfaces of their websites and web applications. I do this by using HTML, CSS, and JavaScript to create visually appealing and interactive experiences. Like this portfolio website you would have noticed.',
    image: feStack,
  },
  {
    id: 'devops',
    title: 'Integration, Deployments & Cloud',
    description: 'I believe that by automating tasks and breaking down silos between development and operations teams, we can create a more efficient and agile software development process. I want to be able to help companies choose the right cloud platform for their needs and optimize their cloud deployments for performance and cost.',
    image: devopsStack,
  },
  {
    id: 'problem-solving',
    title: 'Inventiveness',
    description: 'As a creative problem solver, curious tech enthusiast, and inventive thinker, I\'m passionate about finding new and innovative ways to solve complex problems. I\'m still learning, but I\'m excited to use my skills to think outside the box and come up with creative solutions.',
    image: softSkill,
  },
];

interface SkillsGraphProps {
  data: any[];
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

  return (
    <ResponsiveContainer width="100%" height={450}>
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
  );
};

const SkillsSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewType, setViewType] = useState<'combined' | 'experience' | 'works'>('combined');
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  const { data: portfolioData, loading, error } = usePortfolioData();
  const experiences = portfolioData?.experiences || [];
  const works = portfolioData?.works || [];

  // Compute skills data from Firestore
  const skillsFrequencyData: SkillFrequency[] = generateSkillsData(experiences, works);
  const experienceSkillsData: SkillFrequency[] = getExperienceSkills(experiences);
  const worksSkillsData: SkillFrequency[] = getWorksSkills(works);

  // Combine graph and skills data
  const allSlides = [
    { type: 'graph' as const, title: 'Skills Analysis', data: skillsFrequencyData },
    { type: 'skill' as const, title: 'System Design', data: skillsData[0] },
    { type: 'skill' as const, title: 'Backend Development', data: skillsData[1] },
    { type: 'skill' as const, title: 'Frontend Development', data: skillsData[2] },
    { type: 'skill' as const, title: 'DevOps & Cloud', data: skillsData[3] },
    { type: 'skill' as const, title: 'Problem Solving', data: skillsData[4] },
  ];

  const getGraphData = () => {
    switch (viewType) {
      case 'experience':
        return experienceSkillsData;
      case 'works':
        return worksSkillsData;
      default:
        return skillsFrequencyData;
    }
  };

  const getGraphTitle = () => {
    switch (viewType) {
      case 'experience':
        return 'Skills from Experience';
      case 'works':
        return 'Skills from Works';
      default:
        return 'Combined Skills Frequency';
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + allSlides.length) % allSlides.length);
  };

  const currentSlideData = allSlides[currentSlide];

  if (loading) {
    return <Box sx={{ py: 4, textAlign: 'center' }}><Typography>Loading skills data...</Typography></Box>;
  }
  if (error) {
    return <Box sx={{ py: 4, textAlign: 'center' }}><Typography color="error">Error loading skills data.</Typography></Box>;
  }

  return (
    <Box sx={{ mb: 4 }}>
      {/* Controls */}
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
        </ToggleButtonGroup>
      </Box>

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
            {currentSlideData.type === 'graph' ? getGraphTitle() : currentSlideData.data.title}
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
                {currentSlideData.type === 'graph' ? (
                  <SkillsGraph
                    data={getGraphData()}
                    title={getGraphTitle()}
                    type={chartType}
                  />
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                        textAlign: 'center',
                        mb: 3,
                        px: 2,
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {currentSlideData.data.description}
                    </Typography>
                  </Box>
                )}
              </motion.div>
            </AnimatePresence>
          </Box>
        </CardContent>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
          <IconButton
            onClick={prevSlide}
            sx={{
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          {/* Indicators */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {allSlides.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: index === currentSlide ? 'primary.main' : 'text.disabled',
                  cursor: 'pointer',
                }}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </Box>

          <IconButton
            onClick={nextSlide}
            sx={{
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
};

export default SkillsSlider; 