const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const verifyToken = async (req, res, next) => {
    try {
        console.log('Verificando token para ruta:', req.originalUrl);
        console.log('Headers recibidos:', req.headers);
        
        // Obtener el token del header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.log('No se encontró header de autorización');
            return res.status(401).json({
                success: false,
                message: 'No se proporcionó token de autenticación'
            });
        }

        // El token viene en formato "Bearer <token>"
        const token = authHeader.split(' ')[1];
        if (!token) {
            console.log('Token no encontrado en el header de autorización');
            return res.status(401).json({
                success: false,
                message: 'Formato de token inválido'
            });
        }

        console.log('Token recibido:', token.substring(0, 20) + '...');

        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decodificado:', decoded);
        
        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findByPk(decoded.userId);
        if (!usuario) {
            console.log('Usuario no encontrado en la base de datos:', decoded.userId);
            return res.status(401).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        console.log('Usuario encontrado:', {
            id: usuario.usuario_id,
            nombre: usuario.nombre_apellido,
            rol: usuario.rol
        });

        // Añadir el usuario al request para uso posterior
        req.user = usuario;
        req.userId = decoded.userId;
        
        next();
    } catch (error) {
        console.error('Error al verificar token:', error);
        if (error.name === 'TokenExpiredError') {
            console.log('Token expirado en:', error.expiredAt);
        }
        return res.status(401).json({
            success: false,
            message: 'Token inválido o expirado'
        });
    }
};

module.exports = {
    verifyToken
};