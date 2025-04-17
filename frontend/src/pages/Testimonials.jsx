import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card,
  Avatar,
  Rating,
  Button,
  useTheme,
  useMediaQuery,
  Fade,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const testimonials = [
  {
    name: 'María González',
    role: 'Empresaria',
    image: '/images/testimonials/maria.png',
    content: 'El equipo legal me ayudó a resolver un complejo caso de propiedad intelectual. Su profesionalismo y dedicación fueron clave para el éxito.',
    rating: 5,
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Gerente General',
    image: '/images/testimonials/carlosrodri.png',
    content: 'Gracias a su asesoría, pude proteger mi negocio y crecer con confianza. Su enfoque estratégico fue fundamental para mi éxito.',
    rating: 5,
  },
  {
    name: 'Ana Martínez',
    role: 'Directora Ejecutiva',
    image: '/images/testimonials/ana.png',
    content: 'Su experiencia en derecho corporativo nos ayudó a navegar por regulaciones complejas y expandir nuestro negocio internacionalmente.',
    rating: 5,
  },
];

const Testimonials = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #073A4B 0%, #0A4F68 100%)',
      pt: isMobile ? 8 : isTablet ? 12 : 15,
      pb: isMobile ? 6 : isTablet ? 8 : 10,
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh'
    }}>
      {/* Elementos decorativos de fondo */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: isMobile ? '200px' : isTablet ? '250px' : '300px',
          height: isMobile ? '200px' : isTablet ? '250px' : '300px',
          background: 'radial-gradient(circle, rgba(255,125,0,0.05) 0%, rgba(255,125,0,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: 0.4,
          animation: 'pulse 8s ease-in-out infinite',
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)', opacity: 0.4 },
            '50%': { transform: 'scale(1.2)', opacity: 0.6 },
            '100%': { transform: 'scale(1)', opacity: 0.4 }
          }
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: isMobile ? '250px' : isTablet ? '350px' : '400px',
          height: isMobile ? '250px' : isTablet ? '350px' : '400px',
          background: 'radial-gradient(circle, rgba(255,125,0,0.05) 0%, rgba(255,125,0,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: 0.4,
          animation: 'pulse 10s ease-in-out infinite',
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)', opacity: 0.4 },
            '50%': { transform: 'scale(1.2)', opacity: 0.6 },
            '100%': { transform: 'scale(1)', opacity: 0.4 }
          }
        }}
      />

      <Container maxWidth="xl">
        {/* Encabezado */}
        <Fade in timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: isMobile ? 6 : isTablet ? 8 : 10 }}>
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{
                color: '#fff',
                fontSize: isMobile ? '32px' : isTablet ? '40px' : '64px',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                mb: 3,
                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'fadeIn 1s ease-out',
                '@keyframes fadeIn': {
                  '0%': { opacity: 0, transform: 'translateY(20px)' },
                  '100%': { opacity: 1, transform: 'translateY(0)' }
                }
              }}
            >
              Testimonios de Nuestros Clientes
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                color: '#FF7D00',
                mb: 3,
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 500,
                fontSize: isMobile ? '18px' : isTablet ? '20px' : '24px',
                opacity: 0.9
              }}
            >
              Historias de éxito y satisfacción
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                maxWidth: '800px', 
                mx: 'auto',
                color: 'rgba(255, 255, 255, 0.95)',
                fontSize: isMobile ? '14px' : isTablet ? '16px' : '18px',
                lineHeight: 1.8,
                textAlign: 'center'
              }}
            >
              Descubre lo que nuestros clientes tienen que decir sobre su experiencia
              trabajando con nuestro equipo legal.
            </Typography>
          </Box>
        </Fade>

        {/* Testimonios */}
        <Grid container spacing={isMobile ? 6 : isTablet ? 8 : 10} justifyContent="center">
          {testimonials.map((testimonial, index) => (
            <Fade in timeout={1000 + (index * 200)} key={index}>
              <Grid item xs={12} sm={6} md={4} sx={{ maxWidth: '500px' }}>
                <Card 
                  sx={{ 
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: isMobile ? '20px' : '30px',
                    p: isMobile ? 3 : 4,
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.05), transparent)',
                      transform: 'translateX(-100%)',
                      transition: 'transform 0.6s ease'
                    },
                    '&:hover': {
                      transform: isMobile ? 'none' : 'translateY(-10px)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                      '&::before': {
                        transform: 'translateX(100%)'
                      }
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      position: 'relative',
                      mb: 3,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '80px',
                        height: '80px',
                        borderRadius: '40px',
                        background: 'rgba(255, 125, 0, 0.1)',
                        zIndex: 0
                      }
                    }}
                  >
                    <Avatar
                      src={testimonial.image}
                      sx={{
                        width: isMobile ? 80 : 100,
                        height: isMobile ? 80 : 100,
                        mx: 'auto',
                        mb: 2,
                        border: '2px solid #FF7D00',
                        boxShadow: '0 4px 20px rgba(255, 125, 0, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          boxShadow: '0 6px 24px rgba(255, 125, 0, 0.3)'
                        }
                      }}
                    />
                  </Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 1,
                      color: '#fff',
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600,
                      fontSize: isMobile ? '1.25rem' : '1.5rem'
                    }}
                  >
                    {testimonial.name}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      mb: 2,
                      color: '#FF7D00',
                      fontFamily: "'Open Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: isMobile ? '0.9rem' : '1rem'
                    }}
                  >
                    {testimonial.role}
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Rating 
                      value={testimonial.rating} 
                      readOnly 
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: '#FF7D00'
                        },
                        '& .MuiRating-iconEmpty': {
                          color: 'rgba(255, 125, 0, 0.3)'
                        }
                      }}
                    />
                  </Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontFamily: "'Open Sans', sans-serif",
                      lineHeight: 1.8,
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      maxWidth: '400px',
                      mx: 'auto',
                      minHeight: '120px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    "{testimonial.content}"
                  </Typography>
                </Card>
              </Grid>
            </Fade>
          ))}
        </Grid>

        {/* Sección Final */}
        <Fade in timeout={1800}>
          <Box 
            sx={{ 
              mt: isMobile ? 8 : isTablet ? 10 : 12,
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: isMobile ? '20px' : '30px',
              p: isMobile ? 4 : 6,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.05), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.6s ease'
              },
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.05)',
                '&::before': {
                  transform: 'translateX(100%)'
                }
              }
            }}
          >
            <Typography 
              variant="h3" 
              sx={{ 
                color: '#fff',
                fontSize: isMobile ? '24px' : isTablet ? '32px' : '40px',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                mb: 3,
                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              ¿Listo para ser nuestro próximo caso de éxito?
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.95)',
                fontSize: isMobile ? '14px' : isTablet ? '16px' : '18px',
                lineHeight: 1.8,
                maxWidth: '800px',
                mx: 'auto',
                mb: 4
              }}
            >
              Únete a nuestros clientes satisfechos y experimenta la diferencia
              de trabajar con un equipo legal comprometido con tu éxito.
            </Typography>
            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: '#FF7D00',
                color: '#fff',
                borderRadius: '12px',
                textTransform: 'none',
                padding: isMobile ? '12px 24px' : '16px 40px',
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: 500,
                fontFamily: "'Open Sans', sans-serif",
                boxShadow: '0 4px 20px rgba(255, 125, 0, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.6s ease'
                },
                '&:hover': {
                  backgroundColor: '#FF8F1F',
                  transform: isMobile ? 'none' : 'translateY(-2px)',
                  boxShadow: '0 6px 24px rgba(255, 125, 0, 0.4)',
                  '&::before': {
                    transform: 'translateX(100%)'
                  }
                }
              }}
            >
              Agenda una Consulta
            </Button>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Testimonials; 