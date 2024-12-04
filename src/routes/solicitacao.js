var express = require("express");
var router = express.Router();

var solicitacaoController = require("../controllers/solicitacaoController");

router.post("/cadastrarSolicitacao", function (req, res) {
    solicitacaoController.cadastrarSolicitacao(req, res)
})

router.get("/listarSolicitacoes", function (req, res) {
    solicitacaoController.listarSolicitacoes(req, res);
});

router.put("/editarSolicitacao", function (req, res) {
    solicitacaoController.editarSolicitacao(req, res);
});

router.delete("/desativarSolicitacao/:id", function (req, res) {
    solicitacaoController.desativarSolicitacao(req, res);
});

module.exports = router