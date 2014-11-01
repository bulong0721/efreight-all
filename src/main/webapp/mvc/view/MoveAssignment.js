Ext.define('MyApp.view.MoveAssignment', {
	extend: 'Ext.panel.Panel',
	closable: true,
	title: '装车配载',
	layout: 'border',
	moveForm: null,
	inventoryStore: null,
	inventoryGrid: null,
	lineStore: null,
	lineGrid: null,
	moveModel: null,

	loadMove: function (picker) {
		var me = this, record = picker.getRecord(), form = me.moveForm.getForm();
		if (record) {
			me.moveModel = record.raw;
			form.setValues(me.moveModel);
			form.findField("departOrgID").setRawValue(me.moveModel.departOrgName);
			form.findField("destOrgID").setRawValue(me.moveModel.arriveOrgName);
			form.findField("cVehicleID").setRawValue(me.moveModel.plateNo);
			me.lineStore.loadPage(1);
		}
	},

	loadVehicle: function (picker) {
		var me = this, record = picker.getRecord(), form = me.moveForm.getForm();
		if (record) {
			record = record.raw;
			form.findField("vehicleNature").setValue(record.vehicleNature);
			form.findField("ownerName").setValue(record.owner);
			form.findField("ownerPhone").setValue(record.ownerPhone);
			form.findField("driverName").setValue(record.driver);
			form.findField("driverPhone").setValue(record.driverPhone);
		}
	},

	statMoveline: function () {
		var me = this, form = me.moveForm.getForm(), store = me.lineStore;
		form.findField("totalFreight").setValue(store.sum("totalCharge"));
		form.findField("totalWeight").setValue(store.sum("weight"));
		form.findField("totalAmount").setValue(store.sum("amount"));
		form.findField("totalVolume").setValue(store.sum("volume"));
	},

	createMoveForm: function () {
		var me = this;
		me.moveForm = Ext.create('Ext.form.Panel', {
			frame: true,
			border: 0,
			defaults: {
				xtype: 'fieldcontainer',
				layout: 'hbox',
				defaults: {
					labelWidth: 65,
					labelAlign: 'right'
				}
			},
			items: [
				{
					items: [
						{ name: 'dateOrdered', xtype: 'datefield', value: new Date(), format: 'Y/m/d', flex: 1, fieldLabel: '协议日期'},
						{ name: 'contractNo', xtype: 'lookuptable', readOnly: false, refValueID: 131, allowBlank: false, flex: 1, labelStyle: 'font-weight:bold;', fieldLabel: '协议编号',
							listeners: {
								change: {
									fn: me.loadMove,
									scope: me
								}
							}
						},
						{ name: 'moveType', xtype: 'lookuplist', fieldName: 'moveType', allowBlank: false, flex: 1, fieldLabel: '发车类型' },
						{ name: 'moveStatus', xtype: 'lookuplist', fieldName: 'moveStatus', readOnly: true, value: 0, tabIndex: -1, flex: 1, fieldLabel: '车次状态', fieldCls: 'special-attention' },
						{ name: 'totalFreight', xtype: 'numberfield', readOnly: true, tabIndex: -1, value: 0, flex: 0.9, fieldLabel: '总运费' },
						{ name: 'chargeFreight', xtype: 'numberfield', value: 0, flex: 0.9, fieldLabel: '运输费' }
					]
				},
				{
					items: [
						{ name: 'departOrgID', xtype: 'lookuptable', flex: 1, allowBlank: false, refValueID: 101, fieldLabel: '起始站' },
						{ name: 'destOrgID', xtype: 'lookuptable', allowBlank: false, flex: 1, refValueID: 101, fieldLabel: '目的站' },
						{ name: 'timeDepart', xtype: 'datefield', format: 'Y/m/d', flex: 1, fieldLabel: '发车时间' },
						{ name: 'timeArrive', xtype: 'datefield', format: 'Y/m/d', readOnly: true, tabIndex: -1, flex: 1, fieldLabel: '到达时间' },
						{ name: 'totalAmount', xtype: 'numberfield', readOnly: true, value: 0, tabIndex: -1, flex: 0.9, fieldLabel: '总件数' },
						{ name: 'paidDepart', xtype: 'numberfield', value: 0, flex: 0.9, fieldLabel: '预付'}
					]
				},
				{
					items: [
						{ name: 'cVehicleID', xtype: 'lookuptable', allowBlank: false, flex: 1, refValueID: 123, fieldLabel: '车牌号码',
							listeners: {
								change: {
									fn: me.loadVehicle,
									scope: me
								}
							}
						},
						{ name: 'vehicleNature', xtype: 'lookuplist', fieldName: 'vehicleNature', readOnly: true, tabIndex: -1, flex: 1, fieldLabel: '车辆性质' },
						{ name: 'ownerName', xtype: 'textfield', readOnly: true, tabIndex: -1, flex: 1, fieldLabel: '车主' },
						{ name: 'ownerPhone', xtype: 'textfield', readOnly: true, tabIndex: -1, flex: 1, fieldLabel: '车主电话' },
						{ name: 'totalWeight', xtype: 'numberfield', readOnly: true, tabIndex: -1, minValue: 0, value: 0, flex: 0.9, fieldLabel: '总重量' },
						{ name: 'paidArrive', xtype: 'numberfield', minValue: 0, value: 0, flex: 0.9, fieldLabel: '到付' }
					]
				},
				{
					items: [
						{ name: 'driverName', xtype: 'lookuptable', allowBlank: false, flex: 1, refValueID: 110, fieldLabel: '司机' },
						{ name: 'driverPhone', xtype: 'textfield', readOnly: true, tabIndex: -1, flex: 1, fieldLabel: '司机电话' },
						{ name: 'comment', xtype: 'textfield', tabIndex: -1, flex: 2, fieldLabel: '发车备注' },
						{ name: 'totalVolume', xtype: 'numberfield', readOnly: true, tabIndex: -1, minValue: 0, value: 0, flex: 0.9, fieldLabel: '总体积' },
						{ name: 'paidReceipt', xtype: 'numberfield', minValue: 0, value: 0, flex: 0.9, fieldLabel: '回付' }
					]
				}
			],
			buttons: [
				{ name: 'wayOrgID', xtype: 'lookuptable', labelWidth: 60, labelAlign: 'right', width: 185, refValueID: 101, fieldLabel: '途经站' },
				{ text: '查询库存', listeners: {
					click: {
						fn: me.searchInventory,
						scope: me
					}
				} },
				'-',
				{ text: '保存发车', listeners: {
					click: {
						fn: me.saveAssignment,
						scope: me
					}
				}}
			]
		});
	},

	createInventoryStore: function () {
		var me = this;
		me.inventoryStore = Ext.create('Ext.data.Store', {
			model: 'MyApp.model.InventoryVModel',
			autoDestroy: true,
			autoLoad: false,
			proxy: {
				type: 'dwr',
				dwrFunction: facade.searchInventory,
				passDwrStoreParams: true,
				dwrParams: [],
				reader: {
					type: 'json',
					root: 'rows',
					totalProperty: 'total'
				}
			},
			listeners: {
				beforeload: function (store, operation, eOpts) {
					var moveModel = me.moveForm.getForm().getValues();
					if (moveModel.departOrgID && moveModel.wayOrgID) {
						Ext.apply(operation, {
							params: {
								'departOrgID': moveModel.departOrgID,
								'destOrgID': moveModel.wayOrgID
							}
						});
					} else {
						Ext.Msg.alert("提示", "请输入<起始站>与<途经站>再查询库存。");
						return false;
					}
				}
			}
		});
	},

	createLineStroe: function () {
		var me = this;
		me.lineStore = Ext.create('Ext.data.Store', {
			model: 'MyApp.model.InventoryVModel',
			autoDestroy: true,
			autoLoad: false,
			proxy: {
				type: 'dwr',
				passDwrStoreParams: true,
				dwrParams: [],
				dwrFunction: {
					read: facade.searchMoveline,
					create: facade.createMoveline,
					destroy: facade.deleteMoveline
				},
				reader: {
					type: 'json',
					root: 'rows',
					totalProperty: 'total'
				}
			},
			listeners: {
				beforeload: function (store, operation, eOpts) {
					var moveModel = me.moveModel;
					if (moveModel != null) {
						Ext.apply(operation, {
							params: {
								moveID: moveModel.cMoveID
							}
						});
					} else {
						return false;
					}
				}
			}
		});
	},

	searchInventory: function () {
		var me = this;
		me.inventoryStore.loadPage(1);
	},

	saveAssignment: function () {
		var me = this, form = me.moveForm.getForm();
		if (form.isValid()) {
			var values = form.getValues();
			if (null != me.moveModel) {
				values.cMoveID = me.moveModel.cMoveID;
			}
			facade.saveMove(Ext.JSON.encode(values), function (moveID) {
				me.moveModel = Ext.clone(values);
				me.moveModel.cMoveID = moveID;
				me.syncMoveID();
				me.lineStore.sync();
				Ext.Msg.alert("提示", "发车保存成功。");
			});
		}
	},

	syncMoveID: function (moveID) {
		var me = this;
		me.lineStore.each(function (record) {
			record.cMoveID = moveID;
		});
	},

	addMoveline: function () {
		var me = this, selModel = me.inventoryGrid.getSelectionModel();
		Ext.Array.each(selModel.getSelection(), function (record) {
			var lineModel = Ext.create('MyApp.model.InventoryVModel', record.raw);
			me.lineStore.add(lineModel);
			me.inventoryStore.remove(record);
			me.statMoveline();
		});
	},

	removeMoveline: function () {
		var me = this, selModel = me.lineGrid.getSelectionModel();
		Ext.Array.each(selModel.getSelection(), function (record) {
			var inventoryModel = Ext.create('MyApp.model.InventoryVModel', record.raw);
			me.inventoryStore.add(inventoryModel);
			me.lineStore.remove(record);
			me.statMoveline();
		});
	},

	createInventoryGrid: function () {
		var me = this;
		me.inventoryGrid = Ext.widget('gridpanel', {
			columns: me.getColumns(),
			store: me.inventoryStore,
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{ xtype: 'button', text: '添加装车', iconCls: 'icon-add16',
							listeners: {
								click: {
									fn: me.addMoveline,
									scope: me
								}
							}
						}
					]
				},
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					displayInfo: true
				}
			],
			selType: 'checkboxmodel'
		});
	},

	getColumns: function () {
		return [
			{ dataIndex: 'orderCd', text: '运单号', width: 75 },
			{ dataIndex: 'dateOrdered', text: '开单日期', xtype: 'datecolumn', width: 100 },
			{ dataIndex: 'departOrgName', text: '始发站', width: 80 },
			{ dataIndex: 'destOrgName', text: '目的站', width: 80 },
			{ dataIndex: 'consignorOrgName', text: '发货单位', width: 95 },
			{ dataIndex: 'consignorName', text: '发货人', width: 70 },
			{ dataIndex: 'consignorPhone', text: '发货电话', width: 75 },
			{ dataIndex: 'consigneeName', text: '收货人', width: 70 },
			{ dataIndex: 'consigneePhone', text: '收货电话', width: 75 },
			{ dataIndex: 'goodsName', text: '货名', width: 75 },
			{ dataIndex: 'goodsPackage', text: '包装', width: 75, xtype: 'listcolumn', fieldName: 'packageType'},
			{ dataIndex: 'amount', text: '件数', width: 65 },
			{ dataIndex: 'weight', text: '重量', width: 65 },
			{ dataIndex: 'volume', text: '体积', width: 65 },
			{ dataIndex: 'totalCharge', text: '价值', width: 80 },
			{ dataIndex: 'totalCharge', text: '运费', width: 95 },
			{ dataIndex: 'commentReceipt', text: '回单描述', width: 75 },
			{ dataIndex: 'commentOrder', text: '备注', width: 120 }
		];
	},

	createLineGrid: function () {
		var me = this;
		me.lineGrid = Ext.widget('gridpanel', {
			columns: me.getColumns(),
			store: me.lineStore,
			header: false,
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{ text: '移除装车', iconCls: 'icon-delete16',
							listeners: {
								click: {
									fn: me.removeMoveline,
									scope: me
								}
							}}
					]
				}
			],
			selType: 'checkboxmodel'
		});
	},

	initComponent: function () {
		var me = this;
		me.createMoveForm();
		me.createInventoryStore();
		me.createInventoryGrid();
		me.createLineStroe();
		me.createLineGrid();

		Ext.applyIf(me, {
			items: [
				{ border: 0, region: 'north', layout: 'fit', items: [me.moveForm] },
				{ border: 0, region: 'west', split: true, flex: 2, layout: 'fit', items: [me.inventoryGrid] },
				{ border: 0, region: 'center', flex: 1.5, layout: 'fit', items: [me.lineGrid] }
			]
		});
		me.callParent(arguments);
	}

});