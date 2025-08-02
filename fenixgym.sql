-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-08-2025 a las 00:21:42
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
  `address_customer` text DEFAULT NULL,
  `phone_customer` varchar(20) DEFAULT NULL,
  `birth_customer` date DEFAULT NULL,
  `weight_customer` double NOT NULL DEFAULT 0,
  `stature_customer` double NOT NULL DEFAULT 0,
  `gender_customer` int(1) NOT NULL,
  `created_customer` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `customers`
--

INSERT INTO `customers` (`id_customer`, `document_customer`, `name_customer`, `lastname_customer`, `address_customer`, `phone_customer`, `birth_customer`, `weight_customer`, `stature_customer`, `gender_customer`, `created_customer`) VALUES
(1, '00000000', 'Alciviades', 'Cueva', 'Av. De Prueba 675, Cajamarca', '976014890', '2020-06-01', 68, 163, 1, '2025-08-02 11:48:26'),
(2, '11111111', 'Ronal', 'Ramos', NULL, NULL, '2005-08-01', 0, 0, 1, '2025-08-02 17:12:41'),
(3, '22222222', 'David', 'López', NULL, NULL, '2006-08-01', 0, 0, 1, '2025-08-02 17:12:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `days`
--

CREATE TABLE `days` (
  `id_day` int(11) NOT NULL,
  `number_day` int(11) NOT NULL,
  `description_day` text DEFAULT NULL,
  `state_day` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `durations`
--

CREATE TABLE `durations` (
  `id_duration` int(11) NOT NULL,
  `minutes_duration` int(11) NOT NULL,
  `description_duration` text DEFAULT NULL,
  `state_duration` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exercises`
--

CREATE TABLE `exercises` (
  `id_exercise` int(11) NOT NULL,
  `id_machine` int(11) NOT NULL,
  `instruction_exercise` text NOT NULL,
  `description_exercise` text DEFAULT NULL,
  `video_exercise` text DEFAULT NULL,
  `state_exercise` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `goals`
--

CREATE TABLE `goals` (
  `id_goal` int(11) NOT NULL,
  `name_goal` varchar(500) NOT NULL,
  `description_goal` text DEFAULT NULL,
  `state_goal` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `levels`
--

CREATE TABLE `levels` (
  `id_level` int(11) NOT NULL,
  `name_level` varchar(500) NOT NULL,
  `description_level` text DEFAULT NULL,
  `state_level` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `machines`
--

CREATE TABLE `machines` (
  `id_machine` int(11) NOT NULL,
  `name_machine` varchar(500) NOT NULL,
  `description_machine` text DEFAULT NULL,
  `state_machine` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `memberships`
--

CREATE TABLE `memberships` (
  `id_membership` int(11) NOT NULL,
  `name_membership` varchar(500) NOT NULL,
  `days_membership` int(11) NOT NULL,
  `price_membership` double NOT NULL,
  `description_membership` text DEFAULT NULL,
  `state_membership` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `memberships`
--

INSERT INTO `memberships` (`id_membership`, `name_membership`, `days_membership`, `price_membership`, `description_membership`, `state_membership`) VALUES
(1, 'Free', 7, 0, 'Prueba gratis de 7 días.', 1),
(2, 'Golden', 365, 500, 'Premium por 1 año', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `muscles`
--

CREATE TABLE `muscles` (
  `id_muscle` int(11) NOT NULL,
  `name_muscle` varchar(500) NOT NULL,
  `description_muscle` text DEFAULT NULL,
  `state_muscle` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

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
  `weight_detail` double NOT NULL,
  `repetition_detail` int(11) NOT NULL,
  `round_detail` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `routine_muscles`
--

CREATE TABLE `routine_muscles` (
  `id_routinemuscle` bigint(20) NOT NULL,
  `id_routine` bigint(20) NOT NULL,
  `id_muscle` int(11) NOT NULL,
  `description_routinemuscle` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` bigint(20) NOT NULL,
  `id_membership` int(11) NOT NULL,
  `id_customer` bigint(20) NOT NULL,
  `name_user` varchar(200) NOT NULL,
  `email_user` varchar(500) NOT NULL,
  `password_user` text NOT NULL,
  `token_user` text DEFAULT NULL,
  `photo_user` text NOT NULL,
  `expiration_user` date NOT NULL,
  `login_user` datetime DEFAULT NULL,
  `state_user` int(1) NOT NULL DEFAULT 1,
  `updated_user` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_user` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `id_membership`, `id_customer`, `name_user`, `email_user`, `password_user`, `token_user`, `photo_user`, `expiration_user`, `login_user`, `state_user`, `updated_user`, `created_user`) VALUES
(1, 2, 1, 'alci', 'alci@gmail.com', '$2b$10$uX8AXgQj7po91hLfJMzCA.4t5l9rLIsPNkjVHkQUcGm1Q25aBPri2', NULL, '../../assets/goku.jpg', '2026-08-01', '2025-07-29 23:30:30', 1, '2025-08-02 17:17:52', '2025-07-29 16:32:09'),
(2, 1, 2, 'ronal', 'ronal@gmail.com', '$2b$10$uX8AXgQj7po91hLfJMzCA.4t5l9rLIsPNkjVHkQUcGm1Q25aBPri2', NULL, '../../assets/goku.jpg', '2025-08-31', NULL, 1, '2025-08-02 17:21:04', '2025-08-02 17:15:31'),
(3, 1, 3, 'david', 'david@gmail.com', '$2b$10$uX8AXgQj7po91hLfJMzCA.4t5l9rLIsPNkjVHkQUcGm1Q25aBPri2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NTQxNzMxODQsImV4cCI6MTc1NDc3Nzk4NH0.aoXzaj2Zyph55zFNLJNkE2TpKHdKKQKmwl6M9Mp38z4', '../../assets/goku.jpg', '2025-08-31', NULL, 1, '2025-08-02 17:21:17', '2025-08-02 17:15:31');

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
-- Indices de la tabla `machines`
--
ALTER TABLE `machines`
  ADD PRIMARY KEY (`id_machine`);

--
-- Indices de la tabla `memberships`
--
ALTER TABLE `memberships`
  ADD PRIMARY KEY (`id_membership`);

--
-- Indices de la tabla `muscles`
--
ALTER TABLE `muscles`
  ADD PRIMARY KEY (`id_muscle`);

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
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `customers`
--
ALTER TABLE `customers`
  MODIFY `id_customer` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
-- AUTO_INCREMENT de la tabla `machines`
--
ALTER TABLE `machines`
  MODIFY `id_machine` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `memberships`
--
ALTER TABLE `memberships`
  MODIFY `id_membership` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `muscles`
--
ALTER TABLE `muscles`
  MODIFY `id_muscle` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id_user` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
