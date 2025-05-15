const express = require('express');
const mysql = require('mysql');
const path = require('path');

const rotas_professor = require('./roteador/ProfessorRouter');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend'))); 

const porta = 8000; 
const host = `http://localhost:${porta}`;

const banco = mysql.createPool({
    connectionLimit: 128,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tcc2025'
});

// Configura as rotas do professor, passando o app e o banco
rotas_professor(app, banco);

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
    console.log(`Acesse em: ${host}`);
});
