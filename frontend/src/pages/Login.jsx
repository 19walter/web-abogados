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
  Link,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [formData, setFormData] = useState({
    usuario: '',
    contrasena: '',
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
    setLoading(true);

    try {
      const result = await authLogin(formData);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
      console.error('Error en login:', err);
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
            Iniciar Sesión
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Usuario"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              margin="normal"
              required
              autoFocus
            />
            <TextField
              fullWidth
              label="Contraseña"
              name="contrasena"
              type="password"
              value={formData.contrasena}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/register" variant="body2">
                ¿No tienes una cuenta? Regístrate
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 