drop database smartthink;
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
create table usuario 
(
    idUsuario int auto_increment primary key,
    nome varchar(85) not null,
    cpf varchar(11) unique not null,
    cargo varchar(50),
    telefone varchar(12),
    email varchar(100) unique not null,
    senha varchar(20) not null,
    idEmpresa int not null,
    
    foreign key (idEmpresa) references empresa(idEmpresa)
);

-- select*from usuario;
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


-- inserção de empresas matriz
insert into empresa (codigo, nomeFantasia, razaoSocial, apelido, cnpj, 
logradouro, cep, numeroLogradouro, cidade, estado, email, telefone, senha, idMatriz) 
values 
('MAT001', 'FastFood Central', 'FastFood Central Ltda.', 'Central', '12345678000199', 'Avenida Principal', 
'01001000', '1000', 'São Paulo', 'SP', 'contato@fastfoodcentral.com', '11987654321', 'senhaMatriz1', null),

('MAT002', 'Burger King Brasil', 'Burger King Brasil S.A.', 'BK Brasil', '98765432000188', 'Rua das Palmeiras',
 '02020000', '2000', 'Rio de Janeiro', 'RJ', 'contato@burgerkingbrasil.com', '21987654321', 'senhaMatriz2', null); 
 
 -- inserção de filiais vinculadas às matrizes
insert into empresa (codigo, nomeFantasia, razaoSocial, apelido, cnpj, logradouro, cep, numeroLogradouro, 
cidade, estado, email, telefone, senha, idMatriz) 

values 
('FIL001', 'FastFood Central - Centro', 'FastFood Central Ltda.', 'Central Centro', '123456780001AA', 'Rua Centro',
 '01001001', '1010', 'São Paulo', 'SP', 'centro@fastfoodcentral.com', '11987654322', 'senhaFilial1', 1), 
 
('FIL002', 'FastFood Central - Norte', 'FastFood Central Ltda.', 'Central Norte', '123456780001BB', 'Avenida Norte',
 '01001002', '1020', 'São Paulo', 'SP', 'norte@fastfoodcentral.com', '11987654323', 'senhaFilial2', 1), 
 
('FIL003', 'Burger King RJ - Copacabana', 'Burger King Brasil S.A.', 'BK Copacabana', '987654320001CC', 'Avenida Atlântica', 
'22041001', '3000', 'Rio de Janeiro', 'RJ', 'copacabana@burgerkingbrasil.com', '21987654322', 'senhaFilial3', 2),

('FIL004', 'Burger King SP - Ibirapuera', 'Burger King Brasil S.A.', 'BK Ibirapuera', '987654320001DD', 'Rua Ibirapuera',
 '04052001', '4000', 'São Paulo', 'SP', 'ibirapuera@burgerkingbrasil.com', '21987654323', 'senhaFilial4', 2),
 
('FIL005', 'FastFood Central - Sul', 'FastFood Central Ltda.', 'Central Sul', '123456780001EE', 'Rua Sul', '01001003', 
'1030', 'São Paulo', 'SP', 'sul@fastfoodcentral.com', '11987654324', 'senhaFilial5', 1), 

('FIL006', 'Burger King RJ - Barra da Tijuca', 'Burger King Brasil S.A.', 'BK Barra', '987654320001FF', 'Avenida das Américas'
, '22640000', '5000', 'Rio de Janeiro', 'RJ', 'barra@burgerkingbrasil.com', '21987654324', 'senhaFilial6', 2),

('FIL007', 'FastFood Central - Leste', 'FastFood Central Ltda.', 'Central Leste', '123456780001GG', 'Avenida Leste', 
'01001004', '1040', 'São Paulo', 'SP', 'leste@fastfoodcentral.com', '11987654325', 'senhaFilial7', 1), 

('FIL008', 'Burger King SP - Morumbi', 'Burger King Brasil S.A.', 'BK Morumbi', '987654320001HH', 'Rua Morumbi', 
'04052002', '6000', 'São Paulo', 'SP', 'morumbi@burgerkingbrasil.com', '21987654324', 'senhaFilial8', 2); 

