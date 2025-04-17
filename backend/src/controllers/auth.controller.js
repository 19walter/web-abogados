const { User } = require('../models');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    // Validar que se envíen los campos requeridos
    if (!usuario || !contrasena) {
      return res.status(400).json({
        success: false,
        message: 'Usuario y contraseña son requeridos'
      });
    }

    // Buscar el usuario en la base de datos
    const user = await User.findOne({ 
      where: { usuario } 
    });

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
      { userId: user.id_users },
      process.env.JWT_SECRET || 'tu_clave_secreta_aqui',
      { expiresIn: '24h' }
    );

    // Enviar respuesta exitosa
    res.json({
      success: true,
      token,
      user: {
        id: user.id_users,
        usuario: user.usuario,
        creador: user.creador
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
    const user = await User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      user: {
        id: user.id_users,
        usuario: user.usuario,
        creador: user.creador
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