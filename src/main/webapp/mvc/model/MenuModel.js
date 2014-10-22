Ext.define('MyApp.model.MenuModel', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'action' },
		{ name: 'formPrototype' },
		{ name: 'windowID', type: 'int' },
		{ name: 'treeName' },
		{ name: 'itemName' },
		{ name: 'image' }
	]
});