-- Campanhas
insert into campanha (nome, descricao) 
values 
('promoção de verão', 'descontos especiais durante o verão em todos os produtos.'), 
('lançamento do novo burger', 'apresentação do nosso mais novo hambúrguer gourmet.'), 
('combo família', 'combos especiais para famílias com 4 ou mais pessoas.'), 
('happy hour', 'descontos em bebidas durante o horário de happy hour.'), 
('natal fastfood', 'promoções exclusivas para o período natalino.'),
('semana do cliente', 'benefícios e descontos para clientes fidelizados.'), 
('dia das crianças', 'ofertas especiais para crianças, incluindo brinquedos.'), 
('black friday', 'descontos imperdíveis na black friday.'); 

-- publicos-Alvos
insert into publicoAlvo (nome) 
values 
('jovens entre 18-25 anos'),
('famílias com crianças'), 
('profissionais de escritório'), 
('estudantes universitários'), 
('atletas e entusiastas de fitness'),
('idosos ativos'), 
('turistas'),
('amantes de comida gourmet');

-- Regiões
insert into regiao (nome) 
values 
('centro'), 
('zona norte'), 
('zona sul'), 
('zona leste'), 
('zona oeste'), 
('barra da tijuca'),
('copacabana'), 
('ibirapuera'); 

-- relacionando campanhas com públicos-alvo
insert into campanhaPublicoAlvo (idCampanha, idPublicoAlvo) 
values 
(1, 1), 
(2, 8), 
(3, 2),
(4, 3), 
(5, 2), 
(6, 7),
(7, 2), 
(8, 1); 

-- relacionando campanhas com regiões-alvo
insert into campanhaRegiaoAlvo (idCampanha, idRegiao) 
values 
(1, 1), 
(2, 2),
(3, 3),
(4, 4), 
(5, 5),
(6, 6), 
(7, 7), 
(8, 8); 

-- relacionando campanhas com empresas (matriz e filiais)
insert into campanhaRestaurante (idCampanha, idEmpresa) 
values 
(1, 1), 
(2, 2), 
(3, 3), 
(4, 7), 
(5, 2), 
(6, 4), 
(7, 6), 
(8, 5); 

-- Funcionarios
insert into funcionario (nome, cpf, cargo, telefone, email, senha, idEmpresa) 
values 
('ana paula souza', '12345678901', 'Diretor de marketing', '11987654325', 'ana.souza@fastfoodcentral.com', 'senhaFunc1',1), 
('bruno oliveira', '23456789012', 'Analista de marketing', '21987654325', 'bruno.oliveira@burgerkingbrasil.com', 'senhaFunc2',2),
('carlos mendes', '34567890123', 'Gerente de marketing', '11987654326', 'carlos.mendes@fastfoodcentral.com', 'senhaFunc3',3), 
('daniela lima', '45678901234', 'Gerente de marketing', '21987654326', 'daniela.lima@burgerkingbrasil.com', 'senhaFunc4',4),
('eduardo fernandes', '56789012345', 'Analista de marketing', '11987654327', 'eduardo.fernandes@fastfoodcentral.com', 'senhaFunc5',5), 
('fernanda costa', '67890123456', 'Analista de marketing', '21987654327', 'fernanda.costa@burgerkingbrasil.com','senhaFunc6',6),
('gabriel rocha', '78901234567', 'Gerente de marketing', '11987654328', 'gabriel.rocha@fastfoodcentral.com','senhaFunc7',7), 
('helena martins', '89012345678', 'Diretor de marketing', '21987654328', 'helena.martins@burgerkingbrasil.com', 'senhaFunc8',8);


-- palavras-chave
insert into palavraChave (palavra) 
values 
('hambúrguer'),
('batata frita'),
('combo'), 
('promoção'), 
('delivery'), 
('vegano'),
('gourmet'),
('desconto');

-- relacionando palavras-chave com empresas
insert into interessePalavraChave (idPalavraChave, idEmpresa) 
values 
(1, 1), 
(2, 1), 
(3, 1),
(4, 2), 
(5, 2), 
(6, 2), 
(7, 1),
(8, 2); 

-- relacionando regiões com empresas
insert into interesseRegiao (idRegiao, idEmpresa) 
values 
(1, 1), 
(2, 2),
(3, 3), 
(4, 4), 
(5, 5),
(6, 6), 
(7, 7),
(8, 8); 
