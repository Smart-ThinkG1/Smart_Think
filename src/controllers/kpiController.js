var kpiModel = require("../models/kpiModel");  


function listar(req, res) {
    const codigo = req.params.codigo;
    kpiModel.listar(codigo)
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
    const codigo = req.params.codigo;
  kpiModel.unidadeComMaisReclamacoes(codigo)
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
    const codigo = req.params.codigo;

    kpiModel.NegativasXPositivas(codigo)
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
    const fkUnidade = req.params.fkUnidade;
    kpiModel.DivisaoSatisfacao(fkUnidade)
        .then(function (resultado) {
            if (resultado.length > 0) {
                const data = resultado[0];


                const quantidadePositivas = Number(data.QuantidadePositivas);
                const quantidadeNeutras = Number(data.QuantidadeNeutras) ;
                const quantidadeNegativas = Number(data.QuantidadeNegativas);

              
                const porcentagemPositivas = Number (data.PorcentagemPositivas);
                const porcentagemNeutras = Number (data.PorcentagemNeutras);
                const porcentagemNegativas = Number (data.PorcentagemNegativas);

                const resposta = {
                    QuantidadePositivas: quantidadePositivas,
                    PorcentagemPositivas: porcentagemPositivas.toFixed(1),
                    QuantidadeNeutras: quantidadeNeutras,
                    PorcentagemNeutras: porcentagemNeutras.toFixed(1),
                    QuantidadeNegativas: quantidadeNegativas,
                    PorcentagemNegativas: porcentagemNegativas.toFixed(1)
                };

                res.status(200).json(resposta);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage || erro.message);
        });
}

function mediaMensal(req, res) {
    const fkUnidade = req.params.fkUnidade;

    if (!fkUnidade) {
        res.status(400).send('FK_EMPRESA não foi fornecido.');
        return;
    }

    kpiModel.mediaMensal(fkUnidade)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]); // Retorna o resultado
            } else {
                res.status(204).send('Nenhum resultado encontrado.');
            }
        })
        .catch(erro => {
            console.error('Erro ao executar consulta:', erro);
            res.status(500).json(erro);
        });
}



  module.exports = {
    listar,
    unidadeComMaisReclamacoes,
    NegativasXPositivas,
    DivisaoSatisfacao,
    mediaMensal
};
