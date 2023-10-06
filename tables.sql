-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb3 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`userauth`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`userauth` (
  `idUserAuth` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idUserAuth`),
  UNIQUE INDEX `idUserAuth_UNIQUE` (`idUserAuth` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 72
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NULL DEFAULT NULL,
  `lastName` VARCHAR(45) NULL DEFAULT NULL,
  `emailID` VARCHAR(45) NULL DEFAULT NULL,
  `gender` CHAR(1) NULL DEFAULT NULL,
  `phone` BIGINT NULL DEFAULT NULL,
  `CreateTime` TIMESTAMP NULL DEFAULT NULL,
  `userAuthId` INT NULL DEFAULT NULL,
  `userImg` VARCHAR(255) NULL DEFAULT NULL,
  `subscribers` INT NULL DEFAULT '0',
  `subscribed` INT NULL DEFAULT '0',
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `idUser_UNIQUE` (`idUser` ASC) VISIBLE,
  INDEX `userAuthId_idx` (`userAuthId` ASC) VISIBLE,
  CONSTRAINT `user_ibfk_1`
    FOREIGN KEY (`userAuthId`)
    REFERENCES `mydb`.`userauth` (`idUserAuth`)
    ON DELETE CASCADE,
  CONSTRAINT `userAuthId`
    FOREIGN KEY (`userAuthId`)
    REFERENCES `mydb`.`userauth` (`idUserAuth`))
ENGINE = InnoDB
AUTO_INCREMENT = 151
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`video`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`video` (
  `idVideo` INT NOT NULL AUTO_INCREMENT,
  `videoTitle` VARCHAR(45) NULL DEFAULT NULL,
  `videoDesc` LONGTEXT NULL DEFAULT NULL,
  `videoUrl` VARCHAR(255) NULL DEFAULT NULL,
  `videoFileType` VARCHAR(45) NULL DEFAULT NULL,
  `CreateTime` TIMESTAMP NULL DEFAULT NULL,
  `postedByUser` INT NULL DEFAULT NULL,
  `vidImg` VARCHAR(255) NULL DEFAULT NULL,
  `tag` VARCHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`idVideo`),
  UNIQUE INDEX `idVideo_UNIQUE` (`idVideo` ASC) VISIBLE,
  INDEX `postedByUser_idx` (`postedByUser` ASC) VISIBLE,
  CONSTRAINT `postedByUser`
    FOREIGN KEY (`postedByUser`)
    REFERENCES `mydb`.`user` (`idUser`)
    ON DELETE CASCADE,
  CONSTRAINT `video_ibfk_1`
    FOREIGN KEY (`postedByUser`)
    REFERENCES `mydb`.`user` (`idUser`)
    ON DELETE CASCADE,
  CONSTRAINT `video_ibfk_2`
    FOREIGN KEY (`postedByUser`)
    REFERENCES `mydb`.`user` (`idUser`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 296
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`comment` (
  `idComment` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NULL DEFAULT NULL,
  `userId` INT NULL DEFAULT NULL,
  `videoId` INT NULL DEFAULT NULL,
  `isReply` TINYINT NULL DEFAULT NULL,
  `parentComment` INT NULL DEFAULT NULL,
  `createTime` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`idComment`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  INDEX `videoId` (`videoId` ASC) VISIBLE,
  INDEX `parentComment` (`parentComment` ASC) VISIBLE,
  CONSTRAINT `comment_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `mydb`.`user` (`idUser`)
    ON DELETE CASCADE,
  CONSTRAINT `comment_ibfk_2`
    FOREIGN KEY (`videoId`)
    REFERENCES `mydb`.`video` (`idVideo`)
    ON DELETE CASCADE,
  CONSTRAINT `comment_ibfk_3`
    FOREIGN KEY (`parentComment`)
    REFERENCES `mydb`.`comment` (`idComment`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`likes` (
  `user_id` INT NOT NULL,
  `video_id` INT NOT NULL,
  `Created_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`, `video_id`),
  INDEX `video_id` (`video_id` ASC) VISIBLE,
  CONSTRAINT `likes_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`idUser`),
  CONSTRAINT `likes_ibfk_2`
    FOREIGN KEY (`video_id`)
    REFERENCES `mydb`.`video` (`idVideo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`playlist` (
  `idPlaylist` INT NOT NULL AUTO_INCREMENT,
  `playlistName` VARCHAR(45) NULL DEFAULT NULL,
  `userID` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idPlaylist`),
  INDEX `userId_idx` (`userID` ASC) VISIBLE,
  CONSTRAINT `userId`
    FOREIGN KEY (`userID`)
    REFERENCES `mydb`.`user` (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`playlistvideo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`playlistvideo` (
  `videoId` INT NOT NULL,
  `playlistId` INT NOT NULL,
  PRIMARY KEY (`videoId`, `playlistId`),
  INDEX `playlistId` (`playlistId` ASC) VISIBLE,
  CONSTRAINT `playlistvideo_ibfk_1`
    FOREIGN KEY (`videoId`)
    REFERENCES `mydb`.`video` (`idVideo`),
  CONSTRAINT `playlistvideo_ibfk_2`
    FOREIGN KEY (`playlistId`)
    REFERENCES `mydb`.`playlist` (`idPlaylist`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`searchhistory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`searchhistory` (
  `idSearchHistory` INT NOT NULL,
  `searchContent` VARCHAR(120) NULL DEFAULT NULL,
  `createTime` DATETIME NULL DEFAULT NULL,
  `userId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idSearchHistory`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `searchhistory_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `mydb`.`user` (`idUser`),
  CONSTRAINT `searchhistory_ibfk_2`
    FOREIGN KEY (`userId`)
    REFERENCES `mydb`.`user` (`idUser`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`subscriber`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`subscriber` (
  `idSubscriber` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NULL DEFAULT NULL,
  `CreateTime` TIMESTAMP NULL DEFAULT NULL,
  `subToId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idSubscriber`),
  INDEX `subToId` (`subToId` ASC) VISIBLE,
  CONSTRAINT `subscriber_ibfk_1`
    FOREIGN KEY (`subToId`)
    REFERENCES `mydb`.`user` (`idUser`),
  CONSTRAINT `subscriber_ibfk_2`
    FOREIGN KEY (`subToId`)
    REFERENCES `mydb`.`user` (`idUser`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 86
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`videospeccount`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`videospeccount` (
  `idVideoSpecCount` INT NOT NULL,
  `ViewCount` INT NULL DEFAULT NULL,
  `likeCount` INT NULL DEFAULT NULL,
  `commentCount` INT NULL DEFAULT NULL,
  `dislikeCount` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idVideoSpecCount`),
  CONSTRAINT `videospeccount_ibfk_1`
    FOREIGN KEY (`idVideoSpecCount`)
    REFERENCES `mydb`.`video` (`idVideo`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`videoview`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`videoview` (
  `idVideoView` INT NOT NULL AUTO_INCREMENT,
  `user_Id` INT NULL DEFAULT NULL,
  `CreateTime` TIMESTAMP NULL DEFAULT NULL,
  `video_Id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idVideoView`),
  INDEX `userId_idx` (`user_Id` ASC) VISIBLE,
  INDEX `videoId_idx` (`video_Id` ASC) VISIBLE,
  CONSTRAINT `user_Id`
    FOREIGN KEY (`user_Id`)
    REFERENCES `mydb`.`user` (`idUser`),
  CONSTRAINT `video_Id`
    FOREIGN KEY (`video_Id`)
    REFERENCES `mydb`.`video` (`idVideo`),
  CONSTRAINT `videoview_ibfk_1`
    FOREIGN KEY (`user_Id`)
    REFERENCES `mydb`.`user` (`idUser`)
    ON DELETE CASCADE,
  CONSTRAINT `videoview_ibfk_2`
    FOREIGN KEY (`video_Id`)
    REFERENCES `mydb`.`video` (`idVideo`)
    ON DELETE CASCADE,
  CONSTRAINT `videoview_ibfk_3`
    FOREIGN KEY (`user_Id`)
    REFERENCES `mydb`.`user` (`idUser`)
    ON DELETE CASCADE,
  CONSTRAINT `videoview_ibfk_4`
    FOREIGN KEY (`video_Id`)
    REFERENCES `mydb`.`video` (`idVideo`)
    ON DELETE SET NULL,
  CONSTRAINT `videoview_ibfk_5`
    FOREIGN KEY (`user_Id`)
    REFERENCES `mydb`.`user` (`idUser`)
    ON DELETE SET NULL)
ENGINE = InnoDB
AUTO_INCREMENT = 259
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`watchhistory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`watchhistory` (
  `videoId` INT NOT NULL,
  `CreateTime` TIMESTAMP NULL DEFAULT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`videoId`, `userId`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `watchhistory_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `mydb`.`user` (`idUser`)
    ON DELETE CASCADE,
  CONSTRAINT `watchhistory_ibfk_2`
    FOREIGN KEY (`videoId`)
    REFERENCES `mydb`.`video` (`idVideo`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`watchlater`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`watchlater` (
  `idWatchLater` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NULL DEFAULT NULL,
  `videoId` INT NULL DEFAULT NULL,
  `CreateTime` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idWatchLater`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  INDEX `videoId` (`videoId` ASC) VISIBLE,
  CONSTRAINT `watchlater_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `mydb`.`user` (`idUser`),
  CONSTRAINT `watchlater_ibfk_2`
    FOREIGN KEY (`videoId`)
    REFERENCES `mydb`.`video` (`idVideo`),
  CONSTRAINT `watchlater_ibfk_3`
    FOREIGN KEY (`userId`)
    REFERENCES `mydb`.`user` (`idUser`)
    ON DELETE CASCADE,
  CONSTRAINT `watchlater_ibfk_4`
    FOREIGN KEY (`videoId`)
    REFERENCES `mydb`.`video` (`idVideo`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 36
DEFAULT CHARACTER SET = utf8mb3;

USE `mydb`;

DELIMITER $$
USE `mydb`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `mydb`.`create_video_spec_count`
AFTER INSERT ON `mydb`.`video`
FOR EACH ROW
insert into videospeccount(idVideoSpecCount,ViewCount,likeCount,CommentCount,dislikeCount) 
values(NEW.idVideo,0,0,0,0)$$

USE `mydb`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `mydb`.`update_like_count`
AFTER INSERT ON `mydb`.`likes`
FOR EACH ROW
UPDATE VideoSpecCount
  SET likeCount = likeCount + 1
  WHERE idVideoSpecCount = NEW.video_Id$$

USE `mydb`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `mydb`.`update_unlike_count`
AFTER DELETE ON `mydb`.`likes`
FOR EACH ROW
UPDATE VideoSpecCount
  SET likeCount = likeCount - 1
  WHERE idVideoSpecCount = OLD.video_Id$$

USE `mydb`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `mydb`.`subscribed_trigger`
AFTER INSERT ON `mydb`.`subscriber`
FOR EACH ROW
UPDATE user
  SET subscribed = subscribed + 1
  WHERE user.idUser = NEW.userId$$

USE `mydb`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `mydb`.`subscriber_trigger`
AFTER INSERT ON `mydb`.`subscriber`
FOR EACH ROW
UPDATE user
  SET subscribers = subscribers + 1
  WHERE user.idUser = NEW.subToId$$

USE `mydb`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `mydb`.`unsubscribed_trigger`
AFTER DELETE ON `mydb`.`subscriber`
FOR EACH ROW
UPDATE user
  SET subscribed = subscribed - 1
  WHERE user.idUser = OLD.userId$$

USE `mydb`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `mydb`.`unsubscriber_trigger`
AFTER DELETE ON `mydb`.`subscriber`
FOR EACH ROW
UPDATE user
  SET subscribers = subscribers - 1
  WHERE user.idUser = OLD.subToId$$

USE `mydb`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `mydb`.`update_view_count`
AFTER INSERT ON `mydb`.`videoview`
FOR EACH ROW
UPDATE VideoSpecCount
  SET ViewCount = ViewCount + 1
  WHERE idVideoSpecCount = NEW.video_Id$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
