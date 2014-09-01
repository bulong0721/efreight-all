/*
 * 订单管理页面
 */
Ext.define('MyApp.view.OrderSimpleInfoForm',{
	extend: 'Ext.form.Panel',
    layout: 'column',
    title: '订单信息',
	defaults: {
		margin: '2 2 2 2',
		columnWidth: .333,
		labelWidth: 80,
		readOnly: true,
		xtype: 'textfield'
	},
	constructor : function(config) {
		var me = this, cfg = Ext.apply({}, config);
		me.items = [{
			name: 'orderId',
			fieldLabel: '订单号'
		},{
			name: 'userAccount',
			fieldLabel: '买家'
		},{
			name: 'receiver',
			fieldLabel: '游戏角色'
		},{
			name: 'mobileNumber',
			fieldLabel: '联系方式'
		},{
			name: 'qq',
			fieldLabel: 'QQ'
		},{
		    fieldLabel: '数量',
		    name: 'goldCount'
		},{
		    fieldLabel: '单价',
		    name: 'unitPrice'
		},{
		    fieldLabel: '价格',
		    xtype: 'numberfield',
		    decimalPrecision: 2,
		    name: 'totalPrice'
		},{
		    fieldLabel: '接手客服',
		    name: 'realName'
		},{
		    xtype: 'textareafield',
		    columnWidth: 1,
		    fieldLabel: '备注',
		    name: 'notes',
		    height: 50
		}];
		me.callParent([ cfg ]);
	}
});


//库存查询结果表格页面
Ext.define('MyApp.order.RepositoryGrid',{
	extend: 'Ext.grid.Panel',
	store : null,
	bbar: null,
	editer : null,
	getEditer : function(){
		if(this.editer==null){
			this.editer = Ext.create('Ext.grid.plugin.CellEditing', {
								//设置鼠标点击多少次，触发编辑
								clicksToEdit: 1
							});
		}
		return this.editer;
	},
    changeEvent: function(field, newValue, oldValue, eOpts){
		if(!Ext.isEmpty(field.getErrors())){
			Ext.ux.Toast.msg("温馨提示", field.getErrors()[0]);
			return false;
		}else{
			return true;
		}
	},
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
			dataIndex: 'gameAccount',
			align: 'center',
			flex: 1,
			text: '游戏账号'
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
			text: '可销售库存'
		},{ 
	    	header: '配置数目',  
	    	dataIndex: 'configCount',
	    	sortable: false,
	    	flex: 1,
	    	editor: {
	    		xtype: 'numberfield',
	    		name: 'discount',
	    		minValue: 0,
	    		listeners: {
	    			change: function(field, newValue, oldValue, eOpts){
	    				me.changeEvent(field, newValue, oldValue, eOpts);
	    			}
	    		}
	    	}
	    }];
		me.store = Ext.create('MyApp.store.RepositoryStore',{
			pageSize: 25,
			listeners: {
				beforeload : function(store, operation, eOpts) {
					Ext.apply(operation, {
						params : me.queryParam
					});
				}				
			}
		});
		me.selModel = Ext.create('Ext.selection.CheckboxModel', {
	    	allowDeselect: true,
	        //mode: 'SINGLE'
	    	mode: 'MULTI',
	    	listeners: {
	    		select: function(rowModel, record, index, eOpts){
	    			var panel = me.up('panel'),
	    				store = me.getStore(),
	    				updatedRecords = store.getUpdatedRecords(),
		    			configForm = panel.getConfigForm().getForm(),
		    			order = configForm.getRecord();
		    		if(record.get('sellableCount')>order.get('goldCount')){
		    			for(var i=0; i<updatedRecords.length; i++){
        					var r = updatedRecords[i];
        					r.set('configCount',null);
        				}
		    			record.set('configCount',order.get('goldCount'));
		    		}
	    		}
	        }
	    });
		me.bbar = Ext.create('Ext.PagingToolbar', {
			store: me.store
		});
		me.plugins = [me.getEditer()];
		me.callParent([cfg]);
	}
});

