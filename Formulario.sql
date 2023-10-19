DROP DATABASE IF EXISTS Formulario ;
CREATE DATABASE Formulario ;
USE Formulario ;

CREATE TABLE Usuario (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	nombre varchar(50) NOT NULL,
    apellido varchar(50) NOT NULL,
    apodo varchar(50) NOT NULL UNIQUE,
    correo VARCHAR(50) NOT NULL UNIQUE,
    contraseña CHAR(64) NOT NULL,
    nacimiento DATE NOT NULL,
    sexo CHAR(9) NOT NULL
);

DELIMITER $$
DROP PROCEDURE IF EXISTS AltaUsuario $$
CREATE PROCEDURE AltaUsuario (unnombre VARCHAR(50), unapellido varchar(50), unapodo varchar(50), uncorreo VARCHAR(50), uncontraseña CHAR(64), unnacimiento DATE, unsexo CHAR(10))
BEGIN
	INSERT INTO Usuario (nombre, apellido, apodo, correo, contraseña, nacimiento, sexo)
	VALUES	(unnombre, unapellido, unapodo, uncorreo, sha2(uncontraseña, 256), unnacimiento, unsexo);
END $$