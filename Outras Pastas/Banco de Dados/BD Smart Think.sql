create database smartThink;

use smartThink;

-- Restaurante de fast food matriz ou filial
create table empresa 
(
    idEmpresa int auto_increment primary key,
    codigo varchar(15) not null,
    nomeFantasia varchar(65) not null,
    razaoSocial varchar(65) not null,
    apelido varchar(40),
    cnpj char(14) unique not null,
    logradouro varchar(100) not null, 
    cep char(8) not null,
    numeroLogradouro varchar(12) not null,
    cidade varchar(80) not null,
    estado varchar(80) not null,
    email varchar(75) unique not null,
    telefone char(11),
    senha varchar(20),
    idMatriz int, 
    
    foreign key (idMatriz) references Empresa(idEmpresa) 
);

-- Campanha publicitária
create table campanha 
(
    idCampanha int auto_increment primary key,
    nome varchar(85) not null,
    descricao varchar(200)
);

-- Públicos-alvo das campanhas
create table publicoAlvo 
(
    idPublicoAlvo int auto_increment primary key,
    nome varchar(85) not null
);

-- Tabela Regiao representando as regiões de interesse da empresa ou alvo da campanha
create table regiao
(
    idRegiao int auto_increment primary key,
    nome varchar(85) not null
);

-- Tabela de relacionamento entre campanhas e públicos-alvo
create table campanhaPublicoAlvo 
(
	idCampanhaPublicoAlvo int auto_increment primary key,
    idCampanha int not null,
    idPublicoAlvo int not null,
    
    foreign key (idCampanha) references campanha(idCampanha),
    foreign key (idPublicoAlvo) references publicoAlvo(idPublicoAlvo)
);

-- Tabela de relacionamento entre campanhas e regiões-alvo
create table campanhaRegiaoAlvo 
(
	idCampanhaRegiaoAlvo int auto_increment primary key,
    idCampanha int not null,
    idRegiao int not null,
    
    foreign key (idCampanha) references campanha(idCampanha),
    foreign key (idRegiao) references regiao(idRegiao)
);

-- Tabela de relacionamento entre campanhas e empresas (matriz ou filial)
create table campanhaRestaurante 
(
    idCampanhaRestaurante int auto_increment primary key,
    idCampanha int not null,
    idEmpresa int not null,
    
    foreign key (idCampanha) references campanha(idCampanha),
    foreign key(idEmpresa) references empresa(idEmpresa)
);

-- Funcionários com acesso as áreas de suas filiais
create table funcionario 
(
    idFuncionario int auto_increment primary key,
    nome varchar(85) not null,
    cpf varchar(11) unique not null,
    cargo varchar(50),
    telefone varchar(12),
    email varchar(100) unique not null,
    idEmpresa int not null,
    senha varchar(20) not null,
    
    foreign key (idEmpresa) references empresa(idEmpresa)
);


-- Representa palavras-chave de interesse da empresa
create table palavraChave
(
    idPalavraChave int auto_increment primary key,
    palavra varchar(85) not null
);

-- Tabela de relacionamento entre palavras-chave e empresas
create table interessePalavraChave 
(
    idInteressePalavraChave int auto_increment primary key,
    idPalavraChave int not null,
	idEmpresa int not null,
    
    foreign key (idPalavraChave) references palavraChave(idPalavraChave),
	foreign key(idEmpresa) references empresa(idEmpresa)
);

-- Tabela de relacionamento entre regiãos e empresas
create table interesseRegiao 
(
    idInteresseRegiao int auto_increment primary key,
    idRegiao int not null,
    idEmpresa int not null,
    
    
    foreign key (idRegiao) references regiao(idRegiao),
    foreign key(idEmpresa) references empresa(idEmpresa)
);


