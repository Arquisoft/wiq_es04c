-- schema.sql
DROP TABLE IF EXISTS distractores;
DROP TABLE IF EXISTS preguntas;
DROP TABLE IF EXISTS categorias;

CREATE TABLE Categoria (
    id_categoria INT PRIMARY KEY,
    nombre_categoria VARCHAR(255) UNIQUE NOT NULL 
);

CREATE TABLE Pregunta (
    id_pregunta INT PRIMARY KEY,
    pregunta TEXT UNIQUE NOT NULL ,
    respuesta_correcta TEXT NOT NULL,
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria)
);

CREATE TABLE Distractor (
    id_distractor INT PRIMARY KEY,
    distractor TEXT UNIQUE NOT NULL 
);

CREATE TABLE DistractorPregunta (
    id_pregunta INT,
    id_distractor INT,
    tipo VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_pregunta, id_distractor),
    FOREIGN KEY (id_pregunta) REFERENCES Pregunta(id_pregunta),
    FOREIGN KEY (id_distractor) REFERENCES Distractor(id_distractor)
);