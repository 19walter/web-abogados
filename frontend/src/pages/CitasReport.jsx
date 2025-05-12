import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { Box, Typography, Paper, Grid } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0', '#FF6666'];
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const CitasReport = () => {
  const [porEstado, setPorEstado] = useState([]);
  const [porMes, setPorMes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${API_URL}/appointments/reportes/por-estado`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const data = Array.isArray(res.data?.data) ? res.data.data : [];
        console.log('Respuesta citas por estado:', data);
        setPorEstado(data.map(item => ({
          name: item.estado,
          value: parseInt(item.cantidad)
        })));
      })
      .catch(err => {
        setPorEstado([]);
        // Opcional: puedes mostrar un mensaje de error aquí
        console.error('Error al obtener citas por estado', err);
      });

    axios.get(`${API_URL}/appointments/reportes/por-mes`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const data = Array.isArray(res.data?.data) ? res.data.data : [];
        console.log('Respuesta citas por mes:', data);
        setPorMes(data.map(item => ({
          mes: `${item.anio}-${String(item.mes).padStart(2, '0')}`,
          cantidad: parseInt(item.cantidad)
        })));
      })
      .catch(err => {
        setPorMes([]);
        // Opcional: puedes mostrar un mensaje de error aquí
        console.error('Error al obtener citas por mes', err);
      });
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Reportes de Citas</Typography>
      <Grid container spacing={4} justifyContent="flex-start" alignItems="stretch" gap={4}>
        <Grid>
          <Paper sx={{ p: 3, minHeight: 420, width: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>Citas por Estado</Typography>
            {porEstado.length === 0 ? (
              <Typography color="text.secondary" sx={{ mt: 8 }}>No hay datos para mostrar</Typography>
            ) : (
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={porEstado}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={60}
                    fill="#8884d8"
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={false}
                  >
                    {porEstado.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} citas`} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
        <Grid>
          <Paper sx={{ p: 3, minHeight: 420, width: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>Citas por Mes</Typography>
            {porMes.length === 0 ? (
              <Typography color="text.secondary" sx={{ mt: 8 }}>No hay datos para mostrar</Typography>
            ) : (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={porMes} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis allowDecimals={false} />
                  <Tooltip formatter={(value) => `${value} citas`} />
                  <Legend verticalAlign="bottom" height={36} />
                  <Bar dataKey="cantidad" fill="#0088FE" name="Citas" label={{ position: 'top', fill: '#333' }} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CitasReport; 