var express = require("express");
var router = express.Router();

var kpiController = require("../controllers/kpiController");

router.get("/listar", function (req, res) {
    kpiController.listar(req, res);
});

router.get('/maisReclamacoes', function (req, res) {
    kpiController.unidadeMaisReclamacoes(req, res);
});

router.get('/NegativasXPositivas', function(req, res) {
  kpiController.NegativasXPositivas(req, res);
});



module.exports = router;
