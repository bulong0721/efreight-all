/*
 * 订单配置信息
 */
Ext.define('MyApp.model.ConfigResultModel', {
    extend: 'Ext.data.Model',
    idProperty: 'extId',
    idgen: 'uuid',
    fields: [{
    	name: 'extId'
    },{
    	name: 'id',
    	type: 'int'
    },{
	    name: 'orderId'//订单号
	},{
    	name: 'orderInfoEO'//订单信息
    },{
    	name: 'repositoryId'//库存ID
    },{
        name: 'repositoryInfo'//库存信息
    },{
        name: 'servicerInfo'//客服信息
    },{
        name: 'tradeType',//交易方式
        convert: function(v, record){
    		if(Ext.isEmpty(v)){
    			return null;
    		}
    		return v;
    	},
        type: 'int'
    },{
        name: 'servicerId'//所属客服id
    },{
        name: 'loginAccount'//卖家登录5173账号
    },{
        name: 'accountUid'//卖家登录5173账号uid
    },{
        name: 'configGoldCount',//游戏币配置数目
        type: 'int'
    },{
        name: 'orderUnitPrice',//订单单价(1游戏币兑换多少元)
        type: 'float'
    },{
        name: 'repositoryUnitPrice',//库存单价(1游戏币兑换多少元)
        type: 'float'
    },{
    	name: 'totalPrice',//配置订单库存的总费用
    	type: 'float'
    },{
    	name: 'state',//订单配置信息的状态
    	type: 'int'
    },{
        name: 'createTime',//创建时间
        dateReadFormat: 'Y-m-dTH:i:s',
        type: 'date'
    },{
        name: 'lastUpdateTime',//最后更新时间
        dateReadFormat: 'Y-m-dTH:i:s',
        type: 'date'
    },{
        name: 'isDeleted',//是否删除
        type: 'boolean'
    }]
});