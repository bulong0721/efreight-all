/*
 * 订单数据
 */
Ext.define('MyApp.store.InoutStore', {
    extend: 'Ext.data.Store',
    requires: [
        'MyApp.model.InoutModel'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'MyApp.model.InoutModel',
			proxy: {
				type: 'dwr',
				passDwrStoreParams: true,
				dwrFunction: user.search,
				reader: {
					type: 'json',
					root: 'rows',
					totalProperty : 'total'
				}
			}
        }, cfg)]);
    }
});