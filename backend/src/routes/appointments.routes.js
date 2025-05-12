const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const {
  getAllCitas,
  getCitaById,
  createCita,
  updateCita,
  deleteCita,
  getCitasPorEstado,
  getCitasPorMes
} = require('../controllers/appointments.controller');

// Obtener todas las citas (protegido)
router.get('/', verifyToken, getAllCitas);

// Obtener una cita por ID (protegido)
router.get('/:id', verifyToken, getCitaById);

// Crear una nueva cita (protegido)
router.post('/', verifyToken, createCita);

// Actualizar una cita (protegido)
router.put('/:id', verifyToken, updateCita);

// Eliminar una cita (protegido)
router.delete('/:id', verifyToken, deleteCita);

// Reportes
router.get('/reportes/por-estado', verifyToken, (req, res, next) => {
  console.log('¡Petición recibida a /reportes/por-estado!');
  next();
}, getCitasPorEstado);
router.get('/reportes/por-mes', verifyToken, getCitasPorMes);

module.exports = router; 