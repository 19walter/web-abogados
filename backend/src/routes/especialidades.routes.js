const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { getAllEspecialidades, createEspecialidad, updateEspecialidad, deleteEspecialidad } = require('../controllers/especialidades.controller');

router.get('/', verifyToken, getAllEspecialidades);
router.post('/', verifyToken, createEspecialidad);
router.put('/:id', verifyToken, updateEspecialidad);
router.delete('/:id', verifyToken, deleteEspecialidad);

module.exports = router; 