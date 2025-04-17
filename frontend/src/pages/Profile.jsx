import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { updateUser } from '../services/auth.service';

const Profile = () => {
  const { user, updateUserContext } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        email: user.email || '',
        telefono: user.telefono || '',
        direccion: user.direccion || '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validar contraseñas si se están cambiando
      if (formData.password) {
        if (formData.password !== formData.confirmPassword) {
          setMessage({
            type: 'error',
            text: 'Las contraseñas no coinciden',
          });
          setOpenSnackbar(true);
          setLoading(false);
          return;
        }
      }

      // Preparar datos para enviar
      const userData = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: formData.telefono,
        direccion: formData.direccion,
      };

      // Solo incluir contraseña si se está cambiando
      if (formData.password) {
        userData.password = formData.password;
      }

      const response = await updateUser(user.id, userData);
      
      // Actualizar el contexto con los nuevos datos
      updateUserContext(response.data);
      
      setMessage({
        type: 'success',
        text: 'Perfil actualizado correctamente',
      });
      setOpenSnackbar(true);
      
      // Limpiar campos de contraseña
      setFormData((prev) => ({
        ...prev,
        password: '',
        confirmPassword: '',
      }));
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error al actualizar el perfil',
      });
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: 'primary.main',
              mb: 2,
            }}
          >
            <PersonIcon sx={{ fontSize: 60 }} />
          </Avatar>
          <Typography variant="h4" component="h1" gutterBottom>
            Mi Perfil
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Actualiza tu información personal
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Dirección"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                Cambiar Contraseña
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nueva Contraseña"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                helperText="Dejar en blanco para mantener la contraseña actual"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirmar Contraseña"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={formData.password !== formData.confirmPassword && formData.confirmPassword !== ''}
                helperText={
                  formData.password !== formData.confirmPassword && formData.confirmPassword !== ''
                    ? 'Las contraseñas no coinciden'
                    : ''
                }
              />
            </Grid>
            
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={message.type}
          sx={{ width: '100%' }}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile; 