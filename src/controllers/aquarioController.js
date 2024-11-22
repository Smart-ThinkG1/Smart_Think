var aquarioModel = require("../models/aquarioModel");
const database = require('../database/config');

async function buscarAquariosPorEmpresa(fkEmpresa) {
    // Verifique o nome da tabela correta. Parece que deveria ser 'funcionario'
    const instrucaoSql = `
        SELECT * FROM funcionario WHERE fkEmpresa = ?;
    `;

    try {
        const resultados = await database.executar(instrucaoSql, [fkEmpresa]);
        return resultados;
    } catch (erro) {
        console.error("Erro ao buscar funcionários por empresa:", erro);
        throw erro;
    }
}

module.exports = {
    buscarAquariosPorEmpresa
};



function cadastrar(req, res) {
  var descricao = req.body.descricao;
  var idUsuario = req.body.idUsuario;

  if (descricao == undefined) {
    res.status(400).send("descricao está undefined!");
  } else if (idUsuario == undefined) {
    res.status(400).send("idUsuario está undefined!");
  } else {


    aquarioModel.cadastrar(descricao, idUsuario)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  buscarAquariosPorEmpresa,
  cadastrar
}