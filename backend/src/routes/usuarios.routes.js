const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { getAllAbogados } = require('../controllers/usuarios.controller');

// Obtener todos los abogados
router.get('/', verifyToken, (req, res) => {
  if (req.query.rol === 'abogado') {
    return getAllAbogados(req, res);
  }
  // Puedes agregar más lógica para otros roles si lo necesitas
  res.status(400).json({ message: 'Rol no soportado' });
});

module.exports = router; 