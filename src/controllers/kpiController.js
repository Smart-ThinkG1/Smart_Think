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


function unidadeComMaisReclamacoes(req, res) {
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
        .then(function (resultado) {
            if (resultado && resultado.length > 0) {
                const avaliacoes = resultado[0]; // Supondo que resultado seja um array de objetos

                // Verifique se as propriedades existem
                if (avaliacoes.AvaliacoesPositivas !== undefined && avaliacoes.AvaliacoesNegativas !== undefined) {
                    res.status(200).json({
                        AvaliacoesPositivas: avaliacoes.AvaliacoesPositivas,
                        AvaliacoesNegativas: avaliacoes.AvaliacoesNegativas
                    });
                } else {
                    res.status(204).send("Dados de avaliações não encontrados!");
                }
            } else {
                res.status(204).send("Nenhuma reclamação encontrada neste mês!");
            }
        })
        .catch(function (erro) {
            // Log do erro para análise
            console.error('Erro ao buscar dados: ', erro);
            // Retorno do erro com status 500
            res.status(500).json({ message: "Erro ao buscar dados", error: erro.sqlMessage || erro });
        });
}

function DivisaoSatisfacao(req, res) {
    kpiModel.DivisaoSatisfacao()
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

  

  module.exports = {
    listar,
    unidadeComMaisReclamacoes,
    NegativasXPositivas,
    DivisaoSatisfacao
};
