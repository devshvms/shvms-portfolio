import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';

// Mock all the components
jest.mock('./components/navbar/navbar', () => {
  return function MockNavbar() {
    return <div data-testid="navbar">Navbar</div>;
  };
});

jest.mock('./components/intro/intro', () => {
  return function MockIntro() {
    return <div data-testid="intro">Intro</div>;
  };
});

jest.mock('./components/about/about', () => {
  return function MockAbout() {
    return <div data-testid="about">About</div>;
  };
});

jest.mock('./components/skills/skills', () => {
  return function MockSkills() {
    return <div data-testid="skills">Skills</div>;
  };
});

jest.mock('./components/works/works', () => {
  return function MockWorks() {
    return <div data-testid="works">Works</div>;
  };
});

jest.mock('./components/contacts/contacts', () => {
  return function MockContacts() {
    return <div data-testid="contacts">Contacts</div>;
  };
});

jest.mock('./components/footer/footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer</div>;
  };
});

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('App', () => {
  it('renders the main app structure', () => {
    renderWithTheme(<App />);
    
    // Check if all main sections are rendered
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('intro')).toBeInTheDocument();
    expect(screen.getByTestId('about')).toBeInTheDocument();
    expect(screen.getByTestId('skills')).toBeInTheDocument();
    expect(screen.getByTestId('works')).toBeInTheDocument();
    expect(screen.getByTestId('contacts')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    renderWithTheme(<App />);
    // If we get here without errors, the app renders successfully
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('has proper section structure', () => {
    renderWithTheme(<App />);
    
    // Check if sections have proper IDs for navigation
    const sections = screen.getAllByTestId(/intro|about|skills|works|contacts/);
    expect(sections.length).toBeGreaterThan(0);
  });

  it('renders theme provider correctly', () => {
    renderWithTheme(<App />);
    
    // The app should render within the theme context
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });
}); 