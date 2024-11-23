var express = require("express");
var router = express.Router();

const reclamacaoController = require('../controllers/reclamacoesController');
const graficoController = require('../controllers/graficoController');

router.get("/totalReclamacoesAvaliacoes/:fkEmpresa", function (req, res) {
  graficoController.obterTotalReclamacoesEAvaliacoesPorMes(req, res);
});

router.get("/buscarDiasSemana/:fkEmpresa", function (req, res) {
  graficoController.buscarDiasSemana(req, res);
});


module.exports = router;