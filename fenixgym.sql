-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-07-2025 a las 04:49:04
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fenixgym`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_role` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_role`, `role_name`, `description`) VALUES
(11, 'admin', 'Administrador del sistema'),
(12, 'user', 'Usuario estándar'),
(13, 'premium', 'Usuario premium');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `id_role` int(11) NOT NULL,
  `name_user` varchar(50) NOT NULL,
  `password_user` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `photo_user` varchar(255) DEFAULT 'default.jpg',
  `state_user` tinyint(1) DEFAULT 1 COMMENT '0=Inactivo, 1=Activo',
  `membership_status` varchar(20) DEFAULT 'pending',
  `expiration_date` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `id_role`, `name_user`, `password_user`, `refresh_token`, `email`, `first_name`, `last_name`, `phone`, `photo_user`, `state_user`, `membership_status`, `expiration_date`, `last_login`, `created_at`, `updated_at`) VALUES
(1, 11, 'admin', '$2b$10$uX8AXgQj7po91hLfJMzCA.4t5l9rLIsPNkjVHkQUcGm1Q25aBPri2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NTIzNzEyNzksImV4cCI6MTc1MjM3MTMzOX0.NxJ8F5UiShHZ_SPvYqkLSOrfC0mIXum8nFwvZl3yKpw', 'admin@fenixgym.com', 'Administrador', 'Sistema', '+1234567890', 'admin-profile.jpg', 1, 'active', '2025-07-12 00:00:00', NULL, '2025-07-13 01:20:26', '2025-07-13 01:47:59'),
(2, 12, 'usuario1', '$2b$10$MQZeglVzSH6ElGKXKeCsmOoUcgGFJTW98zSqXI8SEiBUlHtwfzm1q', NULL, 'usuario1@fenixgym.com', 'Juan', 'Pérez', '+59891234567', 'user-profile.jpg', 1, 'active', '2025-10-12 00:00:00', NULL, '2025-07-13 01:20:26', '2025-07-13 01:20:26');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_role`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `name_user` (`name_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id_role` (`id_role`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_role`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
