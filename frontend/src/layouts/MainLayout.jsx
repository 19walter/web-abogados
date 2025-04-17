import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Nosotros', path: '/about' },
    { text: 'Servicios', path: '/services' },
    { text: 'Procesos de trabajo', path: '/work-process' },
    { text: 'Casos de éxito', path: '/success-cases' },
    { text: 'Testimonios', path: '/testimonials' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <RouterLink to="/">
          <Box
            component="img"
            src="/assets/img/logo/header-logo2.svg"
            alt="JYANG Legal"
            sx={{ height: 40 }}
          />
        </RouterLink>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                mx: 2,
                borderRadius: 1,
                color: 'text.primary',
              }}
            >
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2, mt: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
          Contáctanos
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography
            component="a"
            href="tel:+51925756234"
            sx={{
              color: 'text.primary',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&:hover': { color: 'primary.main' },
            }}
          >
            <PhoneIcon fontSize="small" />
            +51 925 756 234
          </Typography>
        </Box>
        <Button
          component={RouterLink}
          to="/login"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Iniciar Sesión
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: 'space-between',
              minHeight: { xs: '70px', md: '80px' },
            }}
          >
            <RouterLink to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component="img"
                src="/assets/img/logo/header-logo1.svg"
                alt="JYANG Legal"
                sx={{
                  height: { xs: 35, md: 40 },
                  width: 'auto',
                }}
              />
            </RouterLink>
            {isMobile ? (
              <IconButton
                aria-label="abrir menú"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{
                  color: 'text.primary',
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: 'text.primary',
                      fontSize: '1rem',
                      fontWeight: 500,
                      '&:hover': {
                        color: 'secondary.main',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                  <Typography
                    component="a"
                    href="tel:+51925756234"
                    sx={{
                      color: 'text.primary',
                      textDecoration: 'none',
                      mr: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      '&:hover': {
                        color: 'secondary.main',
                      },
                    }}
                  >
                    <PhoneIcon fontSize="small" />
                    +51 925 756 234
                  </Typography>
                  <Button component={RouterLink} to="/login" variant="contained" color="primary">
                    Iniciar Sesión
                  </Button>
                </Box>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
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
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: '70px', md: '80px' },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
