-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-12-2025 a las 23:14:50
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
  `name_exercise` varchar(200) NOT NULL,
  `instruction_exercise` text NOT NULL,
  `description_exercise` text DEFAULT NULL,
  `video_exercise` text DEFAULT NULL,
  `state_exercise` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `exercises`
--

INSERT INTO `exercises` (`id_exercise`, `name_exercise`, `instruction_exercise`, `description_exercise`, `video_exercise`, `state_exercise`) VALUES
(1, 'Press de banca con barra', 'Acuéstate en el banco plano, sujeta la barra con agarre medio, baja la barra hasta el pecho y empuja hacia arriba controladamente.', 'Banco plano, barra, rack', 'https://youtu.be/vUMtItXfO8Y', 1),
(2, 'Press de banca con mancuernas', 'Igual que el press con barra, pero usando mancuernas para un mayor rango de movimiento y activación estabilizadora.', 'Banco plano, mancuernas', NULL, 1),
(3, 'Press inclinado con barra', 'En banco inclinado (30°–45°), sujeta la barra y bájala hasta el pecho superior, luego empuja hacia arriba.', 'Banco inclinado, barra, rack', NULL, 1),
(4, 'Press inclinado con mancuernas', 'Igual que el press inclinado con barra, pero con mancuernas para trabajar de forma más unilateral y con más amplitud.', 'Banco inclinado, mancuernas', NULL, 1),
(5, 'Press declinado con barra', 'En banco declinado, sujeta la barra con agarre medio, bájala al pecho inferior y empuja hacia arriba.', 'Banco declinado, barra, rack', NULL, 1),
(6, 'Fondos en paralelas (para pecho)', 'Sostente en barras paralelas, inclina ligeramente el torso hacia adelante, baja flexionando codos y empuja para volver a la posición inicial.', 'Barras paralelas', NULL, 1),
(7, 'Flexiones de brazos (Push Ups)', 'En posición de plancha, baja el pecho al suelo flexionando codos y sube extendiendo brazos. Puedes variar la inclinación para trabajar distintas zonas.', 'Peso corporal', NULL, 1),
(8, 'Flexiones declinadas', 'Coloca los pies elevados en una superficie y realiza flexiones normales. Aumenta el trabajo en el pectoral superior.', 'Peso corporal, banco', NULL, 1),
(9, 'Flexiones con manos elevadas', 'Coloca las manos sobre una superficie elevada y realiza flexiones. Aumenta el trabajo en el pectoral inferior.', 'Peso corporal, banco', NULL, 1),
(10, 'Aperturas con mancuernas (flys)', 'Acostado en banco plano, con brazos extendidos y mancuernas sobre el pecho, abre los brazos en arco hasta sentir estiramiento en el pecho y regresa a la posición inicial.', 'Banco plano, mancuernas', NULL, 1),
(11, 'Aperturas inclinadas con mancuernas', 'En banco inclinado (30-45°), con mancuernas sobre el pecho, abre los brazos en arco hasta sentir estiramiento y regresa.', 'Banco inclinado, mancuernas', NULL, 1),
(12, 'Aperturas en polea (cable crossover)', 'De pie entre dos poleas altas, toma los mangos y junta las manos frente al pecho con brazos ligeramente flexionados.', 'Máquina de poleas cruzadas', NULL, 1),
(13, 'Press en máquina (chest press)', 'Sentado en la máquina, empuja los mangos hacia adelante manteniendo la espalda apoyada en el respaldo.', 'Máquina de press de pecho', NULL, 1),
(14, 'Dominadas (Pull-ups)', 'Cuelga de una barra con agarre prono, eleva el cuerpo hasta que la barbilla supere la barra, baja controladamente.', 'Barra de dominadas', NULL, 1),
(15, 'Remo con barra', 'De pie con ligera inclinación, sujeta la barra con agarre prono, lleva la barra hacia el abdomen y baja controladamente.', 'Barra, discos', NULL, 1),
(16, 'Remo con mancuerna a una mano', 'Apoyado en banco con una rodilla y mano, rema la mancuerna hacia la cadera manteniendo el codo cerca del cuerpo.', 'Banco, mancuerna', NULL, 1),
(17, 'Jalón al pecho (Lat pulldown)', 'Sentado en máquina de jalones, toma la barra ancha y jálala hasta el pecho superior manteniendo el torso erguido.', 'Máquina de jalones', NULL, 1),
(18, 'Remo en polea baja', 'Sentado frente a polea baja, toma el mango y jala hacia el abdomen manteniendo la espalda recta.', 'Máquina de remo en polea', NULL, 1),
(19, 'Jalón con agarre cerrado', 'Similar al jalón al pecho pero con agarre estrecho, enfatiza el trabajo de dorsales medios.', 'Máquina de jalones', NULL, 1),
(20, 'Peso muerto convencional', 'Con barra en el suelo, flexiona caderas y rodillas, agarra la barra y extiende caderas hasta estar erguido.', 'Barra, discos, rack', NULL, 1),
(21, 'Peso muerto rumano', 'Con barra en manos, desciende flexionando caderas manteniendo piernas casi extendidas, sintiendo estiramiento en femorales.', 'Barra, discos', NULL, 1),
(22, 'Encogimientos de hombros con barra', 'De pie con barra en manos, eleva los hombros hacia las orejas contrayendo el trapecio, baja controladamente.', 'Barra, discos', NULL, 1),
(23, 'Press militar con barra', 'De pie o sentado, sujeta la barra a la altura de los hombros y empuja hacia arriba hasta extender los brazos.', 'Barra, discos, rack', NULL, 1),
(24, 'Press militar con mancuernas', 'Sentado con mancuernas a la altura de los hombros, empuja hacia arriba hasta extender los brazos.', 'Banco, mancuernas', NULL, 1),
(25, 'Elevaciones laterales', 'De pie con mancuernas a los lados, eleva los brazos lateralmente hasta la altura de los hombros.', 'Mancuernas', NULL, 1),
(26, 'Elevaciones frontales', 'De pie con mancuernas al frente, eleva los brazos al frente hasta la altura de los hombros alternadamente.', 'Mancuernas', NULL, 1),
(27, 'Pájaros (elevaciones posteriores)', 'Inclinado hacia adelante, eleva las mancuernas lateralmente enfocándote en el deltoides posterior.', 'Mancuernas', NULL, 1),
(28, 'Face pulls', 'En polea alta, jala la cuerda hacia la cara separando las manos, trabajando deltoides posterior y trapecio.', 'Máquina de poleas, cuerda', NULL, 1),
(29, 'Sentadilla con barra (back squat)', 'Con barra sobre los hombros, desciende flexionando rodillas y caderas hasta que muslos estén paralelos al suelo.', 'Barra, discos, rack', NULL, 1),
(30, 'Sentadilla frontal', 'Con barra sobre la clavícula y hombros frontales, realiza sentadilla manteniendo torso más vertical.', 'Barra, discos, rack', NULL, 1),
(31, 'Prensa de piernas', 'Sentado en máquina, empuja la plataforma con los pies hasta extender las piernas sin bloquear rodillas.', 'Máquina de prensa', NULL, 1),
(32, 'Zancadas (lunges)', 'De pie, da un paso largo adelante y desciende flexionando ambas rodillas, alterna las piernas.', 'Mancuernas o barra', NULL, 1),
(33, 'Extensiones de cuádriceps', 'Sentado en máquina, extiende las piernas elevando el peso con los cuádriceps hasta la extensión completa.', 'Máquina de extensiones', NULL, 1),
(34, 'Curl femoral acostado', 'Acostado boca abajo en máquina, flexiona las piernas llevando los talones hacia los glúteos.', 'Máquina de curl femoral', NULL, 1),
(35, 'Curl femoral sentado', 'Sentado en máquina, flexiona las piernas hacia abajo contra la resistencia.', 'Máquina de curl femoral', NULL, 1),
(36, 'Elevaciones de gemelos de pie', 'De pie con los hombros bajo las almohadillas, eleva los talones lo más alto posible contrayendo las pantorrillas.', 'Máquina de gemelos', NULL, 1),
(37, 'Elevaciones de gemelos sentado', 'Sentado con peso sobre las rodillas, eleva los talones contrayendo las pantorrillas.', 'Máquina de gemelos sentado', NULL, 1),
(38, 'Prensa hack', 'En máquina hack, con espalda apoyada, empuja la plataforma con los pies hasta extender las piernas.', 'Máquina hack squat', NULL, 1),
(39, 'Peso muerto sumo', 'Con postura amplia y pies girados, levanta la barra desde el suelo extendiendo caderas y rodillas.', 'Barra, discos', NULL, 1),
(40, 'Hip thrust (elevación de cadera)', 'Con espalda alta apoyada en banco y barra sobre cadera, eleva la cadera contrayendo glúteos.', 'Banco, barra, discos', NULL, 1),
(41, 'Curl de bíceps con barra', 'De pie con barra en manos y agarre supino, flexiona los codos llevando la barra hacia los hombros.', 'Barra, discos', NULL, 1),
(42, 'Curl de bíceps con mancuernas', 'De pie con mancuernas, flexiona los codos alternadamente o simultáneamente llevando peso hacia hombros.', 'Mancuernas', NULL, 1),
(43, 'Curl martillo', 'De pie con mancuernas en agarre neutro, flexiona los codos manteniendo las palmas enfrentadas.', 'Mancuernas', NULL, 1),
(44, 'Curl predicador', 'Sentado en banco predicador, con brazos apoyados, flexiona codos llevando barra o mancuernas hacia hombros.', 'Banco predicador, barra o mancuernas', NULL, 1),
(45, 'Press francés (extensión de tríceps acostado)', 'Acostado con barra sobre el pecho, baja la barra hacia la frente flexionando solo los codos, extiende.', 'Banco, barra Z', NULL, 1),
(46, 'Extensión de tríceps en polea', 'De pie frente a polea alta, empuja la barra o cuerda hacia abajo extendiendo los codos.', 'Máquina de poleas', NULL, 1),
(47, 'Patada de tríceps', 'Inclinado con mancuerna en mano, extiende el codo hacia atrás manteniendo el brazo superior paralelo al suelo.', 'Banco, mancuerna', NULL, 1),
(48, 'Fondos en banco (dips para tríceps)', 'Con manos apoyadas en banco detrás de ti, baja el cuerpo flexionando codos y empuja para subir.', 'Banco', NULL, 1),
(49, 'Curl de bíceps en polea baja', 'De pie frente a polea baja con barra, flexiona los codos llevando la barra hacia los hombros.', 'Máquina de poleas', NULL, 1),
(50, 'Plancha (plank)', 'En posición de antebrazo con cuerpo recto, mantén la posición contrayendo el core.', 'Peso corporal', NULL, 1),
(51, 'Plancha lateral', 'De lado apoyado en un antebrazo, mantén el cuerpo recto formando una línea desde pies hasta cabeza.', 'Peso corporal', NULL, 1),
(52, 'Crunch abdominal', 'Acostado boca arriba con rodillas flexionadas, eleva el torso superior contrayendo el abdomen.', 'Colchoneta', NULL, 1),
(53, 'Elevaciones de piernas', 'Acostado boca arriba, eleva las piernas rectas hasta formar 90° con el torso, baja controladamente.', 'Colchoneta', NULL, 1),
(54, 'Russian twist', 'Sentado con torso inclinado, gira el torso de lado a lado tocando el suelo con las manos.', 'Peso corporal o disco', NULL, 1),
(55, 'Mountain climbers', 'En posición de plancha, lleva alternadamente las rodillas hacia el pecho en movimiento rápido.', 'Peso corporal', NULL, 1),
(56, 'Rueda abdominal', 'De rodillas sujetando la rueda, rueda hacia adelante extendiendo el cuerpo y regresa.', 'Rueda abdominal', NULL, 1),
(57, 'Crunch en polea alta', 'De rodillas frente a polea alta, sostén cuerda detrás de la cabeza y flexiona el torso hacia abajo.', 'Máquina de poleas', NULL, 1),
(58, 'Oblicuos con mancuerna', 'De pie con mancuerna en una mano, inclina el torso lateralmente hacia el lado del peso.', 'Mancuerna', NULL, 1),
(59, 'Burpees', 'Desde posición de pie, baja a plancha, haz flexión, salta con pies hacia manos y salta verticalmente.', 'Peso corporal', NULL, 1),
(60, 'Thrusters', 'Con mancuernas en hombros, realiza sentadilla y al subir empuja las mancuernas sobre la cabeza.', 'Mancuernas', NULL, 1),
(61, 'Clean and press', 'Levanta la barra desde el suelo a los hombros en un movimiento explosivo, luego presiona sobre la cabeza.', 'Barra, discos', NULL, 1),
(62, 'Kettlebell swings', 'Con kettlebell entre las piernas, balancea hacia adelante hasta altura de hombros usando cadera.', 'Kettlebell', NULL, 1),
(63, 'Box jumps', 'De pie frente a un cajón, salta explosivamente sobre él y baja controladamente.', 'Cajón pliométrico', NULL, 1),
(64, 'Farmers walk', 'Camina sosteniendo pesas pesadas en ambas manos manteniendo postura erguida y core activo.', 'Mancuernas o kettlebells', NULL, 1),
(65, 'Battle ropes', 'Sostén cuerdas gruesas y crea ondas golpeándolas contra el suelo alternadamente o simultáneamente.', 'Cuerdas de batalla', NULL, 1),
(66, 'Fondos en barra (asistidos)', 'Te cuelgas de una barra fija. Desde una posición inicial, realizas un movimiento de flexión y extensión de brazos, bajando y subiendo el cuerpo, te ayudas con algo.', 'Te puedes ayudar con un banco o un compañero.', NULL, 1),
(67, 'Puente de glúteos con pausa', 'Acuéstate boca arriba sobre una colchoneta.\r\nFlexiona las rodillas y apoya los pies en el suelo, separados al ancho de las caderas.\r\nColoca los brazos a los lados del cuerpo, con las palmas apoyadas en el suelo.\r\nActiva el abdomen y los glúteos.\r\nEleva la cadera lentamente hasta formar una línea recta entre hombros, caderas y rodillas.\r\nMantén la posición arriba durante 2 a 5 segundos, apretando los glúteos.\r\nBaja la cadera de forma controlada hasta casi tocar el suelo.', 'Se caracteriza por mantener una pausa controlada en la posición más alta del movimiento, lo que aumenta el tiempo bajo tensión y mejora la activación muscular.', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exercise_muscles`
--

CREATE TABLE `exercise_muscles` (
  `id_detail` int(11) NOT NULL,
  `id_exercise` int(11) NOT NULL,
  `id_muscle` int(11) NOT NULL,
  `level_detail` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `exercise_muscles`
--

INSERT INTO `exercise_muscles` (`id_detail`, `id_exercise`, `id_muscle`, `level_detail`) VALUES
(1, 1, 1, 'principal'),
(2, 1, 4, 'secundario'),
(3, 1, 10, 'secundario'),
(4, 1, 17, 'estabilizador'),
(5, 2, 1, 'principal'),
(6, 2, 4, 'secundario'),
(7, 2, 10, 'secundario'),
(8, 2, 17, 'estabilizador'),
(9, 3, 1, 'principal'),
(10, 3, 4, 'principal'),
(11, 3, 10, 'secundario'),
(12, 3, 17, 'estabilizador'),
(13, 4, 1, 'principal'),
(14, 4, 4, 'principal'),
(15, 4, 10, 'secundario'),
(16, 4, 17, 'estabilizador'),
(17, 5, 1, 'principal'),
(18, 5, 10, 'secundario'),
(19, 5, 4, 'secundario'),
(20, 5, 17, 'estabilizador'),
(21, 6, 1, 'principal'),
(22, 6, 10, 'principal'),
(23, 6, 4, 'secundario'),
(24, 6, 8, 'estabilizador'),
(25, 7, 1, 'principal'),
(26, 7, 10, 'secundario'),
(27, 7, 4, 'secundario'),
(28, 7, 8, 'estabilizador'),
(29, 8, 1, 'principal'),
(30, 8, 4, 'secundario'),
(31, 8, 10, 'secundario'),
(32, 8, 8, 'estabilizador'),
(33, 9, 1, 'principal'),
(34, 9, 10, 'secundario'),
(35, 9, 4, 'secundario'),
(36, 9, 8, 'estabilizador'),
(37, 10, 1, 'principal'),
(38, 10, 4, 'secundario'),
(39, 10, 17, 'estabilizador'),
(40, 10, 9, 'estabilizador'),
(41, 11, 1, 'principal'),
(42, 11, 4, 'secundario'),
(43, 11, 17, 'estabilizador'),
(44, 11, 9, 'estabilizador'),
(45, 12, 1, 'principal'),
(46, 12, 4, 'secundario'),
(47, 12, 8, 'estabilizador'),
(48, 12, 17, 'estabilizador'),
(49, 13, 1, 'principal'),
(50, 13, 4, 'secundario'),
(51, 13, 10, 'secundario'),
(52, 13, 17, 'estabilizador'),
(53, 14, 2, 'principal'),
(54, 14, 3, 'secundario'),
(55, 14, 9, 'secundario'),
(56, 14, 8, 'estabilizador'),
(57, 15, 2, 'principal'),
(58, 15, 3, 'principal'),
(59, 15, 9, 'secundario'),
(60, 15, 12, 'estabilizador'),
(61, 16, 2, 'principal'),
(62, 16, 3, 'secundario'),
(63, 16, 9, 'secundario'),
(64, 16, 12, 'estabilizador'),
(65, 17, 2, 'principal'),
(66, 17, 3, 'secundario'),
(67, 17, 9, 'secundario'),
(68, 17, 8, 'estabilizador'),
(69, 18, 2, 'principal'),
(70, 18, 3, 'secundario'),
(71, 18, 9, 'secundario'),
(72, 18, 12, 'estabilizador'),
(73, 19, 2, 'principal'),
(74, 19, 3, 'secundario'),
(75, 19, 9, 'secundario'),
(76, 19, 8, 'estabilizador'),
(77, 20, 12, 'principal'),
(78, 20, 7, 'principal'),
(79, 20, 5, 'principal'),
(80, 20, 3, 'secundario'),
(81, 20, 15, 'estabilizador'),
(82, 21, 7, 'principal'),
(83, 21, 5, 'principal'),
(84, 21, 12, 'secundario'),
(85, 21, 3, 'estabilizador'),
(86, 22, 11, 'principal'),
(87, 22, 3, 'secundario'),
(88, 22, 15, 'estabilizador'),
(89, 22, 12, 'estabilizador'),
(90, 23, 4, 'principal'),
(91, 23, 10, 'secundario'),
(92, 23, 1, 'secundario'),
(93, 23, 8, 'estabilizador'),
(94, 24, 4, 'principal'),
(95, 24, 10, 'secundario'),
(96, 24, 1, 'secundario'),
(97, 24, 8, 'estabilizador'),
(98, 25, 4, 'principal'),
(99, 25, 11, 'secundario'),
(100, 25, 8, 'estabilizador'),
(101, 25, 17, 'estabilizador'),
(102, 26, 4, 'principal'),
(103, 26, 1, 'secundario'),
(104, 26, 8, 'estabilizador'),
(105, 26, 17, 'estabilizador'),
(106, 27, 4, 'principal'),
(107, 27, 3, 'secundario'),
(108, 27, 18, 'secundario'),
(109, 27, 8, 'estabilizador'),
(110, 28, 4, 'principal'),
(111, 28, 11, 'secundario'),
(112, 28, 3, 'secundario'),
(113, 28, 18, 'estabilizador'),
(114, 29, 6, 'principal'),
(115, 29, 5, 'principal'),
(116, 29, 7, 'secundario'),
(117, 29, 8, 'estabilizador'),
(118, 30, 6, 'principal'),
(119, 30, 5, 'secundario'),
(120, 30, 8, 'principal'),
(121, 30, 12, 'estabilizador'),
(122, 31, 6, 'principal'),
(123, 31, 5, 'principal'),
(124, 31, 7, 'secundario'),
(125, 31, 16, 'estabilizador'),
(126, 32, 6, 'principal'),
(127, 32, 5, 'principal'),
(128, 32, 7, 'secundario'),
(129, 32, 8, 'estabilizador'),
(130, 33, 6, 'principal'),
(131, 33, 8, 'estabilizador'),
(132, 33, 21, 'estabilizador'),
(133, 33, 5, 'estabilizador'),
(134, 34, 7, 'principal'),
(135, 34, 5, 'secundario'),
(136, 34, 16, 'estabilizador'),
(137, 34, 8, 'estabilizador'),
(138, 35, 7, 'principal'),
(139, 35, 5, 'secundario'),
(140, 35, 8, 'estabilizador'),
(141, 35, 16, 'estabilizador'),
(142, 36, 16, 'principal'),
(143, 36, 20, 'secundario'),
(144, 36, 8, 'estabilizador'),
(145, 36, 6, 'estabilizador'),
(146, 37, 16, 'principal'),
(147, 37, 20, 'principal'),
(148, 37, 21, 'estabilizador'),
(149, 37, 7, 'estabilizador'),
(150, 38, 6, 'principal'),
(151, 38, 5, 'principal'),
(152, 38, 7, 'secundario'),
(153, 38, 8, 'estabilizador'),
(154, 39, 13, 'principal'),
(155, 39, 5, 'principal'),
(156, 39, 7, 'secundario'),
(157, 39, 12, 'secundario'),
(158, 40, 5, 'principal'),
(159, 40, 7, 'secundario'),
(160, 40, 8, 'secundario'),
(161, 40, 12, 'estabilizador'),
(162, 41, 9, 'principal'),
(163, 41, 15, 'secundario'),
(164, 41, 4, 'estabilizador'),
(165, 41, 8, 'estabilizador'),
(166, 42, 9, 'principal'),
(167, 42, 15, 'secundario'),
(168, 42, 4, 'estabilizador'),
(169, 42, 8, 'estabilizador'),
(170, 43, 9, 'principal'),
(171, 43, 15, 'principal'),
(172, 43, 4, 'estabilizador'),
(173, 43, 8, 'estabilizador'),
(174, 44, 9, 'principal'),
(175, 44, 15, 'secundario'),
(176, 44, 4, 'estabilizador'),
(177, 44, 8, 'estabilizador'),
(178, 45, 10, 'principal'),
(179, 45, 4, 'secundario'),
(180, 45, 8, 'estabilizador'),
(181, 45, 1, 'estabilizador'),
(182, 46, 10, 'principal'),
(183, 46, 4, 'secundario'),
(184, 46, 8, 'estabilizador'),
(185, 46, 15, 'estabilizador'),
(186, 47, 10, 'principal'),
(187, 47, 4, 'secundario'),
(188, 47, 12, 'estabilizador'),
(189, 47, 8, 'estabilizador'),
(190, 48, 10, 'principal'),
(191, 48, 4, 'secundario'),
(192, 48, 1, 'secundario'),
(193, 48, 8, 'estabilizador'),
(194, 49, 9, 'principal'),
(195, 49, 15, 'secundario'),
(196, 49, 8, 'estabilizador'),
(197, 49, 4, 'estabilizador'),
(198, 50, 8, 'principal'),
(199, 50, 12, 'secundario'),
(200, 50, 4, 'estabilizador'),
(201, 50, 6, 'estabilizador'),
(202, 51, 14, 'principal'),
(203, 51, 8, 'secundario'),
(204, 51, 13, 'estabilizador'),
(205, 51, 4, 'estabilizador'),
(206, 52, 8, 'principal'),
(207, 52, 22, 'secundario'),
(208, 52, 14, 'estabilizador'),
(209, 52, 12, 'estabilizador'),
(210, 53, 8, 'principal'),
(211, 53, 22, 'principal'),
(212, 53, 6, 'secundario'),
(213, 53, 12, 'estabilizador'),
(214, 54, 14, 'principal'),
(215, 54, 8, 'secundario'),
(216, 54, 12, 'estabilizador'),
(217, 54, 22, 'estabilizador'),
(218, 55, 8, 'principal'),
(219, 55, 22, 'secundario'),
(220, 55, 6, 'secundario'),
(221, 55, 4, 'estabilizador'),
(222, 56, 8, 'principal'),
(223, 56, 12, 'secundario'),
(224, 56, 4, 'secundario'),
(225, 56, 2, 'estabilizador'),
(226, 57, 8, 'principal'),
(227, 57, 12, 'secundario'),
(228, 57, 14, 'secundario'),
(229, 57, 2, 'estabilizador'),
(230, 58, 14, 'principal'),
(231, 58, 8, 'secundario'),
(232, 58, 12, 'secundario'),
(233, 58, 15, 'estabilizador'),
(234, 59, 6, 'principal'),
(235, 59, 1, 'principal'),
(236, 59, 8, 'principal'),
(237, 59, 4, 'secundario'),
(238, 60, 6, 'principal'),
(239, 60, 4, 'principal'),
(240, 60, 5, 'secundario'),
(241, 60, 8, 'secundario'),
(242, 61, 4, 'principal'),
(243, 61, 3, 'principal'),
(244, 61, 6, 'secundario'),
(245, 61, 10, 'secundario'),
(246, 62, 5, 'principal'),
(247, 62, 7, 'secundario'),
(248, 62, 12, 'secundario'),
(249, 62, 8, 'estabilizador'),
(250, 63, 6, 'principal'),
(251, 63, 5, 'principal'),
(252, 63, 16, 'secundario'),
(253, 63, 8, 'estabilizador'),
(254, 64, 15, 'principal'),
(255, 64, 11, 'principal'),
(256, 64, 8, 'secundario'),
(257, 64, 12, 'estabilizador'),
(258, 65, 4, 'principal'),
(259, 65, 15, 'secundario'),
(260, 65, 8, 'secundario'),
(261, 65, 11, 'estabilizador');

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
-- Estructura de tabla para la tabla `group_muscles`
--

CREATE TABLE `group_muscles` (
  `id_group` int(11) NOT NULL,
  `name_group` varchar(500) NOT NULL,
  `description_group` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `group_muscles`
--

INSERT INTO `group_muscles` (`id_group`, `name_group`, `description_group`) VALUES
(1, 'Torso Anterior (Empuje)', 'Músculos del pecho, hombros y tríceps. Enfocado en ejercicios de empuje como press de banca y flexiones.'),
(2, 'Torso Posterior (Tirón)', 'Músculos de la espalda, trapecio y bíceps. Enfocado en ejercicios de tracción como dominadas y remo.'),
(3, 'Piernas (Inferior)', 'Músculos de cuádriceps, isquiotibiales, glúteos, gemelos y flexores de cadera. Enfocado en sentadillas, peso muerto y ejercicios de piernas.'),
(4, 'Core y Estabilidad', 'Músculos abdominales, oblicuos y erectores espinales. Enfocado en planchas, abdominales y estabilidad lumbar.'),
(5, 'Brazos y Antebrazos', 'Músculos del bíceps, tríceps, antebrazos y flexores/extensores de muñeca. Enfocado en curl de bíceps y ejercicios de agarre.'),
(6, 'Cuello y Estabilidad Cervical', 'Músculos del cuello como el esternocleidomastoideo y escalenos. Enfocado en movilidad y estabilidad cervical.');

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
  `id_group` int(11) NOT NULL,
  `name_muscle` varchar(500) NOT NULL,
  `description_muscle` text DEFAULT NULL,
  `state_muscle` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `muscles`
--

INSERT INTO `muscles` (`id_muscle`, `id_group`, `name_muscle`, `description_muscle`, `state_muscle`) VALUES
(1, 1, 'Pectorales', 'Músculos del pecho en el torso anterior', 1),
(2, 2, 'Dorsales', 'Músculos de la espalda ancha en el torso posterior', 1),
(3, 2, 'Trapecio y romboides', 'Músculos de la espalda media', 1),
(4, 1, 'Deltoides', 'Músculos de los hombros en el torso superior', 1),
(5, 3, 'Glúteos', 'Músculos de la zona de la cadera', 1),
(6, 3, 'Cuádriceps', 'Muslos anteriores', 1),
(7, 3, 'Isquiotibiales', 'Femorales en la zona de los muslos posteriores', 1),
(8, 4, 'Core', 'Abdominales y lumbares en la zona del tronco', 1),
(9, 5, 'Bíceps', 'Brazo anterior', 1),
(10, 5, 'Tríceps', 'Brazo posterior', 1),
(11, 2, 'Trapecio superior', 'Cuello y hombros', 1),
(12, 4, 'Erectores espinales', 'Espalda baja', 1),
(13, 3, 'Aductores y abductores', 'Interior y exterior de piernas', 1),
(14, 4, 'Oblicuos', 'Laterales del abdomen', 1),
(15, 5, 'Antebrazos', 'Brazos inferiores', 1),
(16, 3, 'Gemelos', 'Pantorrillas en la perna inferior', 1),
(17, 1, 'Serrato anterior', 'Músculo lateral del tórax, ayuda en la estabilidad del hombro', 1),
(18, 2, 'Redondo mayor y menor', 'Músculos posteriores del hombro, involucrados en la rotación del brazo', 1),
(19, 2, 'Infraspinoso', 'Músculo de la espalda que ayuda en la rotación externa del hombro', 1),
(20, 3, 'Sóleo', 'Músculo profundo de la pantorrilla, trabaja junto con los gemelos', 1),
(21, 3, 'Tibial anterior', 'Músculo frontal de la pierna, involucrado en la dorsiflexión del pie', 1),
(22, 3, 'Flexores de la cadera', 'Músculos como el psoas e ilíaco, ubicados en la parte frontal de la cadera', 1),
(23, 5, 'Extensores de la muñeca', 'Músculos del antebrazo que permiten la extensión de la muñeca', 1),
(24, 5, 'Flexores de la muñeca', 'Músculos del antebrazo que permiten la flexión de la muñeca', 1),
(25, 5, 'Supinador y pronador', 'Músculos del antebrazo que permiten la rotación del antebrazo', 1),
(26, 6, 'Esternocleidomastoideo', 'Músculo del cuello que permite la flexión y rotación de la cabeza', 1),
(27, 6, 'Escalenos', 'Músculos laterales del cuello, involucrados en la respiración y estabilidad cervical', 1),
(28, 2, 'Subescapular', 'Músculo anterior del hombro, involucrado en la rotación interna del brazo', 1);

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `routine_detail`
--

CREATE TABLE `routine_detail` (
  `id_detail` bigint(20) NOT NULL,
  `id_routine` bigint(20) NOT NULL,
  `id_exercise` int(11) NOT NULL,
  `day_detail` int(11) NOT NULL,
  `weight_detail` double NOT NULL,
  `repetition_detail` int(11) NOT NULL,
  `round_detail` int(11) NOT NULL,
  `rest_detail` int(11) NOT NULL
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
(1, 1, 1, 'alci', 'alci@fenixgym.com', '$2a$10$hKR.656fStLzhfGWD3eQSuI2Jzvpvg2mt/cD6wsaRXS/hYOQ/VaB.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzY2OTU3MTEwLCJleHAiOjE3Njc1NjE5MTB9.r9VQhHfcmzN95OWycPe8hFWmnMjMN5PvZnbn4_QrwAQ', 'JPG', '2025-12-31', '2025-12-28 16:25:10', 1, '2025-12-28 16:25:10', '2025-08-23 18:16:43'),
(2, 2, 2, 'ronal', 'ronal@fenixgym.com', '$2a$10$VdPdO0e8A2IYyR9b4S64q.O7zjgHpX.K.TQlTqushkLR/TMh5twY6', NULL, 'JPEG', '2025-11-30', '2025-12-28 12:45:40', 1, '2025-12-28 16:24:54', '2025-08-23 18:16:43'),
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
-- Indices de la tabla `exercise_muscles`
--
ALTER TABLE `exercise_muscles`
  ADD PRIMARY KEY (`id_detail`);

--
-- Indices de la tabla `goals`
--
ALTER TABLE `goals`
  ADD PRIMARY KEY (`id_goal`);

--
-- Indices de la tabla `group_muscles`
--
ALTER TABLE `group_muscles`
  ADD PRIMARY KEY (`id_group`);

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
  MODIFY `id_exercise` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `exercise_muscles`
--
ALTER TABLE `exercise_muscles`
  MODIFY `id_detail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=262;

--
-- AUTO_INCREMENT de la tabla `goals`
--
ALTER TABLE `goals`
  MODIFY `id_goal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `group_muscles`
--
ALTER TABLE `group_muscles`
  MODIFY `id_group` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  MODIFY `id_muscle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id_promotion` bigint(20) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id_user` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
