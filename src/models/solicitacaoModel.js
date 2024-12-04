var database = require("../database/config");

async function cadastrarSolicitacao(nome, email, telefone, empresa) {
    const estado = "ATIVO";
    console.log("ACESSEI O SOLICITAÇÃO MODEL \n\n function cadastrarSolicitacao():", nome, email, telefone, empresa, estado);

    try {
        const instrucaoSql = `
            INSERT INTO solicitacoes (nome, email, telefone, empresa, estado) VALUES (?, ?, ?, ?, ?);
        `;

        const cadastroSolicitacao = await database.executar(instrucaoSql, [nome, email, telefone, empresa, estado]);
        return cadastroSolicitacao;
    } catch (erro) {
        console.error("Erro ao cadastrar solicitação:", erro.message);
        throw erro;
    }
}

async function listarSolicitacoes(estadoFiltro) {
    try {
        const instrucaoSql = `
            SELECT id, nome, telefone, email, empresa 
            FROM solicitacoes 
            WHERE estado = ?;
        `;
        return await database.executar(instrucaoSql, [estadoFiltro]);
    } catch (erro) {
        console.error("Erro ao listar solicitações:", erro.message);
        throw erro;
    }
}

async function editarSolicitacao(idServer, nomeServer, emailServer, telefoneServer, empresaServer) {
    try {
        const instrucaoSql = `
            UPDATE solicitacoes 
        SET nome = ?, email = ?, telefone = ?, empresa = ? 
        WHERE id = ? AND estado = 'ATIVO';
        `;
        return await database.executar(instrucaoSql, [nomeServer, emailServer, telefoneServer, empresaServer, idServer]);
    } catch (erro) {
        console.error("Erro ao editar solicitação:", erro.message);
        throw erro;
    }
}

async function desativarSolicitacao(id) {
    try {
        const instrucaoSql = `
            UPDATE solicitacoes
            SET estado = "INATIVO" 
            WHERE id = ?;
        `;
        return await database.executar(instrucaoSql, [id]);
    } catch (erro) {
        console.error("Erro ao desativar solicitação:", erro.message);
        throw erro;
    }
}

module.exports = {
    cadastrarSolicitacao,
    listarSolicitacoes,
    editarSolicitacao,
    desativarSolicitacao
}