<?php
	//chama o arquivo de conexão com o bd
	include("../conectar.php");

	$start = $_REQUEST['start'];
	$limit = $_REQUEST['limit'];

	$ano = $_REQUEST['ano'];
	$processo = $_REQUEST['processo'];

	$queryString = "SELECT  
       participantes.i_credores,  
       credores.nome,
         material.i_material,
         material.nome_mat,
         participantes.nome_marca,
         participantes.qtde_cotada,  
         material.un_codi,
         participantes.vlr_descto,
         participantes.preco_unit_part,    
         participantes.preco_total,
         processos.vigencia
    FROM participantes,   
         itens_processo,
         material,   
         credores,
         processos 
   WHERE   
         (itens_processo.i_item = participantes.i_item) AND    
         (material.i_material = itens_processo.i_material) AND    
         (credores.i_credores = participantes.i_credores) AND 
         (participantes.i_processo = processos.i_processo) AND
         (participantes.i_ano_proc = processos.i_ano_proc )AND
         (participantes.i_ano_proc = '$ano') AND    
         (participantes.i_processo = '$processo') AND  
         (participantes.situacao = 2 ) AND  
         (itens_processo.i_ano_proc = '$ano') AND
         (itens_processo.i_processo = '$processo') LIMIT $start,  $limit";

	//consulta sql
	$query = mysql_query($queryString) or die(mysql_error());

	//faz um looping e cria um array com os campos da consulta
	$datas = array();
	while($data = mysql_fetch_assoc($query)) {
	    $datas[] = $data;
	}

	//echo $logs;

	//consulta total de linhas na tabela
	$queryTotal = mysql_query("SELECT count(*) as num FROM participantes,   
         itens_processo,
         material,   
         credores  
   WHERE   
         (itens_processo.i_item = participantes.i_item) and    
         (material.i_material = itens_processo.i_material) and    
         (credores.i_credores = participantes.i_credores) and  
         (participantes.i_ano_proc = '$ano') AND    
         (participantes.i_processo = '$processo') AND  
         (participantes.situacao = 2 ) AND  
         (itens_processo.i_ano_proc = '$ano') AND
         (itens_processo.i_processo = '$processo')");
        
	$row = mysql_fetch_assoc($queryTotal);
	$total = $row['num'];

	//encoda para formato JSON
	echo json_encode(array(
		"success" => mysql_errno() == 0,
		"total" => $total,
		"data" => $datas
	));

   $mysqli->close();
?>