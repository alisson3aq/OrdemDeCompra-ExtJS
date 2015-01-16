<?php

require("../conectar.php");

session_start();

$userName = $_SESSION['username'];

echo $userName;

$sqlUser = "SELECT nome FROM usuarios WHERE (login = '$userName')";
	$queryUser = mysql_query($sqlUser) or die(mysql_error());
    if ($resultdb = $mysqli->query($sqlUser)) {
             while($linha = mysql_fetch_array($queryUser)) {
             $usuarioLogado = $linha['nome'];
        }
      $resultdb->close();
    }
    
    echo $usuarioLogado;


?>