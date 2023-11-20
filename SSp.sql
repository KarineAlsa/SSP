CREATE DATABASE ssp;
USE ssp;
CREATE TABLE loginPatient(
key_init VARCHAR(7) PRIMARY KEY UNIQUE,
name VARCHAR (20),
firstLastName VARCHAR (15),
secondLastName VARCHAR (15)

);
CREATE TABLE loginDoctor(
key_init VARCHAR(7) PRIMARY KEY UNIQUE,
name VARCHAR (20),
firstLastName VARCHAR (15),
secondLastName VARCHAR (15)
);
CREATE TABLE loginLaboratory(
key_init VARCHAR(7) PRIMARY KEY UNIQUE,
name VARCHAR (20),
);
 

 
INSERT INTO loginPatient
VALUES 
('PC_2008', 'Aylin Venturina','Malpica','Muñiz'),
('PC_0407', 'Carmen Anel','Vilca','Mamani'),
('PC_2911', 'Karine','Alcazar','Sarmiento');

INSERT INTO loginDoctor
VALUES ('MD_1605', 'Venturina','Muñiz','Lopez'),
('MD_7405', 'Yazmin','Muñiz','Lopez');


INSERT INTO loginLaboratory
VALUES 
('LB_2022', 'SSP Laboratorio');


CREATE TABLE patients(
id_Patient VARCHAR(7),
age INT,
weight INT,
sex TINYTEXT,
height TINYTEXT,
blood VARCHAR (3),
CONSTRAINT FK_Patient_Id
FOREIGN KEY (id_Patient) REFERENCES loginPatient(key_init)
);

INSERT INTO patients
VALUES 
('PC_2008','18','90','F','168','A+'),
('PC_2911','19','58','F','158','O+'),
('PC_0407','19','62','F','161','O+');

ALTER TABLE patients
ADD COLUMN code VARCHAR (4) UNIQUE;

UPDATE patients
SET code='MAMA'
WHERE id_Patient = 'PC_2008';

UPDATE patients
SET code='AASK'
WHERE id_Patient = 'PC_2911';

UPDATE patients
SET code='VICM'
WHERE id_Patient = 'PC_0407';


CREATE TABLE doctors(
id_Doctor VARCHAR(7),
license VARCHAR (15),
specialty VARCHAR (60),
CONSTRAINT FK_Doctor_Id
FOREIGN KEY (id_Doctor) REFERENCES loginDoctor(key_init)
);

INSERT INTO doctors
VALUES 
('MD_1605','MULY740531','Internista'),
('MD_7405','MULV160565','Medico General');

CREATE TABLE expedients(
id_Patient VARCHAR(7),
diagnostic LONGTEXT,
treatment LONGTEXT 
);

INSERT INTO expedient
VALUES 
('PC_2008','infeccion de vias urinarias','amoxicilina 1 tab c/24 hrs'),
('PC_2008','gastritis','leche de magnesio 20ml c/comida'),
('PC_0407','infeccion estomacal','amoxicilina 1 tab c/24 hrs'),
('PC_2911','migraña','metamizol 1tab c/12 hrs');

SELECT * FROM expedient where id_Patient='PC_2008';

CREATE TABLE laboratory(
id_Patient VARCHAR(7),
description LONGTEXT 
);

INSERT INTO laboratory
VALUES 
('PC_2008',' ANALISIS DE SANGRE'),
('PC_0407',' PRUEBA COVID'),
('PC_2911',' BIOMETRIA HEMATICA'),
('PC_2911',' EXAMEN DE ORINA');


CREATE TABLE externalPatients(
name VARCHAR (20),
firstLastName VARCHAR (15),
secondLastName VARCHAR (15),
codeExternal  VARCHAR (4) UNIQUE,
typeStudy LONGTEXT
);

INSERT INTO externalPatients
VALUES 
('Jorge', 'Malpica' , 'Muñiz','JAMM', 'Examen de orina'),
('Leonardo', 'Toledo' , 'Velazco','TOVL', ' Biometria hematica');