/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

//@require @packageOverrides
Ext.Loader.setConfig({
    enabled: true
});

/**********************************************************************
 * 当前登录用户
 */
var loginUser,imageSizeMap,orderAutoLoadTime,subCommissionBase,resourceUrl,commonTreeNodes,recruitBusinessTreeNodes,makeOrderTreeNodes,customerServiceTreeNodes,nomalManagerTreeNodes,systemManagerTreeNodes;

(function(){
//	var queryCurrentInfo = function() {
//			//Ajax请求当前登录用户信息
//			Ext.Ajax.request({
//				url: '',
//				async: false,
//				success: function(response, opts) {
//					var result = Ext.decode(response.responseText);
//					//设置当前登录用户信息
//					loginUser = result.currentUser;
//				}
//			});
//		};
//	queryCurrentInfo();
//	setInterval(function() {
//		queryCurrentInfo();
//    }, Common.config.UPDATE_INFO_INTERVAL * 1000);
	//Ajax请求当前系统配置信息
//	Ext.Ajax.request({
//		url: '',
//		success: function(response, opts) {
//			var result = Ext.decode(response.responseText);
//			//设置当前系统配置的图片大小信息
//			imageSizeMap = result.imageSizeMap;
//			//设置订单自动刷新时间
//			orderAutoLoadTime = result.orderAutoLoadTime;
//			//公司得到拥金的比例
//			subCommissionBase = result.subCommissionBase;
//		}
//	});
	//公用菜单项
	commonTreeNodes = [{
		text: '系统管理', expanded: true,
	    children: [{
	        text: '修改密码', leaf: true, id: 'modifyPassword'
	    }]
	}];
	//招商菜单项
	recruitBusinessTreeNodes = [{
	    text: '商品管理', expanded: true,
	    children: [{
	        text: '库存管理', leaf: true, id: 'repositoryManager'
	    },{
	        text: '卖家审核', leaf: true, id: 'sellerManager'
	    }]
	},{
	    text: '收货管理', expanded: true,
	    children: [{
	        text: '担保收货', leaf: true, id: 'bizOfferManager'
	    }]
	}];
	//做单菜单项
	makeOrderTreeNodes = [{
	    text: '订单管理', expanded: true,
	    children: [{
	        text: '出库订单', leaf: true, id: 'shippingManager'
	    },{
	        text: '我的订单', leaf: true, id: 'orderManager'
	    }]
	}];
	//客服菜单项
	customerServiceTreeNodes = Ext.Array.merge(makeOrderTreeNodes, [{
	    text: '资金管理', expanded: true,
	    children: [{
	        text: '交易流水导出', leaf: true, id: 'exportTransactionFlow'
	    },{
	        text: '交易统计', leaf: true, id: 'tradingStatistics'
	    }]
	}],recruitBusinessTreeNodes);
	//普通管理员菜单项
	nomalManagerTreeNodes = [{
	    text: '系统配置', expanded: true,
	    children: [{
	        text: '价格管理', leaf: true, id: 'goodsManager'
	    },{
	        text: '游戏配置管理', leaf: true, id: 'gameConfigManager'
	    }]
	},{
	    text: '用户管理', expanded: true,
	    children: [{
			text: '用户信息管理', leaf: true, id: 'userManager'
		},{
	        text: '子用户管理', leaf: true, id: 'adminSubUserManager'
	    }]
	},{
	    text: '系统监控', expanded: true,
	    children: [{
			text: '日志监控', leaf: true, id: 'logManager'
		}]
	}];
	//系统管理员菜单项
	systemManagerTreeNodes = Ext.Array.merge(customerServiceTreeNodes, nomalManagerTreeNodes, commonTreeNodes);
})();

Ext.define('SystemUtil', {
	singleton: true,
	getImageUrl: function(url, type){
		if(Ext.isEmpty(url)){
			return url;
		}
		var strs = url.split('.jpg');
		if(strs.length==2){
			return Common.config.RESOURCE_URL + strs[0] + imageSizeMap[type] + '.jpg';			
		}
		strs = url.split('.png');
		if(strs.length==2){
			return Common.config.RESOURCE_URL + strs[0] + imageSizeMap[type] + '.png';			
		}
		strs = url.split('.gif');
		if(strs.length==2){
			return Common.config.RESOURCE_URL + strs[0] + imageSizeMap[type] + '.gif';			
		}
		strs = url.split('.bmp');
		if(strs.length==2){
			return Common.config.RESOURCE_URL + strs[0] + imageSizeMap[type] + '.bmp';			
		}
		return url;
	},
	getOrderAutoLoadTime: function(){
		return orderAutoLoadTime;
	},
	getSubCommissionBase: function(){
		return subCommissionBase;
	}
});

Ext.define('CurrentUser', {
	singleton: true,
	/**
	 * 当前登录用户对象
	 */
	getCurrentUser: function(){
		if(!Ext.isEmpty(loginUser)){
			return loginUser;			
		}
	},
	/**
	 * 当前登录用户的用户名
	 */
	getRealName: function(){
		if(!Ext.isEmpty(loginUser)){
			return CurrentUser.getCurrentUser().realName;
		}
	},
	/**
	 * 当前登录用户的用户名
	 */
	getLoginAccount: function(){
		if(!Ext.isEmpty(loginUser)){
			return CurrentUser.getCurrentUser().loginAccount;
		}
	},
	/**
	 * 当前登录用户类型编码
	 */
	getUserTypeCode: function(){
		if(!Ext.isEmpty(loginUser)){
			return CurrentUser.getCurrentUser().userType;
		}
	},
	/**
	 * 当前登录用户类型名称
	 */
	getUserTypeName: function(){
		if(!Ext.isEmpty(loginUser)){
			return DataDictionary.rendererSubmitToDisplay(CurrentUser.getUserTypeCode());
		}
	},
	/**
	 * 当前登录用户菜单
	 */
	getUserMenus: function(){
		return systemManagerTreeNodes;
	}
});

Ext.application({
    models: [
        'GoodsModel',
        'OrderModel',
        "LogModel",
        'ConfigResultModel',
        'RepositoryModel',
        'GameConfigModel',
        'SellerModel',
        'TransactionModel',
        'ShippingModel',
        'BizOfferModel',
        'UserModel'
    ],
    stores: [
        'MenuTreeStore',
        'GoodsStore',
        "LogStore",
        'OrderStore',
        'ConfigResultStore',
        'RepositoryStore',
        'GameConfigStore',
        'TransactionStore',
        'ShippingStore',
        'SellerStore',
        'BizOfferStore',
        'UserStore'
    ],
    views: [
	    'Viewport',
	    "logManager",
        'userManager',
        'adminSubUserManager',
        'goodsManager',
        'modifyPassword',
        'repositoryManager',
        'gameConfigManager',
        'exportTransactionFlow',
        'shippingManager',
        'sellerManager',
        'bizOfferManager',
        'orderManager'
    ],
    autoCreateViewport: true,
    name: 'MyApp'
});
Ext.QuickTips.init();