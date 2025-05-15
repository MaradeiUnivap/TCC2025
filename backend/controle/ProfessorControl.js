const express = require('express');
const Professor = require('../modelo/Professor');
const jwtClass = require('../modelo/MeuTokenJWT'); // Presume-se que você usará isso depois com JWT

module.exports = class ProfessorControl {

    async login(request, response) {
        const professor = new Professor();

        professor.emailProfessor = request.body.professor.email;
        professor.senha = request.body.professor.senha;

        const logou = await professor.login();

        if (logou === true) {
            const objResposta = {
                cod: 1,
                status: true,
                msg: 'Logado com sucesso',
                professor: {
                    email: professor.emailProfessor
                }
            };
            response.status(200).send(objResposta);
        } else {
            const objResposta = {
                cod: 2,
                status: false,
                msg: "Erro ao efetuar login"
            };
            response.status(401).send(objResposta);
        }
    }

    async readAll(request, response) {
        const professor = new Professor();
        const dadosProfessores = await professor.readAll();

        const objResposta = {
            cod: 1,
            status: true,
            professores: dadosProfessores
        };
        response.status(200).send(objResposta);
    }

    async readById(request, response) {
        const professor = new Professor();
        professor.emailProfessor = request.params.email;

        const dados = await professor.readByID();

        const objResposta = {
            cod: 1,
            status: true,
            professores: dados
        };
        response.status(200).send(objResposta);
    }

    async create(request, response) {
        const professor = new Professor();
        professor.nomeProfessor = request.body.professor.nome;
        professor.emailProfessor = request.body.professor.email;
        professor.senha = request.body.professor.senha;

        const sucesso = await professor.create();

        if (sucesso === true) {
            const objResposta = {
                cod: 1,
                status: true,
                professores: [{
                    email: professor.emailProfessor
                }]
            };
            response.status(201).send(objResposta);
        } else {
            const objResposta = {
                cod: 1,
                status: false,
                msg: "Falha ao cadastrar professor",
                professores: [{
                    email: professor.emailProfessor
                }]
            };
            response.status(200).send(objResposta);
        }
    }

    async update(request, response) {
        const professor = new Professor();
        professor.emailProfessor = request.params.email;
        professor.senha = request.body.professor.senha;

        const atualizou = await professor.update();

        const objResposta = {
            cod: 1,
            status: atualizou,
            msg: atualizou ? "Atualizado com sucesso" : "Falha ao atualizar professor",
            professores: [{
                email: professor.emailProfessor
            }]
        };
        response.status(200).send(objResposta);
    }

    async delete(request, response) {
        const professor = new Professor();
        professor.emailProfessor = request.params.email;

        const excluiu = await professor.delete();

        const objResposta = {
            cod: 1,
            status: excluiu,
            msg: excluiu ? "Excluído com sucesso" : "Falha ao excluir professor",
            professores: [{
                email: professor.emailProfessor
            }]
        };
        response.status(200).send(objResposta);
    }
};