//订单处理页面
Ext.define('MyApp.order.OrderDetailPanel',{
	extend: 'Ext.panel.Panel',
	title: '订单配置',
	defaults: {
		margin: '2 2 2 2'
	},
	loadData: function(orderRecord){
		var me = this,
			repositoryGrid = me.getRepositoryGrid(),
			selectModel = repositoryGrid.getSelectionModel(),
			store = repositoryGrid.getStore(),
			configForm = me.getConfigForm().getForm();
		configForm.reset();
		configForm.loadRecord(orderRecord);
		selectModel.deselectAll();
		repositoryGrid.queryParam = {
			'repository.gameName': Ext.String.trim(orderRecord.get('gameName')),
			'repository.region': Ext.String.trim(orderRecord.get('region')),
			'repository.server': Ext.String.trim(orderRecord.get('server')),
			'repository.unitPrice': orderRecord.get('unitPrice'),
			'repository.goldCount': 500,
			'repository.gameRace': orderRecord.get('gameRace')
		};
		/*if(Ext.String.trim(orderRecord.get('gameName'))==="地下城与勇士"){
			Ext.Object.merge(repositoryGrid.queryParam, {
				//如果是地下城与勇士游戏，那么就要判断游戏的可售库存是否足够
				'repository.goldCount': orderRecord.get('goldCount')
			});			
		}*/
		store.loadPage(1);
	},
	repositoryGrid : null,
	getRepositoryGrid : function(){
		if(this.repositoryGrid==null){
			this.repositoryGrid = Ext.create('MyApp.order.RepositoryGrid',{
				autoScroll: true,
				height : 213
			});
		}
		return this.repositoryGrid;
	},
	configForm: null,
	getConfigForm: function(){
		var me = this;
		if(me.configForm==null){
			me.configForm = Ext.widget('form',{
				layout: 'column',
				border: false,
				defaults: {
					margin: '2 5 2 5',
					columnWidth: .3
				},
                items: [DataDictionary.getDataDictionaryCombo('check',{
					fieldLabel: '是否有货',
					labelWidth: 80,
					editable: false,
					allowBlank: false, //不允许为空
					name: 'isHaveStore',
					listeners: {
						change: function(combo, newValue, oldValue, eOpts){
			        		var form = combo.up('form').getForm(),
			        			tradeType = form.findField('tradeType');
		        			if(newValue){
		        				tradeType.setDisabled(false);
		        			}else{
		        				tradeType.setDisabled(true);
		        				tradeType.setValue(null);
		        			}
			        	}
					}
				}), DataDictionary.getDataDictionaryCombo('tradeType',{
                	fieldLabel: '交易方式',
                	labelWidth: 80,
					editable: false,
					allowBlank: false, //不允许为空
					name: 'tradeType'
				})]
            });
		}
		return this.configForm;
	},
	constructor: function(config){
		var me = this,
			cfg = Ext.apply({}, config);
		me.items = [me.getConfigForm(),me.getRepositoryGrid()];
		me.buttons = [{
        	text:'保存',
        	plugins: {
        		ptype: 'buttondisabledplugin',
        		seconds: 3
        	},
        	handler: function() {
        		var grid = me.getRepositoryGrid(),
	    			store = grid.getStore(),
	    			updatedRecords = store.getUpdatedRecords(),
	    			repositoryList=[],
	    			configInfoList=[],
	    			tradeType,count=0,
	    			configForm = me.getConfigForm().getForm(),
	    			order = configForm.getRecord();
        		configForm.updateRecord(order);
        		if(configForm.isValid()){
        			if(order.get('isHaveStore')===false){
        				Ext.Ajax.request({
							url : './order/notStoreOrder.action',
							method: 'POST',
							jsonData: {
								'orderInfo': order.data
							},
							success : function(response, opts) {
								var orderManager = Ext.getCmp('orderManager'),
									window = me.up('window'),
									store = orderManager.getStore();
								Ext.ux.Toast.msg("温馨提示", "订单取消并设置无货状态成功");
								window.close();
								store.load();
							},
							exception : function(response, opts) {
								var json = Ext.decode(response.responseText);
								Ext.ux.Toast.msg("温馨提示", json.message);
							}
						});
        			}else{
        				if(updatedRecords == null||updatedRecords.length<=0){
        					Ext.ux.Toast.msg("温馨提示", "请先选择用于配置的库存信息");
        					return;
        				}
        				/*if(updatedRecords.length>3){
        					Ext.ux.Toast.msg("温馨提示", "用于配置的库存信息不能大于3条");
        					return;
        				}*/
        				//repository = updatedRecords[0];
        				for(var i=0; i<updatedRecords.length; i++){
        					var record = updatedRecords[i];
        					count += record.get('configCount');
        					repositoryList.push(record.data);
        					configInfoList.push({
        						'repositoryId': record.get('id'),
        						'configGoldCount': record.get('configCount')
        					});
        				}
        				if(count!=order.get('goldCount')){
        					Ext.ux.Toast.msg("温馨提示", "配置的游戏币数("+count+")不等于订单游戏币数("+order.get('goldCount')+")");
        					return;
        				}
        				Ext.Ajax.request({
        					url : './order/configOrder.action',
        					method: 'POST',
        					jsonData: {
        						//'repository': repository.data,
        						repositoryList: repositoryList,
        						configInfoList: configInfoList,
        						'orderInfo': order.data
        					},
        					success : function(response, opts) {
        						var orderManager = Ext.getCmp('orderManager'),
	        						window = me.up('window'),
	        						store = orderManager.getStore();
        						Ext.ux.Toast.msg("温馨提示", "订单配置成功");
        						window.close();
        						store.load();
        					},
        					exception : function(response, opts) {
        						var json = Ext.decode(response.responseText);
        						Ext.ux.Toast.msg("温馨提示", json.message);
        					}
        				});        				
        			}
				}
        	}
        }];
		me.callParent([cfg]);
	}
});

