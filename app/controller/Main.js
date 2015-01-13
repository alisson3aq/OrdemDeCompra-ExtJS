Ext.define('OC.controller.Main', {
	extend: 'Ext.app.Controller',


	views: ['OC.view.consulta.ConsultaMaterial'],


	// Funcao Renderizar GRID
	init: function(application) {
		this.control({
			"app-main": { // Alias GRID!
				render: this.onGridRender
			},

			"app-main button#arquivo > menu > menuitem#arqA": {
				click: this.openGerarOrdem
			},

			"app-main button#opcoes > menu > menuitem#opA": {
				click: this.openUsersGrid
			},


		})
	},

	onGridRender: function(loggrid, eOpts) {
		//loggrid.getStore().load();
	},

	openGerarOrdem: function(btn, eOpts) {
		Ext.create('OC.view.consulta.ConsultaMaterial');
	},

	openUsersGrid: function(btn, eOpts) {
		Ext.create('OC.view.usuarios.UsersGrid');
	}


});