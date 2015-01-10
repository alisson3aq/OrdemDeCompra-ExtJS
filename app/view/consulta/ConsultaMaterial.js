Ext.define('OC.view.consulta.ConsultaMaterial', {
	extend: 'Ext.window.Window',

	alias: 'widget.consultamaterial',

	title: 'Consulta Material',

	requires: ['OC.view.grids.GridMaterial', 'OC.view.grids.GridOrdem'],

	//iconCls: 'icon-grid',

	autoShow: true,

	width: 200,
	height: 200,
	maximized: true,
	autoScroll: true,

	closeAction : 'destroy',

	layout: {
		type: 'vbox',
		align: 'center'
	},

	items: [{
		xtype: 'fieldset',
		title: 'Materiais Disponiveis',
		defaultType: 'textfield',
		layout: 'anchor',
		defaults: {
			anchor: '100%'
		},
		items: [{
			xtype: 'gridmaterial'
		}]
	}, {
		xtype: 'fieldset',
		title: 'Itens da Ordem',
		defaultType: 'textfield',
		layout: 'anchor',
		defaults: {
			anchor: '100%'
		},
		items: [{
			xtype: 'gridordem'
		}]
	}, {
		xtype: 'form',
		bodyPadding: 10,
		//  bodyStyle: 'background-color: #00CF99',
		height: 50,
		width: 400,

		defaults: { //aplica em todos os itens
			labelAlign: 'right'
		},

		items: [{
			xtype: 'combobox',
			anchor: '100%',
			fieldLabel: 'Entidade Compradora',
			store: 'OC.store.combobox.ComboboxEntidades',
			queryMode: 'local',
			id: 'comboentidade',
			displayField: 'nome',
			valueField: 'id',
			editable: false
		}]
	}, ],

	dockedItems: [{

			xtype: 'form',
			bodyPadding: 10,
			//  bodyStyle: 'background-color: #00CF99',
			height: 50,
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'center'
			},

			defaults: { //aplica em todos os itens
				//anchor: '100%',
				//scale: 'medium',
				labelAlign: 'right'
					//mgsTarget: 'side'
			},

			items: [{
				xtype: 'datefield',
				//format: 'd-m-Y',
				anchor: '18%',
				fieldLabel: 'Dia',
				name: 'data',
				value: new Date()
			}, {
				xtype: 'numberfield',
				fieldLabel: 'Ordem Número',
				id: 'id_ordem',
				disabled: true
			}, {
				xtype: 'numberfield',
				fieldLabel: 'Ano',
				value: '2014',
				name: 'ano',
				allowBlank: false // requires a non-empty value
			}, {
				xtype: 'numberfield',
				fieldLabel: 'Processo',
				name: 'processo',
				allowBlank: false // requires a non-empty value
			}]
		},


		{

			xtype: 'toolbar',
			dock: 'top',
			items: [{
					xtype: 'button',
					text: 'Buscar',
					itemId: 'buscar',
					iconCls: 'icon-add'
				}, {
					xtype: 'button',
					text: 'Imprimir',
					itemId: 'print',
					iconCls: 'icon-print'

				}, {
					xtype: 'button',
					text: 'Gerar PDF',
					itemId: 'pdf',
					iconCls: 'icon-pdf'

				}, {
					xtype: 'button',
					text: 'Gerar Ordem',
					itemId: 'gerarordem',
					iconCls: 'icon-pdf'

				}

			]

		}

	]

});