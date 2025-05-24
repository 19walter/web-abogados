import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Crear una instancia de axios
const axiosInstance = axios.create({
  baseURL: API_URL
});

// Interceptor para manejar errores de autenticación
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      console.log('Token expirado o inválido, redirigiendo al login...');
      localStorage.removeItem('token'); // Eliminar token inválido
      window.location.href = '/login'; // Redirigir al login
    }
    return Promise.reject(error);
  }
);

// Interceptor para agregar el token a todas las peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Función para obtener el token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Obtener todos los registros
export const getAllRecords = async () => {
  try {
    const response = await axiosInstance.get('/records');
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener registros:', error);
    throw error;
  }
};

// Obtener un registro por ID
export const getRecordById = async (id) => {
  try {
    const response = await axiosInstance.get(`/records/${id}`);
    return response;
  } catch (error) {
    console.error('Error al obtener registro:', error);
    throw error;
  }
};

// Crear un nuevo registro
export const createRecord = async (recordData) => {
  try {
    const response = await axiosInstance.post('/records', recordData);
    return response;
  } catch (error) {
    console.error('Error al crear registro:', error);
    throw error;
  }
};

// Actualizar un registro
export const updateRecord = async (id, recordData) => {
  try {
    const response = await axiosInstance.put(`/records/${id}`, recordData);
    return response;
  } catch (error) {
    console.error('Error al actualizar registro:', error);
    throw error;
  }
};

// Eliminar un registro
export const deleteRecord = async (id) => {
  try {
    const response = await axiosInstance.delete(`/records/${id}`);
    return response;
  } catch (error) {
    console.error('Error al eliminar registro:', error);
    throw error;
  }
};

// Obtener registros por tipo
export const getRecordsByType = async (type) => {
  const response = await axiosInstance.get(`/records/type/${type}`);
  return response.data;
};

// Obtener registros por estado
export const getRecordsByStatus = async (status) => {
  const response = await axiosInstance.get(`/records/status/${status}`);
  return response.data;
};

// Obtener registros por fecha
export const getRecordsByDate = async (startDate, endDate) => {
  const response = await axiosInstance.get('/records/date', {
    params: { startDate, endDate },
  });
  return response.data;
};

// Obtener registros por cliente
export const getRecordsByClient = async (clientId) => {
  const response = await axiosInstance.get(`/records/client/${clientId}`);
  return response.data;
};

// Obtener registros por abogado
export const getRecordsByLawyer = async (lawyerId) => {
  const response = await axiosInstance.get(`/records/lawyer/${lawyerId}`);
  return response.data;
};

// Subir archivo a un registro
export const uploadFile = async (recordId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axiosInstance.post(
    `/records/${recordId}/upload`,
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
  const response = await axiosInstance.get(
    `/records/${recordId}/files/${fileId}`,
    {
      responseType: 'blob',
    }
  );
  return response.data;
};

// Eliminar archivo de un registro
export const deleteFile = async (recordId, fileId) => {
  const response = await axiosInstance.delete(
    `/records/${recordId}/files/${fileId}`
  );
  return response.data;
};

// Casos (nueva API)
export const getAllCasos = async () => {
  try {
    const response = await axiosInstance.get('/records', {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener casos:', error);
    throw error;
  }
};

export const createCaso = async (casoData) => {
  try {
    const response = await axiosInstance.post('/records', casoData);
    return response.data;
  } catch (error) {
    console.error('Error al crear caso:', error);
    throw error;
  }
};

export const updateCaso = async (id, casoData) => {
  try {
    const response = await axiosInstance.put(`/records/${id}`, casoData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar caso:', error);
    throw error;
  }
};

export const deleteCaso = async (id) => {
  try {
    const response = await axiosInstance.delete(`/records/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar caso:', error);
    throw error;
  }
};

// Citas (nueva API)
export const getAllCitas = async () => {
  try {
    const response = await axiosInstance.get('/appointments');
    return response.data;
  } catch (error) {
    console.error('Error al obtener citas:', error);
    throw error;
  }
};

export const createCita = async (citaData) => {
  try {
    const response = await axiosInstance.post('/appointments', citaData);
    return response.data;
  } catch (error) {
    console.error('Error al crear cita:', error);
    throw error;
  }
};

export const updateCita = async (id, citaData) => {
  try {
    const response = await axiosInstance.put(`/appointments/${id}`, citaData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    throw error;
  }
};

export const deleteCita = async (id) => {
  try {
    const response = await axiosInstance.delete(`/appointments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    throw error;
  }
};

export const getAllClientes = async () => {
  try {
    const response = await axiosInstance.get('/clientes', {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    throw error;
  }
};

export const getAllAbogados = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No hay token de autenticación');
      window.location.href = '/login';
      throw new Error('No hay token de autenticación');
    }

    console.log('Token:', token.substring(0, 20) + '...');
    const response = await axiosInstance.get('/usuarios?rol=abogado', {
      headers: getAuthHeader()
    });

    console.log('Respuesta del backend:', response.data);
    
    if (!response.data || !response.data.success) {
      console.error('Respuesta inválida del backend:', response.data);
      throw new Error('Respuesta inválida del backend');
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error de respuesta del servidor:', {
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor');
    } else {
      console.error('Error al configurar la petición:', error.message);
    }
    throw error;
  }
};

// Crear un cliente
export const createCliente = async (clienteData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación');
    }
    const response = await axiosInstance.post('/clientes', clienteData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear cliente:', error.response?.data || error.message);
    throw error;
  }
};

// Actualizar un cliente
export const updateCliente = async (id, clienteData) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.put(`/clientes/${id}`, clienteData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Eliminar un cliente
export const deleteCliente = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.delete(`/clientes/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Crear un usuario
export const createUsuario = async (usuarioData) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.post('/usuarios', usuarioData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Actualizar un usuario
export const updateUsuario = async (id, usuarioData) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.put(`/usuarios/${id}`, usuarioData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Eliminar un usuario
export const deleteUsuario = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.delete(`/usuarios/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Obtener todas las especialidades
export const getAllEspecialidades = async () => {
  try {
    const response = await axiosInstance.get('/especialidades', {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener especialidades:', error);
    throw error;
  }
};

// Obtener todos los usuarios
export const getAllUsuarios = async () => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get('/usuarios', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Crear una especialidad
export const createEspecialidad = async (especialidadData) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.post('/especialidades', especialidadData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Actualizar una especialidad
export const updateEspecialidad = async (id, especialidadData) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.put(`/especialidades/${id}`, especialidadData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Eliminar una especialidad
export const deleteEspecialidad = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.delete(`/especialidades/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};