CREATE DATABASE IF NOT EXISTS smartthink;
USE smartthink;

-- Tabela de Empresas
CREATE TABLE empresa 
(
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(15),
    nomeFantasia VARCHAR(65),
    razaoSocial VARCHAR(65),
    apelido VARCHAR(40),
    cnpj CHAR(14),
    cep CHAR(8),
    logradouro VARCHAR(100),
    email VARCHAR(75),
    telefone CHAR(11),
    idMarca INT,
    FOREIGN KEY (idMarca) REFERENCES empresa(idEmpresa)
);

-- Tabela de Funcionários
CREATE TABLE funcionario 
(
    idFuncionario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(85),
    cpf VARCHAR(11),
    cargo VARCHAR(50),
    telefone VARCHAR(12),
    email VARCHAR(100),
    senha VARCHAR(20),
    fotoPerfil VARCHAR(250),
    empresa_idEmpresa INT,
    FOREIGN KEY (empresa_idEmpresa) REFERENCES empresa(idEmpresa)
);

-- Tabela de Reclamações
CREATE TABLE reclamacao
(
    idReclamacoes INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(45),
    descricao VARCHAR(200),
    DataExtracao DATE,
    empresa_idEmpresa INT,
    FOREIGN KEY (empresa_idEmpresa) REFERENCES empresa(idEmpresa)
);

-- Tabela de Demanda Pesquisa 
CREATE TABLE demandaPesquisa 
(
    idPesquisa INT AUTO_INCREMENT PRIMARY KEY,
    nivel_interesse INT,
    TimeLeitura TIME,
    DataLeitura DATE,
    DataExtracao DATETIME,
    empresa_idEmpresa INT,
    FOREIGN KEY (empresa_idEmpresa) REFERENCES empresa(idEmpresa)
);

-- Tabela de Avaliação
CREATE TABLE avaliacao 
(
    idComentarios INT AUTO_INCREMENT PRIMARY KEY,
    QtdEstrela INT,
    descricao_comentario TEXT,
    DataExtracao DATETIME,
    empresa_idEmpresa INT,
    FOREIGN KEY (empresa_idEmpresa) REFERENCES empresa(idEmpresa)
);

-- Tabela de Prompts 
CREATE TABLE prompt 
(
    idprompt INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(50),
    pergunta VARCHAR(200),
    reclamacoes_idReclamacoes INT,
    demandaPesquisa_idPesquisa INT,
    avaliacao_idAvaliacao INT,
    FOREIGN KEY (reclamacoes_idReclamacoes) REFERENCES reclamacao(idReclamacoes),
    FOREIGN KEY (demandaPesquisa_idPesquisa) REFERENCES demandaPesquisa(idPesquisa),
    FOREIGN KEY (avaliacao_idAvaliacao) REFERENCES avaliacao(idComentarios)
);

-- Tabela de Insights
CREATE TABLE insights 
(
    idInsights INT AUTO_INCREMENT PRIMARY KEY,
    data DATE,
    hora TIME,
    resposta VARCHAR(200),
    prompt_idprompt INT,
    FOREIGN KEY (prompt_idprompt) REFERENCES prompt(idprompt)
);
