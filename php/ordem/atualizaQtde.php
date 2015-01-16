<?php
	//chama o arquivo de conexão com o bd
	include("../conectar.php");

	$ano = $_REQUEST['ano'];
	$nOrdem = $_REQUEST['nOrdem'];

	//consulta sql
	$query = sprintf("UPDATE participantes, itens_processo, itens_ordem, ordem
  		SET participantes.qtde_cotada = (participantes.qtde_cotada - itens_ordem.qtde_comprar),
  			participantes.preco_total = ((participantes.qtde_cotada - itens_ordem.qtde_comprar) * participantes.preco_unit_part)
		WHERE (itens_ordem.id_ordem = ordem.id) and
				(ordem.i_processo = participantes.i_processo)and
				(ordem.ano = participantes.i_ano_proc) and
				(ordem.ano = itens_processo.i_ano_proc) and
				(itens_ordem.i_material = itens_processo.i_material) and
				(participantes.i_item = itens_processo.i_item) and
				(ordem.ano = '$ano') and
				(ordem.id = '$nOrdem')",
		mysql_real_escape_string($ano),
		mysql_real_escape_string($nOrdem));

	$rs = mysql_query($query);

	echo json_encode(array(
		"success" => mysql_errno() == 0
	));

	$mysqli->close();

?>