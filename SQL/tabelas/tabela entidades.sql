CREATE TABLE entidades (id serial, nome varchar(255), cnpj varchar(20), bairro varchar(255), cidade varchar(255), estado varchar(255), cep varchar(15), email varchar(255)) CHARACTER SET utf8 COLLATE utf8_general_ci;

INSERT INTO entidades (nome, cnpj, bairro, cidade, estado, cep, email) VALUES ('MUNICIPIO DE MONTE CARLO', '95.996.104/0001-04', 'CENTRO', 'MONTE CARLO', 'SANTA CATARINA', '89.618-000', 'compras2@montecarlo.sc.gov.br');

INSERT INTO entidades (nome, cnpj, bairro, cidade, estado, cep, email) VALUES ('FUNDO MUNICIPAL DE SAUDE', '04.923.189/0001-45', 'CENTRO', 'MONTE CARLO', 'SANTA CATARINA', '89.618-000', 'compras2@montecarlo.sc.gov.br');