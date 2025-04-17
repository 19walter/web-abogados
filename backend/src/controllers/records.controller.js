const Record = require('../models/Record');

exports.getAllRecords = async (req, res) => {
  try {
    const records = await Record.findAll();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createRecord = async (req, res) => {
  try {
    const record = await Record.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRecordById = async (req, res) => {
  try {
    const record = await Record.findByPk(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findByPk(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    await record.update(req.body);
    res.json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByPk(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    await record.destroy();
    res.json({ message: 'Registro eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};