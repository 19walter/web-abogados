const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
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
        
        // Añadir el ID del usuario al request para uso posterior
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