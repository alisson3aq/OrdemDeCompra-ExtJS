Ext.define('OC.Application', {
    name: 'OC',

    extend: 'Ext.app.Application',

    requires: ['Ext.tab.Panel',
         'Ext.grid.Panel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.toolbar.Spacer',
        'Ext.chart.series.Pie',
        'Ext.chart.series.Column',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.form.field.Number'

    ],

    views: [
    ],

    controllers: [
        'OC.controller.Main', 'OC.controller.Material'
    ],

    stores: [
        'OC.store.Material', 'OC.store.ItensOrdem', 'OC.store.combobox.ComboboxEntidades'
    ]
});
