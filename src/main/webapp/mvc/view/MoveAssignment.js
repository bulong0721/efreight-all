Ext.define('MyApp.view.MoveAssignment', {
	extend: 'Ext.panel.Panel',
	closable: true,
	title: '装车配载',
	layout: 'border',
//	border: 0,
	moveForm: null,
	inventoryGrid: null,
	lineGrid: null,

	createMoveForm: function () {
		var me = this;
		me.moveForm = Ext.widget('form', {
			frame: true,
			border:0,
			items: [
				{
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaults: {
						labelWidth: 65,
						labelAlign: 'right'
					},
					items: [
						{ name: 'dateOrdered', xtype: 'datefield', value: new Date(), format: 'Y/m/d', flex: 1, fieldLabel: '协议日期'},
						{ name: 'orderCd', xtype: 'lookuptable', refValueID: 130, allowBlank: false, flex: 1, labelStyle: 'font-weight:bold;', fieldLabel: '协议编号'},
						{ name: 'datePromise', xtype: 'lookuptable', flex: 1, refValueID: 101, fieldLabel: '起点站' },
						{ name: 'orderedOrgID', xtype: 'lookuptable', allowBlank: false, flex: 1, refValueID: 101, fieldLabel: '起始站' },
						{ name: 'destinationOrgID', xtype: 'numberfield', flex: 1, fieldLabel: '货物总价' },
						{ name: 'consignorOrg', xtype: 'numberfield', tabIndex: -1, flex: 1, fieldLabel: '运输费用' }
					]
				},
				{
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaults: {
						labelWidth: 65,
						labelAlign: 'right'
					},
					items: [
						{ name: 'consignorBPartnerID', xtype: 'lookuptable', allowBlank: false, flex: 1, refValueID: 110, fieldLabel: '车牌号码' },
						{ name: 'consigneeAddr', xtype: 'lookuplist', fieldName: 'payMethod', tabIndex: -1, flex: 1, fieldLabel: '车辆性质' },
						{ name: 'consigneeAddr', xtype: 'lookuplist', fieldName: 'payMethod', tabIndex: -1, flex: 1, fieldLabel: '车辆型号' },
						{ name: 'consigneeMobile', xtype: 'textfield', tabIndex: -1, flex: 1, readOnly: true, fieldLabel: '行驶证号' },
						{ name: 'consigneeOrg', xtype: 'numberfield', tabIndex: -1, flex: 1, fieldLabel: '总件数' },
						{ name: 'consigneeBPartnerID', xtype: 'numberfield', allowBlank: false, flex: 1, fieldLabel: '预付'}
					]
				},
				{
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaults: {
						labelWidth: 65,
						labelAlign: 'right'
					},
					items: [
						{ name: 'consignorBPartnerID', xtype: 'lookuptable', allowBlank: false, flex: 1, refValueID: 110, fieldLabel: '司机' },
						{ name: 'consignorMobile', xtype: 'textfield', tabIndex: -1, flex: 1, readOnly: true, fieldLabel: '司机电话' },
						{ name: 'consignorAddr', xtype: 'textfield', tabIndex: -1, flex: 1, readOnly: true, fieldLabel: '司机身份证' },
						{ name: 'consignorAddr', xtype: 'textfield', tabIndex: -1, flex: 1, readOnly: true, fieldLabel: '驾驶证号' },
						{ name: 'totalWeight', xtype: 'numberfield', minValue: 0, value: 0, flex: 1, fieldLabel: '总重量' },
						{ name: 'totalVolume', xtype: 'numberfield', minValue: 0, value: 0, flex: 1, fieldLabel: '到付' }
					]
				},
				{
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaults: {
						labelWidth: 65,
						labelAlign: 'right'
					},
					items: [
						{ name: 'consigneePhone', xtype: 'textfield', tabIndex: -1, flex: 1, readOnly: true, fieldLabel: '车主' },
						{ name: 'consigneeMobile', xtype: 'textfield', tabIndex: -1, flex: 1, readOnly: true, fieldLabel: '车主电话' },
						{ name: 'consigneeAddr', xtype: 'textfield', tabIndex: -1, flex: 2, readOnly: true, fieldLabel: '车主地址' },
						{ name: 'paidConsignee', xtype: 'numberfield', minValue: 0, value: 0, flex: 1, fieldLabel: '总体积' },
						{ name: 'paidReceipt', xtype: 'numberfield', minValue: 0, value: 0, flex: 1, fieldLabel: '回付' }
					]
				}
			],
			buttons: [
				{text: '查询库存'},
				{text: '保存配载'}
			]
		});
	},

	createInventoryGrid: function () {
		var me = this;
		me.inventoryGrid = Ext.widget('gridpanel', {
			columns: [],
//			border: 0,
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{ text: '添加装车'}
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

	createLineGrid: function () {
		var me = this;
		me.lineGrid = Ext.widget('gridpanel', {
			columns: [],
			header: false,
//			border: 0,
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{ text: '移除装车'}
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

	initComponent: function () {
		var me = this;
		me.createMoveForm();
		me.createInventoryGrid();
		me.createLineGrid();

		Ext.applyIf(me, {
			items: [
				{ border: 0, region: 'north', layout: 'fit', items: [me.moveForm] },
				{ border: 0, region: 'west', split:true, flex: 2, layout: 'fit', items: [me.inventoryGrid] },
				{ border: 0, region: 'center', flex: 1.5, layout: 'fit', items: [me.lineGrid] }
			]
		});
		me.callParent(arguments);
	}

});