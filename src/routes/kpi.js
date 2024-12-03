var express = require("express");
var router = express.Router();

var kpiController = require("../controllers/kpiController");

router.get("/listar", function (req, res) {
    kpiController.listar(req, res);
});

router.get('/maisReclamacoes', function (req, res) {
    kpiController.unidadeComMaisReclamacoes(req, res);
});

router.get('/NegativasXPositivas', function(req, res) {
  kpiController.NegativasXPositivas(req, res);
});

router.get('/DivisaoSatisfacao', function(req, res) {
  kpiController.DivisaoSatisfacao(req, res);
});



module.exports = router;
