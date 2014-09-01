/*
 * 出库订单页面
 */
Ext.define('MyApp.view.ShippingInfoForm',{
	extend: 'Ext.form.Panel',
    layout: 'column',
    border: false,
	defaults: {
		margin: '5 5 5 5',
		columnWidth: .333,
		labelWidth: 100,
		readOnly: true,
		xtype: 'textfield'
	},
	constructor : function(config) {
		var me = this, cfg = Ext.apply({}, config);
		me.items = [{
			name: 'orderId',
			fieldLabel: '订单号'
		},{
			name: 'buyerRole',
			fieldLabel: '买家角色名'
		},{
		    fieldLabel: '买家角色等级',
		    name: 'buyerRoleLevel'
		},{
			name: 'buyer',
			fieldLabel: '买方用户名'
		},{
			name: 'gameProp',
			fieldLabel: '游戏/区/服'
		},{
		    fieldLabel: '买家QQ',
		    name: 'buyerQQ'
		},{
		    fieldLabel: '购买数量',
		    name: 'goldCount'
		},{
		    fieldLabel: '订单价格',
		    name: 'totalPrice'
		},{
		    fieldLabel: '买家电话',
		    name: 'buyerPhoneNumber'
		},{
		    fieldLabel: '订单单价',
		    name: 'unitPrice'
		},{
		    fieldLabel: '交易地点',
		    name: 'tradePlace'
		},{
		    fieldLabel: '订单客服',
		    name: 'realName'
		},{
			xtype: 'container',
			columnWidth: .15,
			margin: '10 20 10 20',
			items: [{
		        xtype: 'button',
		        text: '复制物品清单',
		        plugins: {
					ptype: 'zeroclipboardplugin',
					targetFun: function(component) {
						var button = component,
							form = button.up('form').getForm(),
							record = form.getRecord();
						return	"订单号			:"+record.get('orderId')+'\n'+
								"商品名称		:"+record.get('title')+'\n'+
								"游戏/区/服		:"+record.get('gameProp')+'\n'+
								"商品价格		:"+record.get('totalPrice')+'\n'+
								"买方游戏角色名	:"+record.get('buyerRole')+'\n'+
								"买方角色等级 	:"+record.get('buyerRoleLevel')+'\n'+
								"发货数量		:"+record.get('goldCount')+'\n'+
								"交易地点		:"+record.get('tradePlace')+'\n'+
								"您好，服务人员将按照您所填写的角色相关信息进行交易，请您稍等。\n"+
								"友情提示:\n"+
								"①5173服务人员不会以任何理由向您取回已交易商品，不会在游戏中索要您的5173、QQ帐号等私密信息！\n"+
								"②他人发送且需要登陆和支付的链接都是钓鱼网站，一旦支付，资金将有去无回。";
					}
				}
		    }]
		},{
			xtype: 'container',
			columnWidth: .85,
			margin: '10 20 10 20',
			items: [{
		        xtype: 'button',
		        text: '复制物品清单（卖家）',
		        plugins: {
					ptype: 'zeroclipboardplugin',
					targetFun: function(component) {
						var button = component,
							form = button.up('form').getForm(),
							record = form.getRecord();
						var copyshipsellertxet = '';
						Ext.Ajax.request({
							url: './order/queryOrderConfig.action',
							params: {'orderId':record.get('orderId') },
							async: false, 
							success: function(response, opts) {
								var json = Ext.decode(response.responseText);
								c = json.configInfoList;
								Ext.each(c, function(item, index){
									copyshipsellertxet += "订单号			:"+record.get('orderId')+'\n'+
									"商品名称		:"+record.get('title')+'\n'+
									"游戏/区/服		:"+record.get('gameProp')+'\n'+
									"商品价格		:"+item.totalPrice+'\n'+
									"买方游戏角色名	:"+record.get('buyerRole')+'\n'+
									"买方角色等级 	:"+record.get('buyerRoleLevel')+'\n'+
									"发货数量		:"+item.configGoldCount+'\n'+
									"交易地点		:"+record.get('tradePlace')+'\n'+
									"您好，服务人员将按照您所填写的角色相关信息进行交易，请您稍等。\n"+
									"友情提示:\n"+
									"①5173服务人员不会以任何理由向您取回已交易商品，不会在游戏中索要您的5173、QQ帐号等私密信息！\n"+
									"②他人发送且需要登陆和支付的链接都是钓鱼网站，一旦支付，资金将有去无回。\n\n";
								});
							},
							exception : function(response, opts) {
								var json = Ext.decode(response.responseText);
								Ext.ux.Toast.msg("温馨提示", json.message);
							}
						});    
						return copyshipsellertxet;
					}
				}
		    }]
		},{
		    fieldLabel: '备注',
		    columnWidth: 1,
		    name: 'notes'
		}];
		me.callParent([ cfg ]);
	}
});

