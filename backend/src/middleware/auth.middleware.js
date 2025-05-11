const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const verifyToken = async (req, res, next) => {
    try {
        // Obtener el token del header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'No se proporcionó token de autenticación'
            });
        }

        // El token viene en formato "Bearer <token>"
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Formato de token inválido'
            });
        }

        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findByPk(decoded.userId);
        if (!usuario) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        // Añadir el usuario al request para uso posterior
        req.user = usuario;
        req.userId = decoded.userId;
        
        next();
    } catch (error) {
        console.error('Error al verificar token:', error);
        return res.status(401).json({
            success: false,
            message: 'Token inválido o expirado'
        });
    }
};

module.exports = {
    verifyToken
};