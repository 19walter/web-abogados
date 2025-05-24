const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');
const { getAllClientes, createCliente, updateCliente } = require('../controllers/clientes.controller');

// Obtener todos los clientes
router.get('/', verifyToken, getAllClientes);

// Crear nuevo cliente
router.post('/', verifyToken, authorizeRoles('admin', 'asistente'), createCliente);

// Actualizar cliente
router.put('/:id', verifyToken, authorizeRoles('admin', 'asistente'), updateCliente);

module.exports = router; 