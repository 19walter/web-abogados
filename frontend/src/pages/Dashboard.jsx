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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0', '#FF6666'];
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cases, setCases] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [porEstado, setPorEstado] = useState([]);
  const [porMes, setPorMes] = useState([]);

  useEffect(() => {
    fetchData();
    fetchReportData();
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

  const fetchReportData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [estadoRes, mesRes] = await Promise.all([
        axios.get(`${API_URL}/appointments/reportes/por-estado`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/appointments/reportes/por-mes`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const estadoData = Array.isArray(estadoRes.data?.data) ? estadoRes.data.data : [];
      setPorEstado(estadoData.map(item => ({
        name: item.estado,
        value: parseInt(item.cantidad)
      })));

      const mesData = Array.isArray(mesRes.data?.data) ? mesRes.data.data : [];
      setPorMes(mesData.map(item => ({
        mes: `${item.anio}-${String(item.mes).padStart(2, '0')}`,
        cantidad: parseInt(item.cantidad)
      })));
    } catch (error) {
      console.error('Error al cargar datos de reportes:', error);
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

  const getStatusColor = (estado) => {
    if (!estado) return 'default';
    switch (estado.toLowerCase()) {
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
      <Grid container spacing={3} columns={12}>
        {/* Bienvenida y perfil */}
        <Grid span={12}>
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
        <Grid span={4}>
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
        <Grid span={4}>
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
        <Grid span={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Documentos
            </Typography>
            <Typography variant="h3" color="primary">
              {loading ? '...' : cases.filter(c => c.estado === 'En proceso').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Casos en proceso
            </Typography>
          </Paper>
        </Grid>

        {/* Gráficas de Citas */}
        <Grid span={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Estadísticas de Citas
            </Typography>
            <Grid container spacing={4} justifyContent="flex-start" alignItems="stretch" gap={4}>
              <Grid>
                <Paper sx={{ p: 3, minHeight: 420, width: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="h6" gutterBottom>Citas por Estado</Typography>
                  {porEstado.length === 0 ? (
                    <Typography color="text.secondary" sx={{ mt: 8 }}>No hay datos para mostrar</Typography>
                  ) : (
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <Pie
                          data={porEstado}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={130}
                          innerRadius={60}
                          fill="#8884d8"
                          label={({ name, value }) => `${name}: ${value}`}
                          labelLine={false}
                        >
                          {porEstado.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value} citas`} />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </Paper>
              </Grid>
              <Grid>
                <Paper sx={{ p: 3, minHeight: 420, width: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="h6" gutterBottom>Citas por Mes</Typography>
                  {porMes.length === 0 ? (
                    <Typography color="text.secondary" sx={{ mt: 8 }}>No hay datos para mostrar</Typography>
                  ) : (
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={porMes} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis allowDecimals={false} />
                        <Tooltip formatter={(value) => `${value} citas`} />
                        <Legend verticalAlign="bottom" height={36} />
                        <Bar dataKey="cantidad" fill="#0088FE" name="Citas" label={{ position: 'top', fill: '#333' }} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Tabs para Casos y Citas */}
        <Grid span={12}>
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
                  <Grid container spacing={3} columns={12}>
                    {loading ? (
                      <Grid span={12}>
                        <Typography>Cargando casos...</Typography>
                      </Grid>
                    ) : cases.length === 0 ? (
                      <Grid span={12}>
                        <Typography>No hay casos registrados</Typography>
                      </Grid>
                    ) : (
                      cases.map((caso) => (
                        <Grid span={6} key={caso.caso_id}>
                          <Card>
                            <CardContent>
                              <Typography variant="h6" gutterBottom>
                                {caso.cliente_id ? (caso.Cliente?.nombre_apellido || `Cliente #${caso.cliente_id}`) : 'Sin cliente'}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Tipo: {caso.tipo_caso}
                              </Typography>
                              <Box sx={{ mb: 2 }}>
                                <Chip
                                  label={caso.estado}
                                  color={getStatusColor(caso.estado)}
                                  size="small"
                                />
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                Asignado a: {caso.abogado_id ? (caso.Usuario?.nombre_apellido || `Abogado #${caso.abogado_id}`) : 'Sin abogado'}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Fecha: {caso.fecha_inicio ? new Date(caso.fecha_inicio).toLocaleDateString() : 'Sin fecha'}
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
                  <Grid container spacing={3} columns={12}>
                    {loading ? (
                      <Grid span={12}>
                        <Typography>Cargando citas...</Typography>
                      </Grid>
                    ) : appointments.length === 0 ? (
                      <Grid span={12}>
                        <Typography>No hay citas programadas</Typography>
                      </Grid>
                    ) : (
                      appointments.map((cita) => (
                        <Grid span={6} key={cita.cita_id}>
                          <Card>
                            <CardContent>
                              <Typography variant="h6" gutterBottom>
                                {cita.Cliente?.nombre_apellido || `Cliente #${cita.cliente_id}`}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Abogado: {cita.Abogado?.nombre_apellido || `Abogado #${cita.abogado_id}`}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Fecha: {cita.fecha_hora ? new Date(cita.fecha_hora).toLocaleString() : 'Sin fecha'}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Motivo: {cita.motivo || 'Sin motivo'}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Lugar: {cita.lugar || 'Sin lugar'}
                              </Typography>
                              <Box sx={{ mt: 1 }}>
                                <Chip
                                  label={cita.estado}
                                  color={getStatusColor(cita.estado)}
                                  size="small"
                                />
                              </Box>
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