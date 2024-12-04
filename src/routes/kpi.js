var express = require("express");
var router = express.Router();

var kpiController = require("../controllers/kpiController");

router.get("/listar/empresa/:codigo", function (req, res) {
    kpiController.listar(req, res);
});

router.get('/maisReclamacoes/empresa/:codigo', function (req, res) {
    kpiController.unidadeComMaisReclamacoes(req, res);
});

router.get('/NegativasXPositivas/empresa/:codigo', function(req, res) {
  kpiController.NegativasXPositivas(req, res);
});

router.get('/DivisaoSatisfacao/empresa/:fkUnidade', function(req, res) {
  kpiController.DivisaoSatisfacao(req, res);
});

router.get('/mediaMensal/empresa/:fkUnidade', function(req, res){
   kpiController.mediaMensal(req, res);
});



module.exports = router;
