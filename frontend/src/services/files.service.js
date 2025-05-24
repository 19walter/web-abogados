import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const uploadFile = async (file, casoId) => {
  try {
    const formData = new FormData();
    formData.append('archivo', file);
    formData.append('caso_id', casoId);

    const response = await axios.post(`${API_URL}/archivos/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al subir archivo:', error);
    throw error;
  }
};

export const deleteFile = async (fileId) => {
  try {
    const response = await axios.delete(`${API_URL}/archivos/${fileId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar archivo:', error);
    throw error;
  }
};

export const getFilesByCase = async (casoId) => {
  try {
    const response = await axios.get(`${API_URL}/archivos/caso/${casoId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener archivos del caso:', error);
    throw error;
  }
}; 