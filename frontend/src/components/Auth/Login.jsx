import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

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

    const result = await login(formData);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          py: 8,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Iniciar Sesión
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 2 }}>
            Ingresa tus credenciales para acceder al sistema
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              required
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3 }}
            >
              Iniciar Sesión
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2">
              ¿No tienes una cuenta?{' '}
              <MuiLink component={Link} to="/register">
                Regístrate aquí
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;