Ext.define('MyApp.view.SippingInfoWindow',{
	extend: 'Ext.window.Window',
    title: '出库订单明细',
	width: 800,
	border: false,
	padding: '10 10 10 10',
	autoScroll: true,
	closeAction: 'hide',
	modal: true,
	form: null,
	getForm: function(){
		var me = this;
		if(me.form==null){
			me.form = Ext.create('MyApp.view.ShippingInfoForm');
		}
		return me.form;
	},
	grid: null,
	getGrid: function(){
		var me = this;
		if(Ext.isEmpty(me.grid)){
			var store = Ext.create('Ext.data.Store',{
	            model: 'MyApp.model.SellerModel',
	            proxy: {
					type: 'ajax',
					actionMethods: 'POST',
					url: './order/querySellerByOrderId.action',
					reader: {
						type: 'json',
						root: 'sellerList'
					}
				}
	        });
			me.grid = Ext.widget('gridpanel',{
			    header: false,
			    columnLines: true,
			    store: store,
			    columns: [{
			            dataIndex: 'loginAccount',
			            text: '卖家帐号',
			            sortable: false,
			            align: 'center',
			            flex: 1
			        },{
			            dataIndex: 'name',
			            text: '卖家名字',
			            sortable: false,
			            align: 'center',
			            flex: 1
			        },{
			            dataIndex: 'qq',
			            text: '卖家联系QQ',
			            sortable: false,
			            align: 'center',
			            flex: 1
			        },{
			            dataIndex: 'phoneNumber',
			            flex: 1,
			            sortable: false,
			            align: 'center',
			            text: '卖家联系电话'
			        }
			    ]
			});
		}
		return me.grid;
	},
	bindData: function(record){
		var me = this,
			store = me.getGrid().getStore(),
			form = me.getForm().getForm();
		realName = form.findField('realName'),
		form.reset();
		form.loadRecord(record);
		realName.setValue(record.get('servicerInfo').realName);
		store.load({
			params: {
				'orderId': record.get('orderId')
			}
		});
	},
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [me.getForm(),me.getGrid()]
        });
        me.callParent(arguments);
    }
});


//库存查询结果表格页面
Ext.define('MyApp.shipping.RepositoryGrid',{
	extend: 'Ext.grid.Panel',
	queryParam: null,
	constructor: function(config){
		var me = this,
			cfg = Ext.apply({}, config);
		me.columns = [{
	        dataIndex: 'loginAccount',
	        align: 'center',
	        flex: 1,
	        text: '卖家5173<br/>账号'
	    },{
	        dataIndex: 'gameName',
	        align: 'center',
	        flex: 1,
	        text: '游戏名称'
	    },{
			dataIndex: 'region',
			align: 'center',
			text: '所在区',
			flex: 1
		},{
			dataIndex: 'server',
			align: 'center',
			flex: 1,
			text: '所在服'
		},{
			dataIndex: 'unitPrice',
			align: 'center',
			flex: 0.5,
			renderer: function(v) {
	            return Ext.util.Format.currency(v, '￥', 4);
	        },
			text: '单价'
		},{
			dataIndex: 'goldCount',
			align: 'center',
			flex: 1,
			text: '游戏币<br/>数目'
		},{
			dataIndex: 'sellableCount',
			align: 'center',
			flex: 1,
			text: '可销售<br/>库存'
		}];
		me.store = Ext.create('MyApp.store.RepositoryStore',{
			pageSize: 5,
			listeners: {
				beforeload : function(store, operation, eOpts) {
					Ext.apply(operation, {
						params : me.queryParam
					});
				}				
			}
		});
		me.selModel = Ext.create('Ext.selection.CheckboxModel', {
	        mode: 'SINGLE'
	    });
		me.bbar = Ext.create('Ext.PagingToolbar', {
			store: me.store
		});
		me.callParent([cfg]);
	}
});

