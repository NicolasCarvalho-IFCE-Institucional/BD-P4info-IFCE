/*

|Nome|   Nícolas Aguiar Ribeiro de Carvalho          |Curso|  P4 de Informática

*/

CREATE TABLE TB_CURSO (
	"ID" INTEGER PRIMARY KEY AUTOINCREMENT,
	"NOME" TEXT NOT NULL
);



CREATE TABLE TB_PROFESSOR (
	"ID" INTEGER PRIMARY KEY AUTOINCREMENT,
	"NOME" TEXT NOT NULL
);



CREATE TABLE TB_CURSO_PROFESSOR (
	"REGISTRO" INTEGER PRIMARY KEY AUTOINCREMENT, 
	"CURSO_ID" INTEGER,
	"PROFESSOR_ID" INTEGER,
	
	FOREIGN KEY(CURSO_ID) REFERENCES TB_CURSO(ID),
	FOREIGN KEY(PROFESSOR_ID) REFERENCES TB_PROFESSOR(ID)
);





INSERT INTO TB_CURSO (NOME)
VALUES 
	("Informatica"),
	("Telecomunicaçoes"),
	("Eletrotécnica"),
	("Mecanica"),
    ("Edificaçoes"),
	("Turismo"),
	("Quimica");

INSERT INTO TB_PROFESSOR (NOME)
VALUES
	("Cesar Olavo"),
	("Davis Macedo"),
	("Serra Furtado"),
	("Mauricio Jaborandi"),
    ("Marcos Lemos"),
	("Jose Roberto"),
	("Gloria Marinho");

/*
	("Cesar Olavo", "Informatica"),
   	("Davis Macedo", "Informatica"),
   	("Serra Furtado", "Informatica"),
   	("Mauricio Jaborandi", "Informatica"),
   	("Marcos Lemos", "Mecanica"),
   	("Gloria Marinho", "Quimica");
*/
INSERT INTO TB_CURSO_PROFESSOR (PROFESSOR_ID, CURSO_ID)
VALUES
	(1, 1),
	(2, 1),
	(3, 1),
	(4, 1),
	(5, 4),
	(7, 7);





SELECT("REGISTRO, PROFESSOR, CURSO");
SELECT("................................");

SELECT TB_CURSO_PROFESSOR.REGISTRO, TB_PROFESSOR.NOME, TB_CURSO.NOME
FROM (
	
	(TB_CURSO_PROFESSOR INNER JOIN TB_PROFESSOR ON TB_CURSO_PROFESSOR.PROFESSOR_ID = TB_PROFESSOR.ID )
	
	INNER JOIN TB_CURSO ON TB_CURSO_PROFESSOR.CURSO_ID = TB_CURSO.ID 

);


.save "bd_avaliacao04.db"