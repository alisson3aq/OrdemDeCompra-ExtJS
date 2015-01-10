Ext.define('OC.view.grids.GridMaterial', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridmaterial',


    store: 'OC.store.Material',

    columns: [{
            text: 'ID',
            dataIndex: 'i_credores',
            width: 50
        }, {
            text: 'Credor',
            dataIndex: 'nome',
            width: 230
        }, {
            text: 'Cod Material',
            dataIndex: 'i_material',
            width: 80
        }, {
            text: 'Material',
            dataIndex: 'nome_mat',
            width: 300
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
            width: 70
        }, {
            text: 'Total',
            dataIndex: 'preco_total',
            width: 70
        }, {
            text: 'Comprar',
            dataIndex: 'comprar',
            width: 70,
            align: 'right',
            value: 0,
            idemId: 'comprar',
            editor: {
                xtype: 'numberfield',
                allowBlank: true,
                minValue: 0,
                maxValue: 'qtde_cotada'
            }
        },

        {
            text: 'Inserir',
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            name: 'addRow',
            width: 50,
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
        }



    ],
    height: 200,
    width: 1200,
    renderTo: Ext.getBody(),



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