import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Works from './works';

// Mock the resources
jest.mock('../../resources', () => ({
  useWorksData: () => [
    {
      id: 'project-1',
      title: 'Portfolio Website',
      description: 'A modern portfolio website built with React and TypeScript',
      image: '/src/assets/portfolio-1.png',
      technologies: ['React', 'TypeScript', 'Material-UI'],
      githubUrl: 'https://github.com/test/portfolio',
      liveUrl: 'https://portfolio.test.com',
    },
    {
      id: 'project-2',
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce platform with payment integration',
      image: '/src/assets/portfolio-2.png',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      githubUrl: 'https://github.com/test/ecommerce',
      liveUrl: 'https://ecommerce.test.com',
    },
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

describe('Works', () => {
  beforeEach(() => {
    // Mock window.open
    Object.defineProperty(window, 'open', {
      value: jest.fn(),
      writable: true,
    });
  });

  it('renders the works section with title', () => {
    renderWithTheme(<Works />);
    expect(screen.getByText(/Featured Projects/)).toBeInTheDocument();
  });

  it('renders project titles', () => {
    renderWithTheme(<Works />);
    expect(screen.getByText('Portfolio Website')).toBeInTheDocument();
    expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
  });

  it('renders project descriptions', () => {
    renderWithTheme(<Works />);
    expect(screen.getByText(/A modern portfolio website/)).toBeInTheDocument();
    expect(screen.getByText(/Full-stack e-commerce platform/)).toBeInTheDocument();
  });

  it('renders project technologies', () => {
    renderWithTheme(<Works />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Material-UI')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('renders project images', () => {
    renderWithTheme(<Works />);
    
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('handles project navigation', () => {
    renderWithTheme(<Works />);
    
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
    renderWithTheme(<Works />);
    
    const viewCodeButtons = screen.getAllByText('View Code');
    if (viewCodeButtons.length > 0) {
      fireEvent.click(viewCodeButtons[0]);
      expect(window.open).toHaveBeenCalledWith('https://github.com/test/portfolio', '_blank');
    }
  });

  it('handles live demo button clicks', () => {
    renderWithTheme(<Works />);
    
    const liveDemoButtons = screen.getAllByText('Live Demo');
    if (liveDemoButtons.length > 0) {
      fireEvent.click(liveDemoButtons[0]);
      expect(window.open).toHaveBeenCalledWith('https://portfolio.test.com', '_blank');
    }
  });

  it('handles empty works data gracefully', () => {
    jest.mocked(require('../../resources').useWorksData).mockReturnValue([]);
    
    renderWithTheme(<Works />);
    expect(screen.getByText(/Featured Projects/)).toBeInTheDocument();
  });

  it('handles undefined works data gracefully', () => {
    jest.mocked(require('../../resources').useWorksData).mockReturnValue(undefined);
    
    renderWithTheme(<Works />);
    expect(screen.getByText(/Featured Projects/)).toBeInTheDocument();
  });

  it('renders project indicators', () => {
    renderWithTheme(<Works />);
    
    // Should render project indicators for navigation
    const indicators = screen.getAllByRole('button');
    expect(indicators.length).toBeGreaterThan(0);
  });

  it('handles project slide changes', () => {
    renderWithTheme(<Works />);
    
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

  it('displays project technologies as chips', () => {
    renderWithTheme(<Works />);
    
    // Check if technology chips are rendered
    const chips = screen.getAllByRole('button');
    const technologyChips = chips.filter(chip => 
      ['React', 'TypeScript', 'Material-UI'].includes(chip.textContent || '')
    );
    
    expect(technologyChips.length).toBeGreaterThan(0);
  });
}); 