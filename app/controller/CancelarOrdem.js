Ext.define('OC.controller.CancelarOrdem', {
	extend: 'Ext.app.Controller',


	views: ['OC.view.consulta.CancelarOrdem'],


	init: function(application) {
		this.control({
			"cancelarordem button#cancelar": {
				click: this.onCancelarOrdem
			}
		})
	},


	onCancelarOrdem: function(btn, eOpts) {
		console.log('Cancelar!');
		var win = btn.up('window'),
			campo = Ext.ComponentQuery.query('cancelarordem form numberfield')[0];

		if (campo.getValue() != null) {
			Ext.MessageBox.confirm('Cancelar Ordem', 'Tem certeza que deseja cancelar a ordem nº ' + campo.getValue() + ' ??', function(choice) {
				if (choice == 'yes') {
					Ext.Ajax.request({
						url: 'php/ordem/cancelarOrdem.php',
						method: 'POST',
						params: {
							nOrdem: campo.getValue()
						},
						success: function(conn, response, options, eOpts) {
							var result = Ext.JSON.decode(conn.responseText, true);

							if (!result) { // caso seja null
								result = {};
								result.success = false;
								result.msg = conn.responseText;
							}

							if (result.success && result.afetados) {
								Ext.Msg.alert('Aviso!', 'Ordem Cancelada com Sucesso!!!');

							} else if (!result.afetados) {
								Ext.Msg.alert('Aviso!', 'Está ordem já foi cancelada!!!');
							}
							else {
								Ext.Msg.alert('Aviso!', 'ERRO AO CANCELAR ORDEM! CONTATE O ADMINISTRADOR!');
							}
						},
						failure: function(conn, response, options, eOpts) {
							Ext.Msg.alert('Aviso!', 'ERRO! CONTATE O ADMINISTRADOR!');
						}
					});
					win.close();
				} else {
					win.close();
				}
			})


		} else {
			Ext.Msg.alert('Aviso!', 'Digite o número da ordem!!');
		}


	}


});