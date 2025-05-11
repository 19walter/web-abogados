const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');
const { getAllClientes, createCliente } = require('../controllers/clientes.controller');

// Obtener todos los clientes
router.get('/', verifyToken, getAllClientes);

// Crear nuevo cliente
router.post('/', verifyToken, authorizeRoles('admin', 'asistente'), createCliente);

module.exports = router; 