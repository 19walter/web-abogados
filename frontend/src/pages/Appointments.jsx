import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import { getAllRecords, createRecord, updateRecord, deleteRecord } from '../services/records.service';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: new Date().toISOString().split('T')[0],
    hora: '09:00',
    cliente: '',
    tipo: 'Consulta',
    estado: 'Programada',
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await getAllRecords();
      // Filtrar solo las citas
      const appointmentsData = response.data.filter(
        (item) => item.tipo === 'Consulta' || item.tipo === 'Reunión'
      );
      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Error al cargar citas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (appointmentData = null) => {
    if (appointmentData) {
      setCurrentAppointment(appointmentData);
      setFormData({
        titulo: appointmentData.titulo || '',
        descripcion: appointmentData.descripcion || '',
        fecha: appointmentData.fecha || new Date().toISOString().split('T')[0],
        hora: appointmentData.hora || '09:00',
        cliente: appointmentData.cliente || '',
        tipo: appointmentData.tipo || 'Consulta',
        estado: appointmentData.estado || 'Programada',
      });
    } else {
      setCurrentAppointment(null);
      setFormData({
        titulo: '',
        descripcion: '',
        fecha: new Date().toISOString().split('T')[0],
        hora: '09:00',
        cliente: '',
        tipo: 'Consulta',
        estado: 'Programada',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentAppointment(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentAppointment) {
        await updateRecord(currentAppointment.id, formData);
      } else {
        await createRecord(formData);
      }
      fetchAppointments();
      handleCloseDialog();
    } catch (error) {
      console.error('Error al guardar cita:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta cita?')) {
      try {
        await deleteRecord(id);
        fetchAppointments();
      } catch (error) {
        console.error('Error al eliminar cita:', error);
      }
    }
  };

  const handleMenuOpen = (event, appointmentData) => {
    setAnchorEl(event.currentTarget);
    setSelectedAppointment(appointmentData);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAppointment(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Programada':
        return 'info';
      case 'Confirmada':
        return 'success';
      case 'Cancelada':
        return 'error';
      case 'Completada':
        return 'primary';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const renderContent = () => {
    if (loading) {
      return <Typography>Cargando citas...</Typography>;
    }
    if (appointments.length === 0) {
      return (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography>No hay citas programadas</Typography>
        </Paper>
      );
    }
    return (
      <Grid container spacing={3}>
        {appointments.map((appointment) => (
          <Grid item xs={12} sm={6} md={4} key={appointment.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6" component="div">
                    {appointment.titulo}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, appointment)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Typography color="text.secondary" gutterBottom>
                  {appointment.cliente}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EventIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {formatDate(appointment.fecha)} - {appointment.hora}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {appointment.descripcion}
                </Typography>
                <Chip
                  label={appointment.estado}
                  color={getStatusColor(appointment.estado)}
                  size="small"
                />
              </CardContent>
              <CardActions>
                <Button size="small">Ver Detalles</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Citas
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nueva Cita
        </Button>
      </Box>

      {renderContent()}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            handleOpenDialog(selectedAppointment);
          }}
        >
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            handleDelete(selectedAppointment.id);
          }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Eliminar
        </MenuItem>
      </Menu>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentAppointment ? 'Editar Cita' : 'Nueva Cita'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Cliente"
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Tipo de Cita"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="consulta">Consulta</MenuItem>
                  <MenuItem value="seguimiento">Seguimiento</MenuItem>
                  <MenuItem value="audiencia">Audiencia</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="pendiente">Pendiente</MenuItem>
                  <MenuItem value="confirmada">Confirmada</MenuItem>
                  <MenuItem value="cancelada">Cancelada</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Fecha"
                  name="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={handleChange}
                  sx={{
                    '& label': {
                      transform: 'translate(14px, -9px) scale(0.75)',
                    },
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Hora"
                  name="hora"
                  type="time"
                  value={formData.hora}
                  onChange={handleChange}
                  sx={{
                    '& label': {
                      transform: 'translate(14px, -9px) scale(0.75)',
                    },
                  }}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {currentAppointment ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default Appointments; 