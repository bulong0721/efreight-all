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
	items: [
		{
			xtype: 'fieldcontainer',
			layout: 'hbox',
			defaults: {
				labelWidth: 65,
				labelAlign: 'right'
			},
			items: [
				{
					xtype: 'datefield',
					flex: 3,
					fieldLabel: '受理日期'
				},
				{
					xtype: 'textfield',
					allowBlank: false,
					flex: 4,
					labelStyle: 'font-weight:bold;',
					fieldLabel: '托运单号'
				},
				{
					xtype: 'datefield',
					flex: 2.5,
					fieldLabel: '承诺日期'
				},
				{
					xtype: 'combobox',
					flex: 2.5,
					fieldLabel: '起始站'
				},
				{
					xtype: 'combobox',
					flex: 2.5,
					fieldLabel: '终点站'
				}
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
						{
							xtype: 'pickerfield',
							flex: 2.5,
							allowBlank: false,
							fieldLabel: '发货单位'
						},
						{
							xtype: 'textfield',
							flex: 1.5,
							fieldLabel: '发货人'
						},
						{
							xtype: 'textfield',
							flex: 2,
							allowBlank: false,
							fieldLabel: '电话'
						},
						{
							xtype: 'textfield',
							flex: 2,
							fieldLabel: '手机号码'
						},
						{
							xtype: 'textfield',
							flex: 3.5,
							fieldLabel: '发货地址'
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
						{
							xtype: 'pickerfield',
							flex: 2.5,
							allowBlank: false,
							fieldLabel: '收货单位'
						},
						{
							xtype: 'textfield',
							flex: 1.5,
							fieldLabel: '收货人'
						},
						{
							xtype: 'textfield',
							flex: 2,
							allowBlank: false,
							fieldLabel: '电话'
						},
						{
							xtype: 'textfield',
							flex: 2,
							fieldLabel: '手机号码'
						},
						{
							xtype: 'textfield',
							flex: 3.5,
							allowBlank: false,
							fieldLabel: '收货地址'
						}
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
				{
					xtype: 'combobox',
					width: 180,
					fieldLabel: '运输方式'
				},
				{
					xtype: 'combobox',
					allowBlank: false,
					width: 180,
					fieldLabel: '交货方式'
				},
				{
					xtype: 'numberfield',
					width: 200,
					fieldLabel: '回单要求'
				}
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
						{
							xtype: 'textfield',
							flex: 1.2,
							fieldLabel: '品名'
						},
						{
							xtype: 'textfield',
							flex: 1.2,
							fieldLabel: '包装'
						},
						{
							flex: 1,
							fieldLabel: '件数'
						},
						{
							flex: 1,
							fieldLabel: '重量'
						},
						{
							flex: 1,
							fieldLabel: '体积'
						},
						{
							flex: 1,
							fieldLabel: '单价'
						},
						{
							xtype: 'combobox',
							flex: 1.2,
							fieldLabel: '计费方式'
						},
						{
							flex: 1,
							fieldLabel: '基本运费'
						},
						{
							flex: 1,
							fieldLabel: '接货费'
						},
						{
							flex: 1,
							fieldLabel: '送货费'
						},
						{
							flex: 1,
							fieldLabel: '货物价值'
						},
						{
							flex: 1,
							fieldLabel: '保费'
						},
						{
							flex: 1,
							fieldLabel: '回扣'
						},
						{
							flex: 1.2,
							fieldLabel: '其他费用'
						}
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
						{
							xtype: 'numberfield',
							width: 220,
							fieldLabel: '费用合计'
						}
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
				{
					xtype: 'combobox',
					flex: 2.5,
					fieldLabel: '付款方式'
				},
				{
					xtype: 'numberfield',
					flex: 2,
					fieldLabel: '现付'
				},
				{
					xtype: 'numberfield',
					flex: 2,
					fieldLabel: '到付'
				},
				{
					xtype: 'numberfield',
					flex: 2,
					fieldLabel: '回单付'
				},
				{
					xtype: 'numberfield',
					flex: 2,
					fieldLabel: '月结'
				},
				{
					xtype: 'numberfield',
					flex: 2,
					fieldLabel: '已结回扣'
				},
				{
					xtype: 'numberfield',
					flex: 2,
					fieldLabel: '未付回扣'
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
				{
					xtype: 'textareafield',
					flex: 2,
					fieldLabel: '费用说明'
				},
				{
					xtype: 'textareafield',
					flex: 2,
					fieldLabel: '托运备注'
				}
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
				{
					xtype: 'combobox',
					width: 175,
					fieldLabel: '业务员'
				},
				{
					xtype: 'textfield',
					width: 175,
					readonly: true,
					fieldLabel: '开单员'
				}
			]
		}
	],

	buttons: [
		{
			text: '保存运单'
		},
		{
			text: '打印运单'
		},
		{
			text: '打印标签'
		}
	],

	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			items: [ me.items ]
		});
		me.callParent(arguments);
	}
});
