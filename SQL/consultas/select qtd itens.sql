SELECT itens_processo.i_material, itens_processo.qtde_item
 	FROM itens_processo, itens_ordem, ordem 
where 
(itens_ordem.id_ordem = ordem.id) and
(ordem.i_processo = itens_processo.i_processo) and 
(ordem.ano = itens_processo.i_ano_proc) and
(itens_ordem.i_material = itens_processo.i_material) and 
(ordem.ano = 2014) and
(ordem.id = 2);


UPDATE itens_processo, itens_ordem, ordem 
	SET itens_processo.qtde_item = (itens_processo.qtde_item - itens_ordem.qtde_comprar)
WHERE 
(itens_ordem.id_ordem = ordem.id) and
(ordem.i_processo = itens_processo.i_processo) and 
(ordem.ano = itens_processo.i_ano_proc) and
(itens_ordem.i_material = itens_processo.i_material) and 
(ordem.ano = 2014) and
(ordem.id = 2);