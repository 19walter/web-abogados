import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  useTheme,
  useMediaQuery,
  Fade,
} from '@mui/material';
import {
  Gavel,
  Balance,
  Security,
  EmojiEvents,
  CheckCircle,
  ArrowForward,
} from '@mui/icons-material';

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const values = [
    {
      title: 'Excelencia',
      description: 'Buscamos la máxima calidad en cada caso que manejamos.',
      icon: <Gavel fontSize="large" />,
    },
    {
      title: 'Compromiso',
      description: 'Nos dedicamos completamente a nuestros clientes y sus necesidades.',
      icon: <Balance fontSize="large" />,
    },
    {
      title: 'Innovación',
      description: 'Utilizamos tecnología avanzada para mejorar nuestros servicios.',
      icon: <Security fontSize="large" />,
    },
    {
      title: 'Ética',
      description: 'Mantenemos los más altos estándares éticos en nuestra práctica.',
      icon: <EmojiEvents fontSize="large" />,
    },
  ];

  const team = [
    {
      name: 'Dr. Juan Pérez',
      position: 'Socio Fundador',
      description: 'Especialista en derecho corporativo con más de 20 años de experiencia.',
      image: '/assets/img/about/juanperez.png',
    },
    {
      name: 'Dra. María García',
      position: 'Socia Principal',
      description: 'Experta en derecho laboral y litigios complejos.',
      image: '/assets/img/about/mariagarcia.png',
    },
    {
      name: 'Dr. Carlos López',
      position: 'Socio Senior',
      description: 'Especialista en derecho mercantil y propiedad intelectual.',
      image: '/assets/img/about/carlos.png',
    },
  ];

  const achievements = [
    'Más de 1000 casos exitosos',
    'Reconocimiento como mejor firma legal 2023',
    'Premio a la innovación en servicios legales',
    'Certificación ISO 9001 en gestión de calidad',
  ];

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #073A4B 0%, #0A4F68 100%)',
      pt: isMobile ? 8 : isTablet ? 12 : 20,
      pb: isMobile ? 6 : isTablet ? 10 : 16,
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
        {/* Sección de Introducción */}
        <Fade in timeout={1000}>
          <Grid container spacing={isMobile ? 4 : isTablet ? 6 : 8} alignItems="center" sx={{ mb: isMobile ? 8 : isTablet ? 12 : 20 }}>
            <Grid item xs={12} md={6} sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              pr: { md: 8 }
            }}>
              <Typography 
                variant="h1" 
                component="h1" 
                sx={{
                  color: '#fff',
                  fontSize: isMobile ? '32px' : isTablet ? '40px' : '64px',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  mb: isMobile ? 3 : 4,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
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
                Sobre Nosotros
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#FF7D00',
                  mb: isMobile ? 4 : 6,
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: isMobile ? '18px' : isTablet ? '20px' : '24px',
                  lineHeight: 1.4,
                  opacity: 0.9
                }}
              >
                Conoce más sobre nuestra firma y nuestro compromiso con la excelencia legal
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: isMobile ? 3 : 4,
                  fontSize: isMobile ? '14px' : isTablet ? '16px' : '18px',
                  lineHeight: 1.8,
                  textAlign: 'justify',
                  maxWidth: '600px'
                }}
              >
                En JYANG, nos enorgullece ofrecer servicios legales de la más alta calidad. 
                Nuestro equipo de abogados altamente calificados está comprometido con 
                proporcionar soluciones efectivas y personalizadas para cada cliente.
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
                  alignSelf: 'flex-start',
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
                Conoce Nuestro Equipo
              </Button>
            </Grid>
            <Grid item xs={12} md={6} sx={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
              mt: isMobile ? 4 : 0
            }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: isMobile ? '100%' : isTablet ? '500px' : '600px',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: isMobile ? -10 : -20,
                    left: isMobile ? -10 : -20,
                    right: isMobile ? 10 : 20,
                    bottom: isMobile ? 10 : 20,
                    border: '2px solid rgba(255, 125, 0, 0.2)',
                    borderRadius: isMobile ? '20px' : '40px',
                    zIndex: 0,
                    transition: 'all 0.3s ease',
                  },
                  '&:hover::before': {
                    top: isMobile ? -8 : -15,
                    left: isMobile ? -8 : -15,
                    right: isMobile ? 8 : 15,
                    bottom: isMobile ? 8 : 15,
                  }
                }}
              >
                <Box
                  component="img"
                  src="/assets/img/about/about3-img.png"
                  alt="Equipo legal en reunión"
                  sx={{
                    width: '100%',
                    height: isMobile ? '300px' : '400px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: isMobile ? '20px' : '40px',
                    position: 'relative',
                    zIndex: 1,
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    filter: 'brightness(1.05)',
                    '&:hover': {
                      transform: isMobile ? 'none' : 'scale(1.02)',
                      filter: 'brightness(1.1)',
                    }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Fade>

        {/* Sección de Valores */}
        <Fade in timeout={1200}>
          <Box sx={{ mb: isMobile ? 8 : isTablet ? 12 : 20 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                color: '#fff',
                fontSize: isMobile ? '28px' : isTablet ? '36px' : '48px',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                mb: isMobile ? 4 : isTablet ? 6 : 8,
                textAlign: 'center',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Nuestros Valores
            </Typography>
            <Grid container spacing={isMobile ? 3 : isTablet ? 4 : 6} justifyContent="center">
              {values.map((value) => (
                <Grid item xs={12} sm={6} md={3} key={value.title}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: isMobile ? '16px' : '24px',
                      transition: 'all 0.3s ease',
                      p: isMobile ? 3 : 4,
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
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Box 
                        sx={{ 
                          color: '#FF7D00', 
                          mb: isMobile ? 2 : 4,
                          '& .MuiSvgIcon-root': {
                            fontSize: isMobile ? '2.5rem' : '3.5rem'
                          }
                        }}
                      >
                        {value.icon}
                      </Box>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          color: '#fff',
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 600,
                          mb: isMobile ? 1 : 3,
                          fontSize: isMobile ? '1.25rem' : '1.5rem'
                        }}
                      >
                        {value.title}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: isMobile ? '0.9rem' : '1.1rem',
                          lineHeight: 1.6
                        }}
                      >
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Sección del Equipo */}
        <Fade in timeout={1400}>
          <Box sx={{ mb: isMobile ? 8 : isTablet ? 12 : 20 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                color: '#fff',
                fontSize: isMobile ? '28px' : isTablet ? '36px' : '48px',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                mb: isMobile ? 4 : isTablet ? 6 : 8,
                textAlign: 'center',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Nuestro Equipo
            </Typography>
            <Grid container spacing={isMobile ? 3 : isTablet ? 4 : 6} justifyContent="center">
              {team.map((member) => (
                <Grid item xs={12} sm={6} md={4} key={member.name}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: isMobile ? '16px' : '24px',
                      transition: 'all 0.3s ease',
                      overflow: 'hidden',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
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
                        width: '180px',
                        height: '180px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        margin: '24px auto 16px',
                        border: '3px solid rgba(255, 125, 0, 0.2)',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '50%'
                        }
                      }}
                    >
                      <Box
                        component="img"
                        src={member.image}
                        alt={member.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center top',
                          transition: 'all 0.3s ease',
                          filter: 'brightness(1.05)',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            filter: 'brightness(1.1)',
                          }
                        }}
                      />
                    </Box>
                    <CardContent sx={{ 
                      p: isMobile ? 3 : 4,
                      textAlign: 'center',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <Box>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            color: '#fff',
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 600,
                            mb: isMobile ? 1 : 2,
                            fontSize: isMobile ? '1.25rem' : '1.5rem'
                          }}
                        >
                          {member.name}
                        </Typography>
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            color: '#FF7D00',
                            mb: isMobile ? 1 : 3,
                            fontFamily: "'Open Sans', sans-serif",
                            fontWeight: 500,
                            fontSize: isMobile ? '0.9rem' : '1.1rem'
                          }}
                        >
                          {member.position}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: isMobile ? '0.9rem' : '1.1rem',
                            lineHeight: 1.6,
                            maxWidth: '300px',
                            margin: '0 auto'
                          }}
                        >
                          {member.description}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Sección de Logros */}
        <Fade in timeout={1600}>
          <Box sx={{ mb: isMobile ? 8 : isTablet ? 12 : 20 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                color: '#fff',
                fontSize: isMobile ? '28px' : isTablet ? '36px' : '48px',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                mb: isMobile ? 4 : isTablet ? 6 : 8,
                textAlign: 'center',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Nuestros Logros
            </Typography>
            <Grid container spacing={isMobile ? 3 : isTablet ? 4 : 6} justifyContent="center">
              {achievements.map((achievement, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: isMobile ? '16px' : '24px',
                      p: isMobile ? 3 : 4,
                      display: 'flex',
                      alignItems: 'center',
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
                    <ListItemIcon sx={{ minWidth: isMobile ? 40 : 48, color: '#FF7D00' }}>
                      <CheckCircle sx={{ fontSize: isMobile ? '1.5rem' : '2rem' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={achievement}
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: '#fff',
                          fontFamily: "'Open Sans', sans-serif",
                          fontWeight: 500,
                          fontSize: isMobile ? '0.9rem' : '1.1rem',
                          lineHeight: 1.6
                        }
                      }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Sección Final */}
        <Fade in timeout={1800}>
          <Box 
            sx={{ 
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: isMobile ? '20px' : '40px',
              p: isMobile ? 3 : isTablet ? 6 : 8,
              maxWidth: '800px',
              mx: 'auto',
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
                background: 'rgba(255, 255, 255, 0.05)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                '&::before': {
                  transform: 'translateX(100%)'
                }
              }
            }}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                color: '#fff',
                fontSize: isMobile ? '28px' : isTablet ? '36px' : '48px',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                mb: isMobile ? 3 : 4,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              ¿Listo para Trabajar con Nosotros?
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: isMobile ? '14px' : isTablet ? '16px' : '18px',
                lineHeight: 1.8,
                maxWidth: '600px',
                mx: 'auto',
                mb: isMobile ? 4 : 6
              }}
            >
              Permítenos ayudarte a resolver tus necesidades legales con la misma
              dedicación y excelencia que caracteriza nuestro trabajo.
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

export default About; 