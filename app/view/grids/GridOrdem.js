Ext.define('OC.view.grids.GridOrdem', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridordem',

    features: [{
        ftype: 'summary'
    }],

    store: 'OC.store.ItensOrdem',

    columns: [{
        text: 'Material',
        dataIndex: 'nome_mat',
        width: 300
    }, {
        text: 'Marca',
        dataIndex: 'nome_marca',
        width: 230
    }, {
        text: 'UND',
        dataIndex: 'un_codi',
        width: 40
    }, {
        text: 'Preco Unit',
        dataIndex: 'preco_unit_part',
        width: 100,
        renderer: Ext.util.Format.usMoney
    }, {
        text: 'Comprar',
        dataIndex: 'qtde_comprar',
        width: 120,
        summaryType: 'sum',
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
            return value + ' Unidades';
        },
        summaryRenderer: function(value, summaryData, dataIndex) {
            return value + ' Unidades';
        }
    }, {
        id: 'total',
        header: 'Total',
        width: 120,
        sortable: false,
        groupable: false,
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
            return Ext.util.Format.currency(record.get('qtde_comprar') * record.get('preco_unit_part'), '$ ', 2);
        },
        dataIndex: 'total',
        summaryType: function(records) {
            var i = 0,
                length = records.length,
                total = 0,
                record;

            for (; i < length; ++i) {
                record = records[i];
                total += record.get('qtde_comprar') * record.get('preco_unit_part');
            }
            return total;
        },
        summaryRenderer: Ext.util.Format.usMoney
    }],

    height: 200,
    width: 1200,
    renderTo: Ext.getBody()


});