Ext.define('MyApp.view.DetailOrderWindow',{
	extend: 'Ext.window.Window',
	width: 800,
	autoScroll: true,
	maxHeight: 1000,
    title: '处理订单',
	closeAction: 'hide',
	modal: true,
	defaults: {
		margin: '5 5 5 5'
	},
	form: null,
	getForm: function(){
		var me = this;
		if(me.form==null){
			me.form = Ext.create('MyApp.view.OrderSimpleInfoForm');
		}
		return me.form;
	},
	panel: null,
	getPanel: function(){
		var me = this;
		if(me.panel == null){
			me.panel = Ext.create('MyApp.order.OrderDetailPanel');
		}
		return me.panel;
	},
	bindData: function(record){
		var me = this,
			form = me.getForm().getForm(),
			realName = form.findField('realName'),
			panel = me.getPanel();
		form.reset();
		form.loadRecord(record);
		realName.setValue(record.get('servicerInfo').realName);
		panel.loadData(record);
	},
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [me.getForm(),me.getPanel()]
        });
        me.callParent(arguments);
    }
});

Ext.define('MyApp.view.changeStateWindow', {
    extend: 'Ext.window.Window',
    width: 700,
    title: '修改订单状态',
	closeAction: 'hide',
	modal: true,
	form: null,
	getForm: function(){
		var me = this;
		if(me.form==null){
			me.form = Ext.widget('form',{
                    layout: 'column',
					defaults: {
						margin: '5 5 5 5',
						columnWidth: .5,
						labelWidth: 100,
						readOnly: true,
						xtype: 'textfield'
					},
                    items: [{
            			name: 'orderId',
            			fieldLabel: '订单号'
            		},{
            			name: 'userAccount',
            			fieldLabel: '所属用户'
            		},{
						name: 'payTime',
						xtype: 'datefield',
						format:'Y-m-d H:i:s',
						fieldLabel: '付款时间'
					},{
						name: 'deliveryTime',
						fieldLabel: '发货速度(分钟)'
					},DataDictionary.getDataDictionaryCombo('orderState',{
                    	fieldLabel: '订单状态',
                    	labelWidth: 100,
                    	allowBlank: false,
    					name: 'orderState',
    					listeners: {
    						'expand': function(combo, e){
    							var store = combo.getStore(),orderStateValue = combo.getValue();
    							me.filterData(store, orderStateValue);
    						}
    					},
    					editable: false
    				}),DataDictionary.getDataDictionaryCombo('check',{
						fieldLabel: '是否延迟',
						name: 'isDelay',
						labelWidth: 100,
						editable: false
					})],
                    buttons: [me.getSaveButton()]
                });
		}
		return this.form;
	},
	isUpdate: null,
	saveButton: null,
	getSaveButton: function(){
		var me = this;
		if(me.saveButton==null){
			me.saveButton = Ext.create('Ext.Button',{
				text:'保存',
				formBind: true,
				disabled: true,
				handler: function() {
					var form = me.getForm().getForm(),
		    			order = form.getRecord();
	        		form.updateRecord(order);
	        		if(form.isValid()){
						Ext.Ajax.request({
							url : './order/changeOrderState.action',
							method: 'POST',
							jsonData: {
								'orderInfo': order.data
							},
							success : function(response, opts) {
								var orderManager = Ext.getCmp('orderManager'),
									store = orderManager.getStore();
								Ext.ux.Toast.msg("温馨提示", "订单状态设置成功");
								me.close();
								store.load();
							},
							exception : function(response, opts) {
								var json = Ext.decode(response.responseText);
								Ext.ux.Toast.msg("温馨提示", json.message);
							}
						});
					}
				}
			});
		}
		return me.saveButton;
	},
	filterData: function(store, orderStateValue){
		store.removeAll();
		if(orderStateValue==1){
			store.loadData(DataDictionary.getDataByTermsCode('orderState',[orderStateValue,7]));
			return;
		}
		if(orderStateValue==2||orderStateValue==3){
			store.loadData(DataDictionary.getDataByTermsCode('orderState',[orderStateValue,6]));
			return;
		}
		if(orderStateValue==4){
			store.loadData(DataDictionary.getDataByTermsCode('orderState',[orderStateValue,5]));
			return;
		}
		store.loadData(DataDictionary.getDataByTermsCode('orderState',[orderStateValue]));
    	/*store.filterBy(function(item) {
			if(item.get("value")==orderStateValue){
				return true; 				
			}
			//待付款 -- 已取消(可后台修改)
			if(orderStateValue==1){
				return item.get("value")==7;
			}
			//已付款 -- 已退款(可后台修改)
			if(orderStateValue==2){
				return item.get("value")==6;
			}
			//待发货 -- 已退款(可后台修改)
			if(orderStateValue==3){
				return item.get("value")==6;
			}
			//已发货 -- 结单(可后台修改)
			if(orderStateValue==4){
				return item.get("value")==5;
			}
		});*/
	},
	bindData: function(record){
		var me = this,
			form = me.getForm().getForm(),
			saveButton = me.getSaveButton(),
			orderState = form.findField('orderState'),
			orderStateValue = record.get('orderState'),
			store = orderState.getStore();
		form.reset();
		if(orderStateValue<5){
			saveButton.setVisible(true);
			orderState.setDisabled(false);			
		}else{
			saveButton.setVisible(false);
			orderState.setDisabled(true);	
		}
		//待付款 -- 已取消(可后台修改)
		
		//已付款 -- 待发货(配单修改)
		//已付款 -- 已退款(可后台修改)
		
		//待发货 -- 已发货(RC/其他系统)
		//待发货 -- 已退款(可后台修改)
		
		//已发货 -- 结单(可后台修改、自动修改、前台修改)
		
		//已退款、已取消及结单后，状态不可修改
		me.filterData(store, orderStateValue);
		form.loadRecord(record);
	},
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [me.getForm()]
        });
        me.callParent(arguments);
    }
});

