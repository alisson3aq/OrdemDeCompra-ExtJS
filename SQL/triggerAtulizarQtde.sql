DELIMITER $$
CREATE TRIGGER tg_insert_itensOrdem AFTER INSERT ON itens_ordem FOR EACH ROW
BEGIN
UPDATE participantes, itens_processo, itens_ordem, ordem
SET participantes.qtde_cotada = (participantes.qtde_cotada - NEW.qtde_comprar),
participantes.preco_total = ((participantes.qtde_cotada - NEW.qtde_comprar) * participantes.preco_unit_part)
WHERE (itens_ordem.id_ordem = ordem.id) and
(ordem.i_processo = participantes.i_processo) and
(ordem.ano = participantes.i_ano_proc) and
(ordem.ano = itens_processo.i_ano_proc) and
(NEW.i_material = itens_processo.i_material) and
(participantes.i_item = itens_processo.i_item) and
(ordem.id = NEW.id_ordem);
END$$
DELIMITER;
