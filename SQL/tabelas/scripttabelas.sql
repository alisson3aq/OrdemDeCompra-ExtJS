CREATE TABLE entidades (id serial, nome varchar(255), cnpj varchar(20), bairro varchar(255), cidade varchar(255), estado varchar(255), cep varchar(15), email varchar(255)) CHARACTER SET utf8 COLLATE utf8_general_ci;

INSERT INTO entidades (nome, cnpj, bairro, cidade, estado, cep, email) VALUES ('MUNICIPIO DE MONTE CARLO', '95.996.104/0001-04', 'CENTRO', 'MONTE CARLO', 'SANTA CATARINA', '89.618-000', 'compras2@montecarlo.sc.gov.br');

INSERT INTO entidades (nome, cnpj, bairro, cidade, estado, cep, email) VALUES ('FUNDO MUNICIPAL DE SAUDE', '04.923.189/0001-45', 'CENTRO', 'MONTE CARLO', 'SANTA CATARINA', '89.618-000', 'compras2@montecarlo.sc.gov.br');

CREATE TABLE itens_ordem (id serial, ano int, id_ordem int, i_material int, nome_mat varchar(255), nome_marca varchar(255), un_codi varchar(20), preco_unit_part float, qtde_comprar float, subtotal float) CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE ordem (id serial, dataPedido varchar(12), ano int, i_processo int, i_credores int, id_entidade int, solicitante varchar(255), departamento varchar(255), aplicacao varchar(255), prazo varchar(12), nome varchar(40),situacao int) CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE usuarios (iduser serial, nome varchar(40), login varchar(40), senha varchar(50), email varchar(100)) CHARACTER SET utf8 COLLATE utf8_general_ci;

INSERT INTO usuarios (nome, login, senha, email) VALUES ( 'Rafael Barzotto', 'rafael', '200820e3227815ed1756a6b531e7e0d2', 'rafabarzotto@hotmail.com');