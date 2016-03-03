Ext.define('OC.controller.Material', {
	extend: 'Ext.app.Controller',

	requires: ['Ext.ux.IFrame', 'Ext.window.MessageBox', 'Ext.tip.*'],

	models: ['OC.model.Material', 'OC.model.Ordem'],

	stores: ['OC.store.Material', 'OC.store.ItensOrdem'],

	views: ['OC.view.consulta.ConsultaMaterial'],


	// Funcao Renderizar GRID
	init: function(application) {
		this.control({
			"consultamaterial": { // Alias GRID!
				render: this.onWindowRender
					//	itemdblclick : this.onEditClick
			},

			"consultamaterial button#buscar": {
				click: this.onSearchClick
			},

			"consultamaterial button#print": {
				click: this.onPrint
			},

			"consultamaterial button#gerarordem": {
				click: this.onGerarOrdem
			},

			"consultamaterial gridmaterial": {
				celldblclick: this.onAddRow
			},

			"consultamaterial gridordem": {
				celldblclick: this.onDeleteRow
			}

		})

	},

	onSearchClick: function(btn, eOpts) {
		var win = btn.up('window'); //pegar window
		form = win.down('form'),
			values = form.getValues(),
			grid = Ext.ComponentQuery.query('consultamaterial gridmaterial')[0],
			store = grid.getStore(),
			gridOc = Ext.ComponentQuery.query('consultamaterial gridordem')[0],
			storeOc = gridOc.getStore();

		store.load({
			params: {
				ano: values.ano,
				processo: values.processo,
			}
		});

		storeOc.removeAll();
	},

	onWindowRender: function(consultamaterial, eOpts) {
		var combo = Ext.ComponentQuery.query('consultamaterial form combobox#comboentidade')[0];
		combo.getStore().load();
		var nOrdem = Ext.ComponentQuery.query('consultamaterial form textfield#id_ordem')[0];

		Ext.Ajax.request({
			url: 'php/combobox/numeroOrdem.php',
			method: 'GET',
			success: function(result, action) {
				// decode the result and do something with it...
				var jsonData = Ext.decode(result.responseText);
				// do something with returned records    
				var jsonRecords = jsonData.records;

				nOrdem.setValue(jsonData.data[0].ID);

			}
		});

		var grid = Ext.ComponentQuery.query('consultamaterial gridmaterial')[0],
			gridOc = Ext.ComponentQuery.query('consultamaterial gridordem')[0],
			store = grid.getStore(),
			storeOc = gridOc.getStore();
		store.removeAll();
		storeOc.removeAll();
	},

	onPrint: function(btn, eOpts) {
		var grid = Ext.ComponentQuery.query('consultamaterial gridmaterial')[0];
		OC.ux.grid.Printer.printAutomatically = false;
		OC.ux.grid.Printer.print(grid);
	},


	onGerarOrdem: function(btn, eOpts) {
		console.log('Clicou!');
		var winConsulta = btn.up('window'), //pegar window
			grid = Ext.ComponentQuery.query('consultamaterial gridmaterial')[0],
			gridOc = Ext.ComponentQuery.query('consultamaterial gridordem')[0],
			storeOc = gridOc.getStore(),
			form = Ext.ComponentQuery.query('consultamaterial form')[0],
			values = form.getValues(),
			combo = Ext.ComponentQuery.query('consultamaterial form combobox#comboentidade')[0],
			formObs = Ext.ComponentQuery.query('consultamaterial form#formObs')[0],
			valuesObs = formObs.getValues(),
			nOrdem = Ext.ComponentQuery.query('consultamaterial form textfield#id_ordem')[0];

		var ordemSalva = false,
			itensSalvos = false;

		if (storeOc.count() == 0) {
			Ext.Msg.alert('Aviso!', 'Não existem itens para gerar a ordem!');

		} else if (combo.getValue() == null) {
			Ext.Msg.alert('Aviso!', 'Você deve escolher uma entidade compradora!');

		} else if (valuesObs.solicitante == "" | valuesObs.departamento == "" | valuesObs.aplicacao == "") {
			Ext.Msg.alert('Aviso!', 'Todos os campos devem ser preenchidos!');
		} else {

			Ext.MessageBox.confirm('Confirmar Download', 'Confirmar emissão de ordem??', function(choice) {
				if (choice == 'yes') {

					var novaordem = Ext.create('OC.model.Ordem', {
						id: nOrdem.getValue() + 1,
						dataPedido: values.data,
						ano: values.ano,
						i_processo: values.processo,
						i_credores: storeOc.data.items[0].data.i_credores,
						id_entidade: combo.getValue(),
						solicitante: valuesObs.solicitante,
						departamento: valuesObs.departamento,
						aplicacao: valuesObs.aplicacao,
						prazo: valuesObs.prazo,
						situacao: 0
					});

					//codifica os dados em JSON
					var dadosOrdem = Ext.encode(novaordem.data);

					var dadosItensOrdem = [];

					storeOc.each(function(record) {
						// adiciona cada registro inteiro ao array de dados
						dadosItensOrdem.push(record.data);
					});

					//codifica os dados em JSON
					dadosItensOrdem = Ext.encode(dadosItensOrdem);
					//dadosItensOrdem = Ext.util.Utf8.encode(dadosItensOrdem);

					Ext.Ajax.request({
						url: 'php/ordem/criaOrdem.php',
						method: 'POST',
						async: false, //<--- requisição síncrona
						params: {
							'data': dadosOrdem
						},
						success: function(conn, response, options, eOpts) {
							var result = Ext.JSON.decode(conn.responseText, true);

							if (!result) { // caso seja null
								result = {};
								result.success = false;
								result.msg = conn.responseText;
							}

							if (result.success) {
								ordemSalva = true;

							} else {
								Ext.Msg.alert('Aviso!', 'ERRO AO GERAR ORDEM! CONTATE O ADMINISTRADOR!');
							}
						},
						failure: function(conn, response, options, eOpts) {
							Ext.Msg.alert('Aviso!', 'ERRO! CONTATE O ADMINISTRADOR!');
						}
					});

					if (ordemSalva) {
						Ext.Ajax.request({
							url: 'php/ordem/criaItensOrdem.php',
							method: 'POST',
							async: false,
							params: {
								'data': dadosItensOrdem
							},
							success: function(conn, response, options, eOpts) {
								var result = Ext.JSON.decode(conn.responseText, true);

								if (!result) { // caso seja null
									result = {};
									result.success = false;
									result.msg = conn.responseText;
								}

								if (result.success) {
									itensSalvos = true;

								} else {
									Ext.Msg.alert('Aviso!', 'ERRO AO GRAVAR ITENS DA ORDEM! CONTATE O ADMINISTRADOR!');
								}
							},
							failure: function(conn, response, options, eOpts) {
								Ext.Msg.alert('Aviso!', 'ERRO! CONTATE O ADMINISTRADOR!');
							}
						});
					}

					if (itensSalvos) {
						Ext.MessageBox.show({
							msg: 'Salvando os dados, aguarde...',
							progressText: 'Salvando...',
							width: 300,
							wait: true,
							waitConfig: {
								interval: 1000
							},
							icon: 'ext-mb-download', //custom class in msg-box.html
							iconHeight: 50,
						});
						Ext.Ajax.request({
							url: 'php/ordem/atualizaQtde.php',
							method: 'POST',
							params: {
								nOrdem: nOrdem.getValue() + 1
							},
							success: function(conn, response, options, eOpts) {
								var result = Ext.JSON.decode(conn.responseText, true);

								if (!result) { // caso seja null
									result = {};
									result.success = false;
									result.msg = conn.responseText;
								}

								if (result.success) {

								} else {
									Ext.Msg.alert('Aviso!', 'ERRO AO ATUALIZAR QTDS! CONTATE O ADMINISTRADOR!');
								}
							},
							failure: function(conn, response, options, eOpts) {
								Ext.Msg.alert('Aviso!', 'ERRO! CONTATE O ADMINISTRADOR!');
							}
						});
						setTimeout(function() {
							Ext.MessageBox.hide();
							Ext.MessageBox.confirm('Confirmar Download', 'Deseja Visualizar a Ordem?', function(choice) {
								if (choice == 'yes') {
									var win = new Ext.Window({
										title: 'Ordem de Compra',
										iconCls: 'icon-grid',
										modal: true,
										autoShow: true,
										items: [{
											xtype: 'uxiframe',
											width: 600,
											height: 600,
											src: 'php/pdf/oc.php?nOrdem=' + (nOrdem.getValue() + 1)
										}]
									});
								}
								winConsulta.close();
							});
						}, 30000);
					}

				}

			});

		}

	},

	onAddRow: function(gridmaterial, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		console.log('Clicou');

		var nOrdem = Ext.ComponentQuery.query('consultamaterial form numberfield#id_ordem')[0],
			nOrdemValue = nOrdem.getValue(),
			form = Ext.ComponentQuery.query('consultamaterial form')[0],
			values = form.getValues(),
			grid = Ext.ComponentQuery.query('consultamaterial gridmaterial')[0],
			store = grid.getStore(),

			rec = grid.getStore().getAt(rowIndex);

		if (rec.data.comprar == null | rec.data.comprar == "" | rec.data.comprar <= 0) {
			Ext.Msg.alert('Aviso!', 'É necessario escolher a quantidade para comprar!');
		} else if (rec.data.comprar > rec.data.qtde_cotada) {
			Ext.Msg.alert('Aviso!', 'A quantidade para comprar é maior do que a licitada!');
		} else {
			var gridOc = Ext.ComponentQuery.query('consultamaterial gridordem')[0],
				storeOc = gridOc.getStore();

			var novoItensOrdem = Ext.create('OC.model.ItensOrdem', {
				ano: values.ano,
				id_ordem: nOrdemValue + 1,
				i_material: rec.get('i_material'),
				nome_mat: rec.get('nome_mat'),
				nome_marca: rec.get('nome_marca'),
				un_codi: rec.get('un_codi'),
				preco_unit_part: rec.get('preco_unit_part'),
				qtde_comprar: rec.get('comprar'),
				i_credores: rec.get('i_credores'),
				subtotal: (rec.get('preco_unit_part') * rec.get('comprar'))
			});

			if (storeOc.count() == 0) {
				storeOc.add(novoItensOrdem);
			} else {
				if (storeOc.find('i_credores', rec.data.i_credores) == -1) {
					Ext.Msg.alert('Aviso!', 'Não é possível adicionar fornecedor diferente!');
				} else {
					if (storeOc.find('i_material', rec.data.i_material) == -1) {
						storeOc.add(novoItensOrdem);
					} else {
						Ext.Msg.alert('Aviso!', 'Material já incluso na ordem!!');
					}
				}
			}
		}


	},

	onDeleteRow: function(gridordem, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var gridOc = Ext.ComponentQuery.query('consultamaterial gridordem')[0],
			records = gridOc.getSelectionModel().getSelection(),
			storeOc = gridOc.getStore();
		storeOc.remove(records);
	}



});