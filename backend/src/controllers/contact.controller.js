const { Cliente } = require('../models');
const logger = require('../utils/logger');

exports.processContactForm = async (req, res) => {
    try {
        logger.info('Iniciando proceso de contacto', { body: req.body });

        const { 'first-name': firstName, 'last-name': lastName, email, phone, message } = req.body;

        // Validar datos requeridos
        if (!firstName || !lastName || !email || !phone || !message) {
            logger.warn('Datos incompletos en la solicitud de contacto');
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son requeridos'
            });
        }

        // Verificar si el cliente ya existe por correo
        let cliente = await Cliente.findOne({ where: { correo: email } });

        if (!cliente) {
            // Crear nuevo cliente
            cliente = await Cliente.create({
                nombre_apellido: `${firstName} ${lastName}`,
                correo: email,
                telefono: phone,
                mensaje: message
            });

            logger.info('Nuevo cliente creado exitosamente', { clienteId: cliente.cliente_id });
        } else {
            // Actualizar mensaje del cliente existente
            await cliente.update({ mensaje: message });
            logger.info('Cliente existente actualizado', { clienteId: cliente.cliente_id });
        }

        res.json({
            success: true,
            message: 'Contacto procesado exitosamente',
            data: {
                clienteId: cliente.cliente_id
            }
        });

    } catch (error) {
        logger.error('Error al procesar el contacto', { error: error.message });
        res.status(500).json({
            success: false,
            message: 'Error al procesar la solicitud de contacto'
        });
    }
};