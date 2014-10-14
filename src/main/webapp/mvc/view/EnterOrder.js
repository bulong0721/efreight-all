/*
 * 订单管理页面
 */
Ext.define('MyApp.view.EnterOrder', {
	extend: 'Ext.form.Panel',
	closable: true,
	id: 'EnterOrder',
	title: '录入运单',
	frame: true,
	defaults: {
		labelAlign: 'right',
		xtype: 'textfield'
	},

	loadConsignor: function (picker) {
		var me = this, record = picker.getRecord();
		if (record) {
			me.getForm().findField("consignorAddr").setValue(record.get("dockAddr"));
			me.getForm().findField("consignorOrg").setValue(record.get("orgName"));
			me.getForm().findField("consignorPhone").setValue(record.get("phone"));
			me.getForm().findField("consignorMobile").setValue(record.get("mobile"));
		}
	},

	loadConsignee: function (picker) {
		var me = this, record = picker.getRecord();
		if (record) {
			me.getForm().findField("consigneeAddr").setValue(record.get("dockAddr"));
			me.getForm().findField("consigneeOrg").setValue(record.get("orgName"));
			me.getForm().findField("consigneePhone").setValue(record.get("phone"));
			me.getForm().findField("consigneeMobile").setValue(record.get("mobile"));
		}
	},

	loadOrder: function (picker) {
		var me = this, record = picker.getRecord(), form = me.getForm();
//		form.loadRecord(record.raw);
	},

	createFields: function () {
		var me = this;
		return [
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				defaults: {
					labelWidth: 65,
					labelAlign: 'right'
				},
				items: [
					{ name: 'dateOrdered', xtype: 'datefield', value: new Date(), format: 'Y/m/d', flex: 3, fieldLabel: '受理日期'},
					{ name: 'orderCd', xtype: 'lookuptable', refValueID: 130, allowBlank: false, flex: 4, labelStyle: 'font-weight:bold;', fieldLabel: '托运单号', listeners: {
						change: {
							fn: me.loadOrder,
							scope: me
						}
					} },
					{ name: 'datePromise', xtype: 'datefield', flex: 2.5, format: 'Y/m/d', fieldLabel: '承诺日期' },
					{ name: 'orderedOrgID', xtype: 'lookuptable', allowBlank: false, flex: 2.5, refValueID: 101, fieldLabel: '起始站' },
					{ name: 'destinationOrgID', xtype: 'lookuptable', allowBlank: false, flex: 2.5, refValueID: 101, fieldLabel: '终点站' }
				]
			},
			{
				xtype: 'fieldset',
				title: '基本信息',
				collapsible: false,
				defaultType: 'textfield',
				layout: 'anchor',
				defaults: {
					anchor: '100%'
				},
				items: [
					{
						xtype: 'fieldcontainer',
						layout: 'hbox',
						defaults: {
							labelWidth: 65,
							labelAlign: 'right'
						},
						items: [
							{ name: 'consignorOrg', xtype: 'textfield', tabIndex: -1, flex: 2.5, readOnly: true, fieldLabel: '发货单位' },
							{ name: 'consignorBPartnerID', xtype: 'lookuptable', allowBlank: false, flex: 2, refValueID: 110, fieldLabel: '发货人',
								listeners: {
									change: {
										fn: me.loadConsignor,
										scope: me
									}
								} },
							{ name: 'consignorPhone', xtype: 'textfield', tabIndex: -1, flex: 2, readOnly: true, fieldLabel: '电话' },
							{ name: 'consignorMobile', xtype: 'textfield', tabIndex: -1, flex: 2, readOnly: true, fieldLabel: '手机号码' },
							{ name: 'consignorAddr', xtype: 'textfield', tabIndex: -1, flex: 3.5, readOnly: true, fieldLabel: '发货地址' }
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
							{ name: 'consigneeOrg', xtype: 'textfield', tabIndex: -1, readOnly: true, flex: 2.5, fieldLabel: '收货单位' },
							{ name: 'consigneeBPartnerID', xtype: 'lookuptable', allowBlank: false, flex: 2, refValueID: 111, fieldLabel: '收货人',
								listeners: {
									change: {
										fn: me.loadConsignee,
										scope: me
									}
								} },
							{ name: 'consigneePhone', xtype: 'textfield', tabIndex: -1, flex: 2, readOnly: true, fieldLabel: '电话' },
							{ name: 'consigneeMobile', xtype: 'textfield', tabIndex: -1, flex: 2, readOnly: true, fieldLabel: '手机号码' },
							{ name: 'consigneeAddr', xtype: 'textfield', tabIndex: -1, flex: 3.5, readOnly: true, fieldLabel: '收货地址' }
						]
					}
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
					{ name: 'moveMethod', xtype: 'lookuplist', fieldName: 'chargeMethod', width: 180, fieldLabel: '运输方式' },
					{ name: 'deliveryMethod', xtype: 'lookuplist', fieldName: 'chargeMethod', allowBlank: false, width: 180, fieldLabel: '交货方式' },
					{ name: 'receiptCopies', xtype: 'numberfield', minValue: 0, value: 0, width: 150, fieldLabel: '回单数量' }
				]
			},
			{
				xtype: 'fieldset',
				title: '货物信息',
				collapsible: false,
				defaultType: 'numberfield',
				layout: 'anchor',
				defaults: {
					anchor: '100%',
					labelAlign: top
				},
				items: [
					{
						xtype: 'fieldcontainer',
						layout: 'hbox',
						defaultType: 'numberfield',
						defaults: {
							labelWidth: 60,
							labelAlign: 'top'
						},
						items: [
							{ name: 'goodsName', xtype: 'lookuplist', fieldName: 'chargeMethod', editable: true, flex: 1.5, fieldLabel: '品名' },
							{ name: 'package', xtype: 'lookuplist', fieldName: 'chargeMethod', editable: true, flex: 1.2, fieldLabel: '包装' },
							{ name: 'totalAmount', minValue: 0, maxValue: 100, value: 1, flex: 1, fieldLabel: '件数' },
							{ name: 'totalWeight', minValue: 0, value: 0, flex: 1, fieldLabel: '重量' },
							{ name: 'totalVolume', minValue: 0, value: 0, flex: 1, fieldLabel: '体积' },
							{ name: 'price', flex: 1, minValue: 0, value: 0, fieldLabel: '单价' },
							{ name: 'chargeMethod', xtype: 'lookuplist', flex: 1.2, fieldName: 'chargeMethod', fieldLabel: '计费方式' },
							{ name: 'chargeFreight', minValue: 0, value: 0, flex: 1, fieldLabel: '基本运费' },
							{ name: 'chargePickup', minValue: 0, value: 0, flex: 1, fieldLabel: '接货费' },
							{ name: 'chargeDelivery', minValue: 0, value: 0, flex: 1, fieldLabel: '送货费' },
							{ name: 'goodsValue', minValue: 0, value: 0, flex: 1, fieldLabel: '货物价值' },
							{ name: 'chargeInsurance', minValue: 0, value: 0, flex: 1, fieldLabel: '保费' },
							{ name: 'costCommission', minValue: 0, value: 0, flex: 1, fieldLabel: '回扣' },
							{ name: 'costOther', minValue: 0, value: 0, flex: 1, fieldLabel: '其他费用' }
						]
					},
					{
						xtype: 'fieldcontainer',
						layout: {
							type: 'hbox',
							pack: 'end'
						},
						defaults: {
							labelWidth: 65,
							labelAlign: 'right',
							labelStyle: 'font-weight:bold;'
						},
						items: [
							{ name: 'totalCharge', xtype: 'numberfield', minValue: 0, value: 0, width: 220, fieldLabel: '费用合计' }
						]
					}
				]
			},
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				defaults: {
					labelWidth: 60,
					labelAlign: 'right'
				},
				items: [
					{ name: 'payMethod', xtype: 'lookuplist', fieldName: 'payMethod', flex: 2.5, fieldLabel: '付款方式' },
					{ name: 'paidConsignor', xtype: 'numberfield', minValue: 0, value: 0, flex: 2, fieldLabel: '现付' },
					{ name: 'paidConsignee', xtype: 'numberfield', minValue: 0, value: 0, flex: 2, fieldLabel: '到付' },
					{ name: 'paidReceipt', xtype: 'numberfield', minValue: 0, value: 0, flex: 2, fieldLabel: '回单付' },
					{ name: 'paidMonthly', xtype: 'numberfield', minValue: 0, value: 0, flex: 2, fieldLabel: '月结' },
					{ name: 'costPaidCommission', xtype: 'numberfield', minValue: 0, value: 0, flex: 2, fieldLabel: '已结回扣' },
					{ name: 'costUnpaidCommission', xtype: 'numberfield', minValue: 0, value: 0, flex: 2, fieldLabel: '未付回扣' }
				]
			},
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				defaults: {
					labelWidth: 60,
					labelAlign: 'right'
				},
				items: [
					{ name: 'commentCharge', xtype: 'textareafield', flex: 2, fieldLabel: '费用说明' },
					{ name: 'comment', xtype: 'textareafield', flex: 2, fieldLabel: '托运备注' }
				]
			},
			{
				xtype: 'fieldcontainer',
				layout: {
					type: 'hbox',
					pack: 'end'
				},
				defaults: {
					labelWidth: 60,
					labelAlign: 'right'
				},
				items: [
					{ name: 'salesrepUserID', xtype: 'lookuptable', refValueID: 108, width: 175, fieldLabel: '业务员' },
					{ name: 'clerkUserID', xtype: 'textfield', width: 175, readonly: true, fieldLabel: '开单员' }
				]
			}
		];
	},

	printLabel: function () {

	},

	printOrder: function () {

	},

	saveOrder: function () {
		var me = this, form = me.getForm();
		if (form.isValid()) {
			var values = form.getValues();
			facade.saveOrder(Ext.JSON.encode(values), function (success) {
				form.reset();
			});
		}
	},

	createButtons: function () {
		var me = this;
		return [
			{ text: '保存运单', listeners: {
				click: {
					fn: me.saveOrder,
					scope: me
				}
			}},
			{ text: '打印运单', listeners: {
				click: {
					fn: me.printOrder,
					scope: me
				}
			}},
			{ text: '打印标签', listeners: {
				click: {
					fn: me.printLabel,
					scope: me
				}
			} }
		];
	},

	initComponent: function () {
		var me = this;
		me.buttons = me.createButtons();
		me.items = me.createFields();
		me.callParent(arguments);
	}


});
