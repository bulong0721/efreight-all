/*
 * 库存信息
 */
Ext.define('MyApp.model.RepositoryModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'loginAccount'//卖家登录5173账号
    },{
        name: 'accountUid'//卖家登录5173账号uid
    },{
        name: 'servicerId',//所属客服id
        type: 'int'
    },{
        name: 'gameAccount'//游戏账号
    },{
        name: 'gamePassWord'//游戏密码
    },{
        name: 'gameName'//游戏名称
    },{
        name: 'region'//所在区
    },{
        name: 'server'//所在服
    },{
        name: 'gameRace'//所在阵营
    },{
        name: 'sonAccount'//子账号
    },{
        name: 'sellerGameRole'//卖家游戏角色名
    },{
        name: 'moneyName'//游戏币名
    },{
        name: 'unitPrice',//单价(1游戏币兑换多少元)
        type: 'float'
    },{
        name: 'goldCount',//游戏币数目
        type: 'int'
    },{
        name: 'sellableCount',//可销售库存（目前存在于DNF中）
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
    },{
        name: 'configCount',//配置数量
        type: 'int'
    }]
});