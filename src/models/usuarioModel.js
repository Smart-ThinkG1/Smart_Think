var database = require("../database/config")
var empresa = require("../models/empresaModel")

async function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL\n\n function entrar():", email, senha);

    try {
        // Consulta SQL parametrizada para evitar injeção de SQL
        const instrucaoSql = `
       SELECT 
    funcionario.id as idfunc,
    funcionario.nome, 
    funcionario.email, 
    funcionario.estado as statusFuncionario, 
    funcionario.fkEmpresa,
    e.codigo AS codigo,
    e.estado as estadoEmpresa,
    m.id AS fkMarca,
    funcionario.senha
    
FROM 
    funcionario 
JOIN 
    empresa e ON funcionario.fkEmpresa = e.id
LEFT JOIN 
    empresa m ON e.fkMarca = m.id

WHERE funcionario.email = '${email}' AND funcionario.senha = '${senha}';


    `;
    
        // Executa a consulta com o email e senha em texto simples
        const resultados = await database.executar(instrucaoSql, [email, senha]);

        // Verifica se a consulta retornou um array válido
        if (!resultados || resultados.length === 0) {
            throw new Error("Usuário não encontrado ou senha incorreta");
        }

        // Retorna o array completo de resultados
        return resultados;
    } catch (erro) {
        console.error("Erro ao autenticar usuário:", erro.message);
        throw erro;
    }
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
async function cadastrar(nome, cpf, email, senha, codigo) {
    console.log("ACESSEI O USUARIO MODEL \n\n function cadastrar():", nome, cpf, email, senha, codigo);

    try {
        // Obtenha a FK da empresa usando o código fornecido
        const resultadoEmpresa = await empresa.buscarFKPorCodigo(codigo);
        
        // Verifique se a empresa foi encontrada
        if (!resultadoEmpresa || resultadoEmpresa.length === 0) {
            throw new Error("Código da empresa não encontrado");
        }

        // Pegue o id da empresa
        const fkEmpresa = resultadoEmpresa[0].id;

        // Prepare a instrução SQL de inserção
        const instrucaoSql = `
            INSERT INTO funcionario (nome, cpf, email, senha, fkEmpresa) VALUES (?, ?, ?, ?, ?);
        `;

        // Execute a instrução SQL com os valores parametrizados
        const resultadoCadastro = await database.executar(instrucaoSql, [nome, cpf, email, senha, fkEmpresa]);
        return resultadoCadastro;
    } catch (erro) {
        console.error("Erro ao cadastrar usuário:", erro.message);
        throw erro;
    }
}
async function buscar(id) {
    const instrucaoSql = `
        SELECT nome, email, senha 
        FROM funcionario
        WHERE id = ?;
    `;
    return database.executar(instrucaoSql, [id]);
}

async function editar(nome, email, senha, id) {
    const instrucaoSql = `
        UPDATE funcionario
        SET nome = ?, email = ?, senha = ?
        WHERE id = ?;
    `;
    return database.executar(instrucaoSql, [estado]);
}

async function deletar(id) {
    const instrucaoSql = `
        UPDATE funcionario
        SET estado = "INATIVO"
        WHERE id = ?;
    `;
    return database.executar(instrucaoSql, [id]);
}

module.exports = {
        autenticar,
        cadastrar,
        editar,
        buscar,
        deletar
    };