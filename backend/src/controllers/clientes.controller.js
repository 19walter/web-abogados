const { Cliente } = require('../models');

exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json({ success: true, data: clientes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json({ success: true, data: cliente });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 