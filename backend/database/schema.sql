-- Esquema de base de datos mejorado para el sistema legal

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Tabla de usuarios mejorada
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `usuario` varchar(50) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `rol` ENUM('admin', 'abogado', 'cliente') NOT NULL DEFAULT 'cliente',
  `estado` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Tabla de servicios legales
CREATE TABLE `servicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) NOT NULL,
  `descripcion` text NOT NULL,
  `icono` varchar(100),
  `imagen` varchar(255),
  `estado` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Tabla de casos legales mejorada
CREATE TABLE `casos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) NOT NULL,
  `descripcion` text NOT NULL,
  `tipo_caso` varchar(100) NOT NULL,
  `estado` ENUM('pendiente', 'en_proceso', 'completado', 'archivado') NOT NULL DEFAULT 'pendiente',
  `cliente_id` int(11) NOT NULL,
  `abogado_id` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date,
  `prioridad` ENUM('baja', 'media', 'alta', 'urgente') NOT NULL DEFAULT 'media',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`cliente_id`) REFERENCES `usuarios`(`id`),
  FOREIGN KEY (`abogado_id`) REFERENCES `usuarios`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Tabla de documentos
CREATE TABLE `documentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `caso_id` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `descripcion` text,
  `archivo` varchar(255) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`caso_id`) REFERENCES `casos`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Tabla de citas
CREATE TABLE `citas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `caso_id` int(11),
  `cliente_id` int(11) NOT NULL,
  `abogado_id` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `tipo` ENUM('consulta', 'seguimiento', 'audiencia', 'otro') NOT NULL,
  `estado` ENUM('programada', 'confirmada', 'cancelada', 'completada') NOT NULL DEFAULT 'programada',
  `notas` text,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`caso_id`) REFERENCES `casos`(`id`),
  FOREIGN KEY (`cliente_id`) REFERENCES `usuarios`(`id`),
  FOREIGN KEY (`abogado_id`) REFERENCES `usuarios`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Tabla de testimonios
CREATE TABLE `testimonios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente_id` int(11) NOT NULL,
  `contenido` text NOT NULL,
  `calificacion` int(1) NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
  `estado` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`cliente_id`) REFERENCES `usuarios`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Tabla de notificaciones
CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `mensaje` text NOT NULL,
  `tipo` ENUM('info', 'warning', 'success', 'error') NOT NULL DEFAULT 'info',
  `leido` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Insertar datos de ejemplo para servicios
INSERT INTO `servicios` (`titulo`, `descripcion`, `icono`, `imagen`) VALUES
('Derecho Corporativo', 'Asesoría legal completa para empresas, incluyendo constitución, fusiones, adquisiciones y cumplimiento normativo.', 'business', 'service/corporativo.jpg'),
('Derecho Laboral', 'Protección de derechos laborales tanto para empleadores como trabajadores, con enfoque en la legislación vigente.', 'work', 'service/laboral.jpg'),
('Derecho de Familia', 'Asesoramiento en temas familiares con sensibilidad y profesionalidad, priorizando el bienestar de las partes.', 'family', 'service/familia.jpg'),
('Derecho Inmobiliario', 'Servicios legales especializados en transacciones inmobiliarias y resolución de conflictos relacionados con propiedades.', 'home', 'service/inmobiliario.jpg'),
('Derecho Penal', 'Defensa penal especializada con un equipo de abogados expertos en diferentes áreas del derecho penal.', 'gavel', 'service/penal.jpg'),
('Asesoría Legal General', 'Servicio integral de asesoría legal para particulares y empresas, adaptado a tus necesidades específicas.', 'description', 'service/general.jpg');

-- Insertar usuario administrador por defecto
INSERT INTO `usuarios` (`nombre`, `apellido`, `email`, `usuario`, `password`, `rol`) VALUES
('Admin', 'Sistema', 'admin@sistema.com', 'admin', '$2a$10$X7UrE2J5Q5Q5Q5Q5Q5Q5QO5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', 'admin');

COMMIT; 