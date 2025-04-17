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
  Grid,
  Chip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { getAllRecords, createRecord, updateRecord, deleteRecord } from '../services/records.service';

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCase, setCurrentCase] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    estado: 'Pendiente',
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: '',
    cliente: '',
    abogado: '',
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const response = await getAllRecords();
      setCases(response.data);
    } catch (error) {
      console.error('Error al cargar casos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (caseData = null) => {
    if (caseData) {
      setCurrentCase(caseData);
      setFormData({
        titulo: caseData.titulo || '',
        descripcion: caseData.descripcion || '',
        estado: caseData.estado || 'Pendiente',
        fechaInicio: caseData.fechaInicio || new Date().toISOString().split('T')[0],
        fechaFin: caseData.fechaFin || '',
        cliente: caseData.cliente || '',
        abogado: caseData.abogado || '',
      });
    } else {
      setCurrentCase(null);
      setFormData({
        titulo: '',
        descripcion: '',
        estado: 'Pendiente',
        fechaInicio: new Date().toISOString().split('T')[0],
        fechaFin: '',
        cliente: '',
        abogado: '',
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
        await updateRecord(currentCase.id, formData);
      } else {
        await createRecord(formData);
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
        await deleteRecord(id);
        fetchCases();
      } catch (error) {
        console.error('Error al eliminar caso:', error);
      }
    }
  };

  const handleMenuOpen = (event, caseData) => {
    setAnchorEl(event.currentTarget);
    setSelectedCase(caseData);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCase(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendiente':
        return 'warning';
      case 'En Proceso':
        return 'info';
      case 'Completado':
        return 'success';
      case 'Cancelado':
        return 'error';
      default:
        return 'default';
    }
  };

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
              <TableCell>Título</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha Inicio</TableCell>
              <TableCell>Fecha Fin</TableCell>
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
                <TableRow key={caseItem.id}>
                  <TableCell>{caseItem.titulo}</TableCell>
                  <TableCell>{caseItem.cliente}</TableCell>
                  <TableCell>
                    <Chip
                      label={caseItem.estado}
                      color={getStatusColor(caseItem.estado)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(caseItem.fechaInicio).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {caseItem.fechaFin
                      ? new Date(caseItem.fechaFin).toLocaleDateString()
                      : '-'}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, caseItem)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            handleOpenDialog(selectedCase);
          }}
        >
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            handleDelete(selectedCase.id);
          }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Eliminar
        </MenuItem>
      </Menu>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentCase ? 'Editar Caso' : 'Nuevo Caso'}
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
                  rows={4}
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
                  fullWidth
                  label="Abogado"
                  name="abogado"
                  value={formData.abogado}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  select
                  SelectProps={{
                    native: true,
                  }}
                  required
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Completado">Completado</option>
                  <option value="Cancelado">Cancelado</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Fecha de Inicio"
                  name="fechaInicio"
                  type="date"
                  value={formData.fechaInicio}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Fecha de Fin"
                  name="fechaFin"
                  type="date"
                  value={formData.fechaFin}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
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