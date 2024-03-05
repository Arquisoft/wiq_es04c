-- schema.sql
DROP TABLE IF EXISTS DistractorPregunta;
DROP TABLE IF EXISTS Distractor;
DROP TABLE IF EXISTS Pregunta;
DROP TABLE IF EXISTS Categoria;
CREATE TABLE Categoria (
    id_categoria int PRIMARY KEY ,
    nombre_categoria VARCHAR(255) UNIQUE NOT NULL
);
ALTER TABLE Categoria MODIFY id_categoria int AUTO_INCREMENT;

CREATE TABLE Pregunta (
    id_pregunta INT PRIMARY KEY,
    pregunta VARCHAR(255) UNIQUE NOT NULL ,
    respuesta_correcta TEXT NOT NULL,
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria)
);
ALTER TABLE Pregunta MODIFY id_pregunta int AUTO_INCREMENT;

CREATE TABLE Distractor (
    id_distractor INT AUTO_INCREMENT PRIMARY KEY,
    distractor VARCHAR(255) UNIQUE NOT NULL 
);
ALTER TABLE Distractor MODIFY id_distractor int AUTO_INCREMENT;

CREATE TABLE DistractorPregunta (
    id_pregunta INT,
    id_distractor INT,
    tipo VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_pregunta, id_distractor),
    FOREIGN KEY (id_pregunta) REFERENCES Pregunta(id_pregunta),
    FOREIGN KEY (id_distractor) REFERENCES Distractor(id_distractor)
);