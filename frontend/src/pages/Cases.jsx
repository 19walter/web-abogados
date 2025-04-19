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
import { getAllRecords, createRecord, updateRecord, deleteRecord } from '../services/records.service';

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCase, setCurrentCase] = useState(null);
  const [formData, setFormData] = useState({
    client_name: '',
    case_type: '',
    status: 'En proceso',
    start_date: new Date().toISOString().split('T')[0],
    assigned_to: '',
    case_notes: ''
  });

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const casesData = await getAllRecords();
      setCases(casesData);
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
        client_name: caseData.client_name || '',
        case_type: caseData.case_type || '',
        status: caseData.status || 'En proceso',
        start_date: caseData.start_date || new Date().toISOString().split('T')[0],
        assigned_to: caseData.assigned_to || '',
        case_notes: caseData.case_notes || ''
      });
    } else {
      setCurrentCase(null);
      setFormData({
        client_name: '',
        case_type: '',
        status: 'En proceso',
        start_date: new Date().toISOString().split('T')[0],
        assigned_to: '',
        case_notes: ''
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
                <TableRow key={caseItem.id}>
                  <TableCell>{caseItem.client_name}</TableCell>
                  <TableCell>{caseItem.case_type}</TableCell>
                  <TableCell>
                    <Chip
                      label={caseItem.status}
                      color={getStatusColor(caseItem.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(caseItem.start_date).toLocaleDateString()}</TableCell>
                  <TableCell>{caseItem.assigned_to}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleOpenDialog(caseItem)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(caseItem.id)}>
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
              fullWidth
              label="Nombre del Cliente"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              select
              fullWidth
              label="Tipo de Caso"
              name="case_type"
              value={formData.case_type}
              onChange={handleChange}
              required
              margin="normal"
            >
              <MenuItem value="Divorcio">Divorcio</MenuItem>
              <MenuItem value="Demanda laboral">Demanda laboral</MenuItem>
              <MenuItem value="Contrato comercial">Contrato comercial</MenuItem>
              <MenuItem value="Propiedad intelectual">Propiedad intelectual</MenuItem>
            </TextField>
            <TextField
              select
              fullWidth
              label="Estado"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              margin="normal"
            >
              <MenuItem value="En proceso">En proceso</MenuItem>
              <MenuItem value="Activo">Activo</MenuItem>
              <MenuItem value="Completado">Completado</MenuItem>
              <MenuItem value="En espera">En espera</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Fecha de Inicio"
              name="start_date"
              type="date"
              value={formData.start_date}
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
              name="assigned_to"
              value={formData.assigned_to}
              onChange={handleChange}
              required
              margin="normal"
            >
              <MenuItem value="Dr. García">Dr. García</MenuItem>
              <MenuItem value="Dra. Sánchez">Dra. Sánchez</MenuItem>
              <MenuItem value="Dr. Martínez">Dr. Martínez</MenuItem>
              <MenuItem value="Dra. López">Dra. López</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Notas del Caso"
              name="case_notes"
              value={formData.case_notes}
              onChange={handleChange}
              multiline
              rows={4}
              margin="normal"
            />
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