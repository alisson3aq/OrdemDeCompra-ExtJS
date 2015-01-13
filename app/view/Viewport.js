Ext.define('OC.view.Viewport', {
    extend: 'Ext.container.Viewport',

    alias: 'widget.mainviewport',

    requires:[
        'Ext.layout.container.Fit',
        'OC.view.Login'
    ],

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'app-main'
    }]
});
