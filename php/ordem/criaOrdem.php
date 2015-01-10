<?php
	//chama o arquivo de conexão com o bd
	include("../conectar.php");

	$info = $_POST['data'];

	$data = json_decode(stripslashes($info));

	$dataPedido = $data->dataPedido;
	$ano = $data->ano;
	$i_processo = $data->i_processo;
	$i_credores = $data->i_credores;
	$id_entidade = $data->id_entidade;
	$situacao = $data->situacao;

	//consulta sql
	$query = sprintf("INSERT INTO ordem (dataPedido, ano, i_processo, i_credores, id_entidade, situacao) values ('%s', '%s', '%s', '%s', '%s', '%s')",
		mysql_real_escape_string($dataPedido),
		mysql_real_escape_string($ano),
		mysql_real_escape_string($i_processo),
		mysql_real_escape_string($i_credores),
		mysql_real_escape_string($id_entidade),
	    mysql_real_escape_string($situacao));

	$rs = mysql_query($query);

	echo json_encode(array(
		"success" => mysql_errno() == 0,
		"data" => array(
			"id" => mysql_insert_id(),
			"dataPedido" => $dataPedido,
			"ano" => $ano,
			"i_processo" => $i_processo,
			"i_credores" => $i_credores,
			"id_entidade" => $id_entidade,
			"situacao" => $situacao
		)
	));
?>