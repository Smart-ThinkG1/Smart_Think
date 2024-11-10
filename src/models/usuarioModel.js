var database = require("../database/config")

async function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL\n\n function entrar():", email, senha);
    
    try {
        // Consulta SQL parametrizada para evitar injeção de SQL
        const instrucaoSql = `
            SELECT idFuncionario, nome, cpf, email, senha, idEmpresa 
            FROM funcionario 
            WHERE email = ? AND senha = ?;
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
function cadastrar(nome, cpf, email, senha, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cpf, email, senha, idEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO funcionario (nome, cpf, email, senha, idEmpresa) VALUES ('${nome}', '${cpf}','${email}', '${senha}', '${idEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};