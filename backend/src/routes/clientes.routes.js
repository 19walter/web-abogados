const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { getAllClientes } = require('../controllers/clientes.controller');

// Obtener todos los clientes
router.get('/', verifyToken, getAllClientes);

module.exports = router; 