const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const {
  getAllCasos,
  createCaso,
  getCasoById,
  updateCaso,
  deleteCaso,
  getAllClientes,
  getAllAbogados
} = require('../controllers/records.controller');

// Obtener todos los casos (protegido)
router.get('/', verifyToken, getAllCasos);

// Crear nuevo caso (protegido)
router.post('/', verifyToken, createCaso);

// Obtener caso por ID (protegido)
router.get('/:id', verifyToken, getCasoById);

// Actualizar caso (protegido)
router.put('/:id', verifyToken, updateCaso);

// Eliminar caso (protegido)
router.delete('/:id', verifyToken, deleteCaso);

module.exports = router;