Ext.define('MyApp.view.ReplaceConfigWindow',{
	extend: 'Ext.window.Window',
	width: 800,
	autoScroll: true,
    title: '重配订单',
	closeAction: 'hide',
	modal: true,
	defaults: {
		margin: '5 5 5 5'
	},
	repositoryGrid : null,
	getRepositoryGrid : function(){
		if(this.repositoryGrid==null){
			this.repositoryGrid = Ext.create('MyApp.shipping.RepositoryGrid',{
				height : 213
			});
		}
		return this.repositoryGrid;
	},
	configRecord: null,
	orderRecord: null,
	currentGrid: null,
	bindData: function(orderRecord, configRecord, currentGrid){
		var me = this,
			repositoryGrid = me.getRepositoryGrid(),
			selectModel = repositoryGrid.getSelectionModel(),
			store = repositoryGrid.getStore();
		me.orderRecord = orderRecord;
		me.configRecord = configRecord;
		me.currentGrid = currentGrid;
		repositoryGrid.queryParam = {
			'repository.gameName': Ext.String.trim(orderRecord.get('gameName')),
			'repository.region': Ext.String.trim(orderRecord.get('region')),
			'repository.server': Ext.String.trim(orderRecord.get('server')),
			'repository.goldCount': configRecord.get('configGoldCount'),
			'repository.unitPrice': orderRecord.get('unitPrice'),
			'repository.gameRace': orderRecord.get('gameRace')
		};
		store.loadPage(1);
	},
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [me.getRepositoryGrid()],
            buttons: [{
            	text:'重配',
            	plugins: {
            		ptype: 'buttondisabledplugin',
            		seconds: 5
            	},
            	handler: function() {
            		var grid = me.getRepositoryGrid(),
            			configRecord = me.configRecord,
            			selectModel = grid.getSelectionModel(),
            			selRecords = selectModel.getSelection(),record;
    				if(selRecords == null||selRecords.length<=0){
    					Ext.ux.Toast.msg("温馨提示", "请先选择用于配置的库存信息");
    					return;
    				}
    				repository = selRecords[0];
    				if(Ext.isEmpty(configRecord.get('repositoryInfo'))){
    					configRecord.set('repositoryInfo', null);
    				}
    				if(repository.get('goldCount')<configRecord.get('sellableCount')){
    					Ext.ux.Toast.msg("温馨提示", "请选择库存中可售游戏币数大于要配置的游戏币数");
    					return;
    				}
    				Ext.Ajax.request({
    					url : './order/replaceConfigOrder.action',
    					method: 'POST',
    					jsonData: {
    						'repository': repository.data,
    						'configResult': me.configRecord.data,
    						'orderInfo': me.orderRecord.data
    					},
    					success : function(response, opts) {
    						var store = me.currentGrid.getStore();
    						Ext.ux.Toast.msg("温馨提示", "重配成功");
    						me.close();
    						store.load({
    							params: {
    								'orderId': me.orderRecord.get('orderId')
    							}
    						});
    					},
    					exception : function(response, opts) {
    						var json = Ext.decode(response.responseText);
    						Ext.ux.Toast.msg("温馨提示", json.message);
    					}
    				});
            	}
            }]
        });
        me.callParent(arguments);
    }
});

