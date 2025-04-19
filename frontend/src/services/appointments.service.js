import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Obtener todas las citas
export const getAllAppointments = async () => {
  try {
    const response = await axios.get(`${API_URL}/appointments`);
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener citas:', error);
    throw error;
  }
};

// Obtener una cita por ID
export const getAppointmentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/appointments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener cita:', error);
    throw error;
  }
};

// Crear una nueva cita
export const createAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(`${API_URL}/appointments`, appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error al crear cita:', error);
    throw error;
  }
};

// Actualizar una cita
export const updateAppointment = async (id, appointmentData) => {
  try {
    const response = await axios.put(`${API_URL}/appointments/${id}`, appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    throw error;
  }
};

// Eliminar una cita
export const deleteAppointment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/appointments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    throw error;
  }
}; 