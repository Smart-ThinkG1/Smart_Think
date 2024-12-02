var graficoModel = require("../models/graficoModel");


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






module.exports = {
    obterDadosUnidade,
    obterTotalReclamacoesEAvaliacoesPorMes,
    buscarDiasSemana
  };