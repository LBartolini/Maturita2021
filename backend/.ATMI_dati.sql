-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Creato il: Mag 18, 2021 alle 16:38
-- Versione del server: 8.0.25-0ubuntu0.20.04.1
-- Versione PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ATMI`
--

--
-- Dump dei dati per la tabella `Autostrada`
--

INSERT INTO `Autostrada` (`Codice`, `Lunghezza`) VALUES
('A1', 760);

--
-- Dump dei dati per la tabella `Disponibilita`
--

INSERT INTO `Disponibilita` (`Parametro`, `SocietaManutenzione`) VALUES
('Asfalto', 'socman1@atmi.it'),
('Elettricita', 'socman2@atmi.it'),
('Struttura', 'socman2@atmi.it');

--
-- Dump dei dati per la tabella `Infrastruttura`
--

INSERT INTO `Infrastruttura` (`CodiceInfr`, `Nome`, `IndiceBonta`, `Latitudine`, `Longitudine`, `Tipo`, `Autostrada`) VALUES
(1, 'Viadotto Rio Vallardino', 100, 44.22196296362407, 11.19549703355009, 'Viadotto', 'A1'),
(2, 'Viadotto Vergine Maria', 100, 43.87696683873917, 11.176557949617573, 'Viadotto', 'A1'),
(3, 'Ponte sull\'Arno', 100, 43.78693771362305, 11.158876636522924, 'Ponte', 'A1'),
(4, 'Ponte sull\'Ema', 100, 43.73705402481312, 11.293237788354004, 'Ponte', 'A1');

--
-- Dump dei dati per la tabella `Parametro`
--

INSERT INTO `Parametro` (`Parametro`) VALUES
('Asfalto'),
('Elettricita'),
('Struttura');

--
-- Dump dei dati per la tabella `Sensore`
--

INSERT INTO `Sensore` (`IdSensore`, `Parametro`) VALUES
(1, 'Asfalto'),
(4, 'Asfalto'),
(7, 'Asfalto'),
(10, 'Asfalto'),
(2, 'Elettricita'),
(5, 'Elettricita'),
(8, 'Elettricita'),
(11, 'Elettricita'),
(3, 'Struttura'),
(6, 'Struttura'),
(9, 'Struttura'),
(12, 'Struttura');

--
-- Dump dei dati per la tabella `SocietaManutenzione`
--

INSERT INTO `SocietaManutenzione` (`Utente`, `DataRegistrazione`) VALUES
('socman1@atmi.it', '2021-05-16 11:57:58'),
('socman2@atmi.it', '2021-05-16 16:13:35');

--
-- Dump dei dati per la tabella `StoricoRilevazioni`
--

INSERT INTO `StoricoRilevazioni` (`Sensore`, `CodiceInfr`, `DataRilevazione`, `Valore`) VALUES
(1, 1, '2021-05-18 15:46:53', 100),
(2, 1, '2021-05-18 15:46:59', 100),
(3, 1, '2021-05-18 15:47:06', 100),
(4, 2, '2021-05-18 15:48:45', 100),
(5, 2, '2021-05-18 15:48:52', 100),
(6, 2, '2021-05-18 15:49:01', 100),
(7, 3, '2021-05-18 15:49:38', 100),
(8, 3, '2021-05-18 15:49:53', 100),
(9, 3, '2021-05-18 15:49:53', 100),
(10, 4, '2021-05-18 15:50:57', 100),
(11, 4, '2021-05-18 15:50:57', 100),
(12, 4, '2021-05-18 15:50:57', 100);

--
-- Dump dei dati per la tabella `Utente`
--

INSERT INTO `Utente` (`Email`, `Password`, `Categoria`) VALUES
('autostrada@atmi.it', '$2y$10$3oIdzEzzgGbvpVBr2xR/JO7OewW9RcWixoe8d42fJDJ8tvWWvEmjS', 'Societa Autostrada'),
('ministero@atmi.it', '$2y$10$FPDdVuun66F.C3EyNDpY3eulvRH5QBiIdgL1RdMtQ5hLMxwfDeIe6', 'Ministero'),
('socman1@atmi.it', '$2y$10$wYQyVqE4soQJMFbVrR4PvOXM.aHO.OBVZ3HDRGthmIhGSkQ0ojlfK', 'Societa Manutenzione'),
('socman2@atmi.it', '$2y$10$D/l7mU5QBI8PVSSFZVY6XueZWnBQk3Ox6QSDiMMoGKLUXfW4e4bz.', 'Societa Manutenzione');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
