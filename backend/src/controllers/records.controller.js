const { Caso, Cliente, Usuario } = require('../models');

exports.getAllCasos = async (req, res) => {
  try {
    const casos = await Caso.findAll({
      include: [
        { model: Cliente },
        { model: Usuario, as: 'Usuario', foreignKey: 'abogado_id' }
      ]
    });
    res.json({ success: true, data: casos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCaso = async (req, res) => {
  try {
    const caso = await Caso.create(req.body);
    res.status(201).json({ success: true, data: caso });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCasoById = async (req, res) => {
  try {
    const caso = await Caso.findByPk(req.params.id, {
      include: [
        { model: Cliente },
        { model: Usuario, as: 'Usuario', foreignKey: 'abogado_id' }
      ]
    });
    if (!caso) {
      return res.status(404).json({ message: 'Caso no encontrado' });
    }
    res.json({ success: true, data: caso });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCaso = async (req, res) => {
  try {
    const caso = await Caso.findByPk(req.params.id);
    if (!caso) {
      return res.status(404).json({ message: 'Caso no encontrado' });
    }
    await caso.update(req.body);
    res.json({ success: true, data: caso });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCaso = async (req, res) => {
  try {
    const caso = await Caso.findByPk(req.params.id);
    if (!caso) {
      return res.status(404).json({ message: 'Caso no encontrado' });
    }
    await caso.destroy();
    res.json({ success: true, message: 'Caso eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};