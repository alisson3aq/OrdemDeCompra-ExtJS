Ext.define('OC.store.Usuarios', {
    extend: 'Ext.data.Store',

    model: 'OC.model.User',

    //pageSize: 1, // PAGINAGINA MAXIMA

    proxy: {
        type: 'ajax',

        api: {
            create: 'php/users/criaUsuario.php',
            read: 'php/users/listaUsuarios.php',
            update: 'php/users/atualizaUsuario.php',
            destroy: 'php/users/deletaUsuario.php',
        },

        reader: {
            type: 'json',
            root: 'users'
        },

        writer: {
            type: 'json',
            root: 'users',
            encode: 'json'
        }

    },

    autoLoad: false

});