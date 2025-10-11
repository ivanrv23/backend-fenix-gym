-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-10-2025 a las 22:33:16
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
(1, '73441267', 'Alciviades', 'Cueva', 'Av. De Prueba 675, Cajamarca', '976014890', '2020-06-01', 68, 163, 1, '2025-08-02 11:48:26'),
(2, '11111111', 'Ronal', 'Ramos', 'Hh', '976014890', '2005-08-01', 60, 160, 1, '2025-08-02 17:12:41'),
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

--
-- Volcado de datos para la tabla `days`
--

INSERT INTO `days` (`id_day`, `number_day`, `description_day`, `state_day`) VALUES
(1, 1, 'Para principiantes/salud general', 1),
(2, 2, 'Para nivel principiante serio', 1),
(3, 3, 'Para intermedios', 1),
(4, 4, 'Para avanzados', 1),
(5, 5, 'Para avanzados nivel serio', 1),
(6, 6, 'Para competitivos', 1),
(7, 7, 'Solo para atletas', 1);

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

--
-- Volcado de datos para la tabla `durations`
--

INSERT INTO `durations` (`id_duration`, `minutes_duration`, `description_duration`, `state_duration`) VALUES
(1, 30, 'Para principiantes ocupados', 1),
(2, 45, 'Para principiantes', 1),
(3, 60, 'Para intermedios', 1),
(4, 90, 'Para avanzados', 1),
(5, 120, 'Para avanzados y atletas', 1);

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

--
-- Volcado de datos para la tabla `goals`
--

INSERT INTO `goals` (`id_goal`, `name_goal`, `description_goal`, `state_goal`) VALUES
(1, 'Perder Peso', 'Bajar el porcentaje de grasa', 1),
(2, 'Ganar Músculo', 'Hipertrofia muscular', 1),
(3, 'Aumentar Fuerza', 'Rendimiento en levantamientos', 1),
(4, 'Resistencia', 'Potencia, agilidad, funcionalidad', 1),
(5, 'Salud General', 'Bienestar físico', 1);

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

--
-- Volcado de datos para la tabla `levels`
--

INSERT INTO `levels` (`id_level`, `name_level`, `description_level`, `state_level`) VALUES
(1, 'Principiante', '0 - 6 meses', 1),
(2, 'Intermedio', '6 - 24 meses', 1),
(3, 'Avanzado', '2 - 5 años', 1),
(4, 'Competitivo', '5+ años', 1),
(5, 'Recreativo', 'Variable', 1);

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

--
-- Volcado de datos para la tabla `muscles`
--

INSERT INTO `muscles` (`id_muscle`, `name_muscle`, `description_muscle`, `state_muscle`) VALUES
(1, 'Pectorales', 'Músculos del pecho en el torso anterior', 1),
(2, 'Dorsales', 'Músculos de la espalda ancha en el torso posterior', 1),
(3, 'Trapecio y romboides', 'Músculos de la espalda media', 1),
(4, 'Deltoides', 'Músculos de los hombros en el torso superior', 1),
(5, 'Glúteos', 'Músculos de la zona de la cadera', 1),
(6, 'Cuádriceps', 'Muslos anteriores', 1),
(7, 'Isquiotibiales', 'Femorales en la zona de los muslos posteriores', 1),
(8, 'Core', 'Abdominales y lumbares en la zona del tronco', 1),
(9, 'Bíceps', 'Brazo anterior', 1),
(10, 'Tríceps', 'Brazo posterior', 1),
(11, 'Trapecio superior', 'Cuello y hombros', 1),
(12, 'Erectores espinales', 'Espalda baja', 1),
(13, 'Aductores y abductores', 'Interior y exterior de piernas', 1),
(14, 'Oblicuos', 'Laterales del abdomen', 1),
(15, 'Antebrazos', 'Brazos inferiores', 1),
(16, 'Gemelos', 'Pantorrillas en la perna inferior', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promotions`
--

CREATE TABLE `promotions` (
  `id_promotion` bigint(20) NOT NULL,
  `id_membership` int(11) NOT NULL,
  `code_promotion` varchar(20) NOT NULL,
  `state_promotion` int(1) NOT NULL DEFAULT 1
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

--
-- Volcado de datos para la tabla `routines`
--

INSERT INTO `routines` (`id_routine`, `id_user`, `id_level`, `id_goal`, `id_day`, `id_duration`, `date_routine`) VALUES
(1, 1, 1, 4, 5, 3, '2025-10-05'),
(2, 1, 5, 5, 3, 1, '2025-10-11');

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
(1, 1, 1, 'alci', 'alci@fenixgym.com', '$2a$10$hKR.656fStLzhfGWD3eQSuI2Jzvpvg2mt/cD6wsaRXS/hYOQ/VaB.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzYwMjA3OTY1LCJleHAiOjE3NjA4MTI3NjV9.V2Qywl9UP3SQLe8L5Yi4fDj8V7qoZFfST2UOMyOjv28', 'JPG', '2025-12-31', '2025-10-11 13:39:25', 1, '2025-10-11 13:39:25', '2025-08-23 18:16:43'),
(2, 2, 2, 'ronal', 'ronal@fenixgym.com', '$2a$10$VdPdO0e8A2IYyR9b4S64q.O7zjgHpX.K.TQlTqushkLR/TMh5twY6', NULL, 'JPEG', '2025-11-30', '2025-10-11 13:11:45', 1, '2025-10-11 13:39:14', '2025-08-23 18:16:43'),
(3, 1, 3, 'david', 'david@fenixgym.com', '$2a$10$Rd.aixibctSBL6uzEV8nA.tiUQ9sNL.w9iFnMWBpoGfoGOxGdPaHu', NULL, '../../assets/users/default.png', '2025-10-15', NULL, 1, '2025-09-20 15:30:38', '2025-08-23 18:16:43'),
(4, 3, 1004, 'Ana Rodríguez', 'ana@fenixgym.com', '$2a$10$Kj7ZgdJeYILzAh6ir1cCkuS6HbQavVJ2lF.AojC95oWYJFwEx4kNK', NULL, '../../assets/users/ana.jpg', '2026-01-15', NULL, 1, '2025-08-23 18:16:44', '2025-08-23 18:16:44'),
(5, 2, 1005, 'Pedro Martínez', 'pedro@fenixgym.com', '$2a$10$bqZDJBPZhAdsw99y/kHkN.HsHShb3bu6QhVxV5zLiTNbrN4q/KKtG', NULL, '../../assets/users/pedro.jpg', '2025-09-30', NULL, 1, '2025-08-23 18:16:44', '2025-08-23 18:16:44');

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
-- Indices de la tabla `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id_promotion`);

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
  MODIFY `id_day` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `durations`
--
ALTER TABLE `durations`
  MODIFY `id_duration` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `exercises`
--
ALTER TABLE `exercises`
  MODIFY `id_exercise` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `goals`
--
ALTER TABLE `goals`
  MODIFY `id_goal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `levels`
--
ALTER TABLE `levels`
  MODIFY `id_level` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id_muscle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id_promotion` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `routines`
--
ALTER TABLE `routines`
  MODIFY `id_routine` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `id_user` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
