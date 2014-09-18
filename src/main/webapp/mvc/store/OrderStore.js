/*
 * 订单数据
 */
Ext.define('MyApp.store.OrderStore', {
    extend: 'Ext.data.Store',
    requires: [
        'MyApp.model.OrderModel'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'MyApp.model.OrderModel',
            proxy: {
				type: 'dwr',
				passDwrStoreParams: true,
				dwrFunction: facade.searchOrder,
				reader: {
					type: 'json',
					root: 'rows',
					totalProperty : 'total'
				}
			}
        }, cfg)]);
    }
});