SELECT participantes.i_item, participantes.qtde_cotada
  FROM participantes, itens_processo, itens_ordem, ordem
where
(itens_ordem.id_ordem = ordem.id) and
(ordem.i_processo = participantes.i_processo)and
(ordem.ano = participantes.i_ano_proc) and
(ordem.ano = itens_processo.i_ano_proc) and
(itens_ordem.i_material = itens_processo.i_material) and
(participantes.i_item = itens_processo.i_item) and
(ordem.ano = 2015) and
(ordem.id = 1);

UPDATE participantes, itens_processo, itens_ordem, ordem
  		SET participantes.qtde_cotada = (participantes.qtde_cotada - itens_ordem.qtde_comprar),
  			participantes.preco_total = ((participantes.qtde_cotada - itens_ordem.qtde_comprar) * participantes.preco_unit_part)
		WHERE (itens_ordem.id_ordem = ordem.id) and
				(ordem.i_processo = participantes.i_processo)and
				(ordem.ano = participantes.i_ano_proc) and
				(ordem.ano = itens_processo.i_ano_proc) and
				(itens_ordem.i_material = itens_processo.i_material) and
				(participantes.i_item = itens_processo.i_item) and
				(ordem.ano = '$ano') and
				(ordem.id = '$nOrdem')