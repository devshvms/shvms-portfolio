import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { theme } from './theme/theme';
import Navbar from './components/navbar/navbar';
import Intro from './components/intro/intro';
import About from './components/about/about';
import Skills from './components/skills/skills';
import Works from './components/works/works';
import Footer from './components/footer/footer';
import ChatModule from './components/chat';


const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Navbar />
        <Intro />
        <About />
        <Skills />
        <Works />
        <Footer />
        <ChatModule />
      </Box>
    </ThemeProvider>
  );
};

export default App; 