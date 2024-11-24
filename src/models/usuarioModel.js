var database = require("../database/config")
var empresa = require("../models/empresaModel")

async function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL\n\n function entrar():", email, senha);

    try {
        // Consulta SQL parametrizada para evitar injeção de SQL
        const instrucaoSql = `
        SELECT funcionario.id, funcionario.nome, funcionario.cpf, funcionario.email, funcionario.senha, funcionario.fkEmpresa, empresa.fkMarca, empresa.codigo
        FROM funcionario
        JOIN empresa ON funcionario.fkEmpresa = empresa.id
        WHERE funcionario.email = ? AND funcionario.senha = ?;
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

module.exports = {
        autenticar,
        cadastrar
    };