use smartThink;

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
insert into funcionario (nome, cpf, cargo, telefone, email, idEmpresa, senha) 
values 
('ana paula souza', '12345678901', 'Diretor de marketing', '11987654325', 'ana.souza@fastfoodcentral.com', 1, 'senhaFunc1'), 
('bruno oliveira', '23456789012', 'Analista de marketing', '21987654325', 'bruno.oliveira@burgerkingbrasil.com', 2, 'senhaFunc2'),
('carlos mendes', '34567890123', 'Gerente de marketing', '11987654326', 'carlos.mendes@fastfoodcentral.com', 3, 'senhaFunc3'), 
('daniela lima', '45678901234', 'Gerente de marketing', '21987654326', 'daniela.lima@burgerkingbrasil.com', 4, 'senhaFunc4'),
('eduardo fernandes', '56789012345', 'Analista de marketing', '11987654327', 'eduardo.fernandes@fastfoodcentral.com', 5, 'senhaFunc5'), 
('fernanda costa', '67890123456', 'Analista de marketing', '21987654327', 'fernanda.costa@burgerkingbrasil.com', 6, 'senhaFunc6'),
('gabriel rocha', '78901234567', 'Gerente de marketing', '11987654328', 'gabriel.rocha@fastfoodcentral.com', 7, 'senhaFunc7'), 
('helena martins', '89012345678', 'Diretor de marketing', '21987654328', 'helena.martins@burgerkingbrasil.com', 8, 'senhaFunc8');


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