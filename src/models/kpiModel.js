var database = require("../database/config");

function listar(codigo) {

    var instrucaoSql = `SELECT e.id, e.codigo, e.nomeFantasia, e.razaoSocial, e.apelido, e.cnpj, e.estado, e.cep, e.logradouro, e.email, e.telefone
FROM empresa e
JOIN empresa m ON e.fkMarca = m.id
WHERE m.codigo = ?;` ;
  
    return database.executar(instrucaoSql, [codigo]);
  }


function unidadeComMaisReclamacoes(codigo) {
    const query = `
     SELECT 
    e.nomeFantasia AS unidade,
    COUNT(r.id) AS total_reclamacoes
FROM 
    reclamacao r
JOIN 
    empresa e ON r.fkEmpresa = e.id
JOIN 
    empresa m ON e.fkMarca = m.id  -- Junção com a tabela empresa para filtrar pela marca
WHERE 
    m.codigo = ?  -- Filtro pela marca
GROUP BY 
    e.id
ORDER BY 
    total_reclamacoes DESC  -- Ordena pela quantidade de reclamações, em ordem decrescente
LIMIT 1;
`;
    return database.executar(query, [codigo]);
}


function NegativasXPositivas(codigo) {
    const query = `
     SELECT 
    COUNT(CASE WHEN qtdEstrela >= 4 THEN 1 ELSE NULL END) AS AvaliacoesPositivas, -- Avaliações positivas
    COUNT(CASE WHEN qtdEstrela < 4 THEN 1 ELSE NULL END) AS AvaliacoesNegativas, -- Avaliações negativas
    CONCAT(
        COUNT(CASE WHEN qtdEstrela >= 4 THEN 1 ELSE NULL END), 
        ' avaliações positivas para cada ', 
        COUNT(CASE WHEN qtdEstrela < 4 THEN 1 ELSE NULL END), 
        ' avaliações negativas'
    ) AS Proporcao -- Proporção de avaliações positivas para negativas
FROM 
    avaliacao a
JOIN 
    empresa e ON a.fkEmpresa = e.id
JOIN 
    empresa m ON e.fkMarca = m.id -- Relaciona as unidades à marca
WHERE 
    m.codigo = "MARCA001" -- Filtro pela marca
    AND a.dataExtracao >= DATE_ADD(CURRENT_DATE(), INTERVAL -3 MONTH);
`;
    return database.executar(query, [codigo]);
}

function DivisaoSatisfacao(fkUnidade) {
    const query = `
    SELECT 
    COUNT(CASE WHEN qtdEstrela >= 4 THEN 1 END) AS QuantidadePositivas,
    (COUNT(CASE WHEN qtdEstrela >= 4 THEN 1 END) / NULLIF(COUNT(*), 0)) * 100 AS PorcentagemPositivas,

    COUNT(CASE WHEN qtdEstrela = 3 THEN 1 END) AS QuantidadeNeutras,
    (COUNT(CASE WHEN qtdEstrela = 3 THEN 1 END) / NULLIF(COUNT(*), 0)) * 100 AS PorcentagemNeutras,

    COUNT(CASE WHEN qtdEstrela < 3 THEN 1 END) AS QuantidadeNegativas,
    (COUNT(CASE WHEN qtdEstrela < 3 THEN 1 END) / NULLIF(COUNT(*), 0)) * 100 AS PorcentagemNegativas
FROM 
    avaliacao Where fkEmpresa = ?;

`;
    return database.executar(query, [fkUnidade]);
}

function mediaMensal(fkUnidade) {
    const query = `
        SELECT 
    AVG(mensal.totalReclamacoes) AS mediaMensalReclamacoes
FROM (
    SELECT 
        COUNT(r.id) AS totalReclamacoes
    FROM 
        reclamacao r
    JOIN 
        empresa e ON r.fkEmpresa = e.id
    WHERE 
        e.id = ? -- Substitua "?" pelo ID da unidade desejada
    GROUP BY 
        YEAR(r.dataExtracao), MONTH(r.dataExtracao)
) mensal;
    `;

    return database.executar(query, [fkUnidade]);
}






module.exports = {
    listar,
    unidadeComMaisReclamacoes,
    NegativasXPositivas,
    DivisaoSatisfacao,
    mediaMensal
};
