import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { Box, Typography, Paper, Grid } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0', '#FF6666'];

const CitasReport = () => {
  const [porEstado, setPorEstado] = useState([]);
  const [porMes, setPorMes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/appointments/reportes/por-estado', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setPorEstado(res.data.data.map(item => ({
        name: item.estado,
        value: parseInt(item.cantidad)
      })));
    });
    axios.get('/api/appointments/reportes/por-mes', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setPorMes(res.data.data.map(item => ({
        mes: `${item.anio}-${String(item.mes).padStart(2, '0')}`,
        cantidad: parseInt(item.cantidad)
      })));
    });
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Reportes de Citas</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Citas por Estado</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={porEstado}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {porEstado.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Citas por Mes</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={porMes} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#0088FE" name="Citas" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CitasReport; 