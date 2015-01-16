Ext.define('OC.view.usuarios.UsersGrid', {
    extend: 'Ext.window.Window',

    alias: 'widget.usersgrid',

    iconCls: 'icon-grid',

    autoShow: true,
    modal: true,

    height: 400,
    width: 600,
    title: 'Cadastro de Usuarios',

    items: [{

        xtype: 'gridpanel',
        store: 'OC.store.Usuarios',

        columns: [{
                text: 'ID',
                width: 35,
                dataIndex: 'iduser'
            },

            {
                text: 'Nome',
                width: 192,
                dataIndex: 'nome'
            },

            {
                text: 'Login',
                width: 192,
                dataIndex: 'login'
            },

            {
                text: 'E-mail',
                width: 250,
                dataIndex: 'email'
            }
        ],

        dockedItems: [{

                xtype: 'toolbar',
                dock: 'top',
                items: [{
                        xtype: 'button',
                        text: 'Novo',
                        itemId: 'add',
                        iconCls: 'icon-add'
                    },

                    {
                        xtype: 'button',
                        text: 'Exluir',
                        itemId: 'delete',
                        iconCls: 'icon-delete'
                    }

                ]

            }

        ]

    }],


    dockedItems: [

        {
            xtype: 'pagingtoolbar',
            store: 'OC.store.Usuarios', // same store GridPanel is using --- EXEMPLO da documentação
            dock: 'bottom',
            displayInfo: true
        }

    ]
});