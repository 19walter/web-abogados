const { Usuario, Especialidad } = require('../models');

exports.getAllUsuarios = async (req, res) => {
  try {
    const where = {};
    if (req.query.rol) where.rol = req.query.rol;
    const usuarios = await Usuario.findAll({
      where,
      include: [{ model: Especialidad, through: { attributes: [] } }]
    });
    res.json({ success: true, data: usuarios });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllAbogados = async (req, res) => {
  req.query.rol = 'abogado';
  return exports.getAllUsuarios(req, res);
};

exports.createUsuario = async (req, res) => {
  try {
    const { especialidades, ...userData } = req.body;
    const usuario = await Usuario.create(userData);
    if (userData.rol === 'abogado' && Array.isArray(especialidades)) {
      await usuario.setEspecialidads(especialidades); // setEspecialidads es el método generado por Sequelize
    }
    const usuarioConEspecialidades = await Usuario.findByPk(usuario.usuario_id, { include: [{ model: Especialidad }] });
    res.status(201).json({ success: true, data: usuarioConEspecialidades });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const { especialidades, ...userData } = req.body;
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    await usuario.update(userData);
    if (usuario.rol === 'abogado' && Array.isArray(especialidades)) {
      await usuario.setEspecialidads(especialidades);
    }
    const usuarioConEspecialidades = await Usuario.findByPk(usuario.usuario_id, { include: [{ model: Especialidad }] });
    res.json({ success: true, data: usuarioConEspecialidades });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 