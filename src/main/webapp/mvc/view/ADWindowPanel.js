/**
 * Created by Administrator on 2014-09-03.
 */
/*
 *抽象View
 */
Ext.define('MyApp.view.ADWindowPanel', {
	extend: 'Ext.panel.Panel',
	closable: true,
	layout: 'border',
	fields: [],
	toolItems: [],

	store: null,
	getStore: function () {
		var me = this;
		if (me.store == null) {
			me.store = Ext.create('Ext.data.Store', {
				model: 'Ext.data.Model',
				autoDestroy: true,
				fields: me.getModelFields(),
				proxy: {
					type: 'dwr',
					passDwrStoreParams: true,
					dwrFunction: {
						read: facade.search4Window,
						create: facade.create4Window,
						update: facade.update4Window,
						destroy: facade.delete4Window
					},
					dwrParams: [me.tableID],
					reader: {
						type: 'json',
						root: 'rows',
						totalProperty: 'total'
					}
				},
				autoLoad: false,
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
	addModel: function () {
	},
	getToolItems: function () {

	},
	toolbar: null,
	getToolbar: function () {
		var me = this;
		if (Ext.isEmpty(me.toolbar)) {
			me.toolbar = Ext.widget('toolbar', {
				dock: 'top',
				items: [
					{
						xtype: 'button',
						iconCls: 'x-tree-icon-leaf',
						itemId: 'addButton',
						text: '新增',
						listeners: {
							click: {
								fn: me.addModel,
								scope: me
							}
						}
					},
					{
						xtype: 'button',
						itemId: 'updateButton',
						text: '修改'
					},
					{
						xtype: 'button',
						itemId: 'deleteButton',
						text: '删除'
					}
				]
			});
		}
		return me.toolbar;
	},
	pager: null,
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
	modelFields: null,
	getModelFields: function () {
		var me = this;
		if (null == me.modelFields) {
			me.modelFields = [];
			Ext.Array.each(me.fields, function (field) {
				var q = {};
				if (!field.fieldOnly) {
					q.name = field.fieldName;
					if (15 == field.refType || 16 == field.refType || 24 == field.refType) {
						q.type = 'date';
					} else if (22 == field.refType) {
						q.type = 'float';
					} else if (11 == field.refType) {
						q.type = 'int';
					} else if (20 == field.refType) {
						q.type = 'boolean';
					}
					if (field.primaryKey) {
						q.name = 'id';
						q.mapping = field.field;
					}
					Ext.Array.push(me.modelFields, q);
				}
			});
		}
		return this.modelFields;
	},
	queryFields: null,
	getQueryFields: function () {
		var me = this;
		if (null == me.queryFields) {
			me.queryFields = [];
			var sortedFields = Ext.Array.sort(me.fields, function (lhs, rhs) {
				return lhs.seqNo - rhs.seqNo;
			});
			Ext.Array.each(sortedFields, function (field) {
				if (field.selection) {
					var lookupCfg = {labelWidth: 65,
						labelAlign: 'right' };
					var q = {};
					q.fieldLabel = field.label;
					q.name = field.fieldName;
					if (15 == field.refType || 16 == field.refType || 24 == field.refType) {
						q.xtype = 'datefield';
					} else if (22 == field.refType) {
						q.xtype = 'numberfield';
					} else if (11 == field.refType) {
						q.xtype = 'numberfield';
					} else if (20 == field.refType) {
						q.xtype = 'checkboxfield';
					} else if (17 == field.refType) {
						q = Lookup.createLookupList(field, lookupCfg);
					} else if (18 == field.refType) {
						q.xtype = 'pickerfield';
					} else if (36 == field.refType) {
						q.xtype = 'textareafield';
					}
					Ext.Array.push(me.queryFields, q);
				}
			});
		}
		return this.queryFields;
	},
	gridColumns: null,
	getGridColumns: function () {
		var me = this;
		if (null == me.gridColumns) {
			me.gridColumns = [];
			var sortedFields = Ext.Array.sort(me.fields, function (lhs, rhs) {
				return lhs.seqNo - rhs.seqNo;
			});
			Ext.Array.each(sortedFields, function (field) {
				if (field.displayed) {
					var q = {};
					q.text = field.label;
					q.dataIndex = field.fieldName;
					if (!field.readonly) {
						if (15 == field.refType || 16 == field.refType || 24 == field.refType) {
							q.editor = {xtype: 'datefield', format: 'Y/m/d' };
							q.xtype = 'datecolumn';
						} else if (22 == field.refType) {
							q.editor = {xtype: 'numberfield'};
							q.xtype = 'numbercolumn';
						} else if (11 == field.refType) {
							q.editor = {xtype: 'numberfield'};
							//q.xtype = 'numbercolumn';
						} else if (20 == field.refType) {
							q.editor = {xtype: 'checkboxfield'};
							q.xtype = 'checkcolumn';
						} else if (17 == field.refType) {
							q.editor = Lookup.createLookupList(field);
						} else if (18 == field.refType) {
							q.editor = {xtype: 'pickerfield'};
						} else if (36 == field.refType) {
							q.editor = {xtype: 'textareafield'};
						} else {
							q.editor = {xtype: 'textfield'};
						}
					}
					var width = field.displayLength * 5;
					if (11 == field.refType || 22 == field.refType) {
						width = 90;
					}
					if (field.label.length * 5 > width) {
						width = field.label.length * 5;
					}
					if (width > 300) {
						width = 300;
					} else if (width < 65) {
						width = 65;
					}
					if ((17 == field.refType || 18 == field.refType) && width < 125) {
						width = 125;
					}
					q.width = width;
					Ext.Array.push(me.gridColumns, q);
				}
			});
		}
		return this.gridColumns;
	},
	dataGrid: null,
	getDataGrid: function () {
		var me = this;
		if (Ext.isEmpty(me.dataGrid)) {
			me.dataGrid = Ext.widget('gridpanel', {
				header: false,
				columnLines: true,
				store: me.getStore(),
				columns: me.getGridColumns(),
				plugins: [
					Ext.create('Ext.grid.plugin.RowEditing', {
						clicksToEdit: 1,
						autoCancel: false
					})
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
	queryForm: null,
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
				items: me.getQueryFields(),
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
			items: [
				{
					xtype: 'panel',
					region: 'north',
					layout: 'fit',
					itemId: 'headerPanel',
					items: [me.getQueryForm()]
				},
				{
					xtype: 'panel',
					region: 'center',
					itemId: 'centerPanel',
					layout: 'fit',
					items: [me.getDataGrid()]
				}
			]
		});
		me.callParent(arguments);
	}
});