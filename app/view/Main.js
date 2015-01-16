Ext.define('OC.view.Main', {
    extend: 'Ext.panel.Panel',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],
    
    xtype: 'app-main',

    title: 'Ordem de Compra',

    dockedItems: [{

            xtype: 'toolbar',
            dock: 'top',
            //  height: 50,
            defaults: { //aplica em todos os itens
                //anchor: '100%',
                //scale: 'medium',
                labelAlign: 'left'
                //mgsTarget: 'side'
            },

            items: [{
                    text: 'Arquivo',
                    arrowAlign: 'right',
                    iconCls: 'icon-folder',
                    itemId: 'arquivo',
                    menu: [{
                        text: 'Gerar Ordem de Compra',
                        id: 'arqA',
                        iconCls: 'icon-date'
                    }, {
                        text: 'Ordens Emitidas',
                        id: 'arqB',
                        iconCls: 'icon-folder'
                    }, {
                        text: 'Item 3'
                    }, '-', {
                        text: 'Logout',
                        id: 'logout',
                        iconCls: 'icon-stop',
                    }]
                },

                {
                    xtype: 'tbspacer',
                    width: 3
                },

                {
                    text: 'Relatórios',
                    arrowAlign: 'right',
                    iconCls: 'icon-report',
                    id: 'relatorios',
                    menu: [{
                        text: 'Relatório Por Data',
                        id: 'relA',
                        iconCls: 'icon-date'
                    }, '-', {
                        text: 'Graficos',
                        id: 'relB',
                        iconCls: 'icon-chart'
                    }, {
                        text: 'Item 4'
                    }]
                },

                {
                    xtype: 'tbspacer',
                    width: 3
                },

                {
                    text: 'Opções',
                    arrowAlign: 'right',
                    iconCls: 'icon-wrench',
                    itemId: 'opcoes',
                    menu: [{
                        text: 'Abrir Cadastro de User',
                        id: 'opA',
                        iconCls: 'icon-user-add'
                    }, {
                        text: 'Item 2',
                    }, {
                        text: 'Item 3'
                    }, {
                        text: 'Item 4'
                    }]
                },

                {
                    xtype: 'tbspacer',
                    width: 3
                },

                {
                    text: 'Ajuda',
                    arrowAlign: 'right',
                    iconCls: 'icon-help',
                    itemId: 'sobre',
                    menu: [{
                        text: 'Sobre',
                    }, {
                        text: 'Item 2',
                    }, {
                        text: 'Item 3'
                    }, {
                        text: 'Item 4'
                    }]
                }

            ]

        },
        ]


});