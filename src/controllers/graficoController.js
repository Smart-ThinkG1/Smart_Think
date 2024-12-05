var graficoModel = require("../models/graficoModel");

function obterDadosUnidade(req, res) {
    const idUnidade = req.params.id;
    graficoModel.obterDadosUnidade(idUnidade)
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => res.status(500).json({ error: "Erro ao obter dados da unidade", detalhe: erro }));
}

function buscarDiasSemana(req,res){
    const fkEmpresa = req.params.fkEmpresa;
    graficoModel.buscarDiasSemana(fkEmpresa)
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => res.status(500).json({ error: "Erro ao obter dados da unidade", detalhe: erro }));
}
function obterTotalReclamacoesEAvaliacoesPorMes(req, res) {
    const fkEmpresa = req.params.fkEmpresa;
    graficoModel.obterTotalReclamacoesEAvaliacoesPorMes(fkEmpresa)
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao obter soma de reclamações e avaliações:", erro);
            res.status(500).json({ error: "Erro ao obter dados", detalhe: erro });
        });
}
function obterReclamacoesPorUnidade(req, res) {
    const fkEmpresa = req.params.fkEmpresa; // ID da empresa principal (marca)
    graficoModel.obterReclamacoesPorUnidade(fkEmpresa)
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.error('Erro ao obter reclamações por unidade:', erro);
            res.status(500).json({ error: 'Erro ao buscar dados do gráfico', detalhe: erro });
        });
}

function listarUnidades(req, res) {
    const fkCodigo = req.params.fkCodigo; // ID da empresa principal (marca)
    graficoModel.listarUnidades(fkCodigo)
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.error('Erro ao obter reclamações por unidade:', erro);
            res.status(500).json({ error: 'Erro ao buscar dados do gráfico', detalhe: erro });
        });
}


function listarAvaliacoes(req, res) {
    const fkEmpresa = req.params.fkEmpresa;

    graficoModel.listarAvaliacoes(fkEmpresa)
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao obter soma de reclamações e avaliações:", erro);
            res.status(500).json({ error: "Erro ao obter dados", detalhe: erro });
        });
}


function alerta(req, res) {
    const fkEmpresa = req.params.fkEmpresa;

    graficoModel.alerta(fkEmpresa)
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao obter soma de reclamações e avaliações:", erro);
            res.status(500).json({ error: "Erro ao obter dados", detalhe: erro });
        });
}



module.exports = {
    obterDadosUnidade,
    obterReclamacoesPorUnidade,
    obterTotalReclamacoesEAvaliacoesPorMes,
    buscarDiasSemana,
    listarUnidades,
    listarAvaliacoes,
    alerta

  };