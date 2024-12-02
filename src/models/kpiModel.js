var database = require("../database/config");

function listar() {
    var instrucaoSql = `
        SELECT e.id, e.codigo, e.nomeFantasia, e.razaoSocial, e.apelido, 
               e.cnpj, e.estado, e.cep, e.logradouro, e.email, e.telefone
        FROM empresa e
        JOIN empresa m ON e.fkMarca = m.id
        WHERE m.codigo = 'MARCA001';
    `;
    return database.executar(instrucaoSql);
}

function unidadeComMaisReclamacoes() {
    const query = `
        SELECT 
            e.nomeFantasia AS Unidade, 
            COUNT(r.id) AS TotalReclamacoes
        FROM 
            reclamacao r
        JOIN 
            empresa e ON r.fkEmpresa = e.id
        WHERE 
            MONTH(r.dataExtracao) = MONTH(CURDATE()) 
            AND YEAR(r.dataExtracao) = YEAR(CURDATE())
        GROUP BY 
            e.id
        ORDER BY 
            TotalReclamacoes DESC
        LIMIT 1;
    `;
    return database.executar(query);
}

function NegativasXPositivas() {
    const query = `
     SELECT AVG(qtdEstrela) AS media_avaliacoes_positivas
    FROM avaliacao a
    JOIN empresa e ON a.fkEmpresa = e.id
    WHERE e.estado = 'ATIVO'
      AND a.qtdEstrela >= 4;
    `;
    return database.executar(query);
}


module.exports = {
    listar,
    unidadeComMaisReclamacoes,
    NegativasXPositivas // Nome ajustado para corresponder à função
};
