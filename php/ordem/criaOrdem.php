
<?php
	
	//chama o arquivo de conexão com o bd
	include("../conectar.php");

	$info = $_POST['data'];

	function replace_unicode_escape_sequence($match) {
    	return mb_convert_encoding(pack('H*', $match[1]), 'UTF-8', 'UCS-2BE');
	}

	function unicode_decode($str) {
    	return preg_replace_callback('/\\\\u([0-9a-f]{4})/i', 'replace_unicode_escape_sequence', $str);
	}

	$info = unicode_decode($info);

	$data = json_decode(stripslashes($info));


	$dataPedido = $data->dataPedido;
	$ano = $data->ano;
	$i_processo = $data->i_processo;
	$i_credores = $data->i_credores;
	$id_entidade = $data->id_entidade;
	$solicitante = $data->solicitante;
	$departamento = $data->departamento;
	$aplicacao = $data->aplicacao;
	$prazo = $data->prazo;
	$situacao = $data->situacao;

	//consulta sql
	$query = sprintf("INSERT INTO ordem (dataPedido, ano, i_processo, 
		i_credores, id_entidade, solicitante, 
		departamento, aplicacao, prazo, situacao) 
	values ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
		mysql_real_escape_string($dataPedido),
		mysql_real_escape_string($ano),
		mysql_real_escape_string($i_processo),
		mysql_real_escape_string($i_credores),
		mysql_real_escape_string($id_entidade),
		mysql_real_escape_string($solicitante),
		mysql_real_escape_string($departamento),
		mysql_real_escape_string($aplicacao),
		mysql_real_escape_string($prazo),
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
			"solicitante" => $solicitante,
			"departamento" => $departamento,
			"aplicacao" => $aplicacao,
			"prazo" => $prazo,
			"situacao" => $situacao
		)
	));
?>