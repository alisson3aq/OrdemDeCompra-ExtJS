SELECT itens_ordem.id, itens_ordem.nome_mat, itens_ordem.un_codi, itens_ordem.preco_unit_part, itens_ordem.qtde_comprar, itens_ordem.subtotal
FROM itens_ordem, ordem 
WHERE (itens_ordem.id_ordem = ordem.id) and
	  (itens_ordem.id_ordem = '$nOrdem')
