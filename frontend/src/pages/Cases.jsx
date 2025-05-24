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
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  AttachFile as AttachFileIcon,
  Delete as DeleteFileIcon,
} from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getAllCasos, createCaso, updateCaso, deleteCaso, getAllClientes, getAllAbogados, getAllEspecialidades } from '../services/records.service';
import { uploadFile, deleteFile } from '../services/files.service';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCase, setCurrentCase] = useState(null);
  const [formData, setFormData] = useState({
    cliente_id: '',
    especialidad_id: '',
    tipo_caso: '',
    estado: 'En proceso',
    fecha_inicio: new Date().toISOString().split('T')[0],
    abogado_id: '',
    descripcion: '',
  });
  const [clientes, setClientes] = useState([]);
  const [abogados, setAbogados] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filteredAbogados, setFilteredAbogados] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Opciones válidas para los selects
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
    fetchEspecialidades();
  }, []);

  useEffect(() => {
    console.log('Abogados:', abogados);
    console.log('Especialidad seleccionada:', formData.especialidad_id);
    
    if (!formData.especialidad_id) {
      console.log('No hay especialidad seleccionada o es undefined, reseteando filtros');
      setFilteredAbogados([]);
      setFormData(prev => ({ ...prev, abogado_id: "" }));
      return;
    }

    const especialidadSeleccionada = String(formData.especialidad_id);
    console.log('Filtrando abogados para especialidad:', especialidadSeleccionada);
    console.log('Especialidades de cada abogado:', abogados.map(a => ({
      nombre: a.nombre_apellido,
      especialidades: (a.especialidades || a.especialidads)?.map(e => ({ id: e.id || e.especialidad_id, nombre: e.nombre }))
    })));
    
    const abogadosFiltrados = abogados.filter(abogado => {
      const especialidades = abogado.especialidades || abogado.especialidads || [];
      const tieneEspecialidad = especialidades.some(esp => {
        const espId = String(esp.id || esp.especialidad_id);
        const coincide = espId === especialidadSeleccionada;
        console.log(`Comparando especialidad ${espId} (${esp.nombre}) con ${especialidadSeleccionada}: ${coincide}`);
        return coincide;
      });
      console.log(`Abogado ${abogado.nombre_apellido} tiene la especialidad: ${tieneEspecialidad}`);
      return tieneEspecialidad;
    });
    
    console.log('Abogados filtrados:', abogadosFiltrados);
    setFilteredAbogados(abogadosFiltrados);
    
    if (!abogadosFiltrados.some(a => a.usuario_id === formData.abogado_id)) {
      console.log('Reseteando abogado_id porque no está en los filtrados');
      setFormData(prev => ({ ...prev, abogado_id: "" }));
    }
  }, [formData.especialidad_id, abogados]);

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
      console.log('Iniciando fetchAbogados...');
      const response = await getAllAbogados();
      console.log('Respuesta de getAllAbogados:', response);
      
      if (response && response.data) {
        console.log('Abogados recibidos:', response.data);
        setAbogados(response.data);
      } else {
        console.error('Respuesta inválida de getAllAbogados:', response);
        setAbogados([]);
      }
    } catch (error) {
      console.error('Error al cargar abogados:', error);
      setAbogados([]);
      // Mostrar mensaje al usuario
      setSnackbar({
        open: true,
        message: 'Error al cargar los abogados. Por favor, verifica tu sesión.',
        severity: 'error'
      });
    }
  };

  const fetchEspecialidades = async () => {
    try {
      const response = await getAllEspecialidades();
      setEspecialidades(response.data || []);
    } catch (error) {
      console.error('Error al cargar especialidades:', error);
      setEspecialidades([]);
    }
  };

  const handleOpenDialog = (caseData = null) => {
    if (caseData) {
      setCurrentCase(caseData);
      setFormData({
        cliente_id: caseData.cliente_id ? String(caseData.cliente_id) : '',
        especialidad_id: caseData.especialidad_id ? String(caseData.especialidad_id) : '',
        tipo_caso: caseData.tipo_caso || '',
        estado: caseData.estado || 'En proceso',
        fecha_inicio: caseData.fecha_inicio ? caseData.fecha_inicio.split('T')[0] : new Date().toISOString().split('T')[0],
        abogado_id: caseData.abogado_id ? String(caseData.abogado_id) : '',
        descripcion: caseData.descripcion || '',
      });
    } else {
      setCurrentCase(null);
      setFormData({
        cliente_id: '',
        especialidad_id: '',
        tipo_caso: '',
        estado: 'En proceso',
        fecha_inicio: new Date().toISOString().split('T')[0],
        abogado_id: '',
        descripcion: '',
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
    console.log('handleChange:', { name, value, currentFormData: formData });
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };
      console.log('Nuevo formData:', newData);
      return newData;
    });
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveUploadedFile = async (fileId) => {
    try {
      await deleteFile(fileId);
      setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    } catch (error) {
      console.error('Error al eliminar archivo:', error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let casoId;
      if (currentCase) {
        await updateCaso(currentCase.caso_id, formData);
        casoId = currentCase.caso_id;
      } else {
        const { data } = await createCaso(formData);
        casoId = data.caso_id;
      }
      // Subir archivos
      const uploadPromises = selectedFiles.map(file => uploadFile(file, casoId));
      await Promise.all(uploadPromises);
      fetchCases();
      handleCloseDialog();
      setSnackbar({ open: true, message: 'Caso y archivos guardados correctamente', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error al guardar el caso o archivos', severity: 'error' });
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

  console.log('filteredAbogados:', filteredAbogados);

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

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{currentCase ? 'Editar Caso' : 'Nuevo Caso'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container columns={12} spacing={2}>
              <Grid xs={12} md={6}>
                <TextField
                  id="cliente-select"
                  select
                  fullWidth
                  label="Cliente"
                  name="cliente_id"
                  value={formData.cliente_id || ""}
                  onChange={handleChange}
                  required
                  margin="normal"
                >
                  {clientes.map((cliente) => (
                    <MenuItem key={cliente.cliente_id} value={String(cliente.cliente_id)}>
                      {cliente.nombre_apellido}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="especialidad-select"
                  select
                  fullWidth
                  label="Especialidad"
                  name="especialidad_id"
                  value={formData.especialidad_id || ""}
                  onChange={(e) => {
                    console.log('Select de especialidad cambiado:', e.target.value);
                    handleChange(e);
                  }}
                  required
                  margin="normal"
                >
                  {especialidades.map((esp) => (
                    <MenuItem key={esp.id || esp.especialidad_id} value={String(esp.id || esp.especialidad_id)}>
                      {esp.nombre}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="abogado-select"
                  select
                  fullWidth
                  label="Abogado"
                  name="abogado_id"
                  value={formData.abogado_id || ""}
                  onChange={handleChange}
                  required
                  margin="normal"
                  disabled={!formData.especialidad_id}
                >
                  {filteredAbogados.length === 0
                    ? <MenuItem value="">No hay abogados para esta especialidad</MenuItem>
                    : filteredAbogados.map((abogado) => (
                        <MenuItem key={abogado.usuario_id} value={String(abogado.usuario_id)}>
                          {abogado.nombre_apellido}
                        </MenuItem>
                      ))
                  }
                </TextField>
                <TextField
                  id="estado-select"
                  select
                  fullWidth
                  label="Estado"
                  name="estado"
                  value={formData.estado || ""}
                  onChange={handleChange}
                  required
                  margin="normal"
                >
                  {estadoOptions.map((estado) => (
                    <MenuItem key={estado} value={estado}>
                      {estado}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="tipo-caso-input"
                  fullWidth
                  label="Tipo de Caso"
                  name="tipo_caso"
                  value={formData.tipo_caso}
                  onChange={handleChange}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="descripcion-input"
                  fullWidth
                  label="Descripción"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  multiline
                  rows={5}
                  margin="normal"
                />
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    border: '2px dashed',
                    borderColor: dragActive ? 'primary.main' : 'grey.400',
                    borderRadius: 2,
                    backgroundColor: dragActive ? 'primary.lighter' : 'background.paper',
                    textAlign: 'center',
                    transition: 'border-color 0.2s, background-color 0.2s',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  <CloudUploadIcon color={dragActive ? 'primary' : 'action'} sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="body1" color="textSecondary">
                    Arrastra y suelta archivos aquí o haz clic para seleccionar
                  </Typography>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                    id="file-upload"
                  />
                </Box>
                <List>
                  {selectedFiles.map((file, index) => (
                    <ListItem key={index} sx={{ borderBottom: '1px solid #eee' }}>
                      <ListItemIcon>
                        <AttachFileIcon />
                      </ListItemIcon>
                      <ListItemText primary={file.name} secondary={`${(file.size / 1024).toFixed(1)} KB`} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => handleRemoveFile(index)}>
                          <DeleteFileIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                  {uploadedFiles.map((file) => (
                    <ListItem key={file.id} sx={{ borderBottom: '1px solid #eee' }}>
                      <ListItemIcon>
                        <AttachFileIcon />
                      </ListItemIcon>
                      <ListItemText primary={file.nombre} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => handleRemoveUploadedFile(file.id)}>
                          <DeleteFileIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {currentCase ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </form>
        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
      </Dialog>
    </Container>
  );
};

export default Cases; 