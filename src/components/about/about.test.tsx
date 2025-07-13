import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import About from './about';

// Mock the resources
jest.mock('../../resources', () => ({
  useExperiencesData: () => [
    {
      id: 'exp-1',
      company: 'Test Company',
      position: 'Software Engineer',
      duration: '2020 - 2023',
      description: ['Worked on React applications', 'Implemented new features'],
      technologies: ['React', 'TypeScript', 'Node.js'],
      achievements: ['Employee of the month'],
    },
    {
      id: 'exp-2',
      company: 'Another Company',
      position: 'Senior Developer',
      duration: '2023 - Present',
      description: ['Led development team', 'Architected solutions'],
      technologies: ['React', 'Python', 'AWS'],
    },
  ],
}));

// Mock the hooks
jest.mock('./hooks/useExperienceExpansion', () => ({
  useExperienceExpansion: () => ({
    expandedId: '',
    handleExpandClick: jest.fn(),
  }),
}));

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('About', () => {
  it('renders the about section with title', () => {
    renderWithTheme(<About />);
    expect(screen.getByText('Professional Experiences')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    renderWithTheme(<About />);
    expect(screen.getByText(/A journey of continuous growth/)).toBeInTheDocument();
  });

  it('renders experience timeline', () => {
    renderWithTheme(<About />);
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('Another Company')).toBeInTheDocument();
  });

  it('renders experience positions', () => {
    renderWithTheme(<About />);
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
  });

  it('renders experience durations', () => {
    renderWithTheme(<About />);
    expect(screen.getByText('2020 - 2023')).toBeInTheDocument();
    expect(screen.getByText('2023 - Present')).toBeInTheDocument();
  });

  it('renders technologies for experiences', () => {
    renderWithTheme(<About />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('handles empty experiences gracefully', () => {
    jest.mocked(require('../../resources').useExperiencesData).mockReturnValue([]);
    
    renderWithTheme(<About />);
    expect(screen.getByText('Professional Experiences')).toBeInTheDocument();
  });

  it('handles undefined experiences gracefully', () => {
    jest.mocked(require('../../resources').useExperiencesData).mockReturnValue(undefined);
    
    renderWithTheme(<About />);
    expect(screen.getByText('Professional Experiences')).toBeInTheDocument();
  });
}); 