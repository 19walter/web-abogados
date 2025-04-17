import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box sx={{ 
      position: 'relative',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #073A4B 0%, #0A4F68 100%)',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: '30%',
        height: '100%',
        backgroundImage: 'url(/assets/img/image/hero3-main-img.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderTopLeftRadius: '200px',
        borderBottomLeftRadius: '200px',
        '@media (max-width: 900px)': {
          display: 'none',
        },
      }
    }}>
      <Container maxWidth="xl">
        <Grid container>
          {/* Sección Izquierda: Contenido */}
          <Grid
            item
            xs={12}
            md={7}
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
              color: '#fff',
              paddingRight: { xs: 2, md: 8 },
              minHeight: '100vh',
              pt: { xs: 8, md: 0 },
              pl: { xs: 2, md: 6 },
              maxWidth: '60%'
            }}
          >
            <Box>
              <Typography 
                variant="h1" 
                sx={{
                  fontSize: { xs: '40px', md: '56px' },
                  lineHeight: 1.3,
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: "'Playfair Display', serif",
                  marginBottom: 3,
                  textAlign: 'justify',
                  width: '100%'
                }}
              >
                Defensores De Tus Derechos: Experiencia Legal Que Te Protege
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 4, 
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontSize: '18px',
                  lineHeight: 1.7,
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 400,
                  width: '100%',
                  textAlign: 'justify'
                }}
              >
                Con sede en Perú, nuestro equipo de abogados se enfoca en mejorar
                continuamente sus habilidades y enfoques para brindar asesoría legal
                adaptada a los desafíos actuales. Asesoramos con éxito en diversos
                asuntos legales.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 8 }}>
                <Button
                  component={Link}
                  to="/services"
                  variant="contained"
                  sx={{
                    backgroundColor: '#FF7D00',
                    color: '#fff',
                    borderRadius: '8px',
                    textTransform: 'none',
                    padding: '14px 28px',
                    fontSize: '16px',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(255, 125, 0, 0.3)',
                    '&:hover': {
                      backgroundColor: '#FF8F1F',
                    }
                  }}
                >
                  Todos nuestros servicios
                </Button>
                <Button
                  component={Link}
                  to="/contact"
                  variant="outlined"
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    padding: '14px 28px',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#fff',
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    borderWidth: '2px',
                    '&:hover': {
                      borderColor: '#fff',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderWidth: '2px',
                    }
                  }}
                >
                  Contáctanos
                </Button>
              </Box>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Typography variant="h4" sx={{ 
                    color: '#FF7D00', 
                    mb: 1, 
                    fontFamily: "'Playfair Display', serif",
                    fontSize: { xs: '42px', md: '52px' },
                    fontWeight: 700,
                    lineHeight: 1
                  }}>
                    25 K+
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontSize: '16px',
                    fontWeight: 500
                  }}>
                    Clientes Satisfechos
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h4" sx={{ 
                    color: '#FF7D00', 
                    mb: 1, 
                    fontFamily: "'Playfair Display', serif",
                    fontSize: { xs: '42px', md: '52px' },
                    fontWeight: 700,
                    lineHeight: 1
                  }}>
                    270 +
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontSize: '16px',
                    fontWeight: 500
                  }}>
                    Reseñas en Google
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          {/* Sección Derecha: Solo visible en móvil */}
          <Grid 
            item 
            xs={12} 
            sx={{ 
              display: { xs: 'block', md: 'none' },
              position: 'relative',
              minHeight: '500px',
              mt: 4,
              mb: 4
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url(/assets/img/image/hero3-main-img.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '50px'
              }}
            />
          </Grid>
        </Grid>
      </Container>
      {/* Recuadro flotante */}
      <Box
        sx={{
          position: 'absolute',
          right: '15%',
          bottom: '15%',
          bgcolor: '#fff',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          zIndex: 1,
          display: { xs: 'none', md: 'block' },
          padding: '32px 48px',
          transform: 'translateY(-20px)'
        }}
      >
        <Typography variant="h3" sx={{ 
          color: '#FF7D00', 
          mb: 1, 
          fontFamily: "'Playfair Display', serif",
          fontSize: '52px',
          fontWeight: 700,
          lineHeight: 1
        }}>
          12+
        </Typography>
        <Typography variant="body1" sx={{ 
          fontFamily: "'Open Sans', sans-serif",
          fontSize: '18px',
          color: '#073A4B',
          fontWeight: 600
        }}>
          Años De Experiencia
        </Typography>
      </Box>
    </Box>
  );
};

export default Home; 