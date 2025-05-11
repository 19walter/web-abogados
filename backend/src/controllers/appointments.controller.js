const { Cita, Comunicacion, Cliente, Usuario, Caso } = require('../models');

// Obtener todas las citas
exports.getAllCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      include: [
        { model: Comunicacion },
        { model: Cliente, attributes: ['nombre_apellido'] },
        { model: Usuario, as: 'Abogado', attributes: ['nombre_apellido'] },
        { model: Usuario, as: 'Asistente', attributes: ['nombre_apellido'] },
        { model: Caso, attributes: ['tipo_caso'] }
      ]
    });
    res.json({ success: true, data: citas });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una cita por ID
exports.getCitaById = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id, {
      include: [
        { model: Comunicacion },
        { model: Cliente, attributes: ['nombre_apellido'] },
        { model: Usuario, as: 'Abogado', attributes: ['nombre_apellido'] },
        { model: Usuario, as: 'Asistente', attributes: ['nombre_apellido'] },
        { model: Caso, attributes: ['tipo_caso'] }
      ]
    });
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.json({ success: true, data: cita });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva cita
exports.createCita = async (req, res) => {
  try {
    const cita = await Cita.create(req.body);
    res.status(201).json({ success: true, data: cita, message: 'Cita creada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la cita', error: error.message });
  }
};

// Actualizar una cita
exports.updateCita = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    await cita.update(req.body);
    res.json({ success: true, data: cita, message: 'Cita actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cita', error: error.message });
  }
};

// Eliminar una cita
exports.deleteCita = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    await cita.destroy();
    res.json({ success: true, message: 'Cita eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la cita', error: error.message });
  }
};

// Reporte: Citas por estado
exports.getCitasPorEstado = async (req, res) => {
  try {
    const result = await Cita.findAll({
      attributes: [
        'estado',
        [Cita.sequelize.fn('COUNT', Cita.sequelize.col('cita_id')), 'cantidad']
      ],
      group: ['estado']
    });
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reporte: Citas por mes
exports.getCitasPorMes = async (req, res) => {
  try {
    const result = await Cita.findAll({
      attributes: [
        [Cita.sequelize.fn('MONTH', Cita.sequelize.col('fecha_hora')), 'mes'],
        [Cita.sequelize.fn('YEAR', Cita.sequelize.col('fecha_hora')), 'anio'],
        [Cita.sequelize.fn('COUNT', Cita.sequelize.col('cita_id')), 'cantidad']
      ],
      group: ['anio', 'mes'],
      order: [['anio', 'ASC'], ['mes', 'ASC']]
    });
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 