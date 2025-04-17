-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-04-2025 a las 05:39:39
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `jyang`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `records`
--

CREATE TABLE `records` (
  `id` int(11) NOT NULL,
  `client_name` varchar(200) NOT NULL,
  `case_type` varchar(200) NOT NULL,
  `status` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `assigned_to` varchar(100) NOT NULL,
  `case_notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `records`
--

INSERT INTO `records` (`id`, `client_name`, `case_type`, `status`, `start_date`, `assigned_to`, `case_notes`) VALUES
(1, 'Juan Pérez', 'Divorcio', 'En proceso', '2025-01-15', 'Dr. García', ''),
(2, 'María Rodríguez', 'Demanda laboral', 'Activo', '2025-02-10', 'Dra. Sánchez', ''),
(3, 'Carlos Gómez', 'Contrato comercial', 'Completado', '2024-11-05', 'Dr. García', ''),
(4, 'Ana López', 'Propiedad intelectual', 'En espera', '2025-03-01', 'Dr. Martínez', ''),
(5, 'Juan ', 'Divorcio', 'En proceso', '2025-03-29', 'Dr. García', ''),
(6, 'arturo', 'Demanda laboral', 'Activo', '2025-03-30', 'Dr. García', 'bueeeeeee'),
(7, 'juan yangaly', 'Contrato comercial', 'En espera', '2025-03-30', 'Dr. García', 'problemas '),
(8, 'Fernando', 'Demanda laboral', 'Activo', '2025-04-25', 'Dra. Sánchez', 'Revisar expediente y adjuntar documentos pdf de las demandas.'),
(9, 'Fernando45', 'Demanda laboral', 'Completado', '2025-04-18', 'Dra. López', 'hola'),
(11, 'Walter Vargas', 'Contrato comercial', 'Activo', '2025-04-30', 'Dr. García', 'Revisar caso.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_users` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `contrasena` varchar(50) NOT NULL,
  `creador` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_users`, `usuario`, `contrasena`, `creador`) VALUES
(1, 'admin', 'admin123', '2025-03-29 16:07:15');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `records`
--
ALTER TABLE `records`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_users`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `records`
--
ALTER TABLE `records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_users` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
