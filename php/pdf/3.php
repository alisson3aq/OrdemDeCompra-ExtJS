<?php
    //chama o arquivo de conexão com o bd
    include("../conectar.php");

    $sqlEntidade = "SELECT entidades.nome, entidades.cnpj, entidades.bairro, entidades.cidade, entidades.estado, 
    entidades.cep, entidades.email FROM entidades, ordem WHERE (ordem.id_entidade = entidades.id)";

    $queryEntidade = mysql_query($sqlEntidade) or die(mysql_error());

    if ($resultdb = $mysqli->query($sqlEntidade)) {
             while($linha = mysql_fetch_array($queryEntidade)) {
             $nomeEntidade = $linha['nome'];
             $cnpjEntidade = $linha['cnpj'];
             $bairroEntidade = $linha['bairro'];
             $cidadeEntidade = $linha['cidade'];
             $estadoEntidade = $linha['estado'];
             $cepEntidade = $linha['cep'];
             $emailEntidade = $linha['email'];
        }
      $resultdb->close();
    }


    $sqlCredor = "SELECT credores.nome, credores.cgc, credores.endereco, credores.cidade, credores.unidade_federacao, 
    credores.cep FROM credores, ordem WHERE (ordem.i_credores = credores.i_credores)";

    $queryCredor = mysql_query($sqlCredor) or die(mysql_error());

    if ($resultdb = $mysqli->query($sqlCredor)) {
             while($linha = mysql_fetch_array($queryCredor)) {
             $nomeCredor = $linha['nome'];
             $cnpjCredor = $linha['cgc'];
             $enderecoCredor = $linha['endereco'];
             $cidadeCredor = $linha['cidade'];
             $estadoCredor = $linha['unidade_federacao'];
        }
      $resultdb->close();
    }



    $sqlOrdem = "SELECT ordem.id, ordem.dataPedido, ordem.i_processo, processos.modalidade, 
    processos.sigla_modal, processos.data_homolog, credores.nome AS nomeC, 
    credores.cgc AS cnpjC, credores.endereco AS enderecoC, credores.cidade AS cidadeC, 
    credores.unidade_federacao, entidades.nome, entidades.cnpj, entidades.bairro, entidades.cidade, 
    entidades.estado, entidades.cep, entidades.email 
    FROM ordem, processos, credores, entidades 
    WHERE (ordem.i_processo = processos.i_processo) and 
    (ordem.id = 1) and (ordem.ano = processos.i_ano_proc) and
    (ordem.i_credores = credores.i_credores) and 
    (ordem.id_entidade = entidades.id)";

    $queryOrdem = mysql_query($sqlOrdem) or die(mysql_error());

        if ($resultdb = $mysqli->query($sqlOrdem)) {
             while($linha = mysql_fetch_array($queryOrdem)) {
             $numeroOrdem = $linha['id'];   
             $dataPedido = $linha['dataPedido'];
             $processo = $linha['i_processo'];
             $modalidade = $linha['modalidade'];
             $sigla_modal = $linha['sigla_modal'];
             $data_homolog = $linha['data_homolog'];
             $nomeCredor = $linha['nomeC'];
             $cnpjCredor = $linha['cnpjC'];
             $enderecoCredor = $linha['enderecoC'];
             $cidadeCredor = $linha['cidadeC'];
             $estadoCredor = $linha['unidade_federacao'];
             $nomeEntidade = $linha['nome'];
             $cnpjEntidade = $linha['cnpj'];
             $bairroEntidade = $linha['bairro'];
             $cidadeEntidade = $linha['cidade'];
             $estadoEntidade = $linha['estado'];
             $cepEntidade = $linha['cep'];
             $emailEntidade = $linha['email'];
        }
      $resultdb->close();
    }















?>