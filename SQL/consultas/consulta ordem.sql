SELECT ordem.id, ordem.dataPedido, ordem.i_processo, 
    ordem.solicitante, ordem.departamento, ordem.aplicacao, ordem.prazo,
    processos.modalidade, 
    processos.sigla_modal, processos.data_homolog, credores.nome AS nomeC, 
    credores.cgc AS cnpjC, credores.endereco AS enderecoC, credores.cidade AS cidadeC, 
    credores.unidade_federacao, entidades.nome, entidades.cnpj, entidades.bairro, entidades.cidade, 
    entidades.estado, entidades.cep, entidades.email 
    FROM ordem, processos, credores, entidades 
    WHERE (ordem.i_processo = processos.i_processo) and 
    (ordem.id = '$nOrdem') and (ordem.ano = processos.i_ano_proc) and
    (ordem.i_credores = credores.i_credores) and 
    (ordem.id_entidade = entidades.id)";