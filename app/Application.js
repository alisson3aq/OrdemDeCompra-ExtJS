Ext.define('OC.Application', {
    name: 'OC',

    extend: 'Ext.app.Application',

    requires: [
        'Ext.window.Window',
        'Ext.form.Label',
        'Ext.form.Panel',
        'Ext.toolbar.Spacer',
        'Ext.toolbar.Paging'
    ],

    views: ['OC.view.Main'],

    controllers: [
        'Login', 'OC.controller.Main', 'OC.controller.Material', 'OC.controller.usuarios.Users', 'OC.controller.Ordem'
    ],

    stores: [
        'OC.store.Material', 'OC.store.ItensOrdem', 'OC.store.combobox.ComboboxEntidades', 'OC.store.Usuarios', 'OC.store.Ordem'
    ],

    splashscreen: {},


    autoCreateViewport: false,

    init: function() {

        // Start the mask on the body and get a reference to the mask
        splashscreen = Ext.getBody().mask('Carregando Aplicação', 'splashscreen');

        // Add a new class to this mask as we want it to look different from the default.
        splashscreen.addCls('splashscreen');

        // Insert a new div before the loading icon where we can place our logo.
        Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
            cls: 'x-splash-icon'
        });

        //console.log('init');
    },

    launch: function() {

        Ext.tip.QuickTipManager.init();

        var task = new Ext.util.DelayedTask(function() {

            //Fade out the body mask
            splashscreen.fadeOut({
                duration: 1000,
                remove: true
            });

            //Fade out the icon and message
            splashscreen.next().fadeOut({
                duration: 1000,
                remove: true,
                listeners: {
                    afteranimate: function(el, startTime, eOpts) {
                        Ext.widget('login');
                    }
                }
            });

            //Ext.widget('mainviewport');
            //Ext.widget('login');
            //console.log('launch');
        });

        task.delay(2000);

    }

});