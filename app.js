const express = require('express');

const mysql = require('mysql');

const rotas_professor = require("./roteador/rotas_professores");

const app = express ();

app.use(express.json());

app.use(express.static('js'));

const porta = 3306;

const host = "http://localhost:" + porta 

const banco = mysql.createPool({
    connectionLimit:128,
    host:'localhost',
    user:'root',
    password:'',
    database:'tcc2025'
});

rotas_professor(app,banco);

app.listen(porta,()=>{
    console.log(`Servidor rodando ${porta}`);
    console.log(">> " + host);
}
);

