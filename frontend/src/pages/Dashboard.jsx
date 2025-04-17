import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Card,
  CardContent,
  CardActions,
  Tabs,
  Tab,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Description,
  Event,
  Person,
  Settings,
  MoreVert,
  Add,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Datos de ejemplo para los casos
  const casos = [
    {
      id: 1,
      titulo: 'Caso Corporativo XYZ',
      estado: 'En proceso',
      fecha: '2023-04-15',
      descripcion: 'Asesoría en fusión empresarial',
    },
    {
      id: 2,
      titulo: 'Defensa Penal ABC',
      estado: 'Pendiente',
      fecha: '2023-04-10',
      descripcion: 'Defensa en caso de fraude',
    },
  ];

  // Datos de ejemplo para las citas
  const citas = [
    {
      id: 1,
      fecha: '2023-04-20',
      hora: '10:00',
      tipo: 'Consulta inicial',
      abogado: 'Dr. Juan Pérez',
    },
    {
      id: 2,
      fecha: '2023-04-25',
      hora: '15:30',
      tipo: 'Seguimiento',
      abogado: 'Dra. María López',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Bienvenida y perfil */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" gutterBottom>
                Bienvenido, {user?.usuario || 'Usuario'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Panel de control para gestionar tus casos y citas
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={handleMenuClick}>
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Person sx={{ mr: 2 }} /> Mi Perfil
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Settings sx={{ mr: 2 }} /> Configuración
                </MenuItem>
              </Menu>
            </Box>
          </Paper>
        </Grid>

        {/* Resumen de estadísticas */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Mis Casos
            </Typography>
            <Typography variant="h3" color="primary">
              {casos.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Casos activos
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Próximas Citas
            </Typography>
            <Typography variant="h3" color="primary">
              {citas.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Citas programadas
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Documentos
            </Typography>
            <Typography variant="h3" color="primary">
              5
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Documentos pendientes
            </Typography>
          </Paper>
        </Grid>

        {/* Tabs para Casos y Citas */}
        <Grid item xs={12}>
          <Paper sx={{ width: '100%' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Mis Casos" />
              <Tab label="Mis Citas" />
              <Tab label="Documentos" />
            </Tabs>

            {/* Contenido de los tabs */}
            <Box sx={{ p: 3 }}>
              {tabValue === 0 && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Add />}
                    >
                      Nuevo Caso
                    </Button>
                  </Box>
                  <Grid container spacing={3}>
                    {casos.map((caso) => (
                      <Grid item xs={12} md={6} key={caso.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              {caso.titulo}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Estado: {caso.estado}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Fecha: {caso.fecha}
                            </Typography>
                            <Typography variant="body2">
                              {caso.descripcion}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small" color="primary">
                              Ver Detalles
                            </Button>
                            <Button size="small" color="primary">
                              Actualizar
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {tabValue === 1 && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Add />}
                    >
                      Agendar Cita
                    </Button>
                  </Box>
                  <List>
                    {citas.map((cita) => (
                      <React.Fragment key={cita.id}>
                        <ListItem>
                          <ListItemIcon>
                            <Event color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${cita.tipo} - ${cita.abogado}`}
                            secondary={`${cita.fecha} a las ${cita.hora}`}
                          />
                          <Button variant="outlined" size="small">
                            Modificar
                          </Button>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              )}

              {tabValue === 2 && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Add />}
                    >
                      Subir Documento
                    </Button>
                  </Box>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Description color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Contrato de Servicios"
                        secondary="Subido el 15/04/2023"
                      />
                      <Button variant="outlined" size="small">
                        Descargar
                      </Button>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <Description color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Poder Legal"
                        secondary="Subido el 10/04/2023"
                      />
                      <Button variant="outlined" size="small">
                        Descargar
                      </Button>
                    </ListItem>
                  </List>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 