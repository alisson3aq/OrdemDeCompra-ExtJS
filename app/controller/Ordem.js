Ext.define('OC.controller.Ordem', {
	extend: 'Ext.app.Controller',

	requires: [],

	models: ['OC.model.Ordem'],

	stores: ['OC.store.Ordem'],

	views: ['OC.view.consulta.ConsultaOrdem'],


	// Funcao Renderizar GRID
	init: function(application) {
		this.control({
			"consultaordem": { // Alias GRID!
				render: this.onWindowRender
					//	itemdblclick : this.onEditClick
			},

			"consultaordem gridordensemitidas": {
				celldblclick: this.onAddRow
			}


		})

	},



	onWindowRender: function(consultaordem, eOpts) {
		var grid = Ext.ComponentQuery.query('consultaordem gridordensemitidas')[0],
			store = grid.getStore();
		store.load();
	},


	onAddRow: function(gridordensemitidas, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		console.log('Clicou');

		var grid = Ext.ComponentQuery.query('consultaordem gridordensemitidas')[0],
			store = grid.getStore(),
			rec = grid.getStore().getAt(rowIndex);

		var win = new Ext.Window({
			title: 'Ordem de Compra',
			iconCls: 'icon-grid',
			//maximized: true,
			autoShow: true,
			items: [{
				xtype: 'uxiframe',
				width: 600,
				height: 600,
				src: 'php/pdf/oc.php?nOrdem=' + (rec.data.id)
			}]
		});

	}



});