Ext.define('OC.model.ItensOrdem', {
	extend: 'Ext.data.Model',
	fields: [
	    'id_ordem',
		'i_material',
		'nome_mat',
		'nome_marca',
		'un_codi',
		'preco_unit_part',
		'qtde_comprar',
		'i_credores'
	]
});

