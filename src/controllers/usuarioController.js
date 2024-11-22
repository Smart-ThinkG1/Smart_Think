var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email) {
        res.status(400).send("Seu e-mail está indefinido!");
    } else if (!senha) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.length === 1) {
                    const usuario = resultadoAutenticar[0];

                    if (!usuario.fkEmpresa) {
                        res.status(500).json({ message: "fkEmpresa está indefinido" });
                    } else {
                        aquarioModel.buscarAquariosPorEmpresa(usuario.fkEmpresa)
                            .then((resultadoAquarios) => {
                                res.json({
                                    id: usuario.id,
                                    email: usuario.email,
                                    nome: usuario.nome,
                                    cpf: usuario.cpf,
                                    aquarios: resultadoAquarios
                                });
                            })
                            .catch((erro) => {
                                console.error("Erro ao buscar aquários:", erro);
                                res.status(500).json({ message: "Erro ao buscar aquários", erro });
                            });
                    }
                } else {
                    res.status(401).json({ message: "E-mail ou senha incorretos" });
                }
            })
            .catch(function (erro) {
                console.error("Erro ao realizar o login:", erro);
                res.status(500).json({ message: "Erro ao realizar o login", erro });
            });
    }
}


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.idEmpresaServer;
    

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    }  else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua filial a vincular está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, cpf, email, senha, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
}