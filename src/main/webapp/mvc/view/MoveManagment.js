Ext.define('MyApp.view.MoveManagment', {
	extend: 'Ext.panel.Panel',
	closable: true,
	title: '车次管理',
	layout: 'border',
	moveForm: null,
	moveModel: null,
	lineStore: null,
	lineGrid: null,

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

	createMoveForm: function () {
		var me = this;
		me.moveForm = Ext.widget('form', {
			frame: true,
			border: 0,
			defaults: {
				xtype: 'fieldcontainer',
				layout: 'hbox',
				defaults: {
					readOnly: true,
					labelWidth: 65,
					labelAlign: 'right'
				}
			},
			items: [
				{
					items: [
						{ name: 'dateOrdered', xtype: 'datefield', value: new Date(), format: 'Y/m/d', flex: 1, fieldLabel: '协议日期'},
						{ name: 'contractNo', xtype: 'lookuptable', readOnly: false, refValueID: 131, flex: 1, labelStyle: 'font-weight:bold;', fieldLabel: '协议编号',
							listeners: {
								change: {
									fn: me.loadMove,
									scope: me
								}
							}
						},
						{ name: 'moveType', xtype: 'lookuplist', fieldName: 'moveType', flex: 1, fieldLabel: '发车类型' },
						{ name: 'moveStatus', xtype: 'lookuplist', fieldName: 'moveStatus', flex: 1, fieldLabel: '车次状态', fieldCls: 'special-attention' },
						{ name: 'totalFreight', xtype: 'numberfield', value: 0, flex: 0.9, fieldLabel: '总运费' },
						{ name: 'chargeFreight', xtype: 'numberfield', value: 0, flex: 0.9, fieldLabel: '运输费' }
					]
				},
				{
					items: [
						{ name: 'departOrgID', xtype: 'lookuptable', flex: 1, refValueID: 101, fieldLabel: '起始站' },
						{ name: 'destOrgID', xtype: 'lookuptable', flex: 1, refValueID: 101, fieldLabel: '目的站' },
						{ name: 'timeDepart', xtype: 'datefield', format: 'Y/m/d', flex: 1, fieldLabel: '发车时间' },
						{ name: 'timeArrive', xtype: 'datefield', format: 'Y/m/d', flex: 1, fieldLabel: '到达时间' },
						{ name: 'totalAmount', xtype: 'numberfield', value: 0, flex: 0.9, fieldLabel: '总件数' },
						{ name: 'paidDepart', xtype: 'numberfield', value: 0, flex: 0.9, fieldLabel: '预付'}
					]
				},
				{
					items: [
						{ name: 'cVehicleID', xtype: 'lookuptable', flex: 1, refValueID: 123, fieldLabel: '车牌号码'},
						{ name: 'vehicleNature', xtype: 'lookuplist', fieldName: 'vehicleNature', flex: 1, fieldLabel: '车辆性质' },
						{ name: 'ownerName', xtype: 'textfield', flex: 1, fieldLabel: '车主' },
						{ name: 'ownerPhone', xtype: 'textfield', flex: 1, fieldLabel: '车主电话' },
						{ name: 'totalWeight', xtype: 'numberfield', minValue: 0, value: 0, flex: 0.9, fieldLabel: '总重量' },
						{ name: 'paidArrive', xtype: 'numberfield', minValue: 0, value: 0, flex: 0.9, fieldLabel: '到付' }
					]
				},
				{
					items: [
						{ name: 'driverName', xtype: 'lookuptable', flex: 1, refValueID: 110, fieldLabel: '司机' },
						{ name: 'driverPhone', xtype: 'textfield', flex: 1, fieldLabel: '司机电话' },
						{ name: 'comment', xtype: 'textfield', flex: 2, fieldLabel: '发车备注' },
						{ name: 'totalVolume', xtype: 'numberfield', minValue: 0, value: 0, flex: 0.9, fieldLabel: '总体积' },
						{ name: 'paidReceipt', xtype: 'numberfield', minValue: 0, value: 0, flex: 0.9, fieldLabel: '回付' }
					]
				}
			],
			buttons: [
				{ name: 'unloadOrgID',labelWidth: 65, labelAlign: 'right', xtype: 'combobox', width:165, fieldLabel: '卸车站' },
				{ text: '中途卸车'},
				'-',
				{ text: '到车确认'},
				{ text: '接货入库'},
				{ text: '送货签收'}
			]
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
				dwrFunction: facade.searchMoveline,
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

	createLineGrid: function () {
		var me = this;
		me.lineGrid = Ext.widget('gridpanel', {
			columns: me.getColumns(),
			store: me.lineStore,
			header: false,
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					displayInfo: true
				}
			],
			selType: 'checkboxmodel'
		});
	},

	initComponent: function () {
		var me = this;
		me.createMoveForm();
		me.createLineStroe();
		me.createLineGrid();

		Ext.applyIf(me, {
			items: [
				{ border: 0, region: 'north', layout: 'fit', items: [me.moveForm] },
				{ border: 0, region: 'center', flex: 1.5, layout: 'fit', items: [me.lineGrid] }
			]
		});
		me.callParent(arguments);
	}

});