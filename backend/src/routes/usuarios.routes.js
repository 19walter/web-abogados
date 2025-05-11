const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { getAllUsuarios, getAllAbogados, createUsuario, updateUsuario } = require('../controllers/usuarios.controller');
const { authorizeRoles } = require('../middleware/role.middleware');

// Obtener todos los abogados
router.get('/', verifyToken, getAllUsuarios);

router.post('/', verifyToken, authorizeRoles('admin', 'asistente'), createUsuario);
router.put('/:id', verifyToken, authorizeRoles('admin', 'asistente'), updateUsuario);

module.exports = router; 