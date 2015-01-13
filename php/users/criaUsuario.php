<?php
	//chama o arquivo de conexão com o bd
	include("../conectar.php");

	$info = $_POST['users'];

	$data = json_decode(stripslashes($info));

	$nome = $data->nome;
	$senha = $data->senha;
	$email = $data->email;

	//consulta sql
	$query = sprintf("INSERT INTO usuarios (nome, senha, email) values ('%s', '%s', '%s')",
		mysql_real_escape_string($nome),
		mysql_real_escape_string($senha),
		mysql_real_escape_string($email));

	$rs = mysql_query($query);

	echo json_encode(array(
		"success" => mysql_errno() == 0,
		"usuarios" => array(
			"iduser" => mysql_insert_id(),
			"nome" => $nome,
			"senha" => $senha,
			"email" => $email
		)
	));
?>