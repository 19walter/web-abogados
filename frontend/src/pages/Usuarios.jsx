import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { getAllUsuarios, createUsuario, updateUsuario, deleteUsuario, getAllEspecialidades } from '../services/records.service';

const roles = ['admin', 'asistente', 'abogado'];

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [open, setOpen] = useState(false);
  const [editUsuario, setEditUsuario] = useState(null);
  const [form, setForm] = useState({ nombre_apellido: '', correo: '', contrasena: '', rol: 'abogado' });
  const [filtroRol, setFiltroRol] = useState('');
  const [especialidades, setEspecialidades] = useState([]);

  const fetchUsuarios = async () => {
    const res = await getAllUsuarios();
    setUsuarios(res.data || []);
  };

  useEffect(() => { fetchUsuarios(); getAllEspecialidades().then(res => setEspecialidades(res.data || [])); }, []);

  const handleOpen = (usuario = null) => {
    setEditUsuario(usuario);
    setForm(usuario ? { ...usuario, contrasena: '' } : { nombre_apellido: '', correo: '', contrasena: '', rol: 'abogado' });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async e => {
    e.preventDefault();
    if (editUsuario) await updateUsuario(editUsuario.usuario_id, form);
    else await createUsuario(form);
    fetchUsuarios();
    handleClose();
  };
  const handleDelete = async id => { if (window.confirm('¿Eliminar usuario?')) { await deleteUsuario(id); fetchUsuarios(); } };

  const usuariosFiltrados = filtroRol ? usuarios.filter(u => u.rol === filtroRol) : usuarios;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Usuarios</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>Nuevo Usuario</Button>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Filtrar por rol</InputLabel>
          <Select value={filtroRol} label="Filtrar por rol" onChange={e => setFiltroRol(e.target.value)}>
            <MenuItem value="">Todos</MenuItem>
            {roles.map(r => <MenuItem key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuariosFiltrados.map(u => (
              <TableRow key={u.usuario_id}>
                <TableCell>{u.nombre_apellido}</TableCell>
                <TableCell>{u.correo}</TableCell>
                <TableCell>{u.rol}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(u)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(u.usuario_id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editUsuario ? 'Editar Usuario' : 'Nuevo Usuario'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField label="Nombre y Apellido" name="nombre_apellido" value={form.nombre_apellido} onChange={handleChange} fullWidth required margin="normal" />
            <TextField label="Correo" name="correo" value={form.correo} onChange={handleChange} fullWidth required margin="normal" />
            <TextField label="Contraseña" name="contrasena" value={form.contrasena} onChange={handleChange} fullWidth required margin="normal" type="password" />
            <FormControl fullWidth margin="normal">
              <InputLabel>Rol</InputLabel>
              <Select name="rol" value={form.rol} label="Rol" onChange={handleChange} required>
                {roles.map(r => <MenuItem key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" sx={{ display: form.rol === 'abogado' ? 'block' : 'none' }}>
              <InputLabel>Especialidades</InputLabel>
              <Select
                name="especialidades"
                label="Especialidades"
                multiple
                value={form.especialidades || []}
                onChange={e => setForm(f => ({ ...f, especialidades: e.target.value }))}
                renderValue={selected => especialidades.filter(e => selected.includes(e.id)).map(e => e.nombre).join(', ')}
              >
                {especialidades.map(e => (
                  <MenuItem key={e.id} value={e.id}>{e.nombre}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="contained">{editUsuario ? 'Actualizar' : 'Crear'}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Usuarios; 