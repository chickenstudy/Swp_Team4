CREATE DATABASE  IF NOT EXISTS `cinema_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cinema_system`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: cinema_system
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account_tbl`
--

DROP TABLE IF EXISTS `account_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_tbl` (
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `sex` tinyint NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `picture` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phonenumber` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `rolesID` int NOT NULL,
  `dob` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `id_idx` (`rolesID`),
  CONSTRAINT `id` FOREIGN KEY (`rolesID`) REFERENCES `role` (`roleid`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_tbl`
--

LOCK TABLES `account_tbl` WRITE;
/*!40000 ALTER TABLE `account_tbl` DISABLE KEYS */;
INSERT INTO `account_tbl` VALUES ('admin@gmail.com','$2a$10$LxaL1ekaJTdEN2KGA.Xmw.BgbsYNr2NsHFFm3UYlvbFeTMtMV.12m',0,'Ha Noi','admin','Nothing','0327973407',1,1,'2002-01-01 00:00:00.000000'),('adminPro@gmail.com','$2a$10$tdgtRuX/cDciUtGs7jAg3OPOVDiN35pQkx4keRWVU947we.Q0OJNm',1,'DHFPT','adminProjec','Nothing','0999999999',3,1,'2001-04-07 00:00:00.000000'),('staff1@gmail.com','$2a$10$Vsu138FdpToB9oZ/SmHtRe9dBj3OaYoBO91RapiEEe6xtLTfCHXRu',1,'Hoa Lac','staff1','Nothing','0111111111',4,2,'2000-12-12 00:00:00.000000'),('staff2@gmail.com','$2a$10$JhsGfYBPThdWZu3ggwgbG.Kqs2rPIe6g/gJ.myJ9xy1qkJpD9dYm2',0,'Ha Noi','staff2','Nothing','0222222222',5,2,'2001-12-12 00:00:00.000000'),('userLikeMovie@gmail.com','$2a$10$UamwaN54aPAhibSyK0e8Oee2osvTEs.IohuLcL2ZcfFwK6bpCi0lO',0,'Ha Noi','userLikeMovie','Nothing','0333333333',6,3,'2002-03-30 00:00:00.000000'),('userRick@gmail.com','$2a$10$.IRlhZXabfJPYaWpEFKUv.ZYUrWrvpJSbYQkwqrzauNLmoqRX4Kfm',1,'Quang Ninh','userRick','Nothing','0444444444',7,3,'2001-04-15 00:00:00.000000'),('user3ne@gmail.com','user3@1234',0,'Bac Linh','user3ne','User3.jpg','0555555444',8,3,'2002-12-26 07:00:00.000000'),('user1@gmail.com','$2a$10$AepcO4bB3XfitEPwk7BfdOHRgpyFBQ9rpJETcslROoa1rFvSAJ892',1,'Quang Ninh','user1','Nothing','0555555554',9,3,'2000-10-10 00:00:00.000000'),('user2hi@gmail.com','user3@1234',0,'Bac Linh','user2hi','User3.jpg','0555555444',10,3,'2002-12-26 07:00:00.000000'),('user3@gmail.com','$2a$10$87iicjc/nn/g/aM0f/ADEOC.sEq9x7YAkDDOLDl5e9cQzLloZaAuy',1,'Bac Ninh','user3','User3.jpg','0555555544',11,3,'2002-12-27 07:00:00.000000'),('user4@gmail.com','$2a$10$wvPMD4e.txmIgUVUGBciduTpbcGbQKtHbqYIvyj855MIjIoyGhx8K',1,'Hung Yen','user4','User4.jpg','0555555444',12,3,'2002-12-26 07:00:00.000000');
/*!40000 ALTER TABLE `account_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banner`
--

DROP TABLE IF EXISTS `banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banner` (
  `BannerID` int NOT NULL AUTO_INCREMENT,
  `Picture` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `StartDate` datetime NOT NULL,
  `EndDate` datetime NOT NULL,
  `CinemaID` int NOT NULL,
  PRIMARY KEY (`BannerID`),
  KEY `CinemaID` (`CinemaID`),
  CONSTRAINT `banner_ibfk_1` FOREIGN KEY (`CinemaID`) REFERENCES `cinema` (`CinemaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banner`
--

LOCK TABLES `banner` WRITE;
/*!40000 ALTER TABLE `banner` DISABLE KEYS */;
/*!40000 ALTER TABLE `banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cinema`
--

DROP TABLE IF EXISTS `cinema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cinema` (
  `CinemaID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Location` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`CinemaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cinema`
--

LOCK TABLES `cinema` WRITE;
/*!40000 ALTER TABLE `cinema` DISABLE KEYS */;
/*!40000 ALTER TABLE `cinema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `FeedbackID` int NOT NULL AUTO_INCREMENT,
  `CreatedDate` datetime NOT NULL,
  `Content` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Rate` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `OrderID` int NOT NULL,
  PRIMARY KEY (`FeedbackID`),
  KEY `OrderID` (`OrderID`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orderdata` (`OrderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `movieid` int NOT NULL AUTO_INCREMENT,
  `author` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `poster` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `show_date` date NOT NULL,
  `banner` varchar(255) DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `times` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`movieid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (1,NULL,'Batman','t','Combat','Action','2022-06-02','t','Updating','America','100 minutes');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdata`
--

DROP TABLE IF EXISTS `orderdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdata` (
  `OrderID` int NOT NULL AUTO_INCREMENT,
  `PurchasedDate` datetime NOT NULL,
  `Total` float NOT NULL,
  `UserID` int NOT NULL,
  `CinemaID` int NOT NULL,
  PRIMARY KEY (`OrderID`),
  KEY `UserID` (`UserID`),
  KEY `CinemaID` (`CinemaID`),
  CONSTRAINT `orderdata_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `account_tbl` (`id`),
  CONSTRAINT `orderdata_ibfk_2` FOREIGN KEY (`CinemaID`) REFERENCES `cinema` (`CinemaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdata`
--

LOCK TABLES `orderdata` WRITE;
/*!40000 ALTER TABLE `orderdata` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderdata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `roleid` int NOT NULL AUTO_INCREMENT,
  `rolename` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`roleid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_STAFF'),(3,'ROLE_USER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `RoomID` int NOT NULL AUTO_INCREMENT,
  `CinemaID` int NOT NULL,
  PRIMARY KEY (`RoomID`),
  KEY `CinemaID` (`CinemaID`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`CinemaID`) REFERENCES `cinema` (`CinemaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rowdata`
--

DROP TABLE IF EXISTS `rowdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rowdata` (
  `RowID` int NOT NULL AUTO_INCREMENT,
  `Position` int NOT NULL,
  `RoomID` int NOT NULL,
  PRIMARY KEY (`RowID`),
  KEY `rowdata_ibfk_1` (`RoomID`),
  CONSTRAINT `rowdata_ibfk_1` FOREIGN KEY (`RoomID`) REFERENCES `room` (`RoomID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rowdata`
--

LOCK TABLES `rowdata` WRITE;
/*!40000 ALTER TABLE `rowdata` DISABLE KEYS */;
/*!40000 ALTER TABLE `rowdata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seatdata`
--

DROP TABLE IF EXISTS `seatdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seatdata` (
  `SeatID` int NOT NULL AUTO_INCREMENT,
  `Price` float NOT NULL,
  `SeatIndex` int NOT NULL,
  `SeatType` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `RowID` int NOT NULL,
  PRIMARY KEY (`SeatID`),
  KEY `seatdata_ibfk_1` (`RowID`),
  CONSTRAINT `seatdata_ibfk_1` FOREIGN KEY (`RowID`) REFERENCES `rowdata` (`RowID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seatdata`
--

LOCK TABLES `seatdata` WRITE;
/*!40000 ALTER TABLE `seatdata` DISABLE KEYS */;
/*!40000 ALTER TABLE `seatdata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `showtime`
--

DROP TABLE IF EXISTS `showtime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `showtime` (
  `ShowtimeID` int NOT NULL AUTO_INCREMENT,
  `StartTime` datetime NOT NULL,
  `EndTime` datetime NOT NULL,
  PRIMARY KEY (`ShowtimeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `showtime`
--

LOCK TABLES `showtime` WRITE;
/*!40000 ALTER TABLE `showtime` DISABLE KEYS */;
/*!40000 ALTER TABLE `showtime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `TicketID` int NOT NULL AUTO_INCREMENT,
  `CreatedDate` datetime NOT NULL,
  `Price` float NOT NULL,
  `MovieID` int NOT NULL,
  `OrderID` int NOT NULL,
  `ShowtimeID` int NOT NULL,
  PRIMARY KEY (`TicketID`),
  KEY `MovieID` (`MovieID`),
  KEY `OrderID` (`OrderID`),
  KEY `ShowtimeID` (`ShowtimeID`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`MovieID`) REFERENCES `movie` (`movieid`),
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`OrderID`) REFERENCES `orderdata` (`OrderID`),
  CONSTRAINT `ticket_ibfk_3` FOREIGN KEY (`ShowtimeID`) REFERENCES `showtime` (`ShowtimeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'cinema_system'
--

--
-- Dumping routines for database 'cinema_system'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-23  4:00:41
