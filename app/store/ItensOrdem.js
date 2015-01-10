Ext.define('OC.store.ItensOrdem', {
    extend: 'Ext.data.Store',

    model: 'OC.model.ItensOrdem',

    //pageSize: 1, // PAGINAGINA MAXIMA

    proxy: {
        type: 'ajax',

        api: {
            create: 'php/ordem/criarItensOrdem.php',
         //   read: 'php/users/listaUsuarios.php',
         //   update: 'php/users/atualizaUsuario.php',
         //   destroy: 'php/users/deletaUsuario.php',
        },

        reader: {
            type: 'json',
            root: 'data'
        },

        writer: {
            type: 'json',
            root: 'data',
            encode: 'json'
        }

    },

    autoLoad: false

});