/*
 * 商品数据
 */
Ext.define('MyApp.store.GoodsStore', {
    extend: 'Ext.data.Store',
    requires: [
        'MyApp.model.GoodsModel'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'MyApp.model.GoodsModel',
            proxy: {
				type: 'ajax',
				actionMethods: 'POST',
				url: './goods/queryGoods.action',
				reader: {
					type: 'json',
					root: 'goodsList',
					totalProperty : 'totalCount'
				}
			}
        }, cfg)]);
    }
});