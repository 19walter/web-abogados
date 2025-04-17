import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const Documents = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'Contrato de Servicios',
      type: 'contract',
      date: '2024-04-15',
      status: 'active',
    },
    {
      id: 2,
      title: 'Poder Legal',
      type: 'power_of_attorney',
      date: '2024-04-10',
      status: 'pending',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'contract',
    status: 'active',
  });

  const handleOpenDialog = (document = null) => {
    if (document) {
      setSelectedDocument(document);
      setFormData({
        title: document.title,
        type: document.type,
        status: document.status,
      });
    } else {
      setSelectedDocument(null);
      setFormData({
        title: '',
        type: 'contract',
        status: 'active',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDocument(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDocument) {
      // Actualizar documento existente
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === selectedDocument.id
            ? { ...doc, ...formData }
            : doc
        )
      );
    } else {
      // Crear nuevo documento
      setDocuments((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...formData,
          date: new Date().toISOString().split('T')[0],
        },
      ]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar este documento?')) {
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Documentos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nuevo Documento
        </Button>
      </Box>

      <List>
        {documents.map((document) => (
          <ListItem
            key={document.id}
            sx={{
              mb: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <ListItemIcon>
              <DescriptionIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={document.title}
              secondary={`Fecha: ${document.date}`}
            />
            <Box>
              <IconButton
                edge="end"
                aria-label="editar"
                onClick={() => handleOpenDialog(document)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="eliminar"
                onClick={() => handleDelete(document.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedDocument ? 'Editar Documento' : 'Nuevo Documento'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Título"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              select
              fullWidth
              label="Tipo"
              name="type"
              value={formData.type}
              onChange={handleChange}
              sx={{ mb: 2 }}
            >
              <MenuItem value="contract">Contrato</MenuItem>
              <MenuItem value="power_of_attorney">Poder Legal</MenuItem>
              <MenuItem value="legal_brief">Escrito Legal</MenuItem>
              <MenuItem value="evidence">Evidencia</MenuItem>
            </TextField>
            <TextField
              select
              fullWidth
              label="Estado"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="active">Activo</MenuItem>
              <MenuItem value="pending">Pendiente</MenuItem>
              <MenuItem value="archived">Archivado</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {selectedDocument ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default Documents; 