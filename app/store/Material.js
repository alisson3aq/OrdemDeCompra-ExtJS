Ext.define('OC.store.Material', {
    extend: 'Ext.data.Store',

    model: 'OC.model.Material',

    pageSize: 40, // PAGINAGINA MAXIMA

    proxy: {
        type: 'ajax',
        url: 'php/material/material.php',
        reader: {
            type: 'json',
            root: 'data'
        }
    },

    autoLoad: false

});