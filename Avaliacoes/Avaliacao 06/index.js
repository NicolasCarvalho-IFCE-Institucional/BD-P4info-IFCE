// Nícolas Aguiar Ribeiro de Carvalho
// P4 de Informática

// Criando banco de dados
const { Database } = require('sqlite3')


const sqlite3 = require('sqlite3').verbose()


db = new sqlite3.Database(':memory:', (erro ) => {
	if (erro) {console.log('[ Ao criar BD ] ', erro)}
	else { console.log('Conectado ao banco de dados') }
})


const alunos = ["Alberto", 'Beatriz', 'Carlos', 'Duda']
const professores = ['Eduardo', 'Fabiola', 'Geraldo', 'Hiago']
const disciplinas = ['Portugues', 'Matematica', 'Historia', 'Geografia']


/*
function sorteia_item (array) {
	return Math.floor(Math.random() * array.length)
}
*/


/*
function sorteia_ID(nome_tabela) {
	db.all(`SELECT * FROM ${nome_tabela}`, [], (erro, resultado_tabela) => {
		
		if (!erro) {
			return new Promise((resolve) => {
				const ID = sorteia_item(resultado_tabela).ID
				resolve(ID)
			})
		}

		else {
			console.log(erro)	
		}
		
	})
}
*/




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
   		NOME TEXT NOT NULL,
	 	PROFESSOR_ID INTEGER NOT NULL,
   
   		FOREIGN KEY("PROFESSOR_ID") REFERENCES "TB_PROFESSORES"("ID")
	)`)

	db.run(`CREATE TABLE TB_MATRICULAS (
 		ID INTEGER PRIMARY KEY AUTOINCREMENT,
   		ALUNO_ID INTEGER,
	 	DISCIPLINA_ID INTEGER NOT NULL,

		FOREIGN KEY("ALUNO_ID") REFERENCES "TB_ALUNO"("ID"),
  		FOREIGN KEY("DISCIPLINA_ID") REFERENCES "TB_DISCIPLINA"("ID")
	)`)





	// Inserindo os dados nas tabelas
	db.run(`
		INSERT INTO TB_ALUNOS (NOME)
	 	VALUES (?), (?), (?), (?)
   	`, alunos, (erro) => { if(erro) {console.log(erro)} })


	

	db.run(`
		INSERT INTO TB_PROFESSORES (NOME)
	 	VALUES (?), (?), (?), (?)
   	`, professores, (erro) => { if(erro) {console.log(erro)} })
	


	
	/*
	db.each('SELECT * FROM TB_PROFESSORES', [], (erro, professor) => {

		const disciplina_nome = await sorteia_item(disciplinas)
		
		// Selecionando um professor
		db.run(`
  			INSERT INTO TB_DISCIPLINAS (NOME, PROFESSOR_ID)
	 		VALUES (?) (?)
		`,

			   
		// Combinando o professor com uma disciplina
		[disciplina_nome, professor.ID],

			   
		// Tratando erro do insert	   
		(erro) => {
			if (erro) {
				console.log(erro)
			}
		})

		
		// Tratando erro do select
		if (erro) {
			console.log(erro)
		}
		
	})
	*/

	db.run(`INSERT INTO TB_DISCIPLINAS (NOME, PROFESSOR_ID)
 			VALUES
				("Matemática", 1),
				("Português", 2),
				("Inglês", 3),
				("História", 4)
	`)


	

	/*
	db.each('SELECT * FROM TB_ALUNOS', [], (erro, aluno) => {

		const disciplina_id = await sorteia_ID('TB_DISCIPLINAS')
		
		//Selecionando um aluno
		db.run(`
  			INSERT INTO TB_MATRICULAS (ALUNO_ID, DISCIPLINA_ID)
	 		VALUES (?) (?)
		`, 

			   
		// Combinando o aluno com uma disciplina
		[aluno.ID, disciplina_id],

			   
		// Tratando erro do insert	   
		(erro) => {
			if (erro) {
				console.log(erro)
			}
		})

		
		// Tratando erro do select
		if (erro) {
			console.log(erro)
		}
		
	})
	*/

	db.run(`INSERT INTO TB_MATRICULAS (ALUNO_ID, DISCIPLINA_ID)
		VALUES
			(1, 1),
			(1, 2),
			(2, 3),
			(4, 4)
	`)


	

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