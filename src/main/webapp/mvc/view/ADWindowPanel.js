/**
 * Created by Administrator on 2014-09-03.
 */
/*
 *WindowPanel
 */
Ext.define('MyApp.view.ADWindowPanel', {
	extend: 'Ext.panel.Panel',
	closable: true,
	layout: 'border',
	windowModel: null,
	modelClass: null,
	toolbar: null,
	pager: null,
	dataGrid: null,
	queryForm: null,
	store: null,
	defineModel: function (modelFields, keyField) {
		var me = this;
		Ext.define(me.modelClass, {
			extend: 'Ext.data.Model',
			idProperty: keyField,
			fields: modelFields,
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
			}
		});
	},
	createStore: function () {
		var me = this;
		me.store = Ext.create('Ext.data.Store', {
			model: me.modelClass,
			autoDestroy: true,
			autoLoad: false,
			listeners: {
				beforeload: function (store, operation, eOpts) {
					var queryForm = me.queryForm;
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
	},
	createModel: function () {
		var me = this;
		var record = Ext.create(me.modelClass);
		me.store.add(record);
	},
	updateModel: function () {
		var me = this;
		me.store.sync();
	},
	deleteModel: function () {
		var me = this;
		var selRecords = me.dataGrid.getSelectionModel().getSelection();
		Ext.Array.each(selRecords, function (record) {
			me.store.remove(record);
		});
		me.store.sync();
	},
	createToolbar: function () {
		var me = this, actions = [];
		if (me.windowModel.infoTab) {
			actions = [
				{
					xtype: 'button',
					iconCls: 'icon-add16',
					itemId: 'addButton',
					text: '新增',
					listeners: {
						click: { fn: me.createModel, scope: me }
					}
				},
				{
					xtype: 'button',
					iconCls: 'icon-delete16',
					itemId: 'deleteButton',
					text: '删除',
					listeners: {
						click: { fn: me.deleteModel, scope: me }
					}
				},
				{
					xtype: 'button',
					iconCls: 'icon-save16',
					itemId: 'updateButton',
					text: '保存',
					listeners: {
						click: { fn: me.updateModel, scope: me }
					}
				}
			];
		}
		me.toolbar = Ext.widget('toolbar', {
			dock: 'top',
			items: actions
		});
	},
	createPager: function () {
		var me = this;
		me.pager = Ext.widget('pagingtoolbar', {
			store: me.store,
			dock: 'bottom',
			displayInfo: true
		});
	},
	createDataGrid: function (columns) {
		var me = this;
		me.dataGrid = Ext.widget('gridpanel', {
			header: false,
			columnLines: true,
			store: me.store,
			columns: columns,
			plugins: [
				Ext.create('Ext.grid.plugin.CellEditing', {
					clicksToEdit: 1
				})
			],
			dockedItems: [ me.toolbar, me.pager ],
			selType: 'checkboxmodel'
		});
	},
	createQueryForm: function (fields) {
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
				items: fields,
				buttons: [
					{
						text: '重置',
						handler: function () {
							me.queryForm.getForm().reset();
						}
					},
					'->',
					{
						text: '查询',
						handler: function () {
							me.pager.moveFirst();
						}
					}
				]
			});
		}
	},
	initComponent: function () {
		var me = this, columns = [], queryFields = [], modelFields = [], keyField;
		Ext.Array.each(me.windowModel.fields, function (field) {
			var column, queryField, modelField;
			var columnCfg, editorCfg, modelFieldCfg;
			if (15 == field.refType || 16 == field.refType || 24 == field.refType) {
				editorCfg = {xtype: 'datefield', format: 'Y/m/d' };
				columnCfg = {xtype: 'datecolumn', width: 90};
				modelFieldCfg = {type: 'date'};
			} else if (22 == field.refType) {
				editorCfg = {xtype: 'numberfield'};
				columnCfg = {xtype: 'numbercolumn', width: 90};
				modelFieldCfg = {type: 'float'};
			} else if (11 == field.refType) {
				editorCfg = {xtype: 'numberfield'};
				columnCfg = {width: 75};
				modelFieldCfg = {type: 'int'};
			} else if (17 == field.refType) {
				editorCfg = {xtype: 'lookuplist', fieldName: field.fieldName};
				columnCfg = {xtype: 'listcolumn', fieldName: field.fieldName, width: 90};
			} else if (18 == field.refType) {
				editorCfg = {xtype: 'lookuptable', refValueID: field.refValueID};
				columnCfg = {width: 120};
				modelFieldCfg = {type: 'int'};
			} else if (20 == field.refType) {
				editorCfg = {xtype: 'checkboxfield'};
				columnCfg = {xtype: 'checkcolumn', width: 65};
				modelFieldCfg = {type: 'boolean'};
			} else if (36 == field.refType) {
				editorCfg = {xtype: 'textareafield'};
				columnCfg = {width: 200};
			} else {
				editorCfg = {xtype: 'textfield'};
				columnCfg = {width: 75};
			}
			if (field.primaryKey) {
				keyField = field.fieldName;
			}
			if (field.displayed) {//Grid Column
				column = Ext.apply({text: field.label, dataIndex: field.fieldName}, columnCfg);
				if (!field.readonly) {//Cell Editor
					column.editor = editorCfg;
				}
				Ext.Array.push(columns, column);
			}
			if (field.selection) {//Query Form Field
				queryField = {fieldLabel: field.label, name: field.fieldName};
				Ext.Array.push(queryFields, Ext.apply(queryField, editorCfg));
			}
			if (!field.fieldOnly) {//Model Field
				modelField = {name: field.fieldName};
				Ext.Array.push(modelFields, Ext.apply(modelField, modelFieldCfg));
			}
		});
		me.modelClass = "MyApp.model.Model" + me.windowModel.tableID;
		me.defineModel(modelFields, keyField);
		me.createStore();
		me.createQueryForm(queryFields);
		me.createToolbar();
		me.createPager();
		me.createDataGrid(columns);
		Ext.applyIf(me, {
			items: [
				{ border: 0, region: 'north', layout: 'fit', itemId: 'headerPanel', items: [me.queryForm] },
				{ border: 0, region: 'center', itemId: 'centerPanel', layout: 'fit', items: [me.dataGrid] }
			]
		});
		me.callParent(arguments);
	}
});