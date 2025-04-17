# Web Legal - Frontend

Aplicación web moderna para servicios legales, desarrollada con React y Material-UI.

## Características

- Diseño responsivo y moderno
- Interfaz de usuario intuitiva
- Animaciones y transiciones suaves
- Optimizado para SEO
- Integración con backend RESTful

## Tecnologías

- React 18
- Material-UI (MUI)
- React Router
- Axios
- Vite

## Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone [url-del-repositorio]
cd frontend
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

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/         # Vistas principales
│   ├── assets/        # Imágenes y recursos estáticos
│   ├── styles/        # Estilos globales y temas
│   ├── services/      # Servicios y llamadas API
│   ├── utils/         # Utilidades y helpers
│   ├── context/       # Contextos de React
│   └── App.jsx        # Componente principal
├── public/            # Archivos públicos
└── package.json       # Dependencias y scripts
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Genera la versión de producción
- `npm run preview`: Previsualiza la versión de producción
- `npm run lint`: Ejecuta el linter
- `npm run test`: Ejecuta las pruebas

## Variables de Entorno

- `VITE_API_URL`: URL del backend
- `VITE_APP_NAME`: Nombre de la aplicación
- `VITE_APP_VERSION`: Versión de la aplicación

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
