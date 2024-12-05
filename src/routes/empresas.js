var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar/:fkEmpresa", function (req, res) {
    empresaController.cadastrar(req, res);
})

router.get("/buscar", function (req, res) {
    empresaController.buscarPorCnpj(req, res);
});

router.get("/buscar/:id", function (req, res) {
  empresaController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
  empresaController.listar(req, res);
});

router.post("/unidades/:fkMarca", function (req, res) {
  empresaController.buscarUnidadesPorMarca(req, res);
});

router.put("/atualizar/:fkEmpresa", function (req, res) {
  empresaController.atualizar(req, res);
});

router.put("/deletar/:fkEmpresa", function (req, res) {
  empresaController.deletar(req, res);
});

module.exports = router;