Ext.define('OC.controller.Login', {
    extend: 'Ext.app.Controller',

    requires: [
        'OC.util.MD5',
        'OC.util.Alert',
        'OC.view.Viewport',
        'OC.util.Util',
        'OC.util.SessionMonitor'

    ],

    views: [
        'Login'
    ],


    init: function(application) {
        this.control({
            "login form button#submit": {
                click: this.onButtonClickSubmit
            },
            "login form button#cancel": {
                click: this.onButtonClickCancel
            },
            "login form textfield": {
                specialkey: this.onTextfielSpecialKey
            },
            "login form textfield[name=password]": {
                keypress: this.onTextfielKeyPress
            },
            "app-main button#arquivo > menu > menuitem#logout": {
                click: this.onButtonClickLogout
            }
        });

        

    },

    onButtonClickSubmit: function(button, e, options) {

        var formPanel = button.up('form');
        var login = button.up('login');

        var values = formPanel.getValues();
        var user = values.loginUsername;
        var pass = values.loginPassword;
  

        if (formPanel.getForm().isValid()) {

            pass = OC.util.MD5.encode(pass);

            Ext.get(login.getEl()).mask("Autenticando... Espere Por Favor...", 'loading');

            Ext.Ajax.request({
                url: 'php/login/login.php',
                params: {
                    user: user,
                    password: pass
                },
                success: function(conn, response, options, eOpts) {

                    Ext.get(login.getEl()).unmask();

                    var result = OC.util.Util.decodeJSON(conn.responseText);

                    if (result.success) {

                        //OC.util.Alert.msg('Success!', 'User Authenticated.');

                        login.close();
                        Ext.create('OC.view.Viewport');
                        OC.util.SessionMonitor.start();

                    } else {
                        //OC.util.Util.showErrorMsg(conn.responseText);
                        OC.util.Util.showErrorMsg('Nome de usuário ou senha incorreto!');

                    }
                },
                failure: function(conn, response, options, eOpts) {

                    Ext.get(login.getEl()).unmask();

                    //OC.util.Util.showErrorMsg(conn.responseText);
                    OC.util.Util.showErrorMsg('Servidor Não Está Respondendo!!');
                }
            });
        }
    },

    onButtonClickCancel: function(button, e, options) {
        button.up('form').getForm().reset();
    },

    onTextfielSpecialKey: function(field, e, options) {
        if (e.getKey() == e.ENTER) {
            var submitBtn = field.up('form').down('button#submit');
            submitBtn.fireEvent('click', submitBtn, e, options);
        }
    },

    onTextfielKeyPress: function(field, e, options) {
        var charCode = e.getCharCode();

        if ((e.shiftKey && charCode >= 97 && charCode <= 122) ||
            (!e.shiftKey && charCode >= 65 && charCode <= 90)) {

            if (this.getCapslockTooltip() === undefined) {
                Ext.widget('capslocktooltip');
            }

            this.getCapslockTooltip().show();

        } else {

            if (this.getCapslockTooltip() !== undefined) {
                this.getCapslockTooltip().hide();
            }
        }
    },

    onButtonClickLogout: function(button, e, options) {
        console.log('teste');

        Ext.Ajax.request({
            url: 'php/login/logout.php',
            success: function(conn, response, options, eOpts) {

                var result = OC.util.Util.decodeJSON(conn.responseText);

                if (result.success) {

                    button.up('mainviewport').destroy();
                    window.location.reload();
                } else {

                    OC.util.Util.showErrorMsg(result.msg);
                }
            },
            failure: function(conn, response, options, eOpts) {

                OC.util.Util.showErrorMsg(conn.responseText);
            }
        });
    }
});