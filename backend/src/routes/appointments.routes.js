const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointments.controller');

// Obtener todas las citas (protegido)
router.get('/', verifyToken, getAllAppointments);

// Obtener una cita por ID (protegido)
router.get('/:id', verifyToken, getAppointmentById);

// Crear una nueva cita (protegido)
router.post('/', verifyToken, createAppointment);

// Actualizar una cita (protegido)
router.put('/:id', verifyToken, updateAppointment);

// Eliminar una cita (protegido)
router.delete('/:id', verifyToken, deleteAppointment);

module.exports = router; 