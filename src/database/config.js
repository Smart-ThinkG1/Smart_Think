const mysql = require('mysql2/promise');

// CONFIGURAÇÃO DO POOL DE CONEXÕES
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// FUNÇÃO PARA EXECUTAR CONSULTAS SQL
async function executar(instrucaoSql, parametros = []) {
    try {
        const [resultados] = await pool.execute(instrucaoSql, parametros);
        return resultados;
    } catch (erro) {
        console.error("Erro ao executar a instrução SQL:", erro.sqlMessage || erro.message);
        throw erro;
    }
}

module.exports = {
    executar
};
