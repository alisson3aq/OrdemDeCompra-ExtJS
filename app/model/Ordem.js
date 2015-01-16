Ext.define('OC.model.Ordem', {
	extend: 'Ext.data.Model',
	fields: [
		'id',
		'dataPedido',
		'ano', 
		'i_processo',
		'i_credores',
		'id_entidade',
		'solicitante',
		'departamento',
		'aplicacao',
		'prazo',
		'situacao',
		'nome' //nome credor
	]
});