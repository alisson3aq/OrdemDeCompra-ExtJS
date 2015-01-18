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

			"app-main button#arquivo > menu > menuitem#arqB": {
				click: this.openOrdemGrid
			},

			"app-main button#opcoes > menu > menuitem#opA": {
				click: this.openUsersGrid
			},

			"app-main button#opcoes > menu > menuitem#opB": {
				click: this.openCancelarOrdem
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
	},

	openOrdemGrid: function(btn, eOpts) {
		Ext.create('OC.view.consulta.ConsultaOrdem');
	},

	openCancelarOrdem: function(btn, eOpts) {
		Ext.create('OC.view.consulta.CancelarOrdem');
	}


});