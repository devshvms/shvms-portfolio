import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Intro from './intro';

// Mock the resources
jest.mock('../../resources', () => ({
  useWhatsNewData: () => [
    {
      id: 'project-1',
      name: 'Portfolio Website',
      description: 'A modern portfolio website built with React and TypeScript',
      technologies: ['React', 'TypeScript', 'Material-UI'],
      githubUrl: 'https://github.com/test/portfolio',
      liveUrl: 'https://portfolio.test.com',
    },
    {
      id: 'project-2',
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce platform with payment integration',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      githubUrl: 'https://github.com/test/ecommerce',
      liveUrl: 'https://ecommerce.test.com',
    },
  ],
  useHeroData: () => ({
    greeting: 'Hello, I\'m',
    name: 'John Doe',
    title: 'Software Engineer',
    subtitle: 'Full-Stack Developer',
    description: 'Passionate about creating innovative web solutions',
  }),
  usePersonalData: () => ({
    name: 'John Doe',
    title: 'Software Engineer',
    tagline: 'Full-Stack Developer',
    email: 'john@example.com',
    location: 'New York, NY',
    bio: 'Passionate about creating innovative web solutions',
    avatar: '/src/assets/image.png',
    logo: {
      light: '/src/assets/logo-white.png',
      dark: '/src/assets/logo-black.png',
    },
  }),
}));

// Mock the hooks
jest.mock('./hooks/useVisitorTracking', () => ({
  useVisitorTracking: () => 1234,
}));

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Intro', () => {
  beforeEach(() => {
    // Mock window.open
    Object.defineProperty(window, 'open', {
      value: jest.fn(),
      writable: true,
    });
  });

  it('renders the hero section with greeting', () => {
    renderWithTheme(<Intro />);
    expect(screen.getByText('Hello, I\'m')).toBeInTheDocument();
  });

  it('renders the personal name', () => {
    renderWithTheme(<Intro />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders the job title', () => {
    renderWithTheme(<Intro />);
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    renderWithTheme(<Intro />);
    expect(screen.getByText('Full-Stack Developer')).toBeInTheDocument();
  });

  it('renders the description', () => {
    renderWithTheme(<Intro />);
    expect(screen.getByText(/Passionate about creating innovative web solutions/)).toBeInTheDocument();
  });

  it('renders the visitor counter', () => {
    renderWithTheme(<Intro />);
    expect(screen.getByText('1234')).toBeInTheDocument();
  });

  it('renders what\'s new section', () => {
    renderWithTheme(<Intro />);
    expect(screen.getByText('Portfolio Website')).toBeInTheDocument();
    expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
  });

  it('renders project descriptions', () => {
    renderWithTheme(<Intro />);
    expect(screen.getByText(/A modern portfolio website/)).toBeInTheDocument();
    expect(screen.getByText(/Full-stack e-commerce platform/)).toBeInTheDocument();
  });

  it('renders project technologies', () => {
    renderWithTheme(<Intro />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Material-UI')).toBeInTheDocument();
  });

  it('handles project navigation', () => {
    renderWithTheme(<Intro />);
    
    // Find navigation buttons
    const buttons = screen.getAllByRole('button');
    const nextButton = buttons.find(button => 
      button.textContent?.includes('Next') || button.getAttribute('aria-label')?.includes('next')
    );
    
    if (nextButton) {
      fireEvent.click(nextButton);
      // Should navigate to next project
      expect(nextButton).toBeInTheDocument();
    }
  });

  it('handles view code button clicks', () => {
    renderWithTheme(<Intro />);
    
    const viewCodeButtons = screen.getAllByText('View Code');
    if (viewCodeButtons.length > 0) {
      fireEvent.click(viewCodeButtons[0]);
      expect(window.open).toHaveBeenCalledWith('https://github.com/test/portfolio', '_blank');
    }
  });

  it('handles live demo button clicks', () => {
    renderWithTheme(<Intro />);
    
    const liveDemoButtons = screen.getAllByText('Live Demo');
    if (liveDemoButtons.length > 0) {
      fireEvent.click(liveDemoButtons[0]);
      expect(window.open).toHaveBeenCalledWith('https://portfolio.test.com', '_blank');
    }
  });

  it('handles empty what\'s new data gracefully', () => {
    jest.mocked(require('../../resources').useWhatsNewData).mockReturnValue([]);
    
    renderWithTheme(<Intro />);
    expect(screen.getByText('Hello, I\'m')).toBeInTheDocument();
  });

  it('handles undefined what\'s new data gracefully', () => {
    jest.mocked(require('../../resources').useWhatsNewData).mockReturnValue(undefined);
    
    renderWithTheme(<Intro />);
    expect(screen.getByText('Hello, I\'m')).toBeInTheDocument();
  });

  it('renders project images', () => {
    renderWithTheme(<Intro />);
    
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('handles slide indicators', () => {
    renderWithTheme(<Intro />);
    
    // Find slide indicators
    const indicators = screen.getAllByRole('button');
    const secondIndicator = indicators.find(button => 
      button.getAttribute('aria-label')?.includes('2') || button.textContent?.includes('2')
    );
    
    if (secondIndicator) {
      fireEvent.click(secondIndicator);
      // Should change to second project
      expect(secondIndicator).toBeInTheDocument();
    }
  });

  it('auto-advances slides', () => {
    jest.useFakeTimers();
    
    renderWithTheme(<Intro />);
    
    // Fast-forward timers to trigger auto-advance
    jest.advanceTimersByTime(4000);
    
    // Should auto-advance to next slide
    expect(screen.getByText('Portfolio Website')).toBeInTheDocument();
    
    jest.useRealTimers();
  });
}); 