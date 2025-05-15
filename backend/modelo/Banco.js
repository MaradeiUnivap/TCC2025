const mysql = require("mysql2");

module.exports = class Banco {

    static HOST = "127.0.0.1";
    static USER = "127.0.0.1";
    static PASSWORD = "";
    static DATABASE = "tcc2025";
    static PORT = "3306";
    static CONEXAO = null;

    static conectar() {
        Banco.CONEXAO = mysql.createConnection({
            host: Banco.HOST,
            user: Banco.USER,
            password: Banco.PASSWORD,
            database: Banco.DATABASE,
            port: Banco.PORT,

            
        });

        Banco.CONEXAO.connect((erro) => {
            if(erro){
                const objResposta = {
                    mesg:"Falha na conexão do BD",
                    erro: erro.message
                }
                console.log(objResposta);
            }
        })
    }

    static getConecxao(){
        if(Banco.CONEXAO == null  || Banco.CONEXAO.state == "disconnected"){
            Banco.conectar();
        }
        return Banco.CONEXAO;
    }

}