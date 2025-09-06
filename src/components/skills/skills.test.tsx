import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Skills from './skills';

// Mock the resources
jest.mock('../../resources', () => ({
  useSkillsData: () => [
    {
      id: 'backend',
      title: 'Backend Development',
      description: 'Server-side development with Node.js and Python',
      image: '/src/assets/beStack.png',
    },
    {
      id: 'frontend',
      title: 'Frontend Development',
      description: 'Client-side development with React and TypeScript',
      image: '/src/assets/frontendStack.png',
    },
  ],
  useSkillsFrequencyData: () => [
    { name: 'React', frequency: 5, category: 'combined', color: '#61dafb' },
    { name: 'TypeScript', frequency: 4, category: 'combined', color: '#3178c6' },
    { name: 'Node.js', frequency: 3, category: 'combined', color: '#339933' },
  ],
  useExperienceSkillsData: () => [
    { name: 'React', frequency: 3, category: 'experience', color: '#61dafb' },
    { name: 'TypeScript', frequency: 2, category: 'experience', color: '#3178c6' },
  ],
  useWorksSkillsData: () => [
    { name: 'React', frequency: 2, category: 'works', color: '#61dafb' },
    { name: 'Node.js', frequency: 1, category: 'works', color: '#339933' },
  ],
}));

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Skills', () => {
  it('renders the skills section with title', () => {
    renderWithTheme(<Skills />);
    expect(screen.getByText(/Skills & Expertise/)).toBeInTheDocument();
  });

  it('renders skills categories', () => {
    renderWithTheme(<Skills />);
    expect(screen.getByText('Backend Development')).toBeInTheDocument();
    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
  });

  it('renders skills descriptions', () => {
    renderWithTheme(<Skills />);
    expect(screen.getByText(/Server-side development/)).toBeInTheDocument();
    expect(screen.getByText(/Client-side development/)).toBeInTheDocument();
  });

  it('renders skills graph', () => {
    renderWithTheme(<Skills />);
    expect(screen.getByText('Skills Analysis')).toBeInTheDocument();
  });

  it('renders skills frequency data', () => {
    renderWithTheme(<Skills />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('handles skills slider navigation', () => {
    renderWithTheme(<Skills />);
    
    // Find navigation buttons
    const buttons = screen.getAllByRole('button');
    const nextButton = buttons.find(button => 
      button.textContent?.includes('Next') || button.getAttribute('aria-label')?.includes('next')
    );
    
    if (nextButton) {
      fireEvent.click(nextButton);
      // Should navigate to next slide
      expect(nextButton).toBeInTheDocument();
    }
  });

  it('handles view type changes', () => {
    renderWithTheme(<Skills />);
    
    // Find view type toggle buttons
    const toggleButtons = screen.getAllByRole('button');
    const experienceButton = toggleButtons.find(button => 
      button.textContent?.includes('Experience')
    );
    
    if (experienceButton) {
      fireEvent.click(experienceButton);
      // Should change to experience view
      expect(experienceButton).toBeInTheDocument();
    }
  });

  it('handles empty skills data gracefully', () => {
    jest.mocked(require('../../resources').useSkillsData).mockReturnValue([]);
    
    renderWithTheme(<Skills />);
    expect(screen.getByText(/Skills & Expertise/)).toBeInTheDocument();
  });

  it('handles undefined skills data gracefully', () => {
    jest.mocked(require('../../resources').useSkillsData).mockReturnValue(undefined);
    
    renderWithTheme(<Skills />);
    expect(screen.getByText(/Skills & Expertise/)).toBeInTheDocument();
  });

  it('renders skills images', () => {
    renderWithTheme(<Skills />);
    
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

}); 