import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import theme from './theme';
import RoleRoute from './components/RoleRoute';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Páginas públicas
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import WorkProcess from './pages/WorkProcess';
import SuccessCases from './pages/SuccessCases';
import Testimonials from './pages/Testimonials';

// Páginas del dashboard
import Dashboard from './pages/Dashboard';
import Cases from './pages/Cases';
import Appointments from './pages/Appointments';
import Documents from './pages/Documents';
import Profile from './pages/Profile';
import CitasReport from './pages/CitasReport';
import Clientes from './pages/Clientes';
import Usuarios from './pages/Usuarios';
import Especialidades from './pages/Especialidades';

// Componentes protegidos
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="work-process" element={<WorkProcess />} />
              <Route path="success-cases" element={<SuccessCases />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* Rutas protegidas del dashboard */}
            <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="casos" element={<Cases />} />
              <Route path="citas" element={<Appointments />} />
              <Route path="documentos" element={<Documents />} />
              <Route path="perfil" element={<Profile />} />
              <Route path="reportes-citas" element={<CitasReport />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="usuarios" element={<RoleRoute allowedRoles={['admin', 'asistente']}><Usuarios /></RoleRoute>} />
              <Route path="especialidades" element={<RoleRoute allowedRoles={['admin', 'asistente']}><Especialidades /></RoleRoute>} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;