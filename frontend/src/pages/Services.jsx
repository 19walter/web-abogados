import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Fade,
} from '@mui/material';
import {
  Gavel,
  Business,
  Work,
  FamilyRestroom,
  Home,
  Description,
  ArrowForward,
  CheckCircle,
} from '@mui/icons-material';

const Services = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const servicios = [
    {
      id: 'corp',
      titulo: 'Derecho Corporativo',
      icon: <Business sx={{ fontSize: 40 }} />,
      descripcion: 'Asesoría legal completa para empresas, incluyendo constitución, fusiones, adquisiciones y cumplimiento normativo.',
      caracteristicas: [
        { id: 'corp-1', texto: 'Constitución de empresas' },
        { id: 'corp-2', texto: 'Fusiones y adquisiciones' },
        { id: 'corp-3', texto: 'Cumplimiento normativo' },
        { id: 'corp-4', texto: 'Contratos comerciales' },
        { id: 'corp-5', texto: 'Asesoría en propiedad intelectual' },
      ],
    },
    {
      id: 'lab',
      titulo: 'Derecho Laboral',
      icon: <Work sx={{ fontSize: 40 }} />,
      descripcion: 'Protección de derechos laborales tanto para empleadores como trabajadores, con enfoque en la legislación vigente.',
      caracteristicas: [
        { id: 'lab-1', texto: 'Contratos laborales' },
        { id: 'lab-2', texto: 'Negociaciones sindicales' },
        { id: 'lab-3', texto: 'Liquidaciones y despidos' },
        { id: 'lab-4', texto: 'Prevención de riesgos laborales' },
        { id: 'lab-5', texto: 'Mediación laboral' },
      ],
    },
    {
      id: 'fam',
      titulo: 'Derecho de Familia',
      icon: <FamilyRestroom sx={{ fontSize: 40 }} />,
      descripcion: 'Asesoramiento en temas familiares con sensibilidad y profesionalidad, priorizando el bienestar de las partes.',
      caracteristicas: [
        { id: 'fam-1', texto: 'Divorcios y separaciones' },
        { id: 'fam-2', texto: 'Custodia de menores' },
        { id: 'fam-3', texto: 'Pensiones alimenticias' },
        { id: 'fam-4', texto: 'Herencias y sucesiones' },
        { id: 'fam-5', texto: 'Adopciones' },
      ],
    },
    {
      id: 'imm',
      titulo: 'Derecho Inmobiliario',
      icon: <Home sx={{ fontSize: 40 }} />,
      descripcion: 'Servicios legales especializados en transacciones inmobiliarias y resolución de conflictos relacionados con propiedades.',
      caracteristicas: [
        { id: 'imm-1', texto: 'Compraventa de inmuebles' },
        { id: 'imm-2', texto: 'Arrendamientos' },
        { id: 'imm-3', texto: 'Usufructo y servidumbres' },
        { id: 'imm-4', texto: 'Regularización de propiedades' },
        { id: 'imm-5', texto: 'Conflictos de propiedad' },
      ],
    },
    {
      id: 'pen',
      titulo: 'Derecho Penal',
      icon: <Gavel sx={{ fontSize: 40 }} />,
      descripcion: 'Defensa penal especializada con un equipo de abogados expertos en diferentes áreas del derecho penal.',
      caracteristicas: [
        { id: 'pen-1', texto: 'Defensa penal' },
        { id: 'pen-2', texto: 'Asesoría en delitos económicos' },
        { id: 'pen-3', texto: 'Medidas cautelares' },
        { id: 'pen-4', texto: 'Recursos y apelaciones' },
        { id: 'pen-5', texto: 'Acuerdos reparatorios' },
      ],
    },
    {
      id: 'gen',
      titulo: 'Asesoría Legal General',
      icon: <Description sx={{ fontSize: 40 }} />,
      descripcion: 'Servicio integral de asesoría legal para particulares y empresas, adaptado a tus necesidades específicas.',
      caracteristicas: [
        { id: 'gen-1', texto: 'Consultoría legal' },
        { id: 'gen-2', texto: 'Revisión de documentos' },
        { id: 'gen-3', texto: 'Mediación y arbitraje' },
        { id: 'gen-4', texto: 'Representación legal' },
        { id: 'gen-5', texto: 'Asesoría preventiva' },
      ],
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
          <Box sx={{ mb: isMobile ? 6 : isTablet ? 8 : 10, textAlign: 'center' }}>
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
              Nuestros Servicios
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
              Soluciones legales integrales para tu tranquilidad
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                maxWidth: '800px', 
                mx: 'auto', 
                mb: 2,
                color: 'rgba(255, 255, 255, 0.95)',
                fontSize: isMobile ? '14px' : isTablet ? '16px' : '18px',
                lineHeight: 1.8,
                textAlign: 'center'
              }}
            >
              Ofrecemos una amplia gama de servicios legales diseñados para satisfacer 
              las necesidades específicas de nuestros clientes.
            </Typography>
          </Box>
        </Fade>

        {/* Lista de Servicios */}
        <Grid container spacing={isMobile ? 3 : isTablet ? 4 : 5} justifyContent="center">
          {servicios.map((servicio, index) => (
            <Fade in timeout={1000 + (index * 200)} key={servicio.id}>
              <Grid item xs={12} sm={6} lg={6} sx={{ maxWidth: '600px' }}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: isMobile ? '16px' : '24px',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    mx: 'auto',
                    width: '100%',
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
                  <CardContent sx={{ flexGrow: 1, p: isMobile ? 3 : 4 }}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 3,
                        position: 'relative'
                      }}
                    >
                      <Box 
                        sx={{ 
                          color: '#FF7D00',
                          mr: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          background: 'rgba(255, 125, 0, 0.1)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'rotate(10deg)',
                            background: 'rgba(255, 125, 0, 0.15)'
                          }
                        }}
                      >
                        {servicio.icon}
                      </Box>
                      <Typography 
                        variant="h5" 
                        component="h2" 
                        sx={{ 
                          color: '#fff',
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 600,
                          fontSize: isMobile ? '1.25rem' : '1.5rem'
                        }}
                      >
                        {servicio.titulo}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 3,
                        color: 'rgba(255, 255, 255, 0.95)',
                        lineHeight: 1.8,
                        fontSize: isMobile ? '0.9rem' : '1rem'
                      }}
                    >
                      {servicio.descripcion}
                    </Typography>
                    <Divider sx={{ 
                      my: 2, 
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      opacity: 0.5
                    }} />
                    <List>
                      {servicio.caracteristicas.map((caracteristica) => (
                        <ListItem 
                          key={caracteristica.id} 
                          disablePadding 
                          sx={{ 
                            mb: 1,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateX(10px)'
                            }
                          }}
                        >
                          <ListItemIcon>
                            <CheckCircle 
                              sx={{ 
                                color: '#FF7D00',
                                fontSize: isMobile ? '1.2rem' : '1.4rem'
                              }} 
                            />
                          </ListItemIcon>
                          <ListItemText 
                            primary={caracteristica.texto} 
                            sx={{ 
                              '& .MuiListItemText-primary': { 
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontFamily: "'Open Sans', sans-serif",
                                fontSize: isMobile ? '0.9rem' : '1rem',
                                fontWeight: 400
                              }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                  <CardActions sx={{ p: isMobile ? 3 : 4, pt: 0 }}>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForward />}
                      fullWidth
                      sx={{
                        backgroundColor: '#FF7D00',
                        color: '#fff',
                        borderRadius: '12px',
                        textTransform: 'none',
                        padding: isMobile ? '12px 24px' : '16px 32px',
                        fontSize: isMobile ? '0.9rem' : '1rem',
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
                      Solicitar Asesoría
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Fade>
          ))}
        </Grid>

        {/* Sección de Contacto */}
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
              fontSize: { xs: '32px', md: '40px' },
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              mb: 3
            }}
          >
            ¿Necesitas asesoría legal?
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4,
              color: 'rgba(255, 255, 255, 0.95)',
              fontSize: '18px',
              lineHeight: 1.7,
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            Nuestro equipo está listo para ayudarte. Contáctanos para una consulta inicial
            sin compromiso y descubre cómo podemos ayudarte.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#FF7D00',
              color: '#fff',
              borderRadius: '8px',
              textTransform: 'none',
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: 600,
              fontFamily: "'Open Sans', sans-serif",
              boxShadow: '0 4px 12px rgba(255, 125, 0, 0.3)',
              '&:hover': {
                backgroundColor: '#FF8F1F',
              }
            }}
          >
            Contactar Ahora
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Services; 