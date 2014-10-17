Ext.define('MyApp.view.MoveManagment', {
	extend: 'Ext.panel.Panel',
	closable: true,
	title: '车次管理',
	layout: 'border',
	moveForm: null,
	inventoryGrid: null,
	lineGrid: null,

	loadMove: function (picker) {

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
						{ name: 'contractNo', xtype: 'lookuptable', readOnly: false, refValueID: 130, allowBlank: false, flex: 1, labelStyle: 'font-weight:bold;', fieldLabel: '协议编号'},
						{ name: 'moveType', xtype: 'lookuplist', fieldName: 'moveType', allowBlank: false, flex: 1, fieldLabel: '发车类型' },
						{ name: 'moveStatus', xtype: 'lookuplist', fieldName: 'moveStatus', readOnly: true, tabIndex: -1, flex: 1, fieldLabel: '车次状态' },
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
						{ name: 'cVehicleID', xtype: 'lookuptable', allowBlank: false, flex: 1, refValueID: 110, fieldLabel: '车牌号码' },
						{ name: 'vehicleNature', xtype: 'textfield', readOnly: true, tabIndex: -1, flex: 1, fieldLabel: '车辆性质' },
						{ name: 'driverOwner', xtype: 'textfield', readOnly: true, tabIndex: -1, flex: 1, fieldLabel: '车主' },
						{ name: 'ownerPhone', xtype: 'textfield', readOnly: true, tabIndex: -1, flex: 1, fieldLabel: '车主电话' },
						{ name: 'totalWeight', xtype: 'numberfield', readOnly: true, tabIndex: -1, minValue: 0, value: 0, flex: 0.9, fieldLabel: '总重量' },
						{ name: 'paidArrive', xtype: 'numberfield', minValue: 0, value: 0, flex: 0.9, fieldLabel: '到付' }
					]
				},
				{
					items: [
						{ name: 'driverName', xtype: 'lookuptable', allowBlank: false, flex: 1, refValueID: 110, fieldLabel: '司机' },
						{ name: 'driverPhone', xtype: 'textfield', readOnly: true, tabIndex: -1, flex: 1, fieldLabel: '司机电话' },
						{ name: 'comment', xtype: 'textfield', readOnly: true, tabIndex: -1, flex: 2, fieldLabel: '发车备注' },
						{ name: 'totalVolume', xtype: 'numberfield', readOnly: true, tabIndex: -1, minValue: 0, value: 0, flex: 0.9, fieldLabel: '总体积' },
						{ name: 'paidReceipt', xtype: 'numberfield', minValue: 0, value: 0, flex: 0.9, fieldLabel: '回付' }
					]
				}
			],
			buttons: [
				{ text: '到车确认'},
				{ text: '中途卸车'},
				{ text: '接货入库'},
				{ text: '送货签收'}
			]
		});
	},

	getColumns: function () {
		return [
			{ text: '运单号', width: 75 },
			{ text: '开单日期', xtype: 'datecolumn', width: 100 },
			{ text: '始发站', width: 80 },
			{ text: '目的站', width: 80 },
			{ text: '发货单位', width: 95 },
			{ text: '发货人', width: 70 },
			{ text: '发货电话', width: 75 },
			{ text: '收货人', width: 70 },
			{ text: '收货电话', width: 75 },
			{ text: '货名', width: 75 },
			{ text: '包装', width: 75 },
			{ text: '件数', width: 65 },
			{ text: '重量', width: 65 },
			{ text: '体积', width: 65 },
			{ text: '价值', width: 80 },
			{ text: '运费', width: 95 },
			{ text: '回单描述', width: 75 },
			{ text: '备注', width: 120 }
		];
	},

	createLineGrid: function () {
		var me = this;
		me.lineGrid = Ext.widget('gridpanel', {
			columns: me.getColumns(),
			header: false,
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					displayInfo: true
				}
			]
		});
	},

	initComponent: function () {
		var me = this;
		me.createMoveForm();
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