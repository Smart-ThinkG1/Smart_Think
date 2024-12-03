var database = require("../database/config");

function listar() {

    var instrucaoSql = `SELECT e.id, e.codigo, e.nomeFantasia, e.razaoSocial, e.apelido, e.cnpj, e.estado, e.cep, e.logradouro, e.email, e.telefone
FROM empresa e
JOIN empresa m ON e.fkMarca = m.id
WHERE m.codigo = 'MARCA001';` ;
  
    return database.executar(instrucaoSql);
  }


function unidadeComMaisReclamacoes() {
    const query = `
     SELECT 
    e.nomeFantasia AS unidade,
    COUNT(r.id) AS total_reclamacoes
FROM 
    reclamacao r
JOIN 
    empresa e ON r.fkEmpresa = e.id
WHERE 
    DATE_FORMAT(r.dataExtracao, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m')  -- Compara ano e mês
GROUP BY 
    e.id
ORDER BY 
    total_reclamacoes DESC
LIMIT 1;
`;
    return database.executar(query);
}


function NegativasXPositivas() {
    const query = `
     SELECT 
    COUNT(CASE WHEN qtdEstrela >= 4 THEN 1 ELSE NULL END) AS AvaliacoesPositivas,
    COUNT(CASE WHEN qtdEstrela < 4 THEN 1 ELSE NULL END) AS AvaliacoesNegativas,
    CONCAT(
        COUNT(CASE WHEN qtdEstrela >= 4 THEN 1 ELSE NULL END), 
        ' avaliações positivas para cada ', 
        COUNT(CASE WHEN qtdEstrela < 4 THEN 1 ELSE NULL END), 
        ' avaliações negativas'
    ) AS Proporcao
FROM 
    avaliacao
WHERE 
    dataExtracao >= DATE_ADD(CURRENT_DATE(), INTERVAL -3 MONTH);
`;
    return database.executar(query);
}

function DivisaoSatisfacao(req, res) {
    const query = `
     SELECT 
    -- Porcentagem de avaliações positivas (>= 4 estrelas)
    (COUNT(CASE WHEN qtdEstrela >= 4 THEN 1 END) / COUNT(*)) * 100 AS PorcentagemPositivas,

    -- Porcentagem de avaliações neutras (== 3 estrelas)
    (COUNT(CASE WHEN qtdEstrela = 3 THEN 1 END) / COUNT(*)) * 100 AS PorcentagemNeutras,

    -- Porcentagem de avaliações negativas (< 3 estrelas)
    (COUNT(CASE WHEN qtdEstrela < 3 THEN 1 END) / COUNT(*)) * 100 AS PorcentagemNegativas

FROM 
    avaliacao;
`;
    return database.executar(query);
}



module.exports = {
    listar,
    unidadeComMaisReclamacoes,
    NegativasXPositivas,
    DivisaoSatisfacao
};
