/**
 * Created by Administrator on 2014-09-04.
 */
Ext.define('MyApp.view.GenericEditor', {
	extend: 'Ext.window.Window',
	closeAction: 'hide',
	modal: true,
	form: null,
	fields: null,
	getForm: function () {
		var me = this;
		if (null == me.form) {
			me.form = Ext.widget({
				xtype: 'form',
				width: 720,
				layout: 'column',
				defaults: {
					margin: '4',
					columnWidth: .5,
					labelAlign: 'right',
					xtype: 'textfield'
				},
				items: me.fields
			});
		}
		return this.form;
	},

	isUpdate: null,
	bindData: function (record, isUpdate) {
		var me = this, form = me.getForm().getForm();
		form.reset();
		form.loadRecord(record);
		me.isUpdate = isUpdate;
	},

	buttons: [
		{
			text: '保存',
			formBind: true
		}
	],

	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			items: [me.getForm()]
		});
		me.callParent(arguments);
	}
});