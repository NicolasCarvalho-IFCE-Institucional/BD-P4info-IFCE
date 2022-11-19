// Nícolas Aguiar Ribeiro de Carvalho
// P4 de Informática

// Criando banco de dados

const { Database } = require('sqlite3')


const sqlite3 = require('sqlite3').verbose()


db = new sqlite3.Database('BD_SCA.db', (erro ) => {
	if (erro) {console.log('[ Ao criar BD ] ', erro)}
	else { console.log('Conectado ao banco de dados') }
})


const alunos = ['Alberto', 'Beatriz', 'Carlos', 'Duda']

const professores = ['Eduardo', 'Fabiola', 'Geraldo', 'Hiago']

const disciplinas = ['Matemática', 'Inglês', 'História', 'Geografia']

const professores_disciplinas = [
	[1, 1],
	[1, 2],
	[2, 3],
	[4, 3]
]

const matriculas = [
	[1, 1],
	[1, 2],
	[2, 3],
	[4, 4]
]

const campos_simples = array => array.map( ()=>'(?)' ).join(', ')
const campos_complexos = array => array.map(() => '(?, ?)').join(',')
const matriz_linear = array => {

	novo_array = []

	array.map((linha, _) => {
		linha.map((coluna, _) => {
			novo_array.push(coluna)
		})
	})

	return novo_array
	
}



// Criando as tabelas do banco de dados
db.serialize( () => {
	
	db.run(`CREATE TABLE TB_ALUNOS (
 		ID INTEGER PRIMARY KEY AUTOINCREMENT,
   		NOME TEXT NOT NULL
	)`)

	db.run(`CREATE TABLE TB_PROFESSORES (
 		ID INTEGER PRIMARY KEY AUTOINCREMENT,
   		NOME TEXT NOT NULL
	)`)

	db.run(`CREATE TABLE TB_DISCIPLINAS (
 		ID INTEGER PRIMARY KEY AUTOINCREMENT,
   		NOME TEXT NOT NULL
	)`)

	db.run(`CREATE TABLE TB_PROFESSORES_DISCIPLINAS (
 		ID INTEGER PRIMARY KEY AUTOINCREMENT,

 		PROFESSOR_ID INTEGER NOT NULL, 
   		DISCIPLINA_ID INTEGER NOT NULL,
   		
	 	FOREIGN KEY("PROFESSOR_ID") REFERENCES "TB_PROFESSORES"("ID"),
		FOREIGN KEY("DISCIPLINA_ID") REFERENCES "TB_DISCIPLINAS"("ID")
  		
	)`)

	db.run(`CREATE TABLE TB_MATRICULAS (
 		ID INTEGER PRIMARY KEY AUTOINCREMENT,
   
   		ALUNO_ID INTEGER NOT NULL,
		PROFESSOR_DISCIPLINA_ID INTEGER NOT NULL,
  
		FOREIGN KEY("ALUNO_ID") REFERENCES "TB_ALUNO"("ID"),
  		FOREIGN KEY("PROFESSOR_DISCIPLINA_ID") REFERENCES "TB_PROFESSORES_DISCIPLINAS"("ID")
	)`)

	







	
	db.run('INSERT INTO TB_ALUNOS (NOME) VALUES ' + campos_simples(alunos),
		alunos, 
		(erro) => { 
			if(erro) {console.log(erro)} 
		}
	)	


	

	db.run('INSERT INTO TB_PROFESSORES (NOME) VALUES ' + campos_simples(professores),
		alunos, 
		(erro) => { 
			if(erro) {console.log(erro)} 
		}
	)	
	

	
	
	db.run('INSERT INTO TB_DISCIPLINAS (NOME) VALUES ' + campos_simples(disciplinas),
		disciplinas, 
		(erro) => { 
			if(erro) {console.log(erro)} 
		}
	)	




	db.run('INSERT INTO TB_PROFESSORES_DISCIPLINAS (PROFESSOR_ID, DISCIPLINA_ID) VALUES' + campos_complexos(professores_disciplinas),
		  matriz_linear(professores_disciplinas),
		  (erro) => {
			  if(erro) {console.log(erro)}
		  })

	


	db.run('INSERT INTO TB_MATRICULAS (ALUNO_ID, PROFESSOR_DISCIPLINA_ID) VALUES' + campos_complexos(matriculas), 
		  matriz_linear(matriculas),
		  (erro) => {
			  if(erro) {console.log(erro)} 
		  })







	
	

	db.all( 'SELECT * FROM TB_ALUNOS', [], (erro, alunos) => {
		if (!erro) {
			console.log(alunos)
		}
		else {
			console.log(erro)
		}
	})

	
	db.all( 'SELECT * FROM TB_PROFESSORES', [], (erro, professores) => {
		if (!erro) {
			console.log(professores)
		}
		else {
			console.log(erro)
		}
	} )

	
	db.all( 'SELECT * FROM TB_DISCIPLINAS', [], (erro, disciplinas) => {
		if (!erro) {
			console.log(disciplinas)
		}
		else {
			console.log(erro)
		}
	} )


	db.all( 'SELECT * FROM TB_PROFESSORES_DISCIPLINAS', [], (erro, professores_disciplinas) => {
		if (!erro) {
			console.log(professores_disciplinas)
		}
		else {
			console.log(erro)
		}
	} )
	
	
	db.all( 'SELECT * FROM TB_MATRICULAS', [], (erro, matriculas) => {
		if (!erro) {
			console.log(matriculas)
		}
		else {
			console.log(erro)
		}
	} )



	// Encerrando banco de dados
	db.close( (erro) => {
		if (erro) { console.log('[ Ao encerrar banco de dados ] ', erro) }
		else { console.log('Banco de dados encerrado') }
	} )
	
} )