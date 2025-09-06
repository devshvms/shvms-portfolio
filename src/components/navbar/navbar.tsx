import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-scroll';
import MenuIcon from '@mui/icons-material/Menu';
import { usePortfolioData } from '../../resources';

type NavItem = { id: string; label: string; target: string };

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data: portfolioData, loading, error } = usePortfolioData();
  const navItems: NavItem[] = portfolioData?.navigation?.items || [];
  const personal = portfolioData?.personal || {};

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (target: string) => {
    setMobileOpen(false);
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Portfolio
      </Typography>
      <List>
        {(navItems || []).map((item: NavItem) => (
          <ListItem key={item.id} onClick={() => handleNavClick(item.target)}>
            <ListItemText 
              primary={item.label}
              sx={{
                textAlign: 'center',
                '& .MuiListItemText-primary': {
                  color: 'text.primary',
                  '&:hover': {
                    color: 'primary.main',
                  },
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (loading) {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Loading...</Typography>
        </Toolbar>
      </AppBar>
    );
  }
  if (error) {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="error">Error loading navigation data.</Typography>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: 'background.paper',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Toolbar sx={{ maxWidth: '75rem', margin: '0 auto', width: '100%' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 1,
              color: 'primary.main',
              fontWeight: 700,
            }}
          >
            {personal?.name || 'Portfolio'}
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {navItems.map((item: NavItem) => (
                <Link
                  key={item.id}
                  to={item.target}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    sx={{
                      color: 'text.primary',
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              
            </Box>
          )}

          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            backgroundColor: 'background.paper',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar; 