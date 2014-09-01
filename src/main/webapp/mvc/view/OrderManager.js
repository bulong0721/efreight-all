Ext.define('MyApp.view.OrderManager', {
	extend : 'Ext.panel.Panel',
	closable : true,
	title : '运单管理',
	queryForm : null,
	toolbar : null,
	dataGrid : null,
	pager : null,
	store : null,

	getStore : function() {
		var me = this;
		if (me.store == null) {
			me.store = Ext.create('MyApp.store.OrderStore', {
				autoLoad : true,
				listeners : {
					beforeload : function(store, operation, eOpts) {
						var queryForm = me.getQueryForm();
						if (queryForm != null) {
							Ext.apply(operation, {
								params : {
									'q' : queryForm.getValues(true)
								}
							});
						}
					}
				}
			});
		}
		return me.store;
	},

	getToolbar : function() {
		var me = this;
		if (Ext.isEmpty(me.toolbar)) {
			me.toolbar = Ext.widget('toolbar', {
				dock : 'top',
				items : [ {
					xtype : 'button',
					itemId : 'addButton',
					text : '转运'
				} ]
			});
		}
		return me.toolbar;
	},

	getPager : function() {
		var me = this;
		if (me.pager == null) {
			me.pager = Ext.widget('pagingtoolbar', {
				store : me.getStore(),
				dock : 'bottom',
				displayInfo : true
			});
		}
		return me.pager;
	},

	getDataGrid : function() {
		var me = this;
		if (Ext.isEmpty(me.dataGrid)) {
			me.dataGrid = Ext.create('Ext.grid.Panel', {
				columnLines : true,
				store : me.getStore(),
				selType : 'checkboxmodel',
				columns : [ {
					dataIndex : 'orderCd',
					text : '托运单号'
				}, {
					dataIndex : 'status',
					text : '状态'
				}, {
					dataIndex : 'destOrg',
					text : '目的站'
				}, {
					dataIndex : 'orderedDate',
					text : '受理日期'
				}, {
					dataIndex : 'consignorOrg',
					text : '发货单位'
				}, {
					dataIndex : 'consignorName',
					text : '发货人'
				}, {
					dataIndex : 'consignorPhone',
					text : '发货人电话'
				}, {
					dataIndex : 'consignorAddr',
					text : '发货地址'
				}, {
					dataIndex : 'pickMethod',
					text : '接货方式'
				}, {
					dataIndex : 'consigneeOrg',
					text : '收货货单位'
				}, {
					dataIndex : 'consigneeName',
					text : '收货人'
				}, {
					dataIndex : 'consigneePhone',
					text : '收货人电话'
				}, {
					dataIndex : 'consigneeAddr',
					text : '收货地址'
				}, {
					dataIndex : 'dropMethod',
					text : '交货方式'
				}, {
					dataIndex : 'goodsName',
					text : '品名'
				}, {
					dataIndex : 'package',
					text : '包装'
				}, {
					dataIndex : 'amount',
					text : '件数'
				}, {
					dataIndex : 'weight',
					text : '重量（kg）'
				}, {
					dataIndex : 'volume',
					text : '体积（m3）'
				}, {
					dataIndex : 'receiptCopies',
					text : '回单要求'
				}, {
					dataIndex : 'payMethod',
					text : '付款方式'
				}, {
					dataIndex : 'salesrepUser',
					text : '业务员'
				}, {
					dataIndex : 'clerkUser',
					text : '开单员'
				} ],
				dockedItems : [ me.getToolbar(), me.getPager() ]
			});
		}
		return me.dataGrid;
	},

	getQueryForm : function() {
		var me = this;
		if (me.queryForm == null) {
			me.queryForm = Ext.widget('form', {
				layout : 'column',
				defaults : {
					margin : '4 0 4 0',
					columnWidth : .2,
					labelWidth : 65,
					labelAlign : 'right',
					xtype : 'textfield'
				},
				items : [ {
					name : 'orderCd',
					fieldLabel : '托运单号'
				}, {
					name : 'cOrgId',
					fieldLabel : '目的站'
				}, {
					name : 'name',
					fieldLabel : '发货人'
				}, {
					name : 'mobile',
					fieldLabel : '收货人'
				} ],
				buttons : [ {
					text : '重置',
					handler : function() {
						me.getQueryForm().getForm().reset();
					}
				}, '->', {
					text : '查询',
					handler : function() {
						me.getPager().moveFirst();
					}
				} ]
			});
		}
		return this.queryForm;
	},

	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items : [ me.getQueryForm(), me.getDataGrid() ]
		});
		me.callParent(arguments);
	}
});