Ext.define('OC.store.Ordem', {
    extend: 'Ext.data.Store',

    model: 'OC.model.Ordem',

   // pageSize: 1, // PAGINAGINA MAXIMA

    proxy: {
        type: 'ajax',

        api: {
            create: 'php/ordem/criarOrdem.php',
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