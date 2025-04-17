import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText, Box, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { text: 'Nosotros', path: '/about' },
    { text: 'Servicios', path: '/services' },
    { text: 'Procesos de trabajo', path: '/work-process' },
    { text: 'Casos de éxito', path: '/cases' },
    { text: 'Testimonios', path: '/testimonials' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem button component={Link} to={item.path} key={item.text}>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: '#073A4B',
        boxShadow: 'none',
        py: 2
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: '70px', md: '80px' } }}>
          {/* Logo */}
          <Link to="/">
            <Box
              component="img"
              src="/assets/img/logo/header-logo1.svg"
              alt="JYANG"
              sx={{ height: '40px' }}
            />
          </Link>

          {/* Desktop Menu */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 2
          }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  color: '#fff',
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                {item.text}
              </Button>
            ))}
            
            {/* Teléfono */}
            <Button
              startIcon={<PhoneIcon />}
              href="tel:+51925756263"
              sx={{
                color: '#fff',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 500,
                mr: 2
              }}
            >
              +51 925 756 263
            </Button>

            {/* Botón Iniciar Sesión */}
            <Button
              variant="contained"
              component={Link}
              to="/login"
              sx={{
                backgroundColor: '#FF7D00',
                color: '#fff',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#FF7D00',
                  opacity: 0.9
                }
              }}
            >
              Iniciar Sesión
            </Button>
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            aria-label="abrir menú"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ 
              display: { md: 'none' },
              color: '#fff'
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            backgroundColor: '#073A4B',
            color: '#fff'
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header; 