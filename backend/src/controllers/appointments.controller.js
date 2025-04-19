const Appointment = require('../models/appointment.model');

// Obtener todas las citas
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json({
      success: true,
      data: appointments
    });
  } catch (error) {
    console.error('Error al obtener citas:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener las citas'
    });
  }
};

// Obtener una cita por ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Cita no encontrada'
      });
    }
    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Error al obtener cita:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener la cita'
    });
  }
};

// Crear una nueva cita
exports.createAppointment = async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body);
    const appointment = await Appointment.create(req.body);
    res.status(201).json({
      success: true,
      data: appointment,
      message: 'Cita creada exitosamente'
    });
  } catch (error) {
    console.error('Error detallado al crear cita:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear la cita',
      error: error.message,
      details: error.errors?.map(e => e.message)
    });
  }
};

// Actualizar una cita
exports.updateAppointment = async (req, res) => {
  try {
    const [updated] = await Appointment.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedAppointment = await Appointment.findByPk(req.params.id);
      res.json({
        success: true,
        data: updatedAppointment,
        message: 'Cita actualizada exitosamente'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Cita no encontrada'
      });
    }
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la cita'
    });
  }
};

// Eliminar una cita
exports.deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({
        success: true,
        message: 'Cita eliminada exitosamente'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Cita no encontrada'
      });
    }
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la cita'
    });
  }
}; 