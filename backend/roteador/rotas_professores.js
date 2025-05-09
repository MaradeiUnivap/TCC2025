const express = require("express");
const ProfessorMiddleware = require("../middleware/ProfessorMiddleware");

module.exports = class ProfessorRoteador{
    constructor(){
        this._router = express.Router();
        this._professorMiddleware = new ProfessorMiddleware();
    }

    criarRotasProfessor = () =>{
        this._router.post("/",
                this._professorMiddleware.validar_nomeProfessor,
        )

    }

}