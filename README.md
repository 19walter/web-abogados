# Plataforma Legal - Sistema Integral de Gestión

Este repositorio contiene una plataforma legal completa que integra un frontend moderno y un backend robusto para la gestión de casos legales, citas, documentos y más.

## 🏗️ Estructura del Proyecto

El proyecto está organizado en dos directorios principales:

```
.
├── backend/           # API REST y lógica de negocio
└── frontend/         # Interfaz de usuario React
```

## 🚀 Características Principales

- **Gestión de Casos**: Seguimiento completo de casos legales
- **Sistema de Citas**: Agendamiento y gestión de consultas
- **Gestión Documental**: Almacenamiento y organización de documentos legales
- **Dashboard**: Panel de control con métricas y estadísticas
- **Perfiles de Usuario**: Roles diferenciados (abogados, clientes, administradores)
- **Notificaciones**: Sistema de alertas y recordatorios

## 🛠️ Tecnologías Utilizadas

### Backend
- Node.js
- Express
- MongoDB
- JWT para autenticación
- Multer para manejo de archivos
- Nodemailer para notificaciones

### Frontend
- React
- Material-UI
- Redux para gestión de estado
- Axios para peticiones HTTP
- React Router para navegación
- Chart.js para visualizaciones

## 📦 Requisitos Previos

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## 🚀 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/badkitten-bug/web-abogados.git
cd web-abogados
```

2. Instalar dependencias del backend:
```bash
cd backend
npm install
```

3. Instalar dependencias del frontend:
```bash
cd ../frontend
npm install
```

## ⚙️ Configuración

1. Configurar variables de entorno en `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/legal_platform
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

2. Configurar variables de entorno en `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000
```

## 🏃‍♂️ Ejecución

1. Iniciar el servidor backend:
```bash
cd backend
npm run dev
```

2. Iniciar el servidor frontend:
```bash
cd frontend
npm start
```

## 📚 Documentación

- [Documentación del Backend](backend/README.md)
- [Documentación del Frontend](frontend/README.md)

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

Para cualquier consulta o soporte, por favor contacta a través de:
- Email: [tu-email@ejemplo.com]
- GitHub: [@badkitten-bug](https://github.com/badkitten-bug) 