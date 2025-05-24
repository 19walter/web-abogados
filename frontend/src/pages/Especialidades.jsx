import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { getAllEspecialidades, createEspecialidad, updateEspecialidad, deleteEspecialidad } from '../services/records.service';

const Especialidades = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [open, setOpen] = useState(false);
  const [editEsp, setEditEsp] = useState(null);
  const [form, setForm] = useState({ nombre: '' });

  const fetchEspecialidades = async () => {
    const res = await getAllEspecialidades();
    setEspecialidades(res.data || []);
  };

  useEffect(() => { fetchEspecialidades(); }, []);

  const handleOpen = (esp = null) => {
    setEditEsp(esp);
    setForm(esp ? { ...esp } : { nombre: '' });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async e => {
    e.preventDefault();
    if (editEsp) await updateEspecialidad(editEsp.id, form);
    else await createEspecialidad(form);
    fetchEspecialidades();
    handleClose();
  };
  const handleDelete = async id => { if (window.confirm('¿Eliminar especialidad?')) { await deleteEspecialidad(id); fetchEspecialidades(); } };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Especialidades</Typography>
      <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()} sx={{ mb: 2 }}>Nueva Especialidad</Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {especialidades.map(e => (
              <TableRow key={e.id}>
                <TableCell>{e.nombre}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(e)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(e.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editEsp ? 'Editar Especialidad' : 'Nueva Especialidad'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} fullWidth required margin="normal" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="contained">{editEsp ? 'Actualizar' : 'Crear'}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Especialidades; 