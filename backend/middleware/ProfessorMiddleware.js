const Professor = require('../modelo/Professor');

module.exports = class ProfessorMiddleware {

    async isNotEmailCadastrado(request, response, next) {
        if (request.body.professor == null) {
            const objResposta = {
                status: false,
                msg: "Professor NULL."
            };
            return response.status(400).send(objResposta);
        }

        const email = request.body.professor.email;
        const professor = new Professor();
        const is = await professor.isProfessorByEmail(email);

        if (is == false) {
            next();
        } else {
            const objResposta = {
                status: false,
                msg: "Já existe um professor cadastrado com este e-mail."
            };
            response.status(400).send(objResposta);
        }
    }

    async validate_emailProfessor(request, response, next) {
        if (request.body.professor == null && request.params.email == null) {
            const objResposta = {
                status: false,
                msg: "Professor NULL."
            };
            return response.status(400).send(objResposta);
        }

        const email = request.params.email == null ? request.body.professor.email : request.params.email;

        const atIndex = email.indexOf('@');
        const dotIndex = email.lastIndexOf('.');

        if (atIndex < 1 || dotIndex < atIndex + 2 || dotIndex + 2 >= email.length) {
            const objResposta = {
                status: false,
                msg: "E-mail inválido. Por favor, insira um e-mail válido."
            };
            return response.status(400).send(objResposta);
        }

        next();
    }

    async validate_senhaProfessor(request, response, next) {
        if (request.body.professor == null) {
            const objResposta = {
                status: false,
                msg: "Professor NULL."
            };
            return response.status(400).send(objResposta);
        }

        const senha = request.body.professor.senha;

        if (senha.length < 6) {
            return response.status(400).send({
                status: false,
                msg: "A senha deve ter no mínimo 6 caracteres."
            });
        }

        let temLetra = false;
        for (let i = 0; i < senha.length; i++) {
            if (isNaN(senha[i])) {
                temLetra = true;
                break;
            }
        }

        if (!temLetra) {
            return response.status(400).send({
                status: false,
                msg: "A senha deve conter pelo menos uma letra."
            });
        }

        const caracteresEspeciais = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/`~";
        let temCaractereEspecial = false;

        for (let i = 0; i < senha.length; i++) {
            if (caracteresEspeciais.includes(senha[i])) {
                temCaractereEspecial = true;
                break;
            }
        }

        if (!temCaractereEspecial) {
            return response.status(400).send({
                status: false,
                msg: "A senha deve conter pelo menos um caractere especial."
            });
        }

        next();
    }
}
