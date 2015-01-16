Ext.define('OC.view.consulta.ConsultaOrdem', {
	extend: 'Ext.window.Window',

	alias: 'widget.consultaordem',

	title: 'Consulta Ordem',

	requires: ['OC.view.grids.GridOrdensEmitidas', 'OC.ux.grid.Printer'],

	iconCls: 'icon-grid',

	autoShow: true,
	modal: true,
	height: 600,
	width: 700,
	maximized: false,
	autoScroll: true,

	closeAction: 'destroy',

	layout: {
		type: 'vbox',
		align: 'center'
	},

	items: [{
		xtype: 'gridordensemitidas'
	}]



});