Ext.define('MyApp.view.OrderInfoForm',{
	extend: 'Ext.form.Panel',
    layout: 'column',
	defaults: {
		margin: '5 2 5 2',
		columnWidth: .333,
		labelWidth: 80,
		readOnly: true,
		xtype: 'textfield'
	},
	constructor : function(config) {
		var me = this, cfg = Ext.apply({}, config);
		me.items = [{
			name: 'orderId',
			fieldLabel: '订单号'
		},{
			name: 'userAccount',
			fieldLabel: '买家'
		},{
			name: 'servicerInfo',
			fieldLabel: '客服信息'
		},DataDictionary.getDataDictionaryCombo('tradeType',{
			fieldLabel: '交易方式',
			name: 'tradeType',
			readOnly: true,
			columnWidth: .333,
			labelWidth: 80
		}),{
			name: 'mobileNumber',
			fieldLabel: '联系方式'
		},{
			name: 'qq',
			fieldLabel: 'QQ'
		},{
			name: 'receiver',
			fieldLabel: '游戏角色'
		},{
			name: 'title',
			fieldLabel: '发布单名称'
		},{
			name: 'gameProp',
			columnWidth: .999,
			fieldLabel: '游戏属性'
		},{
			name: 'deliveryTime',
			fieldLabel: '发货速度'
		},{
		    fieldLabel: '数量',
		    name: 'goldCount'
		},{
		    fieldLabel: '单价',
		    name: 'unitPrice'
		},{
		    fieldLabel: '价格',
		    xtype: 'numberfield',
		    decimalPrecision: 2,
		    name: 'totalPrice'
		},DataDictionary.getDataDictionaryCombo('orderState',{
			fieldLabel: '订单状态',
			readOnly: true,
			name: 'orderState',
			columnWidth: .333,
			labelWidth: 80
		}),DataDictionary.getDataDictionaryCombo('check',{
			fieldLabel: '是否延迟',
			readOnly: true,
			name: 'isDelay',
			columnWidth: .333,
			labelWidth: 80
		}),DataDictionary.getDataDictionaryCombo('check',{
			fieldLabel: '是否有货',
			name: 'isHaveStore',
			readOnly: true,
			columnWidth: .333,
			labelWidth: 80
		}),{
			name: 'createTime',
			xtype: 'datefield',
			format:'Y-m-d H:i:s',
			fieldLabel: '创建时间'
		},{
			name: 'payTime',
			xtype: 'datefield',
			format:'Y-m-d H:i:s',
			fieldLabel: '付款时间'
		},{
			name: 'sendTime',
			xtype: 'datefield',
			format:'Y-m-d H:i:s',
			fieldLabel: '发货时间'
		},{
			name: 'endTime',
			xtype: 'datefield',
			format:'Y-m-d H:i:s',
			fieldLabel: '结束时间'
		},{
		    fieldLabel: '备注',
		    columnWidth: .999,
		    name: 'notes'
		}];
		me.callParent([ cfg ]);
	}
});

