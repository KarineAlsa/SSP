CREATE DATABASE ssp;
USE ssp;
CREATE TABLE inicioSesionPaciente(
id_inicio VARCHAR(7) PRIMARY KEY UNIQUE,
nombre VARCHAR (20),
apellidoP VARCHAR (15),
apellidoM VARCHAR (15)

);
CREATE TABLE inicioSesionMedico(
id_inicio VARCHAR(7) PRIMARY KEY UNIQUE,
nombre VARCHAR (20),
apellidoP VARCHAR (15),
apellidoM VARCHAR (15)
);
CREATE TABLE inicioSesionLaboratorio(
id_inicio VARCHAR(7) PRIMARY KEY UNIQUE,
nombre VARCHAR (20),
apellidoP VARCHAR (15),
apellidoM VARCHAR (15)
);
 

 
INSERT INTO inicioSesionPaciente
VALUES 
('PC_2008', 'Aylin Venturina','Malpica','Muñiz'),
('PC_0407', 'Carmen Anel','Vilca','Mamani'),
('PC_2911', 'Karine','Alcazar','Sarmiento');

INSERT INTO inicioSesionMedico
VALUES ('MD_1605', 'Venturina','Muñiz','Lopez'),
('MD_7405', 'Yazmin','Muñiz','Lopez');


INSERT INTO inicioSesionLaboratorio
VALUES 
('LB_2022', 'SSP Laboratorio', null, null);


CREATE TABLE pacientes(
id_P VARCHAR(7),
edad INT,
peso INT,
sexo TINYTEXT,
estatura TINYTEXT,
tipoSangre VARCHAR (3),
CONSTRAINT FK_Paciente_Id
FOREIGN KEY (id_P) REFERENCES inicioSesionPaciente(id_inicio)
);

INSERT INTO pacientes
VALUES 
('PC_2008','18','90','F','168','A+'),
('PC_2911','19','58','F','158','O+'),
('PC_0407','19','62','F','161','O+');

ALTER TABLE pacientes
ADD COLUMN codigo VARCHAR (4) UNIQUE;

UPDATE pacientes
SET codigo='MAMA'
WHERE id_P = 'PC_2008';

UPDATE pacientes
SET codigo='AASK'
WHERE id_P = 'PC_2911';

UPDATE pacientes
SET codigo='VICM'
WHERE id_P = 'PC_0407';

ALTER TABLE pacientes
DROP COLUMN codigo;

CREATE TABLE medicos(
id_M VARCHAR(7),
cedulaP VARCHAR (15),
especialidad VARCHAR (60),
CONSTRAINT FK_medicos_Id
FOREIGN KEY (id_M) REFERENCES inicioSesionMedico(id_inicio)
);

INSERT INTO medicos
VALUES 
('MD_1605','MULY740531','Internista'),
('MD_7405','MULV160565','Medico General');

CREATE TABLE expediente(
id_P VARCHAR(7),
diagnostico LONGTEXT,
tratamiento LONGTEXT 
);

INSERT INTO expediente
VALUES 
('PC_2008','infeccion de vias urinarias','amoxicilina 1 tab c/24 hrs'),
('PC_2008','gastritis','leche de magnesio 20ml c/comida'),
('PC_0407','infeccion estomacal','amoxicilina 1 tab c/24 hrs'),
('PC_2911','migraña','metamizol 1tab c/12 hrs');

SELECT * FROM expediente where id_P='PC_2008';

CREATE TABLE laboratorio(
id_P VARCHAR(7),
descrpcion LONGTEXT 
);

INSERT INTO laboratorio
VALUES 
('PC_2008',' ANALISIS DE SANGRE'),
('PC_0407',' PRUEBA COVID'),
('PC_2911',' BIOMETRIA HEMATICA'),
('PC_2911',' EXAMEN DE ORINA');

CREATE VIEW consulta1 AS SELECT id_P, nombre, apellidoP,apellidoM,edad,peso,sexo,estatura,tipoSangre
FROM inicioSesionPaciente INNER JOIN pacientes on inicioSesionPaciente.id_inicio=pacientes.id_P WHERE codigo="AASK";

#CREAR USUARIO NUEVO CON PERMISO PARA LECTURA DE TABLAS
CREATE USER 'usuarionuevo'@'localhost' IDENTIFIED BY 'contrasenanewusuario';

GRANT SELECT ON ssp.* TO 'usuarionuevo'@'localhost';

SHOW GRANTS FOR 'usuarionuevo'@'localhost';

use ssp;
#CREAR VISTA1         
CREATE VIEW consulta1 AS SELECT id_P, nombre, apellidoP,apellidoM,edad,peso,sexo,estatura,tipoSangre
FROM inicioSesionPaciente INNER JOIN pacientes on inicioSesionPaciente.id_inicio=pacientes.id_P WHERE codigo="AASK";

#CREAR VISTA2
CREATE VIEW consulta2 AS SELECT id_M, especialidad
FROM medicos;


#CREAR VISTA3   
CREATE VIEW consulta3 AS SELECT id_P,edad,sexo,tipoSangre
FROM pacientes WHERE tipoSangre="O+";

DELETE FROM pacientes WHERE id_P=NULL;

CREATE TABLE pacientesExternos(
nombre VARCHAR (20),
apellidoP VARCHAR (15),
apellidoM VARCHAR (15),
codigoExt  VARCHAR (4) UNIQUE,
tipoEstudio LONGTEXT
);

INSERT INTO pacientesExternos
VALUES 
('Jorge', 'Malpica' , 'Muñiz','JAMM', 'Examen de orina'),
('Leonardo', 'Toledo' , 'Velazco','TOVL', ' Biometria hematica');