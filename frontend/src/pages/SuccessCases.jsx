import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const SuccessCases = () => {
  const cases = [
    {
      title: 'Caso Corporativo',
      description: 'Asesoramiento exitoso en fusión empresarial valorada en $50M',
      image: '/assets/img/image/case-img1.png',
      result: 'Fusión completada en 6 meses',
      category: 'Derecho Corporativo',
    },
    {
      title: 'Caso Penal',
      description: 'Defensa exitosa en caso de fraude corporativo',
      image: '/assets/img/image/case-img2.png',
      result: 'Cliente absuelto de todos los cargos',
      category: 'Derecho Penal',
    },
    {
      title: 'Caso Laboral',
      description: 'Resolución favorable en disputa laboral colectiva',
      image: '/assets/img/image/case-img3.png',
      result: 'Acuerdo beneficioso para ambas partes',
      category: 'Derecho Laboral',
    },
  ];

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #073A4B 0%, #0A4F68 100%)',
      pt: 15,
      pb: 8,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Elementos decorativos de fondo */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255,125,0,0.1) 0%, rgba(255,125,0,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,125,0,0.1) 0%, rgba(255,125,0,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />

      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{
              color: '#fff',
              fontSize: { xs: '40px', md: '48px' },
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              mb: 3
            }}
          >
            Casos de Éxito
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#FF7D00',
              mb: 3,
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 600
            }}
          >
            Experiencias que demuestran nuestro compromiso con la excelencia legal
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto',
              color: 'rgba(255, 255, 255, 0.95)',
              fontSize: '18px',
              lineHeight: 1.7,
              textAlign: 'center'
            }}
          >
            Conoce algunos de nuestros casos más destacados y cómo hemos ayudado
            a nuestros clientes a alcanzar sus objetivos legales.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {cases.map((caseItem, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={caseItem.image}
                    alt={caseItem.title}
                    sx={{ 
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      background: 'rgba(255, 125, 0, 0.9)',
                      borderRadius: '8px',
                      padding: '8px 16px',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#fff',
                        fontFamily: "'Open Sans', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {caseItem.category}
                    </Typography>
                  </Box>
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h2"
                    sx={{
                      color: '#fff',
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600,
                      mb: 2
                    }}
                  >
                    {caseItem.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{
                      color: 'rgba(255, 255, 255, 0.95)',
                      mb: 2,
                      fontFamily: "'Open Sans', sans-serif",
                      lineHeight: 1.7
                    }}
                  >
                    {caseItem.description}
                  </Typography>
                  <Box
                    sx={{
                      background: 'rgba(255, 125, 0, 0.1)',
                      borderRadius: '10px',
                      p: 2,
                      mt: 2,
                      border: '1px solid rgba(255, 125, 0, 0.2)'
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#FF7D00',
                        fontFamily: "'Open Sans', sans-serif",
                        fontWeight: 600
                      }}
                    >
                      Resultado: {caseItem.result}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Sección Final */}
        <Box 
          sx={{ 
            mt: 12, 
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '30px',
            p: 6
          }}
        >
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#fff',
              fontSize: { xs: '28px', md: '36px' },
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              mb: 3
            }}
          >
            ¿Necesitas Ayuda Legal?
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.95)',
              fontSize: '18px',
              lineHeight: 1.7,
              maxWidth: '800px',
              mx: 'auto',
              mb: 4
            }}
          >
            Permítenos ayudarte a resolver tu caso con la misma dedicación y
            excelencia que caracteriza nuestro trabajo.
          </Typography>
          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            sx={{
              backgroundColor: '#FF7D00',
              color: '#fff',
              borderRadius: '8px',
              textTransform: 'none',
              padding: '12px 32px',
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: "'Open Sans', sans-serif",
              boxShadow: '0 4px 12px rgba(255, 125, 0, 0.3)',
              '&:hover': {
                backgroundColor: '#FF8F1F',
              }
            }}
          >
            Consulta Gratuita
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default SuccessCases; 