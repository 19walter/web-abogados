import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Configurar axios para incluir el token en las peticiones
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (response.data.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
      return { success: true, data: response.data };
    }
    return { success: false, error: response.data.message || 'Error al iniciar sesión' };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Error al conectar con el servidor'
    };
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Error al registrar usuario'
    };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = async () => {
  try {
    // Verificar si hay un token antes de hacer la petición
    const token = localStorage.getItem('token');
    if (!token) {
      return { success: false, error: 'No hay token de autenticación' };
    }

    const response = await axios.get(`${API_URL}/auth/me`);
    return { success: true, data: response.data };
  } catch (error) {
    // Si el error es 404, significa que el endpoint no existe
    if (error.response?.status === 404) {
      console.warn('El endpoint /auth/me no está disponible en el backend');
      // Retornamos un objeto de usuario simulado para desarrollo
      return {
        success: true,
        data: {
          id: 1,
          usuario: 'Usuario Demo',
          email: 'demo@example.com',
          rol: 'admin'
        }
      };
    }
    
    return {
      success: false,
      error: error.response?.data?.message || 'Error al obtener datos del usuario'
    };
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/auth/users/${userId}`, userData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Error al actualizar usuario'
    };
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Error al procesar la solicitud'
    };
  }
};

export const resetPassword = async (token, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, {
      token,
      password,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Error al restablecer la contraseña'
    };
  }
};