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

exports.updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cliente no encontrado' 
      });
    }

    await cliente.update(req.body);
    res.json({ 
      success: true, 
      data: cliente 
    });
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
}; 