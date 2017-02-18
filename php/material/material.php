<?php
	//chama o arquivo de conexão com o bd
	include("../conectar.php");

	$start = $_REQUEST['start'];
	$limit = $_REQUEST['limit'];

	$ano = $_REQUEST['ano'];
	$processo = $_REQUEST['processo'];
   $ent = $_REQUEST['ent'];


	$queryString = "SELECT   credores.nome,
         participantes.i_credores,   
         participantes.i_item,  
         material.nome_mat, 
         participantes.qtde_cotada,  
         participantes.vlr_descto,
         participantes.preco_unit_part,    
         participantes.preco_total,   
         itens_processo.i_material,   
    participantes.nome_marca
    FROM participantes,   
         itens_processo,   
         material,   
         credores  
   WHERE   
         ( itens_processo.i_item = participantes.i_item ) and    
         ( material.i_material = itens_processo.i_material ) and    
         ( credores.i_credores = participantes.i_credores ) and
         ( credores.i_entidades = participantes.i_entidades) and
         ( material.i_entidades = participantes.i_entidades) and
         ( itens_processo.i_entidades = participantes.i_entidades) and
         (participantes.i_ano_proc = '$ano') AND    
         (participantes.i_processo = '$processo') AND
         (participantes.situacao = 2 ) AND
         (participantes.i_entidades = '$ent') AND   
         (itens_processo.i_ano_proc = '$ano') AND
         (itens_processo.i_processo = '$processo') AND
         (itens_processo.i_entidades = '$ent') LIMIT $start, $limit";

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
         ( credores.i_entidades = participantes.i_entidades) and
         ( material.i_entidades = participantes.i_entidades) and
         (participantes.i_ano_proc = '$ano') AND    
         (participantes.i_processo = '$processo') AND  
         (participantes.situacao = 2 ) AND
         (participantes.i_entidades = '$ent') AND 
         (itens_processo.i_ano_proc = '$ano') AND
         (itens_processo.i_processo = '$processo') AND
         (itens_processo.i_entidades = '$ent')");
        
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