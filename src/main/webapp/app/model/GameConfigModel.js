/*
 * 游戏配置信息
 */
Ext.define('MyApp.model.GameConfigModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id'
    },{
        name: 'gameName'//游戏名称
    },{
        name: 'placeName'//地点名称
    },{
        name: 'mailTime',//邮寄时间
        type: 'int'
    },{
        name: 'autoPlayTime',//自动打款时间
        type: 'int'
    },{
        name: 'gameImage'//游戏商品图片
    },{
        name: 'placeImage'//地点截图
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