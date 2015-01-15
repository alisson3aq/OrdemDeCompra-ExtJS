<?php
	//chama o arquivo de conexão com o bd
	include("../conectar.php");

	$ano = $_REQUEST['ano'];
	$nOrdem = $_REQUEST['nOrdem'];

	//consulta sql
	$query = sprintf("UPDATE itens_processo, itens_ordem, ordem 
	  SET 
		itens_processo.qtde_item = (itens_processo.qtde_item - itens_ordem.qtde_comprar)
	  WHERE 
		(itens_ordem.id_ordem = ordem.id) and
		(ordem.i_processo = itens_processo.i_processo) and 
		(ordem.ano = itens_processo.i_ano_proc) and
		(itens_ordem.i_material = itens_processo.i_material) and 
		(ordem.ano = $ano) and
		(ordem.id = $nOrdem)",
		mysql_real_escape_string($ano),
		mysql_real_escape_string($nOrdem));

	$rs = mysql_query($query);

?>