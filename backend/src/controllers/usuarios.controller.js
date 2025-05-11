const { Usuario } = require('../models');

exports.getAllAbogados = async (req, res) => {
  try {
    const abogados = await Usuario.findAll({ where: { rol: 'abogado' } });
    res.json({ success: true, data: abogados });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 