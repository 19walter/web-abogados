const Archivo = require('../models/archivos.model');
const path = require('path');
const fs = require('fs');

// Subir archivo
exports.upload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No se envió archivo' });
    const { caso_id } = req.body;
    const archivo = await Archivo.create({
      caso_id,
      nombre: req.file.originalname,
      ruta: req.file.filename
    });
    res.json(archivo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener archivos por caso
exports.getByCaso = async (req, res) => {
  try {
    const archivos = await Archivo.findAll({ where: { caso_id: req.params.casoId } });
    res.json(archivos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar archivo
exports.delete = async (req, res) => {
  try {
    const archivo = await Archivo.findByPk(req.params.id);
    if (!archivo) return res.status(404).json({ error: 'Archivo no encontrado' });
    // Eliminar archivo físico
    const filePath = path.join(__dirname, '../../uploads', archivo.ruta);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    await archivo.destroy();
    res.json({ message: 'Archivo eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 