Ext.define('MyApp.view.orderInfoWindow', {
    extend: 'Ext.window.Window',
    width: 800,
    title: '订单信息',
	closeAction: 'hide',
	modal: true,
	form: null,
	getForm: function(){
		var me = this;
		if(me.form==null){
			me.form = Ext.create('MyApp.view.OrderInfoForm');
		}
		return this.form;
	},
	isUpdate: null,
	bindData: function(record){
		var me = this,
			form = me.getForm().getForm(),
			servicerInfo = form.findField('servicerInfo'),
			gameProp = form.findField('gameProp');
		form.reset();
		form.loadRecord(record);
		servicerInfo.setValue(record.get('servicerInfo').realName);
		var prop = record.get('gameName')+'||'+record.get('region')+'||'+record.get('server');
		prop += Ext.isEmpty(record.get('gameRace'))?"":'||'+record.get('gameRace');
		gameProp.setValue(prop);
	},
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [me.getForm()]
        });
        me.callParent(arguments);
    }
});

Ext.define('MyApp.view.orderConfigGrid', {
    extend: 'Ext.grid.Panel',
    header: false,
    columnLines: true,
    constructor : function(config) {
		var me = this, cfg = Ext.apply({}, config);
		me.features = [{
			ftype: 'groupingsummary',
			hideGroupedHeader:true
		}];
	    me.columns = [{
			header: '订单号', 
			dataIndex: 'orderId',
			width:60
		},{
	        dataIndex: 'state',
	        sortable: false,
	        flex: 1,
	        align: 'center',
	        renderer: function(value){
				return DataDictionary.rendererSubmitToDisplay(value,'orderState');
			},
	        text: '状态'
	    },{
	        dataIndex: 'loginAccount',
	        sortable: false,
	        flex: 1,
	        align: 'center',
	        text: '卖家',
	        summaryRenderer: function(value, summaryData, dataIndex){ return '订单小计';}
	    },{
	        dataIndex: 'configGoldCount',
	        sortable: false,
	        flex: 0.7,
	        align: 'center',
	        text: '数目',
	        summaryType: 'sum'
	    },{
	        dataIndex: 'repositoryUnitPrice',
	        flex: 0.7,
	        sortable: false, 
	        align: 'center',
	        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {	
	        	return Ext.util.Format.currency(value, '￥', 4);
	        },
	        summaryType: 'average',
	        text: '库存单价'
	    },{
	        dataIndex: 'totalPrice',
	        flex: 1,
	        sortable: false, 
	        align: 'center',
	        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {	
	        	return Ext.util.Format.currency(value, '￥', 2);
	        },
	        summaryType: 'sum',
	        text: '配置入库总额'
	    },{
	        dataIndex: 'totalPrice',
	        flex: 1,
	        sortable: false, 
	        align: 'center',
	        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {	
	        	var v = value*(1-SystemUtil.getSubCommissionBase());
	        	return Ext.util.Format.currency(v, '￥', 2);
	        },
	        summaryType: 'sum',
	        text: '卖家收益'
	    },{
	        dataIndex: 'totalPrice',
	        flex: 0.7,
	        sortable: false, 
	        align: 'center',
	        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {	
	        	var v = value*SystemUtil.getSubCommissionBase();
	        	return Ext.util.Format.currency(v, '￥', 2);
	        },
	        summaryType: 'sum',
	        text: '卖家佣金'
	    },{
	        dataIndex: 'orderUnitPrice',
	        flex: 0.7,
	        sortable: false, 
	        align: 'center',
	        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {	
	        	return Ext.util.Format.currency(value, '￥', 4);
	        },
	        summaryType: 'average',
	        text: '订单单价'
	    },{
	        dataIndex: 'id',
	        flex: 1,
	        sortable: false, 
	        align: 'center',
	        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {	
	        	return Ext.util.Format.currency(record.get('orderUnitPrice')*record.get('configGoldCount'), '￥', 2);
	        },
	        summaryType: function(records){
		        var length = records.length,
		    		total = 0,
		    		record;
		    	for (var i=0; i < length; ++i) {
		    		record = records[i];
		    		total = total + record.get('orderUnitPrice')*record.get('configGoldCount');
		    	}
		    	return total;
		    },
	        summaryType: 'sum',
	        text: '配置出库总额'
	    },{
	        dataIndex: 'id',
	        flex: 1,
	        sortable: false, 
	        align: 'center',
	        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {	
	        	var v = record.get('orderUnitPrice')*record.get('configGoldCount')-record.get('totalPrice');
	        	return Ext.util.Format.currency(v, '￥', 2);
	        },
	        summaryType: function(records){
		        var length = records.length,
		    		total = 0,
		    		record;
		    	for (var i=0; i < length; ++i) {
		    		record = records[i];
		    		total = total + record.get('orderUnitPrice')*record.get('configGoldCount')-record.get('totalPrice');
		    	}
		    	return total;
		    },
	        text: '差额收入'
	    }];
		/*me.selModel = Ext.create('Ext.selection.CheckboxModel', {
			allowDeselect: true,
			mode: 'SINGLE'
		});*/
		me.callParent([ cfg ]);
	}
});

