var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarUnidadesPorMarca(req, res) {
  var fkMarca = req.params.fkMarca;

  empresaModel.buscarUnidadesPorMarca(fkMarca)
    .then(resultado => {
      if (resultado.length > 0) {
        res.json(resultado);
      } else {
        res.status(404).json({ message: "Nenhuma unidade encontrada para essa marca." });
      }
    })
    .catch(erro => {
      console.error("Erro ao buscar unidades:", erro);
      res.status(500).json({ message: "Erro ao buscar unidades", erro });
    });
}

function atualizar(req, res) {
  const id = req.params.fkEmpresa;
  const values = req.body;

  console.log(`Atualizando empresa com ID: ${id}`);
  console.log('Novos dados:', values);

  empresaModel.atualizar(id, values)
    .then(() => {
      res.status(200).json({ message: "Empresa atualizada com sucesso" });
      
    })
    .catch(error => {
      console.error("Erro ao atualizar empresa:", error);
      res.status(500).json({ message: "Erro ao atualizar empresa", error: error.toString() });
    });
}

function deletar(req, res) {
  const id = req.params.fkEmpresa;

  console.log(`Deletando empresa com id: ${id}`);

  empresaModel.deletar(id)
    .then(() => {
      res.status(200).json({ message: "Empresa atualizada com sucesso" });
      
    })
    .catch(error => {
      console.error("Erro ao atualizar empresa:", error);
      res.status(500).json({ message: "Erro ao atualizar empresa", error: error.toString() });
    });
}

function cadastrar(req, res) {
  const id = req.params.fkEmpresa;
  const values = req.body;

  console.log(`Criando empresa empresa com ID: ${id}`);
  console.log('Novos dados:', values);

  empresaModel.cadastrar(id, values)
    .then(() => {
      res.status(200).json({ message: "Empresa gerada com sucesso" });
      
    })
    .catch(error => {
      console.error("Erro ao atualizar empresa:", error);
      res.status(500).json({ message: "Erro ao criar empresa", error: error.toString() });
    });
}



module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
  buscarUnidadesPorMarca,
  atualizar,
  deletar
};
