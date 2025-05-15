-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tcc2025
-- -----------------------------------------------------

DROP SCHEMA IF EXISTS `tcc2025`;
-- -----------------------------------------------------
-- Schema tcc2025
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tcc2025` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema tcc2025
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tcc2025
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tcc2025` DEFAULT CHARACTER SET utf8mb4 ;
USE `tcc2025` ;

-- -----------------------------------------------------
-- Table `tcc2025`.`atividade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tcc2025`.`atividade` (
  `idatividade` INT NOT NULL,
  `nomeAtividade` VARCHAR(45) NULL,
  `atividadecol` VARCHAR(45) NULL,
  PRIMARY KEY (`idatividade`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tcc2025`.`curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tcc2025`.`curso` (
  `idCurso` INT(11) NOT NULL AUTO_INCREMENT,
  `nomeCurso` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idCurso`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `tcc2025`.`professor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tcc2025`.`professor` (
  `idProfessor` INT(11) NOT NULL AUTO_INCREMENT,
  `nomeProfessor` VARCHAR(100) NOT NULL,
  `emailProfessor` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idProfessor`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `tcc2025`.`grupotcc`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tcc2025`.`grupotcc` (
  `idGrupo` INT(11) NOT NULL AUTO_INCREMENT,
  `tema` VARCHAR(255) NOT NULL,
  `idCurso` INT(11) NOT NULL,
  `idProfessor` INT(11) NOT NULL,
  `professor_idProfessor` INT(11) NOT NULL,
  PRIMARY KEY (`idGrupo`),
  INDEX `idCurso` (`idCurso` ASC),
  INDEX `idProfessor` (`idProfessor` ASC),
  INDEX `fk_grupotcc_professor1_idx` (`professor_idProfessor` ASC),
  CONSTRAINT `grupotcc_ibfk_1`
    FOREIGN KEY (`idCurso`)
    REFERENCES `tcc2025`.`curso` (`idCurso`),
  CONSTRAINT `grupotcc_ibfk_2`
    FOREIGN KEY (`idProfessor`)
    REFERENCES `tcc2025`.`professor` (`idProfessor`),
  CONSTRAINT `fk_grupotcc_professor1`
    FOREIGN KEY (`professor_idProfessor`)
    REFERENCES `tcc2025`.`professor` (`idProfessor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `tcc2025`.`atividade_has_grupotcc`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tcc2025`.`atividade_has_grupotcc` (
  `atividade_idatividade` INT NOT NULL,
  `grupotcc_idGrupo` INT(11) NOT NULL,
  `statusAtividade` VARCHAR(45) NULL,
  INDEX `fk_atividade_has_grupotcc_grupotcc1_idx` (`grupotcc_idGrupo` ASC),
  INDEX `fk_atividade_has_grupotcc_atividade_idx` (`atividade_idatividade` ASC),
  CONSTRAINT `fk_atividade_has_grupotcc_atividade`
    FOREIGN KEY (`atividade_idatividade`)
    REFERENCES `tcc2025`.`atividade` (`idatividade`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_atividade_has_grupotcc_grupotcc1`
    FOREIGN KEY (`grupotcc_idGrupo`)
    REFERENCES `tcc2025`.`grupotcc` (`idGrupo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `tcc2025` ;

-- -----------------------------------------------------
-- Table `tcc2025`.`aluno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tcc2025`.`aluno` (
  `idAluno` INT(11) NOT NULL AUTO_INCREMENT,
  `nomeAluno` VARCHAR(100) NOT NULL,
  `sala` VARCHAR(10) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `senhaAluno` VARCHAR(100) NOT NULL,
  `idCurso` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idAluno`),
  INDEX `idCurso` (`idCurso` ASC),
  CONSTRAINT `aluno_ibfk_1`
    FOREIGN KEY (`idCurso`)
    REFERENCES `tcc2025`.`curso` (`idCurso`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `tcc2025`.`aluno_grupo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tcc2025`.`aluno_grupo` (
  `idGrupo` INT(11) NOT NULL,
  `idAluno` INT(11) NOT NULL,
  INDEX `idAluno` (`idAluno` ASC),
  CONSTRAINT `aluno_grupo_ibfk_1`
    FOREIGN KEY (`idGrupo`)
    REFERENCES `tcc2025`.`grupotcc` (`idGrupo`),
  CONSTRAINT `aluno_grupo_ibfk_2`
    FOREIGN KEY (`idAluno`)
    REFERENCES `tcc2025`.`aluno` (`idAluno`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
