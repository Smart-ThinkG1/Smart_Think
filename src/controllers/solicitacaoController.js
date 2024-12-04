var solicitacaoModel = require("../models/solicitacaoModel");

function cadastrarSolicitacao(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var empresa = req.body.empresaServer;
    var estado = "ATIVO"

    if (!nome || !email || !telefone || !empresa) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    solicitacaoModel.cadastrarSolicitacao(nome, email, telefone, empresa, estado).then(function (resultado) {
        res.json(resultado);
    }).catch(
        function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a solicitação! Erro:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage)
        }
    );
}

function listarSolicitacoes(req, res) {
    const estadoFiltro = req.query.estado || 'ATIVO';

    solicitacaoModel.listarSolicitacoes(estadoFiltro).then(function (resultado) {
        res.json(resultado);
    }).catch(function (erro) {
        console.error("Erro ao listar solicitações:", erro);
        res.status(500).json(erro.sqlMessage);
    });
}

// function editarSolicitacao(req, res) {
//     var id = req.body.idServer;
//     var nome = req.body.nomeServer;
//     var email = req.body.emailServer;
//     var telefone = req.body.telefoneServer;
//     var empresa = req.body.empresaServer;

//     if (!id || !nome || !email || !telefone || !empresa) {
//         return res.status(400).send("Todos os campos são obrigatórios!");
//     }

//     solicitacaoModel.editarSolicitacao(id, nome, email, telefone, empresa).then(function (resultado) {
//         res.json({mensagem: "Solicitação editada com sucesso!", resultado });
//     }).catch(function (erro) {
//         console.error("Erro ao editar solicitação:", erro);
//         res.status(500).json({ mensagem: "Erro ao editar solicitação.", erro });
//         res.status(500).json(erro.sqlMessage);
//     });
// }

// function desativarSolicitacao(req, res) {
//     var id = req.params.id;

//     if (!id) {
//         return res.status(400).send("ID da solicitação é obrigatório!");
//     }

//     solicitacaoModel.desativarSolicitacao(id).then(function (resultado) {
//         res.json(resultado);
//     }).catch(function (erro) {
//         console.error("Erro ao desativar solicitação:", erro);
//         res.status(500).json(erro.sqlMessage);
//     });
// }

function editarSolicitacao(req, res) {
    console.log("Dados recebidos para edição:", req.body); // Log dos dados
    var { idServer, nomeServer, emailServer, telefoneServer, empresaServer } = req.body;

    if (!idServer || !nomeServer || !emailServer || !telefoneServer || !empresaServer) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    solicitacaoModel.editarSolicitacao(idServer, nomeServer, emailServer, telefoneServer, empresaServer)
        .then((resultado) => res.json(resultado))
        .catch((erro) => {
            console.error("Erro ao editar solicitação:", erro);
            res.status(500).json({ message: "Erro interno ao editar a solicitação." });
        });
}


function desativarSolicitacao(req, res) {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send("ID é obrigatório!");
    }

    solicitacaoModel.desativarSolicitacao(id)
        .then(resultado => {
            res.json({ mensagem: "Solicitação desativada com sucesso!", resultado });
        })
        .catch(erro => {
            console.error("Erro ao desativar solicitação:", erro);
            res.status(500).json({ mensagem: "Erro ao desativar solicitação.", erro });
        });
}

module.exports = {
    cadastrarSolicitacao,
    listarSolicitacoes,
    editarSolicitacao,
    desativarSolicitacao
}