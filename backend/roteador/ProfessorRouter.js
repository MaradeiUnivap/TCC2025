const express = require('express');
const ProfessorControl = require('../controle/ProfessorControl');
const ProfessorMiddleware = require('../middleware/ProfessorMiddleware');
const JwtMiddleware = require('../middleware/JWTMiddleware');

module.exports = class ProfessorRouter {
    constructor() {
        this._router = express.Router();
        this._professorControl = new ProfessorControl();
        this._professorMiddleware = new ProfessorMiddleware();
        this._jwtMiddleware = new JwtMiddleware();
    }

    createRoutes() {
        // Listar todos os professores
        this.router.get('/',
            this.jwtMiddleware.validate,
            this.professorControl.readAll
        );

        // Buscar professor por e-mail (ou ID, dependendo da lógica que você adotar)
        this.router.get('/:email',
            this.jwtMiddleware.validate,
            this.professorControl.readById
        );

        // Criar novo professor
        this.router.post('/',
            this.jwtMiddleware.validate,
            this.professorMiddleware.validate_emailProfessor,
            this.professorMiddleware.validate_senhaProfessor,
            this.professorMiddleware.isNotEmailCadastrado,
            this.professorControl.create
        );

        // Atualizar professor
        this.router.put('/:email',
            this.jwtMiddleware.validate,
            this.professorMiddleware.validate_emailProfessor,
            this.professorMiddleware.validate_senhaProfessor,
            this.professorControl.update
        );

        // Excluir professor
        this.router.delete('/:email',
            this.jwtMiddleware.validate,
            this.professorControl.delete
        );

        return this._router;
    }

    get router() {
        return this._router;
    }

    set router(newRouter) {
        this._router = newRouter;
    }

    get professorControl() {
        return this._professorControl;
    }

    set professorControl(newProfessorControl) {
        this._professorControl = newProfessorControl;
    }

    get professorMiddleware() {
        return this._professorMiddleware;
    }

    set professorMiddleware(newProfessorMiddleware) {
        this._professorMiddleware = newProfessorMiddleware;
    }

    get jwtMiddleware() {
        return this._jwtMiddleware;
    }

    set jwtMiddleware(newJwtMiddleware) {
        this._jwtMiddleware = newJwtMiddleware;
    }
}
