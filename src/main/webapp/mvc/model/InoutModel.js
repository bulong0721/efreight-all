/*
 * 订单信息
 */
Ext.define('MyApp.model.InoutModel', {
    extend: 'Ext.data.Model',
    idProperty: 'cUserId',
    idgen: 'sequential',
    fields: [{
    	name: 'cUserId',
    	type: 'int'
    },{
    	name: 'name'
    },{
	    name: 'phone'
	},{
    	name: 'birthday'
    },{
    	name: 'cBpartnerId',
    	type: 'int'
    },{
        name: 'cClientId',
        type: 'int'
    },{
        name: 'cOrgId',
        type: 'int'
    },{
        name: 'active',
        type: 'boolean'
    },{
        name: 'mobile'
    }]
});