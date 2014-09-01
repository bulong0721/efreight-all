/*
 * 订单数据
 */
Ext.define('MyApp.store.MoveStore', {
    extend: 'Ext.data.Store',
    requires: [
        'MyApp.model.MoveModel'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'MyApp.model.MoveModel',
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