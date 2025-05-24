const { Usuario } = require('../models');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    // Validar que se envíen los campos requeridos
    if (!correo || !contrasena) {
      return res.status(400).json({
        success: false,
        message: 'Correo y contraseña son requeridos'
      });
    }

    // Buscar el usuario en la base de datos
    const user = await Usuario.findOne({ where: { correo } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Comparar contraseña
    if (contrasena !== user.contrasena) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      { userId: user.usuario_id, rol: user.rol },
      process.env.JWT_SECRET || 'tu_clave_secreta_aqui',
      { expiresIn: '24h' }
    );

    // Enviar respuesta exitosa
    res.json({
      success: true,
      token,
      user: {
        usuario_id: user.usuario_id,
        nombre_apellido: user.nombre_apellido,
        correo: user.correo,
        rol: user.rol
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      user: {
        usuario_id: user.usuario_id,
        nombre_apellido: user.nombre_apellido,
        correo: user.correo,
        rol: user.rol
      }
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};

module.exports = {
  login,
  getCurrentUser
};