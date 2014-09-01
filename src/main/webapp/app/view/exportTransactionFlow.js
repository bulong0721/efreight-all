/*
 * 交易流水导出页面
 */
Ext.define('MyApp.view.exportTransactionFlow', {
    extend: 'Ext.panel.Panel',
    id: 'exportTransactionFlow',
    closable: true,
    title: '交易流水导出',
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
				}]
			});
		}
		return me.toolbar;
	},
	// 导出订单
	exportOrder: function(button, e, eOpts){
		var me = this,url
			queryForm = me.getQueryForm(),
			values = queryForm.getValues();
		url = './funds/exportTransactionFlow.action?' + Ext.urlEncode(values);
		window.open(url);
	},
	store: null,
	getStore: function(){
		var me = this;
		if(me.store==null){
			me.store = Ext.create('MyApp.store.TransactionStore',{
				autoLoad: true,
				listeners: {
					beforeload : function(store, operation, eOpts) {
						var queryForm = me.getQueryForm(),
							values = queryForm.getValues();
						if (queryForm != null) {
							Ext.apply(operation, {
								params : {
									'servicerId': values.servicerId,
									'loginAccount': values.loginAccount,
									'orderState': values.orderState,
									'statementStartTime': values.statementStartTime,
									'statementEndTime': values.statementEndTime
								}
							});	
						}
					}
				}
			});
		}
		return me.store;
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
			            dataIndex: 'serviceAccount',
			            flex: 1,
			            sortable: false,
			            align: 'center',
			            text: '客服账号'
			        },{
			            dataIndex: 'loginAccount',
			            flex: 1,
			            sortable: false,
			            align: 'center',
			            text: '卖家账号'
			        },{
			            dataIndex: 'orderId',
			            flex: 1,
			            sortable: false,
			            align: 'center',
			            text: '订单号'
			        },{
			            dataIndex: 'orderState',
			            text: '订单状态 ',
			            flex: 1,
			            sortable: false,
			            align: 'center',
			            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
			            	return DataDictionary.rendererSubmitToDisplay(value,'orderState');
			            }
			        },{
			            dataIndex: 'title',
			            flex: 1,
			            sortable: false,
			            align: 'center',
			            text: '商品名称'
			        },{
			            dataIndex: 'gameName',
			            flex: 1.5,
			            sortable: false,
			            align: 'center',
			            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
			            	var gameProp = record.get('gameName')+"/"
			            					+record.get('region')+"/"
			            					+record.get('server');
			            	if(Ext.isEmpty(record.get('gameRace'))){
			            		return gameProp;
			            	}else{
			            		return gameProp +'/'+ record.get('gameRace');
			            	}
			            },
			            text: '游戏属性'
			        },{
			            dataIndex: 'orderUnitPrice',
			            flex: 1,
			            sortable: false,
			            renderer: function(v) {
				            return Ext.util.Format.currency(v, '￥', 4);
				        },
				        align: 'center',
			            text: '商品单价'
			        },/*{
			            dataIndex: 'repositoryUnitPrice',
			            flex: 1,
			            sortable: false,
			            renderer: function(v) {
				            return Ext.util.Format.currency(v, '￥', 4);
				        },
				        align: 'center',
			            text: '库存单价'
			        },*/{
			            dataIndex: 'goldCount',
			            flex: 1,
			            sortable: false,
			            align: 'center',
			            text: '购买总数</br>(金币数) '
			        },{
			            dataIndex: 'orderTotalPrice',
			            flex: 1,
			            renderer: function(v) {
				            return Ext.util.Format.currency(v, '￥', 2);
				        },
				        sortable: false,
				        align: 'center',
			            text: '订单总<br/>金额'
			        },/*{
			            dataIndex: 'incomeTotalPrice',
			            flex: 1,
			            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {	
				        	var v = value*(1-SystemUtil.getSubCommissionBase());
				        	return Ext.util.Format.currency(v, '￥', 2);
				        },
				        sortable: false,
				        align: 'center',
			            text: '卖家收益'
			        },{
			            dataIndex: 'orderTotalPrice',
			            flex: 1,
			            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {	
				        	var v = value-record.get('incomeTotalPrice');
				        	return Ext.util.Format.currency(v, '￥', 2);
				        },
				        sortable: false,
				        align: 'center',
			            text: '差额收入'
			        },*/{
			            dataIndex: 'endTime',
			            xtype: 'datecolumn',
			        	format:'Y-m-d H:i:s',
			        	flex: 1.5,
			        	align: 'center',
			        	sortable: false,
			            text: '完成时间'
			        }
			    ],
			    plugins: [{
                    ptype: 'gamegoldrowexpander',
                    header: true,
                    rowsExpander: false,
                    expandOnDblClick: false,
                    rowBodyElement : 'MyApp.order.OrderConfigPanel'
                }],
			    dockedItems: [me.getToolbar(),me.getPagingToolbar()],
			    selModel: Ext.create('Ext.selection.CheckboxModel', {
			    	allowDeselect: true,
			        mode: 'SINGLE'
			    })
			});
		}
		return me.orderGrid;
	},
	queryForm: null,
	getQueryForm: function(){
		var me = this;
		if(me.queryForm==null){
			me.queryForm = Ext.widget('form',{
				layout: 'column',
				defaults: {
					margin: '10 10 10 10',
					columnWidth: .25,
					labelWidth: 100,
					xtype: 'textfield'
				},
                items: [{
					fieldLabel: '客服账户',
					hidden: CurrentUser.getUserTypeCode()!=3,
					xtype: 'commonuserselector',
					columnWidth: .25,
					labelWidth: 100,
				    name: 'servicerId'
				},{
					fieldLabel: '卖家5173账号',
				    name: 'loginAccount'
				},DataDictionary.getDataDictionaryCombo('orderState',{
                	fieldLabel: '订单状态',
                	columnWidth: .25,
					labelWidth: 100,
					name: 'orderState',
					editable: false
				},{value: null,display:'全部'}),{
			        fieldLabel: '交易日期',
			        columnWidth: .5,
			        xtype: 'rangedatefield',
			        //起始日期组件的name属性。
			        fromName: 'statementStartTime',
			        //终止日期组件的name属性。
			        toName: 'statementEndTime',
			        //起始日期组件的初始值。
			        fromValue: new Date(),
			        //终止日期组件的初始值。
			        toValue: new Date()
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