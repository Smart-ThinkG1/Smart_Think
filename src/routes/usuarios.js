var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});
router.put("/editar/:idfuncionario", function (req, res) {
    const { idfuncionario } = req.params;
    if (!idfuncionario) {
        return res.status(400).send("ID do funcionário não foi fornecido.");
    }
    usuarioController.editar(req, res);
});

router.get("/buscar/:idfuncionario", function (req, res) {
    const { idfuncionario } = req.params;
    if (!idfuncionario) {
        return res.status(400).send("ID do funcionário não fornecido. (U)");
    }
    usuarioController.buscar(req, res);
});

router.put("/deletar/:idfuncionario", function (req, res) {
    const { idfuncionario } = req.params;
    if (!idfuncionario) {
        return res.status(400).send("ID do funcionário não fornecido.");
    }
    usuarioController.deletar(req, res);
});


module.exports = router;