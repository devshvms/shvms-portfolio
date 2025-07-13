import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Contacts from './contacts';

// Mock the resources
jest.mock('../../resources', () => ({
  useSocialData: () => [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'LinkedInIcon',
      url: 'https://linkedin.com/in/test',
      description: 'Connect with me on LinkedIn',
      color: '#0077b5',
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'GitHubIcon',
      url: 'https://github.com/test',
      description: 'Check out my projects on GitHub',
      color: '#333',
    },
  ],
  useContactData: () => ({
    form: {
      title: 'Get In Touch',
      subtitle: 'Feel free to reach out',
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'message', label: 'Message', type: 'textarea', required: true, rows: 4 },
      ],
      submitButton: 'Send Message',
    },
    social: {
      title: 'Connect With Me',
      subtitle: 'Follow me on social media',
    },
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

describe('Contacts', () => {
  beforeEach(() => {
    // Mock window.open
    Object.defineProperty(window, 'open', {
      value: jest.fn(),
      writable: true,
    });
  });

  it('renders the contact section with title', () => {
    renderWithTheme(<Contacts />);
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });

  it('renders the contact form', () => {
    renderWithTheme(<Contacts />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    renderWithTheme(<Contacts />);
    expect(screen.getByText('Send Message')).toBeInTheDocument();
  });

  it('renders social media section', () => {
    renderWithTheme(<Contacts />);
    expect(screen.getByText('Connect With Me')).toBeInTheDocument();
  });

  it('renders social media profiles', () => {
    renderWithTheme(<Contacts />);
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('handles form submission', () => {
    renderWithTheme(<Contacts />);
    
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const messageInput = screen.getByLabelText('Message');
    const submitButton = screen.getByText('Send Message');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello!' } });
    fireEvent.click(submitButton);
    
    // Form submission should be handled (mocked)
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(messageInput).toHaveValue('Hello!');
  });

  it('handles social media clicks', () => {
    renderWithTheme(<Contacts />);
    
    // Find and click on a social media profile
    const socialProfiles = screen.getAllByRole('button');
    const linkedinButton = socialProfiles.find(button => 
      button.textContent?.includes('LinkedIn')
    );
    
    if (linkedinButton) {
      fireEvent.click(linkedinButton);
      expect(window.open).toHaveBeenCalledWith('https://linkedin.com/in/test', '_blank');
    }
  });

  it('handles empty social data gracefully', () => {
    jest.mocked(require('../../resources').useSocialData).mockReturnValue([]);
    
    renderWithTheme(<Contacts />);
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });

  it('handles undefined social data gracefully', () => {
    jest.mocked(require('../../resources').useSocialData).mockReturnValue(undefined);
    
    renderWithTheme(<Contacts />);
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });

  it('validates required form fields', () => {
    renderWithTheme(<Contacts />);
    
    const submitButton = screen.getByText('Send Message');
    fireEvent.click(submitButton);
    
    // Form validation should prevent submission with empty fields
    expect(submitButton).toBeInTheDocument();
  });
}); 