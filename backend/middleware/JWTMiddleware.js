const MeuTokenJWT = require('../modelo/MeuTokenJWT'); 

module.exports = class JwtMiddleware {
    constructor() {
        this._meuTokenJWT = new MeuTokenJWT();
    }

    validate = (request, response, next) => {
        const authHeader = request.headers['authorization'];

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];

            if (this._meuTokenJWT.validarToken(token) === true) {
                next();
            } else {
                response.status(401).json({
                    status: false,
                    msg: 'Token inválido.'
                });
            }
        } else {
            response.status(401).json({
                status: false,
                msg: 'Token não fornecido ou inválido.'
            });
        }
    }

    get meuTokenJWT() {
        return this._meuTokenJWT;
    }

    set meuTokenJWT(novoTokenJWT) {
        this._meuTokenJWT = novoTokenJWT;
    }
}
