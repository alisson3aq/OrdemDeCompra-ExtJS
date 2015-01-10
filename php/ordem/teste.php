<?php
	//chama o arquivo de conexão com o bd
	include("../conectar.php");

	$info = $_POST['data'];

	$data = json_decode(stripslashes($info));

	foreach ($data as $valor) {
			echo 'ID_ORDEM '.$valor->id_ordem.'<br>';
			echo 'i_material '.$valor->i_material.'<br>';
    		echo 'comprar '.$valor->qtde_comprar.'<br><br>';
	}

	// Início da consulta
	$sql = "INSERT INTO itens_ordem (id_ordem, i_material, qtde_comprar) VALUES";

	// Para cada elemento de $usuários, faça:
	foreach ($data as $valor) {
		$id_ordem = $valor->id_ordem;
		$i_material = $valor->i_material;
		$qtde_comprar = $valor->qtde_comprar;


		// Monta a parte consulta de cada usuário
		$sql .= " ('{$id_ordem}', '{$i_material}', '{$qtde_comprar}'),";
	}

	// Tira o último caractere (vírgula extra)
	$sql = substr($sql, 0, -1);

	// Executa a consulta
	mysql_query($sql);

	// Pega o número de registros inseridos
	$cadastrados = mysql_affected_rows();

	echo 'Itens cadastrados: ' . $cadastrados;

?>

