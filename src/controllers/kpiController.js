var kpiModel = require("../models/kpiModel");

function listar(req, res) {
    kpiModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}


function unidadeMaisReclamacoes(req, res) {
  kpiModel.unidadeComMaisReclamacoes()
      .then(function (resultado) {
          if (resultado.length > 0) {
              res.status(200).json(resultado); // Retorna apenas a unidade com mais reclamações
          } else {
              res.status(204).send("Nenhuma reclamação encontrada neste mês!");
          }
      })
      .catch(function (erro) {
          console.log(erro);
          res.status(500).json(erro.sqlMessage);
      });
}

function NegativasXPositivas(req, res) {
    kpiModel.NegativasXPositivas()
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao buscar dados de avaliações positivas:", erro);
            res.status(500).send(erro.message);
        });
}

  

module.exports = {
    listar,
    unidadeMaisReclamacoes,
    NegativasXPositivas
};
