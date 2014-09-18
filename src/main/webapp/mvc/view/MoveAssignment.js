Ext.define('MyApp.view.MoveAssignment', {
	extend: 'Ext.panel.Panel',
	id: 'MoveAssignment',
	closable: true,
	title: '装车配载',
	queryForm: null,
	toolbar: null,
	dataGrid: null,
	pager: null,
	store: null,

	getStore: function () {
		var me = this;
		if (me.store == null) {
			me.store = Ext.create('MyApp.store.UserStore', {
				autoLoad: true,
				listeners: {
					beforeload: function (store, operation, eOpts) {
						var queryForm = me.getQueryForm();
						if (queryForm != null) {
							Ext.apply(operation, {
								params: {
									'q': queryForm.getValues(true)
								}
							});
						}
					}
				}
			});
		}
		return me.store;
	},

	getToolbar: function () {
		var me = this;
		if (Ext.isEmpty(me.toolbar)) {
			me.toolbar = Ext.widget('toolbar', {
				dock: 'top',
				items: [
					{
						xtype: 'button',
						itemId: 'addButton',
						text: '新增'
					}
				]
			});
		}
		return me.toolbar;
	},

	getPager: function () {
		var me = this;
		if (me.pager == null) {
			me.pager = Ext.widget('pagingtoolbar', {
				store: me.getStore(),
				dock: 'bottom',
				displayInfo: true
			});
		}
		return me.pager;
	},

	getDataGrid: function () {
		var me = this;
		if (Ext.isEmpty(me.dataGrid)) {
			me.dataGrid = Ext.widget('gridpanel', {
				header: false,
				columnLines: true,
				store: me.getStore(),
				columns: [
					{
						xtype: 'rownumberer'
					},
					{
						dataIndex: 'cClientId',
						flex: 2,
						text: '客户公司'
					},
					{
						dataIndex: 'cOrgId',
						text: '单位（组织）',
						flex: 1.5
					},
					{
						dataIndex: 'name',
						text: '用户名',
						flex: 1.5
					},
					{
						dataIndex: 'birthday',
						flex: 1,
						text: '生日'
						// renderer : Ext.util.Format.dateRenderer('y-m-d')
					},
					{
						dataIndex: 'cBpartnerId',
						text: '业务伙伴',
						flex: 1.5
					},
					{
						dataIndex: 'phone',
						flex: 1.5,
						text: '电话'
					},
					{
						dataIndex: 'mobile',
						flex: 1.5,
						align: 'center',
						text: '手机'
					},
					{
						xtype: 'booleancolumn',
						dataIndex: 'active',
						flex: 0.5,
						trueText: '是',
						falseText: '否',
						text: '激活'
					}
				],
				dockedItems: [ me.getToolbar(), me.getPager() ],
				selModel: Ext.create('Ext.selection.CheckboxModel', {
					allowDeselect: true,
					mode: 'SINGLE'
				})
			});
		}
		return me.dataGrid;
	},

	getQueryForm: function () {
		var me = this;
		if (me.queryForm == null) {
			me.queryForm = Ext.widget('form', {
				layout: 'column',
				defaults: {
					margin: '4 0 4 0',
					columnWidth: .2,
					labelWidth: 65,
					labelAlign: 'right',
					xtype: 'textfield'
				},
				items: [
					{
						name: 'cClientId',
						fieldLabel: '公司名称'
					},
					{
						name: 'cOrgId',
						fieldLabel: '部门'
					},
					{
						name: 'name',
						fieldLabel: '用户名'
					},
					{
						name: 'mobile',
						fieldLabel: '手机'
					}
				],
				buttons: [
					{
						text: '重置',
						handler: function () {
							me.getQueryForm().getForm().reset();
						}
					},
					'->',
					{
						text: '查询',
						handler: function () {
							me.getPager().moveFirst();
						}
					}
				]
			});
		}
		return this.queryForm;
	},

	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			items: [ me.getQueryForm(), me.getDataGrid() ]
		});
		me.callParent(arguments);
	}
});