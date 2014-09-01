/*
 * 卖家信息
 */
Ext.define('MyApp.model.SellerModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'uid',//用户id(5173的用户id)
        type: 'int'
    },{
        name: 'loginAccount'//用户账号(5173的用户账号)
    },{
        name: 'servicerId',//所属客服id
        type: 'int'
    },{
        name: 'name'//联系人
    },{
        name: 'phoneNumber'//联系电话
    },{
    	name: 'qq'//QQ
    },{
    	name: 'sellerType',//卖家类型
        type: 'int'
    },{
        name: 'notes'//审核备注信息
    },/*,{
        name: 'password'//游戏密码
    },{
        name: 'gameName'//游戏名
    },{
        name: 'region'//游戏区
    },{
        name: 'server'//游戏服
    },{
        name: 'gameRace'//所属阵营
    },*/{
        name: 'checkState',//审核状态
        type: 'int'
    },{
        name: 'lastUpdateTime',//最后更新时间
        dateReadFormat: 'Y-m-dTH:i:s',
        type: 'date'
    },{
        name: 'createTime',//创建时间
        dateReadFormat: 'Y-m-dTH:i:s',
        type: 'date'
    },{
    	name: 'isDeleted',//是否删除
    	type: 'boolean'
    }]
});