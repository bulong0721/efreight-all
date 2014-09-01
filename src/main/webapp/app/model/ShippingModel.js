/*
 * 出库订单信息
 */
Ext.define('MyApp.model.ShippingModel', {
    extend: 'Ext.data.Model',
    idProperty: 'extId',
    idgen: 'uuid',
    fields: [{
    	name: 'extId'
    },{
	    name: 'orderId'//订单号
	},{
    	name: 'buyer'//买家
    },{
    	name: 'buyerRole'//买家角色名
    },{
    	name: 'buyerRoleLevel'//买家角色等级
    },{
    	name: 'gameProp'//游戏属性(游戏/区/服)
    },{
        name: 'gameName'//游戏名称
    },{
        name: 'region'//所在区
    },{
        name: 'server'//所在服
    },{
        name: 'gameRace'//所在阵营
    },{
    	name: 'buyerQQ'//买家QQ
    },{
    	name: 'buyerPhoneNumber'//买家电话
    },/*{
    	name: 'seller'//卖家
    },{
    	name: 'sellerQQ'//卖家QQ
    },{
    	name: 'sellerPhoneNumber'//卖家电话
    },*/{
    	name: 'title'//发布单名称
    },{
        name: 'goldCount',//购买总数(购买金币数)
        type: 'int'
    },{
        name: 'servicerInfo'//客服信息
    },{
        name: 'unitPrice',//商品单价(1金币对应多少人民币)
        type: 'float'
    },{
    	name: 'totalPrice',//订单总额
    	type: 'float'
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
    	name: 'tradePlace'//交易地点
    },{
        name: 'createTime',//创建时间
        dateReadFormat: 'Y-m-dTH:i:s',
        type: 'date'
    },{
        name: 'endTime',//结束时间
        dateReadFormat: 'Y-m-dTH:i:s',
        type: 'date'
    },{
    	name: 'notes'
    },{
        name: 'state',//子订单状态
        type: 'int'
    }]
});