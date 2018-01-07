-- MySQL dump 10.13  Distrib 5.7.12, for Win32 (AMD64)
--
-- Host: 127.0.0.1    Database: vwn
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tag`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `region` VALUES 
        (1, "Drenthe", DEFAULT, DEFAULT),
        (2, "Flevoland", DEFAULT, DEFAULT),
        (3, "Friesland", DEFAULT, DEFAULT),
        (4, "Gelderland", DEFAULT, DEFAULT),
        (5, "Groningen", DEFAULT, DEFAULT),
        (6, "Limburg", DEFAULT, DEFAULT),
        (7, "Noord-Brabant", DEFAULT, DEFAULT),
        (8, "Noord-Holland", DEFAULT, DEFAULT),
        (9, "Overijssel", DEFAULT, DEFAULT),
        (10, "Utrecht", DEFAULT, DEFAULT),
        (11, "Zeeland", DEFAULT, DEFAULT),
        (12, "Zuid-Holland", DEFAULT, DEFAULT);
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
