-- Active: 1692035474106@@127.0.0.1@3306@task_flow_manager
DROP DATABASE IF EXISTS Task_Flow_Manager ;
CREATE DATABASE Task_Flow_Manager ;
Use Task_Flow_Manager ;

CREATE Table Usuario (
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    dni VARCHAR(50) PRIMARY KEY,
    correo VARCHAR(50) NOT NULL UNIQUE,
    contrasena CHAR(64) NOT NULL,
    fechaNacimiento DATE NOT NULL,
    sexo CHAR(10) NOT NULL
);

DELIMITER $$
DROP PROCEDURE IF EXISTS AltaUsuario $$
CREATE PROCEDURE AltaUsuario (unnombre VARCHAR(50), unapellido VARCHAR(50), undni VARCHAR(50), uncorreo VARCHAR(50), uncontrasena CHAR(64), unfechaNacimiento DATE, unsexo CHAR(10))
BEGIN
    INSERT INTO Usuario (nombre, apellido, dni, correo, contrasena, fechaNacimiento, sexo)
    VALUES (unnombre, unapellido, undni, uncorreo, uncontrasena, unfechaNacimiento, unsexo);
END $$