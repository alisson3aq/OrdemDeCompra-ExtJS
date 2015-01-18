Ext.define('OC.view.grids.GridOrdensEmitidas', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridordensemitidas',

    features: [{
        ftype: 'summary'
    }],

    store: 'OC.store.Ordem',

    columns: [{
        text: 'Ordem',
        dataIndex: 'id',
        width: 100
    }, {
        text: 'Credor',
        dataIndex: 'nome',
        width: 350,
        items: {
            xtype: 'textfield',
            width: 30,
            //height: 10,
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: function() {
                    var store = this.up('gridordensemitidas').store;
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
        text: 'Situação',
        menuDisabled: true,
        sortable: false,
        xtype: 'actioncolumn',
        width: 70,
        items: [{
            getClass: function(v, meta, rec) {
                if (rec.get('situacao') == 1) {
                    return 'icon-stop';
                } else {
                    return 'icon-add';
                }
            }
        }]
    }],

    height: 550,
    width: 600,
    renderTo: Ext.getBody(),

    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'OC.store.Ordem',
        dock: 'bottom',
        displayInfo: true
    }],


});