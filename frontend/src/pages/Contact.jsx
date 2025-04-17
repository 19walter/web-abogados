import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    setOpenSnackbar(true);
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: '',
    });
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Contáctanos
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Estamos aquí para ayudarte. Contáctanos y te responderemos lo antes posible.
        </Typography>

        <Grid container spacing={6}>
          {/* Información de contacto */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Información de Contacto
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Phone sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="subtitle1">Teléfono</Typography>
                    <Typography variant="body2">+51 925 756 263</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Email sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="subtitle1">Email</Typography>
                    <Typography variant="body2">contacto@jyang.com</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="subtitle1">Dirección</Typography>
                    <Typography variant="body2">
                      Av. Principal 123, Lima, Perú
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Formulario de contacto */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Envíanos tu Mensaje
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
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
                      required
                      fullWidth
                      label="Asunto"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={4}
                      label="Mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                    >
                      Enviar Mensaje
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            sx={{ width: '100%' }}
          >
            ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Contact; 