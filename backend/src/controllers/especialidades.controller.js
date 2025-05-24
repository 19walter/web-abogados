const { Especialidad } = require('../models');

exports.getAllEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidad.findAll();
    res.json({ success: true, data: especialidades });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEspecialidad = async (req, res) => {
  try {
    const especialidad = await Especialidad.create(req.body);
    res.status(201).json({ success: true, data: especialidad });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEspecialidad = async (req, res) => {
  try {
    const especialidad = await Especialidad.findByPk(req.params.id);
    if (!especialidad) return res.status(404).json({ message: 'Especialidad no encontrada' });
    await especialidad.update(req.body);
    res.json({ success: true, data: especialidad });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEspecialidad = async (req, res) => {
  try {
    const especialidad = await Especialidad.findByPk(req.params.id);
    if (!especialidad) return res.status(404).json({ message: 'Especialidad no encontrada' });
    await especialidad.destroy();
    res.json({ success: true, message: 'Especialidad eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 