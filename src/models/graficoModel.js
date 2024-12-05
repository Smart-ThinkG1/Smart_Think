var database = require("../database/config");

function obterDadosUnidade(idUnidade) {
    const instrucaoSql = `
        SELECT 
            SUM(CASE WHEN sentimento = 'positivo' THEN 1 ELSE 0 END) AS positivos,
            SUM(CASE WHEN sentimento = 'neutro' THEN 1 ELSE 0 END) AS neutros,
            SUM(CASE WHEN sentimento = 'negativo' THEN 1 ELSE 0 END) AS negativos
        FROM avaliacao
        WHERE fkUnidade = ${idUnidade};
    `;
    return database.executar(instrucaoSql);
}

function buscarDiasSemana(fkEmpresa) {
    const instrucaoSql = `
        SELECT 
    CASE DATE_FORMAT(dataLeitura, "%W")
        WHEN 'Monday' THEN 'Segunda-feira'
        WHEN 'Tuesday' THEN 'Terça-feira'
        WHEN 'Wednesday' THEN 'Quarta-feira'
        WHEN 'Thursday' THEN 'Quinta-feira'
        WHEN 'Friday' THEN 'Sexta-feira'
        WHEN 'Saturday' THEN 'Sábado'
        WHEN 'Sunday' THEN 'Domingo'
        END AS diaSemana,
        COUNT(*) AS total
        FROM demandaPesquisa
        Where fkEmpresa = ${fkEmpresa}
        GROUP BY diaSemana;`
    return database.executar(instrucaoSql);
}
function obterTotalReclamacoesEAvaliacoesPorMes(fkEmpresa) {
    const instrucaoSql = `
        SELECT 
            mes.mes,
            COALESCE(reclamacoes.totalReclamacoes, 0) AS totalReclamacoes,
            COALESCE(avaliacoes.totalAvaliacoes, 0) AS totalAvaliacoes,
            COALESCE(reclamacoes.totalReclamacoes, 0) + COALESCE(avaliacoes.totalAvaliacoes, 0) AS totalGeral
        FROM (
            SELECT 1 AS mes UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL 
            SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL 
            SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL 
            SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12
        ) AS mes
        LEFT JOIN (
            SELECT 
                MONTH(dataExtracao) AS mes,
                COUNT(*) AS totalReclamacoes
            FROM reclamacao
            WHERE fkEmpresa = ${fkEmpresa}
            GROUP BY MONTH(dataExtracao)
        ) AS reclamacoes ON mes.mes = reclamacoes.mes
        LEFT JOIN (
            SELECT 
                MONTH(dataExtracao) AS mes,
                COUNT(*) AS totalAvaliacoes
            FROM avaliacao
            WHERE fkEmpresa = ${fkEmpresa}
            GROUP BY MONTH(dataExtracao)
        ) AS avaliacoes ON mes.mes = avaliacoes.mes
        ORDER BY mes.mes;
    `;
    return database.executar(instrucaoSql);
}

function obterReclamacoesPorUnidade(fkEmpresa) {
    const instrucaoSql = `
        SELECT 
    m.nomeFantasia AS marca, -- Nome da marca principal
    u.nomeFantasia AS unidade, -- Nome da unidade (filial)
    COUNT(r.id) AS totalReclamacoes -- Total de reclamações por unidade
    FROM reclamacao r
    INNER JOIN empresa u ON r.fkEmpresa = u.id -- Vincula reclamações às unidades (filiais)
    INNER JOIN empresa m ON u.fkMarca = m.id -- Vincula unidades às marcas principais
    WHERE m.id = ${fkEmpresa} -- Substitua "1" pelo ID da marca principal desejada
    GROUP BY m.nomeFantasia, u.nomeFantasia;
    `;
    return database.executar(instrucaoSql);
}

function listarUnidades(fkCodigo) {
    const instrucaoSql = `
         SELECT 
    id AS idUnidade,
    codigo AS codigoUnidade,
    nomeFantasia AS nomeUnidade,
    razaoSocial,
    apelido,
    cnpj,
    estado,
    cep,
    logradouro,
    email,
    telefone
FROM 
    empresa
WHERE 
    fkMarca = (SELECT id FROM empresa WHERE codigo = '${fkCodigo}');


    `;
    return database.executar(instrucaoSql);
}

function listarAvaliacoes(fkEmpresa) {
    const instrucaoSql = `
        SELECT 
            SUM(CASE WHEN qtdEstrela > 3 THEN 1 ELSE 0 END) AS positivos,
            SUM(CASE WHEN qtdEstrela = 3 THEN 1 ELSE 0 END) AS neutros,
            SUM(CASE WHEN qtdEstrela < 3 THEN 1 ELSE 0 END) AS negativos,
            COUNT(qtdEstrela) AS qtdAvaliacoes,
            ROUND(AVG(qtdEstrela), 1) AS mediaEstrelas
        FROM avaliacao 
        WHERE fkEmpresa = ${fkEmpresa};
    `;
    return database.executar(instrucaoSql);
}

function alerta(fkEmpresa){
    const instrucaoSql = `
    SELECT 
    m.nomeFantasia AS marca, -- Nome da marca principal
    u.nomeFantasia AS unidade, -- Nome da unidade (filial)
    COUNT(r.id) AS totalReclamacoes -- Total de reclamações por unidade
    FROM reclamacao r
    INNER JOIN empresa u ON r.fkEmpresa = u.id -- Vincula reclamações às unidades (filiais)
    INNER JOIN empresa m ON u.fkMarca = m.id -- Vincula unidades às marcas principais
    WHERE m.id = ${fkEmpresa} -- Substitua "1" pelo ID da marca principal desejada
    GROUP BY m.nomeFantasia, u.nomeFantasia
    ORDER BY totalReclamacoes DESC -- Ordena por total de reclamações em ordem decrescente
    LIMIT 1; -- Limita o resultado a 1 linha
`;
return database.executar(instrucaoSql);
}

module.exports = {
    obterDadosUnidade,
    obterReclamacoesPorUnidade,
    obterTotalReclamacoesEAvaliacoesPorMes,
    buscarDiasSemana,
    listarAvaliacoes,
    listarUnidades,
    alerta
  };