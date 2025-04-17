import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Grid,
  Link,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    usuario: '',
    contrasena: '',
    confirmarContrasena: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.contrasena !== formData.confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        usuario: formData.usuario,
        contrasena: formData.contrasena,
      });

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Error al registrarse');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
      console.error('Error en registro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box
              component="img"
              src="/assets/img/logo/logo.svg"
              alt="Logo Legal Firm"
              sx={{
                height: 50,
                width: 'auto',
              }}
            />
          </Box>
          
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Registro
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  aria-label="Nombre"
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
                  aria-label="Apellido"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-label="Email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Usuario"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  required
                  aria-label="Usuario"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contraseña"
                  name="contrasena"
                  type="password"
                  value={formData.contrasena}
                  onChange={handleChange}
                  required
                  aria-label="Contraseña"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirmar Contraseña"
                  name="confirmarContrasena"
                  type="password"
                  value={formData.confirmarContrasena}
                  onChange={handleChange}
                  required
                  aria-label="Confirmar Contraseña"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
              aria-label="Registrarse"
            >
              {loading ? <CircularProgress size={24} /> : 'Registrarse'}
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                ¿Ya tienes una cuenta?{' '}
                <Link component={RouterLink} to="/login" underline="hover">
                  Inicia sesión aquí
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 