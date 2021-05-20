-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Creato il: Mag 20, 2021 alle 19:19
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

-- --------------------------------------------------------

--
-- Struttura della tabella `Appalto`
--

CREATE TABLE `Appalto` (
  `IdAppalto` int NOT NULL,
  `DataApertura` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Parametro` varchar(32) NOT NULL,
  `Infrastruttura` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `Appalto`
--

INSERT INTO `Appalto` (`IdAppalto`, `DataApertura`, `Parametro`, `Infrastruttura`) VALUES
(9, '2021-05-20 19:15:42', 'Struttura', 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `AppaltoAperto`
--

CREATE TABLE `AppaltoAperto` (
  `Appalto` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `AppaltoConcluso`
--

CREATE TABLE `AppaltoConcluso` (
  `Appalto` int NOT NULL,
  `DataEsecuzioneIntervento` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `SocietaManutenzione` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `AppaltoConcluso`
--

INSERT INTO `AppaltoConcluso` (`Appalto`, `DataEsecuzioneIntervento`, `SocietaManutenzione`) VALUES
(9, '2021-05-20 19:15:50', 'socman2@atmi.it');

-- --------------------------------------------------------

--
-- Struttura della tabella `Autostrada`
--

CREATE TABLE `Autostrada` (
  `Codice` varchar(4) NOT NULL,
  `Lunghezza` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `Autostrada`
--

INSERT INTO `Autostrada` (`Codice`, `Lunghezza`) VALUES
('A1', 760);

-- --------------------------------------------------------

--
-- Struttura della tabella `Disponibilita`
--

CREATE TABLE `Disponibilita` (
  `Parametro` varchar(32) NOT NULL,
  `SocietaManutenzione` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `Disponibilita`
--

INSERT INTO `Disponibilita` (`Parametro`, `SocietaManutenzione`) VALUES
('Asfalto', 'socman1@atmi.it'),
('Elettricita', 'socman2@atmi.it'),
('Struttura', 'socman2@atmi.it');

-- --------------------------------------------------------

--
-- Struttura della tabella `Infrastruttura`
--

CREATE TABLE `Infrastruttura` (
  `CodiceInfr` int NOT NULL,
  `Nome` varchar(32) NOT NULL,
  `IndiceBonta` float NOT NULL,
  `Latitudine` double NOT NULL,
  `Longitudine` double NOT NULL,
  `Tipo` varchar(32) NOT NULL,
  `Autostrada` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `Infrastruttura`
--

INSERT INTO `Infrastruttura` (`CodiceInfr`, `Nome`, `IndiceBonta`, `Latitudine`, `Longitudine`, `Tipo`, `Autostrada`) VALUES
(1, 'Viadotto Rio Vallardino', 100, 44.22196296362407, 11.19549703355009, 'Viadotto', 'A1'),
(2, 'Viadotto Vergine Maria', 100, 43.87696683873917, 11.176557949617573, 'Viadotto', 'A1'),
(3, 'Ponte sull\'Arno', 100, 43.78693771362305, 11.158876636522924, 'Ponte', 'A1'),
(4, 'Ponte sull\'Ema', 100, 43.73705402481312, 11.293237788354004, 'Ponte', 'A1');

-- --------------------------------------------------------

--
-- Struttura della tabella `Parametro`
--

CREATE TABLE `Parametro` (
  `Parametro` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `Parametro`
--

INSERT INTO `Parametro` (`Parametro`) VALUES
('Asfalto'),
('Elettricita'),
('Struttura');

-- --------------------------------------------------------

--
-- Struttura della tabella `Sensore`
--

CREATE TABLE `Sensore` (
  `IdSensore` int NOT NULL,
  `Parametro` varchar(32) NOT NULL,
  `Infrastruttura` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `Sensore`
--

INSERT INTO `Sensore` (`IdSensore`, `Parametro`, `Infrastruttura`) VALUES
(1, 'Asfalto', 1),
(2, 'Elettricita', 1),
(3, 'Struttura', 1),
(4, 'Asfalto', 2),
(5, 'Elettricita', 2),
(6, 'Struttura', 2),
(7, 'Asfalto', 3),
(8, 'Elettricita', 3),
(9, 'Struttura', 3),
(10, 'Asfalto', 4),
(11, 'Elettricita', 4),
(12, 'Struttura', 4);

-- --------------------------------------------------------

--
-- Struttura della tabella `SocietaManutenzione`
--

CREATE TABLE `SocietaManutenzione` (
  `Utente` varchar(64) NOT NULL,
  `DataRegistrazione` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `SocietaManutenzione`
--

INSERT INTO `SocietaManutenzione` (`Utente`, `DataRegistrazione`) VALUES
('socman1@atmi.it', '2021-05-16 11:57:58'),
('socman2@atmi.it', '2021-05-16 16:13:35');

-- --------------------------------------------------------

--
-- Struttura della tabella `StoricoRilevazioni`
--

CREATE TABLE `StoricoRilevazioni` (
  `Sensore` int NOT NULL,
  `DataRilevazione` date NOT NULL,
  `Valore` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `StoricoRilevazioni`
--

INSERT INTO `StoricoRilevazioni` (`Sensore`, `DataRilevazione`, `Valore`) VALUES
(1, '2021-05-18', 100),
(1, '2021-05-20', 100),
(2, '2021-05-18', 100),
(2, '2021-05-20', 100),
(3, '2021-05-18', 100),
(3, '2021-05-20', 100),
(4, '2021-05-18', 100),
(4, '2021-05-20', 100),
(5, '2021-05-18', 100),
(5, '2021-05-20', 100),
(6, '2021-05-18', 100),
(6, '2021-05-20', 100),
(7, '2021-05-18', 100),
(7, '2021-05-20', 100),
(8, '2021-05-18', 100),
(8, '2021-05-20', 100),
(9, '2021-05-18', 100),
(9, '2021-05-20', 100),
(10, '2021-05-18', 100),
(10, '2021-05-20', 100),
(11, '2021-05-18', 100),
(11, '2021-05-20', 100),
(12, '2021-05-18', 100),
(12, '2021-05-20', 100);

-- --------------------------------------------------------

--
-- Struttura della tabella `Utente`
--

CREATE TABLE `Utente` (
  `Email` varchar(64) NOT NULL,
  `Password` varchar(60) NOT NULL,
  `Categoria` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `Utente`
--

INSERT INTO `Utente` (`Email`, `Password`, `Categoria`) VALUES
('autostrada@atmi.it', '$2y$10$3oIdzEzzgGbvpVBr2xR/JO7OewW9RcWixoe8d42fJDJ8tvWWvEmjS', 'Societa Autostrada'),
('ministero@atmi.it', '$2y$10$FPDdVuun66F.C3EyNDpY3eulvRH5QBiIdgL1RdMtQ5hLMxwfDeIe6', 'Ministero'),
('socman1@atmi.it', '$2y$10$wYQyVqE4soQJMFbVrR4PvOXM.aHO.OBVZ3HDRGthmIhGSkQ0ojlfK', 'Societa Manutenzione'),
('socman2@atmi.it', '$2y$10$D/l7mU5QBI8PVSSFZVY6XueZWnBQk3Ox6QSDiMMoGKLUXfW4e4bz.', 'Societa Manutenzione');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `Appalto`
--
ALTER TABLE `Appalto`
  ADD PRIMARY KEY (`IdAppalto`),
  ADD KEY `FK_Parametro_Appalto` (`Parametro`),
  ADD KEY `FK_Infrastruttura_Appalto` (`Infrastruttura`);

--
-- Indici per le tabelle `AppaltoAperto`
--
ALTER TABLE `AppaltoAperto`
  ADD PRIMARY KEY (`Appalto`);

--
-- Indici per le tabelle `AppaltoConcluso`
--
ALTER TABLE `AppaltoConcluso`
  ADD PRIMARY KEY (`Appalto`),
  ADD KEY `FK_SocMan_AppaltoConcl` (`SocietaManutenzione`);

--
-- Indici per le tabelle `Autostrada`
--
ALTER TABLE `Autostrada`
  ADD PRIMARY KEY (`Codice`);

--
-- Indici per le tabelle `Disponibilita`
--
ALTER TABLE `Disponibilita`
  ADD PRIMARY KEY (`Parametro`,`SocietaManutenzione`),
  ADD KEY `FK_SocMan_Disp` (`SocietaManutenzione`);

--
-- Indici per le tabelle `Infrastruttura`
--
ALTER TABLE `Infrastruttura`
  ADD PRIMARY KEY (`CodiceInfr`),
  ADD KEY `FK_Autostrada` (`Autostrada`);

--
-- Indici per le tabelle `Parametro`
--
ALTER TABLE `Parametro`
  ADD PRIMARY KEY (`Parametro`);

--
-- Indici per le tabelle `Sensore`
--
ALTER TABLE `Sensore`
  ADD PRIMARY KEY (`IdSensore`),
  ADD KEY `FK_Parametro` (`Parametro`),
  ADD KEY `FK_Infrastruttura_Sensore` (`Infrastruttura`);

--
-- Indici per le tabelle `SocietaManutenzione`
--
ALTER TABLE `SocietaManutenzione`
  ADD PRIMARY KEY (`Utente`);

--
-- Indici per le tabelle `StoricoRilevazioni`
--
ALTER TABLE `StoricoRilevazioni`
  ADD PRIMARY KEY (`Sensore`,`DataRilevazione`);

--
-- Indici per le tabelle `Utente`
--
ALTER TABLE `Utente`
  ADD PRIMARY KEY (`Email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `Appalto`
--
ALTER TABLE `Appalto`
  MODIFY `IdAppalto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT per la tabella `Infrastruttura`
--
ALTER TABLE `Infrastruttura`
  MODIFY `CodiceInfr` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `Sensore`
--
ALTER TABLE `Sensore`
  MODIFY `IdSensore` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `Appalto`
--
ALTER TABLE `Appalto`
  ADD CONSTRAINT `FK_Infrastruttura_Appalto` FOREIGN KEY (`Infrastruttura`) REFERENCES `Infrastruttura` (`CodiceInfr`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Parametro_Appalto` FOREIGN KEY (`Parametro`) REFERENCES `Parametro` (`Parametro`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `AppaltoAperto`
--
ALTER TABLE `AppaltoAperto`
  ADD CONSTRAINT `FK_Appalto_Aperto` FOREIGN KEY (`Appalto`) REFERENCES `Appalto` (`IdAppalto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `AppaltoConcluso`
--
ALTER TABLE `AppaltoConcluso`
  ADD CONSTRAINT `FK_Appalto` FOREIGN KEY (`Appalto`) REFERENCES `Appalto` (`IdAppalto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_SocMan_AppaltoConcl` FOREIGN KEY (`SocietaManutenzione`) REFERENCES `SocietaManutenzione` (`Utente`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Limiti per la tabella `Disponibilita`
--
ALTER TABLE `Disponibilita`
  ADD CONSTRAINT `FK_Parametro_Disp` FOREIGN KEY (`Parametro`) REFERENCES `Parametro` (`Parametro`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_SocMan_Disp` FOREIGN KEY (`SocietaManutenzione`) REFERENCES `SocietaManutenzione` (`Utente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `Infrastruttura`
--
ALTER TABLE `Infrastruttura`
  ADD CONSTRAINT `FK_Autostrada` FOREIGN KEY (`Autostrada`) REFERENCES `Autostrada` (`Codice`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `Sensore`
--
ALTER TABLE `Sensore`
  ADD CONSTRAINT `FK_Infrastruttura_Sensore` FOREIGN KEY (`Infrastruttura`) REFERENCES `Infrastruttura` (`CodiceInfr`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Parametro` FOREIGN KEY (`Parametro`) REFERENCES `Parametro` (`Parametro`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `SocietaManutenzione`
--
ALTER TABLE `SocietaManutenzione`
  ADD CONSTRAINT `FK_Utente_SocMan` FOREIGN KEY (`Utente`) REFERENCES `Utente` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `StoricoRilevazioni`
--
ALTER TABLE `StoricoRilevazioni`
  ADD CONSTRAINT `FK_Sensore` FOREIGN KEY (`Sensore`) REFERENCES `Sensore` (`IdSensore`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