//订单库存配置信息
Ext.define('MyApp.shipping.OrderConfigPanel',{
	extend: 'Ext.panel.Panel',
	title: '订单库存配置信息',
	padding: '5 20 5 20',
	defaults: {
		padding: '5 5 5 5'
	},
	orderRecord: null,
	bindData: function(record, grid, rowBodyElement){
		var me = this,
			store = me.getStore();
		me.orderRecord = record;
		store.load({
			params: {
				'orderId': record.get('orderId')
			}
		});
	},
	getStore: function(){
		var me = this;
		if(me.store==null){
			me.store = Ext.create('MyApp.store.ConfigResultStore');
		}
		return me.store;
	},
	orderConfigGrid: null,
	getOrderConfigGrid: function(){
		var me = this;
		if(Ext.isEmpty(me.orderConfigGrid)){
			me.orderConfigGrid = Ext.create('MyApp.view.orderConfigGrid',{
				height: 200,
				store: me.getStore()
			});
		}
		return me.orderConfigGrid;
	},
	toolbar: null,
	getToolbar: function(){
		var me = this;
		if(Ext.isEmpty(me.toolbar)){
			me.toolbar = Ext.widget('toolbar',{
				dock: 'top',
				items: [{
				    text: '结果重配',
				    listeners: {
				        click: {
				            fn: me.replaceConfig,
				            scope: me
				        }
				    }
				}]
			});
		}
		return me.toolbar;
	},
	// 重新配置订单结果
	replaceConfig: function(button, e, eOpts) {
		var me = this,
			grid = me.getOrderConfigGrid(),
			selModel = grid.getSelectionModel(),
			selRecords = selModel.getSelection(),
			shippingManager = Ext.getCmp('shippingManager'),
			window = shippingManager.getReplaceConfigWindow();
    	if(selRecords == null||selRecords.length<=0){
    		Ext.ux.Toast.msg("温馨提示", "请先选择要重新配置的结果信息");
    		return;
    	}
    	record = selRecords[0];
    	if(record.get('state')!=7){
    		Ext.ux.Toast.msg("温馨提示", "请选择已取消状态的订单配置结果");
    		return;
    	}
		window.show();
		window.bindData(me.orderRecord, record, grid);
    },
	constructor: function(config){
		var me = this,
			cfg = Ext.apply({}, config);
		me.dockedItems = [me.getToolbar()];
		me.items = [me.getOrderConfigGrid()];
		me.callParent([cfg]);
	}
});

