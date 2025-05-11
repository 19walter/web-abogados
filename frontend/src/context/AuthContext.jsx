import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { getCurrentUser, login as loginService } from '../services/auth.service';

export const AuthContext = createContext(null);

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const response = await getCurrentUser();
      if (response.success && response.data && response.data.user) {
        setUser(response.data.user);
        setError(null);
      } else {
        setError(response.error);
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
      setError('Error al cargar el usuario');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await loginService(credentials);
      if (response.success && response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        setError(null);
        return { success: true };
      }
      return { success: false, error: response.error || 'Credenciales inválidas' };
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Error al iniciar sesión'
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
  };

  const updateUserContext = (userData) => {
    setUser(userData);
  };

  const value = useMemo(() => ({
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    updateUserContext,
  }), [user, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};