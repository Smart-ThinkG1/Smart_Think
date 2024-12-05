var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}' AND estado = 'ATIVO'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT id, razaoSocial, cnpj, codigo FROM empresa`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function buscarFKPorCodigo(codigo) {
  var instrucaoSql = `SELECT id FROM empresa WHERE codigo = ?`;

  return database.executar(instrucaoSql, [codigo]);

}

function buscarUnidadesPorMarca(fkMarca) {
  var instrucaoSql = `
      SELECT *
      FROM empresa
      WHERE fkMarca = ? AND estado = 'ATIVO';
  `;
  return database.executar(instrucaoSql, [fkMarca]);
}
function atualizar(fkEmpresa, novosDados) {
  var instrucaoSql = `
  UPDATE empresa SET
  razaoSocial = '${novosDados.razaoSocial}',
  apelido = '${novosDados.apelido}',
  nomeFantasia = '${novosDados.nomeFantasia}',
  cnpj = '${novosDados.cnpj}',
  logradouro = '${novosDados.logradouro}',
  cep = '${novosDados.cep}',
  email = '${novosDados.email}',
  telefone = '${novosDados.telefone}'
  WHERE id = ${fkEmpresa}
  `;

  return database.executar(instrucaoSql);
}

function deletar(fkEmpresa) {
  var instrucaoSql = `
      UPDATE empresa
      SET estado = 'INATIVO'
      WHERE id = ${fkEmpresa};
  `;

  return database.executar(instrucaoSql);
}
function cadastrar(fkEmpresa, novosDados) {
  var instrucaoSql = `
  INSERT INTO empresa (codigo, nomeFantasia, razaoSocial, apelido, cnpj, cep, logradouro, email, telefone, fkMarca) 
  VALUES (
    '${novosDados.codigo}',
    '${novosDados.nomeFantasia}',
    '${novosDados.razaoSocial}',
    '${novosDados.apelido}',
    '${novosDados.cnpj}',
    '${novosDados.cep}', 
    '${novosDados.logradouro}',
    '${novosDados.email}',
    '${novosDados.telefone}',
    ${fkEmpresa});
  `;

  return database.executar(instrucaoSql);
}


module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
  buscarFKPorCodigo,
  buscarUnidadesPorMarca,
  atualizar,
  deletar
};
