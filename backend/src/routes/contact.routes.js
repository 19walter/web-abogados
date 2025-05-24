const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Validaciones para el formulario de contacto
const contactValidations = [
    body('first-name').notEmpty().withMessage('El nombre es requerido'),
    body('last-name').notEmpty().withMessage('El apellido es requerido'),
    body('email').isEmail().withMessage('El correo electrónico no es válido'),
    body('phone').notEmpty().withMessage('El teléfono es requerido'),
    body('message').notEmpty().withMessage('El mensaje es requerido')
];

// Ruta para procesar el formulario de contacto
router.post('/', contactValidations, async (req, res) => {
    try {
        // Verificar errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                errors: errors.array() 
            });
        }

        // Obtener los datos del formulario
        const { 'first-name': firstName, 'last-name': lastName, email, phone, message } = req.body;

        // Crear el cliente en la base de datos
        const { Cliente } = require('../models');
        const logger = require('../utils/logger');

        logger.info('Intentando crear nuevo cliente:', { firstName, lastName, email, phone });

        // Verificar si el cliente ya existe
        const clienteExistente = await Cliente.findOne({ where: { correo: email } });

        if (clienteExistente) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe un registro con este correo electrónico',
                isEmailDuplicate: true
            });
        }

        const cliente = await Cliente.create({
            nombre_apellido: `${firstName} ${lastName}`,
            correo: email,
            telefono: phone,
            mensaje: message
        });

        logger.info('Cliente creado exitosamente:', { clienteId: cliente.cliente_id });

        res.json({
            success: true,
            message: 'Datos guardados correctamente',
            data: cliente
        });

    } catch (error) {
        console.error('Error al procesar el formulario:', error);
        res.status(500).json({
            success: false,
            message: 'Error al procesar la solicitud'
        });
    }
});

module.exports = router;