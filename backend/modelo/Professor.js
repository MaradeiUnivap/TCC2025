// Importa o módulo Banco para realizar conexões com o banco de dados.
const Banco = require('./Banco');

// Define a classe Usuarios para representar a entidade Professor.
module.exports = class Professor {
    // Construtor da classe Usuarios que inicializa as propriedades.
    constructor() {
        this._idProfessor = null;
        this._nomeProfessor = null; //Nome do professor
        this._emailProfessor = null; //Email do Professor
        this._senha = null; //Senha do professor
    }
    
    // Método assíncrono para criar um novo Usuário no banco de dados.
    async create() {
        const conexao = Banco.getConexao();
        const SQL = 'INSERT INTO professor (nomeProfessor, emailProfessor, senha) VALUES (?, ?, MD5(?));';

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._nomeProfessor,
                this._emailProfessor,
                this._senha
            ]);
            this._idProfessor = result.insertId; // Armazena o ID gerado pelo banco de dados.
            return result.affectedRows > 0; // Retorna true se a inserção foi bem-sucedida.
        } catch (error) {
            console.error('Erro ao criar o Professor:', error);
            return false;
        }
    }

    // Método assíncrono para excluir um Professor do banco de dados.
    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM professor WHERE emailProfessor = ?;';
    
        try {
            const [result] = await conexao.promise().execute(SQL, [this._emailProfessor]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir o Professor:', error);
            return false;
        }
    }

    // Método assíncrono para atualizar os dados de um Professor no banco de dados.
    async update() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE professor SET senha = MD5(?) WHERE emailProfessor = ?;';
    
        try {
            const [result] = await conexao.promise().execute(SQL, [this._senha, this._emailProfessor]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o Professor:', error);
            return false;
        }
    }

    // Método assíncrono para ler todos os Professores do banco de dados.
    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM professor ORDER BY emailProfessor;';
    
        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler Professores:', error);
            return [];
        }
    }
    
    // Método assíncrono para ler um Professor pelo seu ID.
    async readByID() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM professor WHERE emailProfessor = ?;';
    
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._emailProfessor]);
            return rows;
        } catch (error) {
            console.error('Erro ao ler Professor pelo email:', error);
            return null;
        }
    }

    async isProfessorByEmail(emailProfessor) {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT COUNT(*) AS qtd FROM professor WHERE emailProfessor = ?;';  // Consulta para contar os professores com o email informado.
    
        try {
            const [rows] = await conexao.promise().execute(SQL, [emailProfessor]);  // Executa a query.
            return rows[0].qtd > 0;  
        } catch (error) {
            console.error('Erro ao verificar o email do Professor:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }

    
    async login() {
        const conexao = Banco.getConexao();  // Obtém a conexão com o banco de dados.
        const SQL = `
            SELECT COUNT(*) AS qtd, emailProfessor
            FROM professor
            WHERE emailProfessor = ? AND senha = MD5(?);
        `;  // Consulta SQL para selecionar o Professor com base no email e senha.
    
        try {
            // Executa a consulta SQL com parâmetros (email e senha).
            const [rows] = await conexao.promise().execute(SQL, [this._emailProfessor, this._senha]);
    
            if (rows.length > 0 && rows[0].qtd === 1) {
                const tupla = rows[0];
                // Configura o atributo emailProfessor.
                this._emailProfessor = tupla.emailProfessor;
    
                return true;  // Login bem-sucedido.
            }
    
            return false;  // Login falhou.
        } catch (error) {
            console.error('Erro ao realizar o login do Professor:', error);  // Exibe erro no console se houver falha.
            return false;  // Retorna false caso ocorra um erro.
        }
    }
    
    
    set idProfessor(novoIdProfessor) {
        this._idProfessor = novoIdProfessor;
    }
    get idProfessor() {
        return this._idProfessor;
    }

    set nomeProfessor(novoNomeProfessor) {
        this._nomeProfessor = novoNomeProfessor;
    }
    get nomeProfessor() {
        return this._nomeProfessor;
    }

    set emailProfessor(novoEmailProfessor) {
        this._emailProfessor = novoEmailProfessor;
    }
    get emailProfessor() {
        return this._emailProfessor;
    }

    set senha(novaSenha) {
        this._senha = novaSenha;
    }
    get senha() {
        return this._senha;
    }
};

module.exports = Professor;
