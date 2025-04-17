# Web Legal - Backend

API RESTful para la plataforma de servicios legales, desarrollada con Node.js y Express.

## Características

- API RESTful completa
- Autenticación JWT
- Base de datos MySQL
- Documentación con Swagger
- Manejo de archivos y documentos
- Sistema de citas y calendario
- Gestión de casos legales

## Tecnologías

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT para autenticación
- Multer para manejo de archivos
- Swagger para documentación

## Requisitos Previos

- Node.js (v16 o superior)
- MySQL (v8 o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone [url-del-repositorio]
cd backend
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

4. Iniciar la base de datos:
```bash
# Crear la base de datos
mysql -u root -p < database.sql

# Ejecutar migraciones
npx sequelize-cli db:migrate

# Poblar datos iniciales (opcional)
npx sequelize-cli db:seed:all
```

5. Iniciar el servidor:
```bash
npm run dev
# o
yarn dev
```

## Estructura del Proyecto

```
backend/
├── src/
│   ├── config/         # Configuraciones
│   ├── controllers/    # Controladores
│   ├── models/         # Modelos de Sequelize
│   ├── routes/         # Rutas de la API
│   ├── middleware/     # Middleware personalizado
│   ├── services/       # Lógica de negocio
│   ├── utils/          # Utilidades
│   └── app.js          # Aplicación principal
├── migrations/         # Migraciones de la base de datos
├── seeders/           # Datos iniciales
└── package.json       # Dependencias y scripts
```

## Endpoints Principales

### Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/refresh` - Renovación de token

### Usuarios
- `GET /api/users/profile` - Perfil del usuario
- `PUT /api/users/profile` - Actualizar perfil
- `PUT /api/users/password` - Cambiar contraseña

### Casos
- `GET /api/cases` - Listar casos
- `POST /api/cases` - Crear caso
- `GET /api/cases/:id` - Obtener caso
- `PUT /api/cases/:id` - Actualizar caso
- `DELETE /api/cases/:id` - Eliminar caso

### Citas
- `GET /api/appointments` - Listar citas
- `POST /api/appointments` - Crear cita
- `PUT /api/appointments/:id` - Actualizar cita
- `DELETE /api/appointments/:id` - Eliminar cita

### Documentos
- `GET /api/documents` - Listar documentos
- `POST /api/documents` - Subir documento
- `GET /api/documents/:id` - Descargar documento
- `DELETE /api/documents/:id` - Eliminar documento

## Variables de Entorno

- `PORT`: Puerto del servidor
- `DB_HOST`: Host de la base de datos
- `DB_USER`: Usuario de la base de datos
- `DB_PASSWORD`: Contraseña de la base de datos
- `DB_NAME`: Nombre de la base de datos
- `JWT_SECRET`: Secreto para JWT
- `JWT_EXPIRES_IN`: Tiempo de expiración del token
- `UPLOAD_DIR`: Directorio para archivos subidos

## Scripts Disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo
- `npm run start`: Inicia el servidor en modo producción
- `npm run lint`: Ejecuta el linter
- `npm run test`: Ejecuta las pruebas
- `npm run migrate`: Ejecuta las migraciones
- `npm run seed`: Pobla la base de datos

## Documentación API

La documentación de la API está disponible en `/api-docs` cuando el servidor está en ejecución.

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles. 