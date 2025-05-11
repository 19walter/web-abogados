import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { getAllCasos, createCaso, updateCaso, deleteCaso, getAllClientes, getAllAbogados } from '../services/records.service';

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCase, setCurrentCase] = useState(null);
  const [formData, setFormData] = useState({
    cliente_id: '',
    tipo_caso: '',
    estado: 'En proceso',
    fecha_inicio: new Date().toISOString().split('T')[0],
    abogado_id: '',
  });
  const [clientes, setClientes] = useState([]);
  const [abogados, setAbogados] = useState([]);

  // Opciones válidas para los selects
  const tipoCasoOptions = [
    "Divorcio",
    "Demanda laboral",
    "Contrato comercial",
    "Propiedad intelectual"
  ];
  const estadoOptions = [
    "En proceso",
    "Activo",
    "Completado",
    "En espera"
  ];

  useEffect(() => {
    fetchCases();
    fetchClientes();
    fetchAbogados();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const response = await getAllCasos();
      setCases(response.data || []);
    } catch (error) {
      console.error('Error al cargar casos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await getAllClientes();
      setClientes(response.data || []);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
      setClientes([]);
    }
  };

  const fetchAbogados = async () => {
    try {
      const response = await getAllAbogados();
      setAbogados(response.data || []);
    } catch (error) {
      console.error('Error al cargar abogados:', error);
      setAbogados([]);
    }
  };

  const handleOpenDialog = (caseData = null) => {
    if (caseData) {
      setCurrentCase(caseData);
      setFormData({
        cliente_id: caseData.cliente_id || '',
        tipo_caso: caseData.tipo_caso || '',
        estado: caseData.estado || 'En proceso',
        fecha_inicio: caseData.fecha_inicio ? caseData.fecha_inicio.split('T')[0] : new Date().toISOString().split('T')[0],
        abogado_id: caseData.abogado_id || '',
      });
    } else {
      setCurrentCase(null);
      setFormData({
        cliente_id: '',
        tipo_caso: '',
        estado: 'En proceso',
        fecha_inicio: new Date().toISOString().split('T')[0],
        abogado_id: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCase(null);
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
      if (currentCase) {
        await updateCaso(currentCase.caso_id, formData);
      } else {
        await createCaso(formData);
      }
      fetchCases();
      handleCloseDialog();
    } catch (error) {
      console.error('Error al guardar caso:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este caso?')) {
      try {
        await deleteCaso(id);
        fetchCases();
      } catch (error) {
        console.error('Error al eliminar caso:', error);
      }
    }
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

  // Al preparar los valores para el formulario:
  const tipoCasoValue = tipoCasoOptions.includes(formData.tipo_caso)
    ? formData.tipo_caso
    : "";
  const estadoValue = estadoOptions.includes(formData.estado)
    ? formData.estado
    : "";

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Casos Legales
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nuevo Caso
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Tipo de Caso</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha Inicio</TableCell>
              <TableCell>Asignado a</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : cases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No hay casos registrados
                </TableCell>
              </TableRow>
            ) : (
              cases.map((caseItem) => (
                <TableRow key={caseItem.caso_id}>
                  <TableCell>{caseItem.Cliente?.nombre_apellido || `Cliente #${caseItem.cliente_id}`}</TableCell>
                  <TableCell>{caseItem.tipo_caso}</TableCell>
                  <TableCell>
                    <Chip
                      label={caseItem.estado}
                      color={getStatusColor(caseItem.estado)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{caseItem.fecha_inicio ? new Date(caseItem.fecha_inicio).toLocaleDateString() : ''}</TableCell>
                  <TableCell>{caseItem.Usuario?.nombre_apellido || `Abogado #${caseItem.abogado_id}`}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleOpenDialog(caseItem)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(caseItem.caso_id)}>
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
        <DialogTitle>
          {currentCase ? 'Editar Caso' : 'Nuevo Caso'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              select
              fullWidth
              label="Nombre del Cliente"
              name="cliente_id"
              value={formData.cliente_id}
              onChange={handleChange}
              required
              margin="normal"
            >
              {clientes.map((cliente) => (
                <MenuItem key={cliente.cliente_id} value={cliente.cliente_id}>
                  {cliente.nombre_apellido}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Tipo de Caso"
              name="tipo_caso"
              value={tipoCasoValue}
              onChange={handleChange}
              required
              margin="normal"
            >
              {tipoCasoOptions.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Estado"
              name="estado"
              value={estadoValue}
              onChange={handleChange}
              required
              margin="normal"
            >
              {estadoOptions.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Fecha de Inicio"
              name="fecha_inicio"
              type="date"
              value={formData.fecha_inicio}
              onChange={handleChange}
              required
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              select
              fullWidth
              label="Asignado a"
              name="abogado_id"
              value={formData.abogado_id}
              onChange={handleChange}
              required
              margin="normal"
            >
              {abogados.map((abogado) => (
                <MenuItem key={abogado.usuario_id} value={abogado.usuario_id}>
                  {abogado.nombre_apellido}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {currentCase ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default Cases; 