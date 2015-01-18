Ext.define('OC.view.consulta.CancelarOrdem', {
	extend: 'Ext.window.Window',

	alias: 'widget.cancelarordem',

	title: 'Cancelar Ordem de Compra',

	autoShow: true,
	modal: true,
	width: 200,
	height: 100,
	autoScroll: true,

	items: [{
		xtype: 'form',
		bodyPadding: 5,
		fieldDefaults: {
			labelAlign: 'right',
			labelWidth: 60,
			msgTarget: 'qtip'
		},
		items: [{
			xtype: 'numberfield',
			bodyPadding: 1,
			flex: 1,
			width: 160,
			fieldLabel: 'Ordem',
			name: 'ordem',
			allowBlank: false
		}]
	}],

	buttons: [{
		text: 'OK!',
		itemId: 'cancelar',
	}]



});