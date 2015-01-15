SELECT   credores.nome,
         participantes.i_credores,   
         participantes.i_item,  
         material.nome_mat, 
         participantes.qtde_cotada,  
         participantes.vlr_descto,
         participantes.preco_unit_part,    
         participantes.preco_total,   
         itens_processo.i_material,   
	 participantes.nome_marca
    FROM participantes,   
         itens_processo,   
         material,   
         credores  
   WHERE   
         ( itens_processo.i_item = participantes.i_item ) and    
         ( material.i_material = itens_processo.i_material ) and    
         ( credores.i_credores = participantes.i_credores ) and  
         (participantes.i_ano_proc = 2014) AND    
         (participantes.i_processo = 55) AND  
         (participantes.situacao IN (2,10)) AND  
         (itens_processo.i_ano_proc = 2014) AND
         (itens_processo.i_processo =55)   
ORDER BY participantes.i_credores ASC,   
         participantes.i_item ASC  
