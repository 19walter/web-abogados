import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Obtener todos los registros
export const getAllRecords = async () => {
  const response = await axios.get(`${API_URL}/records`);
  return response.data;
};

// Obtener un registro por ID
export const getRecordById = async (id) => {
  const response = await axios.get(`${API_URL}/records/${id}`);
  return response.data;
};

// Crear un nuevo registro
export const createRecord = async (recordData) => {
  const response = await axios.post(`${API_URL}/records`, recordData);
  return response.data;
};

// Actualizar un registro
export const updateRecord = async (id, recordData) => {
  const response = await axios.put(`${API_URL}/records/${id}`, recordData);
  return response.data;
};

// Eliminar un registro
export const deleteRecord = async (id) => {
  const response = await axios.delete(`${API_URL}/records/${id}`);
  return response.data;
};

// Obtener registros por tipo
export const getRecordsByType = async (type) => {
  const response = await axios.get(`${API_URL}/records/type/${type}`);
  return response.data;
};

// Obtener registros por estado
export const getRecordsByStatus = async (status) => {
  const response = await axios.get(`${API_URL}/records/status/${status}`);
  return response.data;
};

// Obtener registros por fecha
export const getRecordsByDate = async (startDate, endDate) => {
  const response = await axios.get(`${API_URL}/records/date`, {
    params: { startDate, endDate },
  });
  return response.data;
};

// Obtener registros por cliente
export const getRecordsByClient = async (clientId) => {
  const response = await axios.get(`${API_URL}/records/client/${clientId}`);
  return response.data;
};

// Obtener registros por abogado
export const getRecordsByLawyer = async (lawyerId) => {
  const response = await axios.get(`${API_URL}/records/lawyer/${lawyerId}`);
  return response.data;
};

// Subir archivo a un registro
export const uploadFile = async (recordId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post(
    `${API_URL}/records/${recordId}/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

// Descargar archivo de un registro
export const downloadFile = async (recordId, fileId) => {
  const response = await axios.get(
    `${API_URL}/records/${recordId}/files/${fileId}`,
    {
      responseType: 'blob',
    }
  );
  return response.data;
};

// Eliminar archivo de un registro
export const deleteFile = async (recordId, fileId) => {
  const response = await axios.delete(
    `${API_URL}/records/${recordId}/files/${fileId}`
  );
  return response.data;
};