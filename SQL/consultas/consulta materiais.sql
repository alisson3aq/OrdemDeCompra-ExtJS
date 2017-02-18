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
         ( credores.i_entidades = participantes.i_entidades) and
         ( material.i_entidades = participantes.i_entidades) and
         ( itens_processo.i_entidades = participantes.i_entidades) and
         (participantes.i_ano_proc = 2017) AND    
         (participantes.i_processo = 6) AND
         (participantes.situacao IN (2,10)) AND
         (participantes.i_entidades = 1) AND   
         (itens_processo.i_ano_proc = 2017) AND
         (itens_processo.i_processo = 6) AND
         (itens_processo.i_entidades = 1)
ORDER BY participantes.i_credores ASC,
         participantes.i_item ASC


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
         ( credores.i_entidades = participantes.i_entidades) and
         ( material.i_entidades = participantes.i_entidades) and
         ( itens_processo.i_entidades = participantes.i_entidades) and
         (participantes.i_ano_proc = '$ano') AND    
         (participantes.i_processo = '$processo') AND
         (participantes.situacao = 2 ) AND
         (participantes.i_entidades = '$ent') AND   
         (itens_processo.i_ano_proc = '$ano') AND
         (itens_processo.i_processo = '$processo') AND
         (itens_processo.i_entidades = '$ent') LIMIT $start, $limit



      SELECT  
       participantes.i_credores,  
       credores.nome,
         material.i_material,
         material.nome_mat,
         participantes.nome_marca,
         participantes.qtde_cotada,  
         material.un_codi,
         participantes.vlr_descto,
         participantes.preco_unit_part,    
         participantes.preco_total,
         processos.vigencia
    FROM participantes,   
         itens_processo,
         material,   
         credores,
         processos 
   WHERE   
         (itens_processo.i_item = participantes.i_item) AND    
         (material.i_material = itens_processo.i_material) AND    
         (credores.i_credores = participantes.i_credores) AND 
         (participantes.i_processo = processos.i_processo) AND
         (participantes.i_ano_proc = processos.i_ano_proc )AND
         (participantes.i_ano_proc = '$ano') AND    
         (participantes.i_processo = '$processo') AND  
         (participantes.situacao = 2 ) AND  
         (itens_processo.i_ano_proc = '$ano') AND
         (itens_processo.i_processo = '$processo') LIMIT $start,  $limit