//订单库存配置信息
Ext.define('MyApp.order.OrderConfigPanel',{
	extend: 'Ext.panel.Panel',
	title: '订单库存配置信息',
	padding: '5 20 5 20',
	defaults: {
		padding: '5 5 5 5'
	},
	bindData: function(record, grid, rowBodyElement){
		var me = this,
			store = me.getStore();
		store.load({
			params: {
				'orderId': record.get('orderId')
			}
		});
	},
	store: null,
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
	constructor: function(config){
		var me = this,
			cfg = Ext.apply({}, config);
		me.items = [me.getOrderConfigGrid()];
		me.callParent([cfg]);
	}
});

Ext.define('MyApp.view.orderManager', {
    extend: 'Ext.panel.Panel',
    id: 'orderManager',
    closable: true,
    title: '我的订单',
    toolbar: null,
	getToolbar: function(){
		var me = this;
		if(Ext.isEmpty(me.toolbar)){
			me.toolbar = Ext.widget('toolbar',{
				dock: 'top',
				items: [{
				    text: '订单处理',
				    listeners: {
				        click: {
				            fn: me.detailOrder,
				            scope: me
				        }
				    }
				},{
				    text: '修改状态',
				    listeners: {
				        click: {
				            fn: me.changeState,
				            scope: me
				        }
				    }
				},{
				    text: '订单详情',
				    listeners: {
				        click: {
				            fn: me.orderInfo,
				            scope: me
				        }
				    }
				}]
			});
		}
		return me.toolbar;
	},
	payInfobar: null,
	getPayInfobar: function(){
		var me = this;
		if(Ext.isEmpty(me.payInfobar)){
			me.payInfobar = Ext.widget('toolbar',{
				dock: 'top',
				items: [{xtype: 'label', text: '支付状态：'},
						{xtype: 'image', src: 'images/common/p_no.png'},
						{xtype: 'label', text: '未支付'},
						{xtype: 'image', src: 'images/common/p_yes.png'},
						{xtype: 'label', text: '已支付'},
						{xtype: 'image', src: 'images/common/p_back.png'},
						{xtype: 'label', text: '已退款'}
				]
			});
		}
		return me.payInfobar;
	},
	orderStatebar: null,
	getOrderStatebar: function(){
		var me = this;
		if(Ext.isEmpty(me.orderStatebar)){
			me.orderStatebar = Ext.widget('toolbar',{
				dock: 'top',
				items: [{xtype: 'label', text: '订单状态：'},
						{xtype: 'image', src: 'images/common/t_ing.png'},
						{xtype: 'label', text: '交易中'},
						{xtype: 'image', src: 'images/common/s_ing.png'},
						{xtype: 'label', text: '待发货'},
						{xtype: 'image', src: 'images/common/s_yes.png'},
						{xtype: 'label', text: '已发货'},
						{xtype: 'image', src: 'images/common/t_yes.png'},
						{xtype: 'label', text: '交易成功'},
						{xtype: 'image', src: 'images/common/close.png'},
						{xtype: 'label', text: '已取消'}
				]
			});
		}
		return me.orderStatebar;
	},
	detailOrderWindow: null,
	getDetailOrderWindow: function(){
		var me = this;
		if(me.detailOrderWindow==null){
			me.detailOrderWindow = Ext.create('MyApp.view.DetailOrderWindow');
		}
		return me.detailOrderWindow;
	},
	changeStateWindow: null,
	getChangeStateWindow: function(){
		var me = this;
		if(me.changeStateWindow==null){
			me.changeStateWindow = Ext.create('MyApp.view.changeStateWindow');
		}
		return me.changeStateWindow;
	},
	orderInfoWindow: null,
	getOrderInfoWindow: function(){
		var me = this;
		if(me.orderInfoWindow==null){
			me.orderInfoWindow = Ext.create('MyApp.view.orderInfoWindow');
		}
		return me.orderInfoWindow;
	},
	// 修改订单状态
	changeState: function(button, e, eOpts){
		var grid = this.getOrderGrid(),
			selModel = grid.getSelectionModel(),
			selRecords = selModel.getSelection(),order,
			window = this.getChangeStateWindow();
		if(selRecords == null||selRecords.length<=0){
			Ext.ux.Toast.msg("温馨提示", "请先选择要修改的订单");
			return;
		}
		order = selRecords[0];
		/*if(order.get('orderState')>2){
			Ext.ux.Toast.msg("温馨提示", "请选择待付款与已付款状态的订单进行修改");
			return;
		}*/
		window.show();
		window.bindData(order);
	},
	// 处理订单
	detailOrder: function(button, e, eOpts) {
		var grid = this.getOrderGrid(),
			selModel = grid.getSelectionModel(),
			selRecords = selModel.getSelection(),order,
			window = this.getDetailOrderWindow();
    	if(selRecords == null||selRecords.length<=0){
    		Ext.ux.Toast.msg("温馨提示", "请先选择要处理的订单");
    		return;
    	}
    	record = selRecords[0];
    	if(record.get('orderState')!=2){
    		Ext.ux.Toast.msg("温馨提示", "请选择已付款状态的订单进行处理");
    		return;
    	}
		window.show();
		window.bindData(record);
    },
    // 订单详情
	orderInfo: function(button, e, eOpts) {
		var grid = this.getOrderGrid(),
			selModel = grid.getSelectionModel(),
			selRecords = selModel.getSelection(),order,
			window = this.getOrderInfoWindow();
    	if(selRecords == null||selRecords.length<=0){
    		Ext.ux.Toast.msg("温馨提示", "请先选择订单");
    		return;
    	}
    	order = selRecords[0];
		window.show();
		window.bindData(order);
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
			    		dataIndex: 'orderState',
			    		width:60,
			    		text: '状态',
			    		renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {	
		    				var content;
		    				switch(value){
		    				case 1:
		    					//待付款===未支付/交易中
		    					content='<div class="container"><div class="leftDiv icons_p_no"></div><div class="rightDiv icons_t_ing"></div></div>';
		    				 	break;
		    				case 2:
		    					//已付款===已支付/交易中
		    					content='<div class="container"><div class="leftDiv icons_p_yes"></div><div class="rightDiv icons_t_ing"></div></div>';
		    				 	break;
		    				case 3:
		    					//待发货===已支付/待发货
		    					content='<div class="container"><div class="leftDiv icons_p_yes"></div><div class="rightDiv icons_s_ing"></div></div>';
		    				 	break;
		    				case 4:
		    					//已发货===已支付/已发货
		    					content='<div class="container"><div class="leftDiv icons_p_yes"></div><div class="rightDiv icons_s_yes"></div></div>';
		    				 	break;
		    				case 5:
		    					//结单===已支付/交易成功
		    					content='<div class="container"><div class="leftDiv icons_p_yes"></div><div class="rightDiv icons_t_yes"></div></div>';
		    				 	break;
		    				case 6:
		    					//已退款===已退款/已取消
		    					content='<div class="container"><div class="leftDiv icons_p_back"></div><div class="rightDiv icons_close"></div></div>';
		    					break;
		    				case 7:
		    					//已取消===未支付/已取消
		    					content='<div class="container"><div class="leftDiv icons_p_no"></div><div class="rightDiv icons_close"></div></div>';
		    					break;
		    				default:
		    					content='';
		    				}
		    				return content;
		    			}
			    	},{
			            dataIndex: 'orderId',
			            xtype: 'ellipsiscolumn',
			            flex: 1.5,
			            sortable: false, 
			            align: 'center',
			            text: '订单号'
			        },{
			            dataIndex: 'userAccount',
			            flex: 1,
			            sortable: false, 
			            align: 'center',
			            text: '买家'
			        },{
						dataIndex: 'qq',
			            flex: 1,
			            sortable: false, 
			            align: 'center',
			            text: 'QQ'
					},{
			            dataIndex: 'title',
			            text: '发布单<br/>名称',
			            sortable: false, 
			            align: 'center',
			            flex: 1
			        },{
			            dataIndex: 'goldCount',
			            flex: 0.7,
			            sortable: false, 
			            align: 'center',
			            text: '数量'
			        },{
			            dataIndex: 'totalPrice',
			            flex: 0.7,
			            sortable: false, 
			            renderer: function(v) {
				            return Ext.util.Format.currency(v, '￥', 2);
				        },
				        align: 'center',
			            text: '价格'
			        },{
			        	xtype: 'datecolumn',
			        	format:'Y-m-d H:i:s',
			            dataIndex: 'createTime',
			            sortable: false, 
			            flex: 1.5,
			            align: 'center',
			            text: '创建时间 '
			        },{
			            dataIndex: 'sendTime',
			            xtype: 'datecolumn',
			        	format:'Y-m-d H:i:s',
			        	flex: 1.5,
			        	align: 'center',
			        	sortable: false,
			            text: '发货时间'
			        },{
			            dataIndex: 'endTime',
			            xtype: 'datecolumn',
			        	format:'Y-m-d H:i:s',
			        	flex: 1.5,
			        	align: 'center',
			        	sortable: false,
			            text: '完成时间'
			        }
			    ],
			    listeners: {
			    	itemdblclick: function(view, record, item, index, e, eOpts ){
			    		var window = me.getDetailOrderWindow();
			    		if(record.get('orderState')!=2){
			        		Ext.ux.Toast.msg("温馨提示", "请选择已付款状态的订单进行处理");
			        		return;
			        	}
			        	window.bindData(record);
			    		window.show();
			    	}
			    },
			    plugins: [{
                    ptype: 'gamegoldrowexpander',
                    header: true,
                    rowsExpander: false,
                    expandOnDblClick: false,
                    rowBodyElement : 'MyApp.order.OrderConfigPanel'
                }],
			    dockedItems: [me.getToolbar(),me.getPayInfobar(),me.getOrderStatebar(),me.getPagingToolbar()],
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
			me.store = Ext.create('MyApp.store.OrderStore',{
				autoLoad: true,
				listeners: {
					beforeload : function(store, operation, eOpts) {
						var queryForm = me.getQueryForm(),
							values = queryForm.getValues();
						if (queryForm != null) {
							Ext.apply(operation, {
								params : {
									'createStartTime': values.createStartTime,
									'createEndTime': values.createEndTime,
									'sellerAccount': Ext.String.trim(values.sellerAccount),
									'buyerAccount': Ext.String.trim(values.buyerAccount),
									'orderState': values.orderState,
									'gameName': Ext.String.trim(values.gameName),
									'orderId': Ext.String.trim(values.orderId),
									'detailServiceAccount': Ext.String.trim(values.detailServiceAccount),
									'buyerQq': Ext.String.trim(values.buyerQq)
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
			        fieldLabel: '下单日期',
			        columnWidth: .5,
			        xtype: 'rangedatefield',
			        //起始日期组件的name属性。
			        fromName: 'createStartTime',
			        //终止日期组件的name属性。
			        toName: 'createEndTime'
			    },{
			    	fieldLabel: '卖家5173账号',
				    name: 'sellerAccount'
				},{
					name: 'buyerAccount',
					fieldLabel: '买家5173账号'
				},DataDictionary.getDataDictionaryCombo('orderState',{
                	fieldLabel: '订单状态',
                	labelWidth: 100,
					name: 'orderState',
					value: 2,
					editable: false
				},{value: null,display:'全部'}),{
					fieldLabel: '游戏名称',
				    name: 'gameName'
				},{
					name: 'orderId',
					fieldLabel: '订单号'
				},{
					fieldLabel: '接手客服',
					hidden: CurrentUser.getUserTypeCode()!=2&&CurrentUser.getUserTypeCode()!=3,
				    name: 'detailServiceAccount'
				},{
					name: 'buyerQq',
					fieldLabel: '买家QQ'
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
	    	intervalID: null,
	    	listeners:{
				//渲染结束定时进行订单的刷新。
				boxready : function(){
					me.intervalID = setInterval(
						function(){
							me.getStore().load();
						},SystemUtil.getOrderAutoLoadTime()
					);
				},
				destroy: function(){
					clearInterval(me.intervalID);
				}
			},
	        items: [me.getQueryForm(),me.getOrderGrid()]
	    });
	    me.callParent(arguments);
	}
});