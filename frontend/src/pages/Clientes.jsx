import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Alert, Snackbar } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { getAllClientes, createCliente, updateCliente, deleteCliente } from '../services/records.service';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [open, setOpen] = useState(false);
  const [editCliente, setEditCliente] = useState(null);
  const [form, setForm] = useState({ nombre_apellido: '', correo: '', telefono: '', mensaje: '' });
  const [error, setError] = useState(null);

  const fetchClientes = async () => {
    try {
      const res = await getAllClientes();
      setClientes(res.data || []);
    } catch (error) {
      setError('Error al cargar los clientes: ' + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => { fetchClientes(); }, []);

  const handleOpen = (cliente = null) => {
    setEditCliente(cliente);
    setForm(cliente ? { ...cliente } : { nombre_apellido: '', correo: '', telefono: '', mensaje: '' });
    setOpen(true);
    setError(null);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editCliente) {
        await updateCliente(editCliente.cliente_id, form);
      } else {
        await createCliente(form);
      }
      await fetchClientes();
      handleClose();
    } catch (error) {
      setError('Error al ' + (editCliente ? 'actualizar' : 'crear') + ' el cliente: ' + 
        (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async id => {
    if (window.confirm('¿Eliminar cliente?')) {
      try {
        await deleteCliente(id);
        await fetchClientes();
      } catch (error) {
        setError('Error al eliminar el cliente: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Clientes</Typography>
      <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()} sx={{ mb: 2 }}>Nuevo Cliente</Button>
      
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Mensaje</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map(c => (
              <TableRow key={c.cliente_id}>
                <TableCell>{c.nombre_apellido}</TableCell>
                <TableCell>{c.correo}</TableCell>
                <TableCell>{c.telefono}</TableCell>
                <TableCell>{c.mensaje}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(c)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(c.cliente_id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editCliente ? 'Editar Cliente' : 'Nuevo Cliente'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <TextField 
              label="Nombre y Apellido" 
              name="nombre_apellido" 
              value={form.nombre_apellido} 
              onChange={handleChange} 
              fullWidth 
              required 
              margin="normal" 
            />
            <TextField 
              label="Correo" 
              name="correo" 
              type="email"
              value={form.correo} 
              onChange={handleChange} 
              fullWidth 
              required 
              margin="normal" 
            />
            <TextField 
              label="Teléfono" 
              name="telefono" 
              value={form.telefono} 
              onChange={handleChange} 
              fullWidth 
              required 
              margin="normal" 
            />
            <TextField 
              label="Mensaje" 
              name="mensaje" 
              value={form.mensaje} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="contained">{editCliente ? 'Actualizar' : 'Crear'}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Clientes; 