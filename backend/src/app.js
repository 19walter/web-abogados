const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importa la conexión a la base de datos y los modelos
const sequelize = require('./config/db.config');
const models = require('./models');

// Importa las rutas
const authRoutes = require('./routes/auth.routes');
const recordsRoutes = require('./routes/records.routes');
const appointmentsRoutes = require('./routes/appointments.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de JYANG' });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/records', recordsRoutes);
app.use('/api/appointments', appointmentsRoutes);

// Puerto
const PORT = process.env.PORT || 3001;

// Sincronizar base de datos y luego iniciar el servidor
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });