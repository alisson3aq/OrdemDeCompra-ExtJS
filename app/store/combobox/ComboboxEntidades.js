Ext.define('OC.store.combobox.ComboboxEntidades', {
	extend: 'Ext.data.Store',

	fields: ['nome'],

   //pageSize: 10, // PAGINAGINA MAXIMA
	
	proxy: {
		type: 'ajax',
		url: 'php/combobox/comboboxEntidades.php',

		reader: {
			type: 'json',
			root: 'data'
		}
	},

	autoLoad: false

});