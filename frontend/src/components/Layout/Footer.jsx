import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Información de la empresa */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              JYANG
            </Typography>
            <Typography variant="body2">
              Expertos en Derecho y Asesoría Legal
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Con sede en Perú, nuestro equipo de abogados se enfoca en mejorar continuamente sus habilidades y enfoques para brindar asesoría legal adaptada a los desafíos actuales.
            </Typography>
          </Grid>

          {/* Enlaces rápidos */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Enlaces Rápidos
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link to="/nosotros" style={{ color: 'white', textDecoration: 'none' }}>
                  Nosotros
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link to="/servicios" style={{ color: 'white', textDecoration: 'none' }}>
                  Servicios
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link to="/contacto" style={{ color: 'white', textDecoration: 'none' }}>
                  Contacto
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Información de contacto */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contacto
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Teléfono: +51 925 756 263
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: contacto@jyang.com
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          © {new Date().getFullYear()} JYANG. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 