import React, { useState, useEffect } from 'react';
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
  Chip,
  Avatar,
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
import { getAllRecords } from '../services/records.service';
import { getAllAppointments } from '../services/appointments.service';

const Dashboard = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cases, setCases] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [casesData, appointmentsData] = await Promise.all([
        getAllRecords(),
        getAllAppointments()
      ]);
      
      setCases(casesData);
      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'en proceso':
        return 'warning';
      case 'activo':
        return 'info';
      case 'completado':
        return 'success';
      case 'en espera':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Bienvenida y perfil */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box>
                <Typography variant="h4" gutterBottom>
                  Bienvenido, {user?.usuario || 'Usuario'}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Panel de control para gestionar tus casos y citas
                </Typography>
              </Box>
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
              {loading ? '...' : cases.length}
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
              {loading ? '...' : appointments.length}
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
              {loading ? '...' : cases.filter(c => c.status === 'En proceso').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Casos en proceso
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
                    {loading ? (
                      <Grid item xs={12}>
                        <Typography>Cargando casos...</Typography>
                      </Grid>
                    ) : cases.length === 0 ? (
                      <Grid item xs={12}>
                        <Typography>No hay casos registrados</Typography>
                      </Grid>
                    ) : (
                      cases.map((caso) => (
                        <Grid item xs={12} md={6} key={caso.id}>
                          <Card>
                            <CardContent>
                              <Typography variant="h6" gutterBottom>
                                {caso.client_name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Tipo: {caso.case_type}
                              </Typography>
                              <Box sx={{ mb: 2 }}>
                                <Chip
                                  label={caso.status}
                                  color={getStatusColor(caso.status)}
                                  size="small"
                                />
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                Asignado a: {caso.assigned_to}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Fecha: {new Date(caso.start_date).toLocaleDateString()}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))
                    )}
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
                      Nueva Cita
                    </Button>
                  </Box>
                  <Grid container spacing={3}>
                    {loading ? (
                      <Grid item xs={12}>
                        <Typography>Cargando citas...</Typography>
                      </Grid>
                    ) : appointments.length === 0 ? (
                      <Grid item xs={12}>
                        <Typography>No hay citas programadas</Typography>
                      </Grid>
                    ) : (
                      appointments.map((cita) => (
                        <Grid item xs={12} md={6} key={cita.id}>
                          <Card>
                            <CardContent>
                              <Typography variant="h6" gutterBottom>
                                {cita.client_name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Tipo: {cita.case_type}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Fecha: {new Date(cita.start_date).toLocaleDateString()}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Asignado a: {cita.assigned_to}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))
                    )}
                  </Grid>
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