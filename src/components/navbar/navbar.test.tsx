import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './navbar';

// Mock the resources
jest.mock('../../resources', () => ({
  useNavigationData: () => [
    { id: 'intro', label: 'Home', target: 'intro' },
    { id: 'about', label: 'Experiences', target: 'about' },
    { id: 'skills', label: 'Skills', target: 'skills' },
    { id: 'works', label: 'Works', target: 'works' },
  ],
  usePersonalData: () => ({
    name: 'John Doe',
    title: 'Software Engineer',
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

describe('Navbar', () => {
  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();
  });

  it('renders the navbar with personal name', () => {
    renderWithTheme(<Navbar />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    renderWithTheme(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Experiences')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Works')).toBeInTheDocument();
  });

  it('handles navigation item clicks', () => {
    renderWithTheme(<Navbar />);
    
    const experiencesLink = screen.getByText('Experiences');
    fireEvent.click(experiencesLink);
    
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth'
    });
  });

  it('handles contact button click', () => {
    renderWithTheme(<Navbar />);
    
    const contactButton = screen.getByText('Contact');
    fireEvent.click(contactButton);
    
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth'
    });
  });

  it('renders mobile menu button on small screens', () => {
    // Mock useMediaQuery to return true for mobile
    jest.spyOn(require('@mui/material'), 'useMediaQuery').mockReturnValue(true);
    
    renderWithTheme(<Navbar />);
    
    const menuButton = screen.getByLabelText('open drawer');
    expect(menuButton).toBeInTheDocument();
  });

  it('opens mobile drawer when menu button is clicked', () => {
    jest.spyOn(require('@mui/material'), 'useMediaQuery').mockReturnValue(true);
    
    renderWithTheme(<Navbar />);
    
    const menuButton = screen.getByLabelText('open drawer');
    fireEvent.click(menuButton);
    
    // Check if drawer content is rendered
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('closes mobile drawer when navigation item is clicked', () => {
    jest.spyOn(require('@mui/material'), 'useMediaQuery').mockReturnValue(true);
    
    renderWithTheme(<Navbar />);
    
    // Open drawer
    const menuButton = screen.getByLabelText('open drawer');
    fireEvent.click(menuButton);
    
    // Click navigation item
    const experiencesLink = screen.getByText('Experiences');
    fireEvent.click(experiencesLink);
    
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth'
    });
  });
}); 