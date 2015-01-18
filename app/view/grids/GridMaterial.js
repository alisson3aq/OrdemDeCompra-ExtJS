Ext.define('OC.view.grids.GridMaterial', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridmaterial',

    requires: ['Ext.toolbar.Paging'],

    store: 'OC.store.Material',

    columns: [{
            text: 'ID',
            dataIndex: 'i_credores',
            width: 50
        }, {
            text: 'Credor',
            dataIndex: 'nome',
            width: 230,
            items: {
                xtype: 'textfield',
                width: 30,
                //height: 10,
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: function() {
                        var store = this.up('gridmaterial').store;
                        store.clearFilter();
                        if (this.value) {
                            store.filter({
                                property: 'nome',
                                value: this.value,
                                anyMatch: true,
                                caseSensitive: false
                            });
                        }
                    },
                    buffer: 500
                }
            }

        }, {
            text: 'Cod Material',
            dataIndex: 'i_material',
            width: 80
        }, {
            text: 'Material',
            dataIndex: 'nome_mat',
            width: 300,
            items: {
                xtype: 'textfield',
                width: 30,
                //height: 10,
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: function() {
                        var store = this.up('gridmaterial').store;
                        store.clearFilter();
                        if (this.value) {
                            store.filter({
                                property: 'nome_mat',
                                value: this.value,
                                anyMatch: true,
                                caseSensitive: false
                            });
                        }
                    },
                    buffer: 500
                }
            }

        }, {
            text: 'Marca',
            dataIndex: 'nome_marca',
            width: 100
        }, {
            text: 'Qtd Cotada',
            dataIndex: 'qtde_cotada',
            width: 70
        }, {
            text: 'UND',
            dataIndex: 'un_codi',
            width: 40
        }, {
            text: 'Desconto',
            dataIndex: 'vlr_descto',
            width: 70
        }, {
            text: 'Preco Unit',
            dataIndex: 'preco_unit_part',
            width: 70,
            renderer: Ext.util.Format.usMoney
        }, {
            text: 'Total',
            dataIndex: 'preco_total',
            width: 70,
            renderer: Ext.util.Format.usMoney
        }, {
            text: 'Comprar',
            dataIndex: 'comprar',
            width: 70,
            align: 'right',
            value: 0,
            idemId: 'comprar',
            renderer: Ext.util.Format.number('0000.00'),
            editor: {
                xtype: 'numberfield',
                allowBlank: true,
                minValue: 0,
                maxValue: 'qtde_cotada'
            }
        },

        {
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            width: 20,
            items: [{
                getClass: function(v, meta, rec) {
                    if (rec.get('qtde_cotada') <= 0) {
                        return 'icon-stop';
                    } else {
                        return 'icon-add';
                    }
                },
                getTip: function(v, meta, rec) {
                        if (rec.get('qtde_cotada') < 0) {
                            return 'Hold stock';
                        } else {
                            return 'Buy stock';
                        }
                    }
                    //   handler: function(grid, rowIndex, colIndex) {
                    //       var rec = grid.getStore().getAt(rowIndex),
                    //           action = (rec.get('qtde_cotada') < 0 ? 'Hold' : 'Buy');
                    //
                    //       Ext.Msg.alert(action, action + ' ' + rec.get('nome_mat'));
                    //   }
            }]
        }, {
            text: 'Vigencia',
            dataIndex: 'vigencia',
            width: 90
        }



    ],
    height: 300,
    width: 1300,
    renderTo: Ext.getBody(),

    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'OC.store.Material', // same store GridPanel is using --- EXEMPLO da documentação
        dock: 'bottom',
        displayInfo: true
    }],



    initComponent: function() {
        this.editing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });

        Ext.apply(this, {
            plugins: [this.editing]

        });
        this.callParent(arguments);
    }

});