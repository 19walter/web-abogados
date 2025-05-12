const { Usuario, Especialidad } = require('../models');

exports.getAllUsuarios = async (req, res) => {
  try {
    const where = {};
    if (req.query.rol) where.rol = req.query.rol;
    const usuarios = await Usuario.findAll({
      where,
      include: [{ model: Especialidad, as: 'especialidads', through: { attributes: [] } }]
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
    const usuarioConEspecialidades = await Usuario.findByPk(usuario.usuario_id, { include: [{ model: Especialidad, as: 'especialidads' }] });
    res.status(201).json({ success: true, data: usuarioConEspecialidades });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const { especialidades, contrasena, ...userData } = req.body;
    console.log('Datos recibidos para actualizar usuario:', req.body);
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      console.log('Usuario no encontrado:', req.params.id);
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    // Solo actualiza la contraseña si viene y no está vacía
    if (typeof contrasena === 'string' && contrasena.trim() !== '') {
      userData.contrasena = contrasena;
    }
    await usuario.update(userData);
    if (usuario.rol === 'abogado') {
      console.log('usuario.setEspecialidads existe?', typeof usuario.setEspecialidads);
      console.log('especialidades:', especialidades);
      if (Array.isArray(especialidades)) {
        const validEspecialidades = especialidades.filter(e => e != null);
        console.log('Asignando especialidades filtradas:', validEspecialidades);
        await usuario.setEspecialidads(validEspecialidades);
      } else {
        console.log('No se recibió un array de especialidades:', especialidades);
      }
    }
    const usuarioConEspecialidades = await Usuario.findByPk(usuario.usuario_id, { include: [{ model: Especialidad, as: 'especialidads' }] });
    res.json({ success: true, data: usuarioConEspecialidades });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
}; 