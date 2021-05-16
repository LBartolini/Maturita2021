-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Creato il: Mag 16, 2021 alle 16:14
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
  `SocietaManutenzione` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `Autostrada`
--

CREATE TABLE `Autostrada` (
  `Codice` varchar(4) NOT NULL,
  `Lunghezza` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `Disponibilita`
--

CREATE TABLE `Disponibilita` (
  `Parametro` varchar(32) NOT NULL,
  `SocietaManutenzione` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

-- --------------------------------------------------------

--
-- Struttura della tabella `Parametro`
--

CREATE TABLE `Parametro` (
  `Parametro` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `Sensore`
--

CREATE TABLE `Sensore` (
  `IdSensore` int NOT NULL,
  `Parametro` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `SocietaManutenzione`
--

CREATE TABLE `SocietaManutenzione` (
  `Utente` varchar(64) NOT NULL,
  `DataRegistrazione` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `StoricoRilevazioni`
--

CREATE TABLE `StoricoRilevazioni` (
  `Sensore` int NOT NULL,
  `CodiceInfr` int NOT NULL,
  `DataRilevazione` datetime NOT NULL,
  `Valore` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  ADD PRIMARY KEY (`Appalto`);

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
  ADD KEY `FK_Parametro` (`Parametro`);

--
-- Indici per le tabelle `SocietaManutenzione`
--
ALTER TABLE `SocietaManutenzione`
  ADD PRIMARY KEY (`Utente`);

--
-- Indici per le tabelle `StoricoRilevazioni`
--
ALTER TABLE `StoricoRilevazioni`
  ADD PRIMARY KEY (`Sensore`,`CodiceInfr`),
  ADD KEY `FK_Infrastruttura` (`CodiceInfr`);

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
  MODIFY `IdAppalto` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `Infrastruttura`
--
ALTER TABLE `Infrastruttura`
  MODIFY `CodiceInfr` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `Sensore`
--
ALTER TABLE `Sensore`
  MODIFY `IdSensore` int NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `FK_Appalto` FOREIGN KEY (`Appalto`) REFERENCES `Appalto` (`IdAppalto`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `FK_Infrastruttura` FOREIGN KEY (`CodiceInfr`) REFERENCES `Infrastruttura` (`CodiceInfr`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Sensore` FOREIGN KEY (`Sensore`) REFERENCES `Sensore` (`IdSensore`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
