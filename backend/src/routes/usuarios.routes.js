const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { getAllUsuarios, getAllAbogados, createUsuario, updateUsuario } = require('../controllers/usuarios.controller');
const { authorizeRoles } = require('../middleware/role.middleware');

// Obtener todos los abogados
router.get('/', verifyToken, getAllUsuarios);

router.post('/', verifyToken, authorizeRoles('admin', 'asistente'), createUsuario);

// Ruta PUT con log para depuración
router.put('/:id', verifyToken, authorizeRoles('admin', 'asistente'), (req, res, next) => {
  console.log('PUT /api/usuarios/:id', req.params.id, req.body);
  updateUsuario(req, res, next);
});

module.exports = router; 