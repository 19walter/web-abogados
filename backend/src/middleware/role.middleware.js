exports.authorizeRoles = (...roles) => (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Usuario no autenticado' 
      });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ 
        success: false,
        message: `Acceso denegado. Se requiere uno de los siguientes roles: ${roles.join(', ')}` 
      });
    }

    next();
  } catch (error) {
    console.error('Error en middleware de roles:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error al verificar permisos' 
    });
  }
}; 