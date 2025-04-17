import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card,
  Button,
  useTheme,
  useMediaQuery,
  Fade,
} from '@mui/material';
import {
  ChatBubbleOutline,
  StackedLineChart,
  BuildCircle,
  EmojiEvents,
  ArrowForward,
} from '@mui/icons-material';

const WorkProcess = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const steps = [
    {
      title: 'Consulta Inicial',
      description: 'Analizamos tu caso y te brindamos una evaluación inicial gratuita.',
      icon: <ChatBubbleOutline sx={{ fontSize: isMobile ? 40 : 50 }} />,
    },
    {
      title: 'Planificación Estratégica',
      description: 'Desarrollamos un plan de acción personalizado para tu caso.',
      icon: <StackedLineChart sx={{ fontSize: isMobile ? 40 : 50 }} />,
    },
    {
      title: 'Ejecución',
      description: 'Implementamos el plan con seguimiento constante y actualizaciones.',
      icon: <BuildCircle sx={{ fontSize: isMobile ? 40 : 50 }} />,
    },
    {
      title: 'Resolución',
      description: 'Trabajamos para alcanzar la mejor solución posible para tu caso.',
      icon: <EmojiEvents sx={{ fontSize: isMobile ? 40 : 50 }} />,
    },
  ];

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
              Nuestro Proceso de Trabajo
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
              Un enfoque sistemático para garantizar el mejor resultado en tu caso
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
              Nuestro método de trabajo está diseñado para brindarte la mejor experiencia
              y resultados en cada etapa de tu proceso legal.
            </Typography>
          </Box>
        </Fade>

        {/* Pasos del Proceso */}
        <Grid container spacing={isMobile ? 6 : isTablet ? 8 : 10} justifyContent="center">
          {steps.map((step, index) => (
            <Fade in timeout={1000 + (index * 200)} key={index}>
              <Grid item xs={12} sm={6} sx={{ maxWidth: '500px' }}>
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
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        color: '#FF7D00',
                        fontSize: isMobile ? '48px' : '64px',
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        mb: 2,
                        position: 'relative',
                        zIndex: 1,
                        opacity: 0.9
                      }}
                    >
                      {(index + 1).toString().padStart(2, '0')}
                    </Typography>
                    <Box 
                      sx={{ 
                        color: '#FF7D00',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        transform: 'scale(1)',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1) rotate(5deg)'
                        }
                      }}
                    >
                      {step.icon}
                    </Box>
                  </Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 2,
                      color: '#fff',
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600,
                      fontSize: isMobile ? '1.25rem' : '1.5rem'
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontFamily: "'Open Sans', sans-serif",
                      lineHeight: 1.8,
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      maxWidth: '400px',
                      mx: 'auto'
                    }}
                  >
                    {step.description}
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
              Comienza tu Proceso Legal con Nosotros
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
              Cada caso es único y merece una atención personalizada. 
              Nuestro equipo está preparado para guiarte en cada paso del camino.
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

export default WorkProcess; 