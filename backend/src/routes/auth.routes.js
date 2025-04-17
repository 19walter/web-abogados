const express = require('express');
const router = express.Router();
const { login, getCurrentUser } = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Ruta para login
router.post('/login', login);

// Ruta protegida para obtener datos del usuario actual
router.get('/me', verifyToken, getCurrentUser);

module.exports = router;