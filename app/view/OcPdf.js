Ext.define('OC.view.OcPdf', {
	extend: 'Ext.window.Window',

	alias: 'widget.ocpdf',

	title: 'Ordem de Compra',

	iconCls: 'icon-grid',

	autoShow: true,

	maximizable: true,

	items: [{
		xtype: 'uxiframe',
		width: 800,
		height: 600,
		maximizable: true,
		maximized: true,
		src: 'php/pdf/4.php?nOrdem=4'
	}]


});