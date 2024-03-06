-- schema.sql
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
    id_distractor INT PRIMARY KEY,
    distractor VARCHAR(255) NOT NULL,
    id_categoria INT,
    id_pregunta INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria),
    FOREIGN KEY (id_pregunta) REFERENCES Pregunta(id_pregunta)
);
ALTER TABLE Distractor MODIFY id_distractor int AUTO_INCREMENT;
ALTER TABLE Categoria CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE Pregunta CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE Distractor CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

