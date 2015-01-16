<?php

	//chama o arquivo de conexão com o bd
	include("../conectar.php");

	$info = $_POST['data'];

	$data = json_decode($info);


	foreach ($data as $valor) {
			echo 'ID_ORDEM '.$valor->id_ordem.'<br>';
			echo 'ano '.$valor->ano.'<br>';
			echo 'i_material '.$valor->i_material.'<br>';
			echo 'nome_mat '.$valor->nome_mat.'<br>';
			echo 'nome_marca '.$valor->nome_marca.'<br>';
			echo 'un_codi '.$valor->un_codi.'<br>';
    		echo 'preco_unit_part '.$valor->preco_unit_part.'<br>';
    		echo 'qtde_comprar '.$valor->qtde_comprar.'<br><br>';
    		echo 'subtotal '.$valor->subtotal.'<br><br>';
	}

	// Início da consulta
	$sql = "INSERT INTO itens_ordem (id_ordem, ano, i_material, nome_mat, nome_marca, 
		un_codi, preco_unit_part, qtde_comprar, subtotal) VALUES";

	// Para cada elemento de $usuários, faça:
	foreach ($data as $valor) {
		$id_ordem = $valor->id_ordem;
		$ano = $valor->ano;
		$i_material = $valor->i_material;
		$nome_mat = $valor->nome_mat;
		$nome_marca = $valor->nome_marca;
		$un_codi = $valor->un_codi;
		$preco_unit_part = $valor->preco_unit_part;
		$qtde_comprar = $valor->qtde_comprar;
		$subtotal = $valor->subtotal;


		// Monta a parte consulta de cada usuário
		$sql .= " ('{$id_ordem}', '{$ano}' , '{$i_material}', '{$nome_mat}', '{$nome_marca}', '{$un_codi}', '{$preco_unit_part}', '{$qtde_comprar}', '{$subtotal}'),";
	}

	// Tira o último caractere (vírgula extra)
	$sql = substr($sql, 0, -1);

	// Executa a consulta
	mysql_query($sql);



	// Pega o número de registros inseridos
	$cadastrados = mysql_affected_rows();

	echo 'Itens cadastrados: ' . $cadastrados;


?>
