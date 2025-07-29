-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-07-2025 a las 00:50:55
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
-- Estructura de tabla para la tabla `customers`
--

CREATE TABLE `customers` (
  `id_customer` bigint(20) NOT NULL,
  `document_customer` varchar(20) NOT NULL,
  `name_customer` varchar(200) NOT NULL,
  `lastname_customer` varchar(200) NOT NULL,
  `address_customer` text NOT NULL,
  `birth_customer` date NOT NULL,
  `weight_customer` double NOT NULL,
  `stature_customer` double NOT NULL,
  `gender_customer` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `days`
--

CREATE TABLE `days` (
  `id_day` int(11) NOT NULL,
  `number_day` int(11) NOT NULL,
  `description_day` text NOT NULL,
  `state_day` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `durations`
--

CREATE TABLE `durations` (
  `id_duration` int(11) NOT NULL,
  `minutes_duration` int(11) NOT NULL,
  `description_duration` text NOT NULL,
  `state_duration` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exercises`
--

CREATE TABLE `exercises` (
  `id_exercise` int(11) NOT NULL,
  `id_machine` int(11) NOT NULL,
  `rounds_exercise` int(11) NOT NULL,
  `repetition_exercise` int(11) NOT NULL,
  `description_exercise` text NOT NULL,
  `video_exercise` text NOT NULL,
  `state_exercise` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `goals`
--

CREATE TABLE `goals` (
  `id_goal` int(11) NOT NULL,
  `name_goal` varchar(500) NOT NULL,
  `description_goal` text NOT NULL,
  `state_goal` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `levels`
--

CREATE TABLE `levels` (
  `id_level` int(11) NOT NULL,
  `name_level` varchar(500) NOT NULL,
  `description_level` text NOT NULL,
  `state_level` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `muscles`
--

CREATE TABLE `muscles` (
  `id_muscle` int(11) NOT NULL,
  `name_muscle` varchar(500) NOT NULL,
  `description_muscle` text NOT NULL,
  `state_muscle` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

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
-- Estructura de tabla para la tabla `routines`
--

CREATE TABLE `routines` (
  `id_routine` bigint(20) NOT NULL,
  `id_user` bigint(20) NOT NULL,
  `id_level` int(11) NOT NULL,
  `id_goal` int(11) NOT NULL,
  `id_day` int(11) NOT NULL,
  `id_duration` int(11) NOT NULL,
  `date_routine` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `routine_detail`
--

CREATE TABLE `routine_detail` (
  `id_detail` bigint(20) NOT NULL,
  `id_routine` bigint(20) NOT NULL,
  `id_exercise` int(11) NOT NULL,
  `weight_detail` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `routine_muscles`
--

CREATE TABLE `routine_muscles` (
  `id_routinemuscle` bigint(20) NOT NULL,
  `id_routine` bigint(20) NOT NULL,
  `id_muscle` int(11) NOT NULL,
  `description_routinemuscle` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

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
  `id_customer` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `id_role`, `name_user`, `password_user`, `refresh_token`, `email`, `first_name`, `last_name`, `phone`, `photo_user`, `state_user`, `membership_status`, `expiration_date`, `last_login`, `id_customer`, `created_at`, `updated_at`) VALUES
(1, 11, 'admin', '$2b$10$uX8AXgQj7po91hLfJMzCA.4t5l9rLIsPNkjVHkQUcGm1Q25aBPri2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NTM3MzY4MjIsImV4cCI6MTc1NDM0MTYyMn0.ydc7hMwm9Ym6Zj01NO_x0nVCn3xBFaq_-04Y4xDihzI', 'admin@fenixgym.com', 'Administrador', 'Sistema', '+1234567890', NULL, 1, 'active', '2025-07-12 00:00:00', NULL, 1, '2025-07-13 01:20:26', '2025-07-28 21:30:44'),
(2, 12, 'usuario1', '$2b$10$MQZeglVzSH6ElGKXKeCsmOoUcgGFJTW98zSqXI8SEiBUlHtwfzm1q', NULL, 'usuario1@fenixgym.com', 'Juan', 'Pérez', '+59891234567', 'user-profile.jpg', 1, 'active', '2025-10-12 00:00:00', NULL, 0, '2025-07-13 01:20:26', '2025-07-13 01:20:26');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id_customer`);

--
-- Indices de la tabla `days`
--
ALTER TABLE `days`
  ADD PRIMARY KEY (`id_day`);

--
-- Indices de la tabla `durations`
--
ALTER TABLE `durations`
  ADD PRIMARY KEY (`id_duration`);

--
-- Indices de la tabla `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`id_exercise`);

--
-- Indices de la tabla `goals`
--
ALTER TABLE `goals`
  ADD PRIMARY KEY (`id_goal`);

--
-- Indices de la tabla `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id_level`);

--
-- Indices de la tabla `muscles`
--
ALTER TABLE `muscles`
  ADD PRIMARY KEY (`id_muscle`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_role`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indices de la tabla `routines`
--
ALTER TABLE `routines`
  ADD PRIMARY KEY (`id_routine`);

--
-- Indices de la tabla `routine_detail`
--
ALTER TABLE `routine_detail`
  ADD PRIMARY KEY (`id_detail`);

--
-- Indices de la tabla `routine_muscles`
--
ALTER TABLE `routine_muscles`
  ADD PRIMARY KEY (`id_routinemuscle`);

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
-- AUTO_INCREMENT de la tabla `customers`
--
ALTER TABLE `customers`
  MODIFY `id_customer` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `days`
--
ALTER TABLE `days`
  MODIFY `id_day` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `durations`
--
ALTER TABLE `durations`
  MODIFY `id_duration` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `exercises`
--
ALTER TABLE `exercises`
  MODIFY `id_exercise` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `goals`
--
ALTER TABLE `goals`
  MODIFY `id_goal` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `levels`
--
ALTER TABLE `levels`
  MODIFY `id_level` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `muscles`
--
ALTER TABLE `muscles`
  MODIFY `id_muscle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `routines`
--
ALTER TABLE `routines`
  MODIFY `id_routine` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `routine_detail`
--
ALTER TABLE `routine_detail`
  MODIFY `id_detail` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `routine_muscles`
--
ALTER TABLE `routine_muscles`
  MODIFY `id_routinemuscle` bigint(20) NOT NULL AUTO_INCREMENT;

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
