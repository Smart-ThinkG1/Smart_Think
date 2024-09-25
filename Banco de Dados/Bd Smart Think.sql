create database smartThink;

use smartThink;

create table restauranteMatriz 
(
    idMatriz int auto_increment primary key,
    nomeFantasia varchar(65) not null,
    razaoSocial varchar(65) not null,
    apelido varchar(40),
    cnpj char(14) unique not null,
    logradouro varchar(100) not null, 
    cep char(8) not null,
    numero varchar(12) not null,
    cidade varchar(80) not null,
    estado varchar(80) not null,
    email varchar(75) not null,
    telefone char(11)
);

create table filial 
(
    idFilial int auto_increment primary key,
    codigo varchar(15) not null, 
    idMatriz int not null,
    nomeFantasia varchar(65) not null,
    razaoSocial varchar(65) not null,
    apelido varchar(40),
    cnpj char(14) unique not null,
    logradouro varchar(100) not null, 
    cep char(8) not null,
    numero varchar(12) not null,
    cidade varchar(80) not null,
    estado varchar(80) not null,
    email varchar(75) not null,
    telefone char(11),
    foreign key (idMatriz) references restauranteMatriz(idMatriz) 
);

create table produtoPrincipal 
(
    idProduto int auto_increment primary key,
    nomeProduto varchar(85) not null,
    descricao varchar(200),
    preco decimal(10, 2),
    idMatriz int,
    foreign key (idMatriz) references restauranteMatriz(idMatriz)
);

create table campanha 
(
    idCampanha int auto_increment primary key,
    nome varchar(85) not null,
    descricao varchar(200)
);

create table campanhaRestaurante 
(
    idCampanhaRestaurante int auto_increment primary key,
    idCampanha int not null,
    idMatriz int,
    idFilial int,
    
    foreign key (idCampanha) references campanha(idCampanha) on delete cascade,
    foreign key (idMatriz) references restauranteMatriz(idMatriz) on delete cascade,
    foreign key (idFilial) references filial(idFilial) on delete cascade,

    constraint campanha_restaurante_check check (
        (idMatriz is not null and idFilial is null) or (idMatriz is null and idFilial is not null)
    )
);

create table publicoAlvo 
(
    idPublicoAlvo int auto_increment primary key,
    nome varchar(85) not null
);

create table regiaoAlvo 
(
    idRegiaoAlvo int auto_increment primary key,
    nome varchar(85) not null
);

create table campanhaPublicoAlvo 
(
	idCampanhaPublicoAlvo int auto_increment primary key,
    idCampanha int not null,
    idPublicoAlvo int not null,
    foreign key (idCampanha) references campanha(idCampanha),
    foreign key (idPublicoAlvo) references publicoAlvo(idPublicoAlvo)
);

create table campanhaRegiaoAlvo 
(
	idCampanhaRegiaoAlvo int auto_increment primary key,
    idCampanha int not null,
    idRegiaoAlvo int not null,
    foreign key (idCampanha) references campanha(idCampanha),
    foreign key (idRegiaoAlvo) references regiaoAlvo(idRegiaoAlvo)
);

create table funcionario 
(
    idFuncionario int auto_increment primary key,
    nome varchar(85) not null,
    cpf varchar(11) unique not null,
    cargo varchar(50),
    telefone varchar(12),
    email varchar(100) unique not null,
    idFilial int not null,
    foreign key (idFilial) references filial(idFilial)
);

create table palavraChave
(
    idPalavraChave int auto_increment primary key,
    palavra varchar(85) not null
);

create table interessePalavraChave 
(
    idInteressePalavraChave int auto_increment primary key,
    idPalavraChave int not null,
    idMatriz int,
    idFilial int,
    
    foreign key (idPalavraChave) references palavraChave(idPalavraChave) on delete cascade,
    foreign key (idMatriz) references restauranteMatriz(idMatriz) on delete cascade,
    foreign key (idFilial) references filial(idFilial) on delete cascade,

    constraint interesse_palavrachave_check check (
        (idMatriz is not null and idFilial is null) or
        (idMatriz is null and idFilial is not null)
    )
);

create table interesseRegiao 
(
    idInteresseRegiao int auto_increment primary key,
    idRegiaoAlvo int not null,
    idMatriz int,
    idFilial int,
    
    foreign key (idRegiaoAlvo) references regiaoAlvo(idRegiaoAlvo) on delete cascade,
    foreign key (idMatriz) references restauranteMatriz(idMatriz) on delete cascade,
    foreign key (idFilial) references filial(idFilial) on delete cascade,

    constraint interesse_regiao_check check (
        (idMatriz is not null and idFilial is null) or
        (idMatriz is null and idFilial is not null)
    )
);

