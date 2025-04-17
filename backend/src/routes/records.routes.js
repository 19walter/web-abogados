const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { Record } = require('../models');

// Obtener todos los registros (protegido)
router.get('/', verifyToken, async (req, res) => {
  try {
    const records = await Record.findAll();
    res.json({
      success: true,
      data: records
    });
  } catch (error) {
    console.error('Error al obtener registros:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los registros'
    });
  }
});

// Crear nuevo registro (protegido)
router.post('/', verifyToken, async (req, res) => {
  try {
    const newRecord = await Record.create(req.body);
    res.status(201).json({
      success: true,
      data: newRecord,
      message: 'Registro creado exitosamente'
    });
  } catch (error) {
    console.error('Error al crear registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear el registro'
    });
  }
});

// Actualizar registro (protegido)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Record.update(req.body, {
      where: { id: id }
    });

    if (updated) {
      const updatedRecord = await Record.findByPk(id);
      res.json({
        success: true,
        data: updatedRecord,
        message: 'Registro actualizado exitosamente'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Registro no encontrado'
      });
    }
  } catch (error) {
    console.error('Error al actualizar registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el registro'
    });
  }
});

// Eliminar registro (protegido)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Record.destroy({
      where: { id: id }
    });

    if (deleted) {
      res.json({
        success: true,
        message: 'Registro eliminado exitosamente'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Registro no encontrado'
      });
    }
  } catch (error) {
    console.error('Error al eliminar registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el registro'
    });
  }
});

module.exports = router;