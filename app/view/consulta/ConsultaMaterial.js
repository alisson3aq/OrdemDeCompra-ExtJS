Ext.define('OC.view.consulta.ConsultaMaterial', {
	extend: 'Ext.window.Window',

	alias: 'widget.consultamaterial',

	title: 'Consulta Material',

	requires: ['OC.view.grids.GridMaterial', 'OC.view.grids.GridOrdem',
		'Ext.form.FieldSet',
		'Ext.grid.plugin.CellEditing',
		'Ext.grid.column.Action',
		'Ext.grid.feature.Summary',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'OC.ux.grid.Printer'
	],

	iconCls: 'icon-grid',

	autoShow: true,
	modal: true,
	width: 200,
	height: 200,
	maximized: true,
	autoScroll: true,

	closeAction: 'destroy',

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
		height: 40,
		//width: 1300,
		//anchor: '100%',
		layout: {
			type: 'hbox',
			align: 'middle',
			//pack: 'center'
		},

		defaults: { //aplica em todos os itens
			labelAlign: 'right',
			margin :'3 10 3 1'
		},

		items: [{
			xtype: 'combobox',
		//	width: 350,
			anchor: '18%',
			fieldLabel: 'Entidade:',
			store: 'OC.store.combobox.ComboboxEntidades',
			queryMode: 'local',
			id: 'comboentidade',
			displayField: 'nome',
			valueField: 'id',
			editable: false
		}, {
			xtype: 'textfield',
			fieldLabel: 'Solicitante:',
			id: 'solicitante',
			allowBlank: false
		}, {
			xtype: 'textfield',
			fieldLabel: 'Departamento:',
			id: 'departamento',
			allowBlank: false
		}, {
			xtype: 'textfield',
			fieldLabel: 'Aplicação:',
			id: 'aplicacao',
			allowBlank: false
		}, {
			xtype: 'datefield',
			fieldLabel: 'Prazo',
			id: 'prazo',
			value: new Date()
		}]
	}, ],

	dockedItems: [{

			xtype: 'form',
			bodyPadding: 3,
			//  bodyStyle: 'background-color: #00CF99',
			height: 40,
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
					xtype: 'tbfill'
				}, {
					xtype: 'button',
					text: 'Buscar',
					itemId: 'buscar',
					iconCls: 'icon-add'
				}, {
					xtype: 'button',
					text: 'Imprimir Materiais',
					itemId: 'print',
					iconCls: 'icon-print'

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