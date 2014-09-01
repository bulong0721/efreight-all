/*
 * 订单数据
 */
Ext.define('MyApp.store.UserStore', {
    extend: 'Ext.data.Store',
    requires: [
        'MyApp.model.UserModel'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'MyApp.model.UserModel',
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