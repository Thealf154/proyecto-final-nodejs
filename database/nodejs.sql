-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 03, 2020 at 04:12 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `Empleados`
--

CREATE TABLE `Empleados` (
  `id_empleado` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellidos` varchar(30) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `direccion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Empleados`
--

INSERT INTO `Empleados` (`id_empleado`, `nombre`, `apellidos`, `telefono`, `correo`, `direccion`) VALUES
(1, 'Diana Laura', 'Zamora', '12234', 'zamora@gmail.com', 'Avenida Siempre Muertaaaaa'),
(2, 'Alfredo', 'Vanegas', '122834', 'alfredo@gmail.com', 'Avenida Siempre Viva'),
(5, 'prueba2', 'prueba', '122834235', 'prueba@gmail.com', 'prueba3'),
(6, 'prueba', 'prueba', '122834235', 'prueba@gmail.com', 'prueba'),
(15, 'Diana Laura', 'Zamora', '12234', 'zamora@gmail.com', 'Avenida Siempre Muerta'),
(17, 'pagina', 'web', '123213', 'funciono', 'chidooo');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) DEFAULT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `user_email`, `user_password`) VALUES
(NULL, 'thealf154@gmail.com', 'hey');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Empleados`
--
ALTER TABLE `Empleados`
  ADD PRIMARY KEY (`id_empleado`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Empleados`
--
ALTER TABLE `Empleados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