Ext.define('MyApp.view.shippingManager', {
    extend: 'Ext.panel.Panel',
    id: 'shippingManager',
    closable: true,
    title: '出库订单',
    replaceConfigWindow: null,
	getReplaceConfigWindow: function(){
		var me = this;
		if(me.replaceConfigWindow==null){
			me.replaceConfigWindow = Ext.create('MyApp.view.ReplaceConfigWindow');
		}
		return me.replaceConfigWindow;
	},
    toolbar: null,
	getToolbar: function(){
		var me = this;
		if(Ext.isEmpty(me.toolbar)){
			me.toolbar = Ext.widget('toolbar',{
				dock: 'top',
				items: [{
				    text: '导出',
				    listeners: {
				        click: {
				            fn: me.exportOrder,
				            scope: me
				        }
				    }
				},{
				    text: '明细',
				    listeners: {
				        click: {
				            fn: me.showShippingInfo,
				            scope: me
				        }
				    }
				}]
			});
		}
		return me.toolbar;
	},
	// 导出出库订单
	exportOrder: function(button, e, eOpts){
		var me = this,url
			queryForm = me.getQueryForm(),
			values = queryForm.getValues();
		url = './order/exportShippingOrder.action?' + Ext.urlEncode(values);
		window.open(url);
	},
	shippingInfoWindow: null,
	getShippingInfoWindow: function(){
		var me = this;
		if(me.shippingInfoWindow==null){
			me.shippingInfoWindow = Ext.create('MyApp.view.SippingInfoWindow');
		}
		return me.shippingInfoWindow;
	},
	// 出库订单详情
	showShippingInfo: function(button, e, eOpts){
		var grid = this.getOrderGrid(),
			selModel = grid.getSelectionModel(),
			selRecords = selModel.getSelection(),record,
			window = this.getShippingInfoWindow();
		if(selRecords == null||selRecords.length<=0){
			Ext.ux.Toast.msg("温馨提示", "请先选择出库订单记录");
			return;
		}
		record = selRecords[0];
		window.bindData(record);
		window.show();
	},
	pagingToolbar: null,
	getPagingToolbar: function(){
		var me = this;
		if(me.pagingToolbar==null){
			me.pagingToolbar = Ext.widget('pagingtoolbar',{
		        store: me.getStore(),   
		        dock: 'bottom',
		        displayInfo: true
			});
		}
		return this.pagingToolbar;
	},
	statebar: null,
	getStatebar: function(){
		var me = this;
		if(Ext.isEmpty(me.orderStatebar)){
			me.orderStatebar = Ext.widget('toolbar',{
				dock: 'top',
				items: [{xtype: 'label', text: '订单状态：'},
						{xtype: 'image', src: 'images/common/s_ing.png'},
						{xtype: 'label', text: '待发货'},
						{xtype: 'image', src: 'images/common/close.png'},
						{xtype: 'label', text: '已取消'}
				]
			});
		}
		return me.orderStatebar;
	},
	orderGrid: null,
	getOrderGrid: function(){
		var me = this;
		if(Ext.isEmpty(me.orderGrid)){
			me.orderGrid = Ext.widget('gridpanel',{
			    header: false,
			    columnLines: true,
			    store: me.getStore(),
			    columns: [{
			            xtype: 'rownumberer'
			        },{
			    		sortable: false, 
			    		dataIndex: 'state',
			    		width:60,
			    		text: '状态',
			    		renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {	
		    				var content;
		    				switch(value){
		    				case 0:
		    					//待发货
		    					content='<div class="container"><div class="leftDiv icons_s_ing"></div></div>';
		    				 	break;
		    				default:
		    					//已取消
		    					content='<div class="container"><div class="leftDiv icons_close"></div><div class="rightDiv">'+value+'</div></div>';
		    				}
		    				return content;
		    			}
			    	},{
			            dataIndex: 'orderId',
			            flex: 1,
			            sortable: false,
			            align: 'center',
			            text: '订单号'
			        },{
			            dataIndex: 'buyer',
			            flex: 1,
			            sortable: false,
			            align: 'center',
			            text: '买家'
			        },/*{
			            dataIndex: 'seller',
			            flex: 1,
			            sortable: false,
			            align: 'center',
			            text: '卖家'
			        },*/{
			            dataIndex: 'title',
			            text: '发布单名称',
			            sortable: false,
			            align: 'center',
			            flex: 1
			        },{
			            dataIndex: 'goldCount',
			            flex: 1,
			            sortable: false,
			            align: 'center',
			            text: '商品数量 '
			        },{
			            dataIndex: 'unitPrice',
			            flex: 1,
			            sortable: false,
			            renderer: function(v) {
				            return Ext.util.Format.currency(v, '￥', 4);
				        },
				        align: 'center',
			            text: '订单单价'
			        },{
			            dataIndex: 'totalPrice',
			            flex: 1,
			            sortable: false,
			            renderer: function(v) {
				            return Ext.util.Format.currency(v, '￥', 2);
				        },
				        align: 'center',
			            text: '订单总额'
			        },{
			            dataIndex: 'tradeType',
			            text: '选择交易方式 ',
			            flex: 1,
			            sortable: false,
			            align: 'center',
			            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
			            	if(value!=0){
			            		return DataDictionary.rendererSubmitToDisplay(value,'tradeType');			            		
			            	}else{
			            		return '';
			            	}
			            }
			        },{
			        	xtype: 'datecolumn',
			        	format:'Y-m-d H:i:s',
			            dataIndex: 'createTime',
			            sortable: false,
			            flex: 1.5,
			            align: 'center',
			            text: '创建时间 '
			        },{
			            dataIndex: 'endTime',
			            xtype: 'datecolumn',
			        	format:'Y-m-d H:i:s',
			        	flex: 1.5,
			        	align: 'center',
			        	sortable: false,
			            text: '结束时间'
			        },{
			            dataIndex: 'notes',
			            flex: 1,
			            sortable: false,
			            align: 'center',
			            text: '备注'
			        }
			    ],
			    listeners: {
			    	itemdblclick: function(view, record, item, index, e, eOpts ){
			    		var window = me.getShippingInfoWindow();
			    		window.bindData(record);
			    		window.show();
			    	}
			    },
			    plugins: [{
                    ptype: 'gamegoldrowexpander',
                    header: true,
                    rowsExpander: false,
                    expandOnDblClick: false,
                    rowBodyElement : 'MyApp.shipping.OrderConfigPanel'
                }],
			    dockedItems: [me.getToolbar(),me.getStatebar(),me.getPagingToolbar()],
			    selModel: Ext.create('Ext.selection.CheckboxModel', {
			    	allowDeselect: true,
			        mode: 'SINGLE'
			    })
			});
		}
		return me.orderGrid;
	},
	store: null,
	getStore: function(){
		var me = this;
		if(me.store==null){
			me.store = Ext.create('MyApp.store.ShippingStore',{
				autoLoad: true,
				listeners: {
					beforeload : function(store, operation, eOpts) {
						var queryForm = me.getQueryForm(),
							values = queryForm.getValues();
						if (queryForm != null) {
							Ext.apply(operation, {
								params : {
									'orderId': Ext.String.trim(values.orderId),
									'createStartTime': values.createStartTime,
									'createEndTime': values.createEndTime,
									'buyerAccount': Ext.String.trim(values.buyerAccount),
									'gameName': Ext.String.trim(values.gameName),
									'detailServiceAccount': Ext.String.trim(values.detailServiceAccount),
									'sellerAccount': Ext.String.trim(values.sellerAccount)
								}
							});	
						}
					}
				}
			});
		}
		return me.store;
	},
	queryForm: null,
	getQueryForm: function(){
		var me = this;
		if(me.queryForm==null){
			me.queryForm = Ext.widget('form',{
				layout: 'column',
				defaults: {
					margin: '5 5 5 5',
					columnWidth: .25,
					labelWidth: 100,
					xtype: 'textfield'
				},
                items: [{
					name: 'orderId',
					fieldLabel: '订单号'
				},{
					fieldLabel: '游戏名称',
				    name: 'gameName'
				},{
			        fieldLabel: '创建日期',
			        columnWidth: .5,
			        xtype: 'rangedatefield',
			        //起始日期组件的name属性。
			        fromName: 'createStartTime',
			        //终止日期组件的name属性。
			        toName: 'createEndTime',
			        //起始日期组件的初始值。
			        fromValue: new Date(),
			        //终止日期组件的初始值。
			        toValue: new Date()
			    },{
					fieldLabel: '接手客服',
					hidden: CurrentUser.getUserTypeCode()!=2&&CurrentUser.getUserTypeCode()!=3,
				    name: 'detailServiceAccount'
				},{
			    	fieldLabel: '卖家5173账号',
				    name: 'sellerAccount'
				},{
					name: 'buyerAccount',
					fieldLabel: '买家5173账号'
				}],
                buttons: [{
					text:'重置',
					handler: function() {
						me.getQueryForm().getForm().reset();
					}
				},'->',{
					text:'查询',
					handler: function() {
						me.getPagingToolbar().moveFirst();
					}
				}]
            });
		}
		return this.queryForm;
	},
	initComponent: function() {
	    var me = this;
	    Ext.applyIf(me, {
	        items: [me.getQueryForm(),me.getOrderGrid()]
	    });
	    me.callParent(arguments);
	}
});