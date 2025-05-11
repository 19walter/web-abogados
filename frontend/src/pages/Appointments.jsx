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
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import { getAllAppointments, createAppointment, updateAppointment, deleteAppointment } from '../services/appointments.service';
import { getAllClientes, getAllAbogados, getAllCasos } from '../services/records.service';

const estadoOptions = ['Pendiente', 'Realizada', 'Cancelada'];

const Appointments = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCita, setCurrentCita] = useState(null);
  const [formData, setFormData] = useState({
    cliente_id: '',
    abogado_id: '',
    caso_id: '',
    fecha_hora: '',
    lugar: '',
    motivo: '',
    estado: 'Pendiente',
    notas: ''
  });
  const [clientes, setClientes] = useState([]);
  const [abogados, setAbogados] = useState([]);
  const [casos, setCasos] = useState([]);

  useEffect(() => {
    fetchCitas();
    getAllClientes().then(res => setClientes(res.data));
    getAllAbogados().then(res => setAbogados(res.data));
    getAllCasos().then(res => setCasos(res.data));
  }, []);

  const fetchCitas = async () => {
    try {
      setLoading(true);
      const data = await getAllAppointments();
      setCitas(data || []);
    } catch (error) {
      console.error('Error al cargar citas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (citaData = null) => {
    if (citaData) {
      setCurrentCita(citaData);
      setFormData({
        cliente_id: citaData.cliente_id || '',
        abogado_id: citaData.abogado_id || '',
        caso_id: citaData.caso_id || '',
        fecha_hora: citaData.fecha_hora ? citaData.fecha_hora.substring(0, 16) : '',
        lugar: citaData.lugar || '',
        motivo: citaData.motivo || '',
        estado: citaData.estado || 'Pendiente',
        notas: citaData.notas || ''
      });
    } else {
      setCurrentCita(null);
      setFormData({
        cliente_id: '',
        abogado_id: '',
        caso_id: '',
        fecha_hora: '',
        lugar: '',
        motivo: '',
        estado: 'Pendiente',
        notas: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCita(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatFechaMariaDB = (fecha) => {
    if (!fecha) return '';
    // Si ya está en formato YYYY-MM-DD HH:mm:ss, retorna igual
    if (/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(fecha)) return fecha;
    // Si viene de input type="datetime-local" (YYYY-MM-DDTHH:mm)
    if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(fecha)) {
      return fecha.replace('T', ' ') + ':00';
    }
    return fecha;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        fecha_hora: formatFechaMariaDB(formData.fecha_hora)
      };
      if (currentCita) {
        await updateAppointment(currentCita.cita_id, dataToSend);
      } else {
        await createAppointment(dataToSend);
      }
      fetchCitas();
      handleCloseDialog();
    } catch (error) {
      console.error('Error al guardar cita:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta cita?')) {
      try {
        await deleteAppointment(id);
        fetchCitas();
      } catch (error) {
        console.error('Error al eliminar cita:', error);
      }
    }
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Abogado</TableCell>
              <TableCell>Caso</TableCell>
              <TableCell>Fecha y Hora</TableCell>
              <TableCell>Motivo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : citas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No hay citas registradas
                </TableCell>
              </TableRow>
            ) : (
              citas.map((cita) => (
                <TableRow key={cita.cita_id}>
                  <TableCell>{cita.Cliente?.nombre_apellido || `Cliente #${cita.cliente_id}`}</TableCell>
                  <TableCell>{cita.Abogado?.nombre_apellido || `Abogado #${cita.abogado_id}`}</TableCell>
                  <TableCell>{cita.Caso?.tipo_caso || `Caso #${cita.caso_id}`}</TableCell>
                  <TableCell>{cita.fecha_hora ? new Date(cita.fecha_hora).toLocaleString() : ''}</TableCell>
                  <TableCell>{cita.motivo}</TableCell>
                  <TableCell>{cita.estado}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleOpenDialog(cita)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(cita.cita_id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentCita ? 'Editar Cita' : 'Nueva Cita'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              select
              fullWidth
              label="Cliente"
              name="cliente_id"
              value={formData.cliente_id}
              onChange={handleChange}
              required
              margin="normal"
            >
              {clientes.map((c) => (
                <MenuItem key={c.cliente_id} value={c.cliente_id}>{c.nombre_apellido}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Abogado"
              name="abogado_id"
              value={formData.abogado_id}
              onChange={handleChange}
              required
              margin="normal"
            >
              {abogados.map((a) => (
                <MenuItem key={a.usuario_id} value={a.usuario_id}>{a.nombre_apellido}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Caso"
              name="caso_id"
              value={formData.caso_id}
              onChange={handleChange}
              margin="normal"
            >
              {casos.map((ca) => (
                <MenuItem key={ca.caso_id} value={ca.caso_id}>{ca.tipo_caso}</MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Fecha y Hora"
              name="fecha_hora"
              type="datetime-local"
              value={formData.fecha_hora}
              onChange={handleChange}
              required
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Lugar"
              name="lugar"
              value={formData.lugar}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Motivo"
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              select
              fullWidth
              label="Estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
              margin="normal"
            >
              {estadoOptions.map(opt => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Notas"
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={2}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained">{currentCita ? 'Actualizar' : 'Crear'}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default Appointments; 