Ext.define('MyApp.view.Viewport', {
	extend: 'Ext.container.Viewport',
	layout: {
		type: 'border'
	},
	loginUserLabel: null,
	getLoginUserLable: function () {
		if (this.loginUserLabel == null) {
			this.loginUserLabel = Ext.widget({
				xtype: 'label'
			});
		}
		return this.loginUserLabel;
	},
	menuStore: null,
	getMenuStore: function () {
		var me = this;
		if (me.menuStore == null) {
			me.menuStore = Ext.create('MyApp.store.MenuTreeStore', {
				root: {
					expanded: true,
					children: CurrentUser.getUserMenus()
				}
			});
		}
		return me.menuStore;
	},
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			items: [
				{
					xtype: 'toolbar',
					region: 'north',
					height: 43,
					items: [
						{
							xtype: 'label',
							html: '<font size=5 face="微软雅黑" style="margin:0px 20px">ExtJS+DWR学习</font>'
						},
						'->',
						{
							xtype: 'label',
							text: '欢迎：'
						},
						me.getLoginUserLable(),
						{
							xtype: 'label',
							width: 10
						},
						{
							xtype: 'button',
							iconAlign: 'right',
							text: '退出',
							textAlign: 'right',
							listeners: {
								click: {
									fn: me.logoutHandler,
									scope: me
								}
							}
						}
					]
				},
				{
					region: 'west',
					flex: 1,
					title: '菜单列表',
					xtype: 'treepanel',
					syncRowHeight: false,
					store: me.getMenuStore(),
					folderSort: false,
					lines: false,
					rootVisible: false,
					useArrows: true,
					collapsible: true,
					split: true,
					viewConfig: {
						enableTextSelection: false
					},
					listeners: {
						itemclick: {
							fn: me.onTreepanelItemClick,
							scope: me
						}
					}
				},
				{
					region: 'center',
					xtype: 'tabpanel',
					flex: 4.8,
					layout: 'fit',
					id: 'centerTabPanel'
				},
				{
					xtype: 'container',
					region: 'south',
					height: 28
				}
			]
		});
		me.listeners = {
			'boxready': function (_this, _width, _height, _eOpts) {
				_this.getLoginUserLable().setText(CurrentUser.getLoginAccount());

			}
		};
		me.callParent(arguments);
	},
	logoutHandler: function () {
		Ext.MessageBox.confirm('温馨提示', '你确认退出登录吗?', function (btn) {
			if (btn == 'yes') {
				Ext.Ajax.request({
					url: './logout.action',
					success: function (response, opts) {
						window.location = './index.action';
					},
					exception: function (response, opts) {
						var result = Ext.decode(response.responseText);
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							msg: result.message,
							title: login.i18n('foss.login.messageTitle'),
							icon: Ext.MessageBox.ERROR
						});
					}
				});
			}
		});
	},
	onTreepanelItemClick: function (dataview, record, item, index, e, eOpts) {
		if (record == null || record.raw == null) {
			return;
		}
		var action = record.raw.action || 'F';
		var menuID = record.raw.id;
		var ctrlID = action + "_" + menuID;
		var panel = Ext.getCmp(ctrlID);
		if (null == panel) {
			if ("W" == action) {
				facade.getWindowModel(menuID, function (winModel) {
					if (null == winModel) {
						return;
					}
					panel = Ext.create("MyApp.view.ADWindowPanel", {
						title: winModel.name,
						fields: winModel.fields,
						tableID: winModel.tableID,
						id: "W_" + winModel.tableID,
						tabConfig: {}
					});
					Ext.getCmp('centerTabPanel').add(panel);
					Ext.getCmp('centerTabPanel').setActiveTab(panel);
				});
			} else if ("F" == action) {
				panel = Ext.create("MyApp.view." + menuID, {
					tabConfig: {}
				});
				Ext.getCmp('centerTabPanel').add(panel);
				Ext.getCmp('centerTabPanel').setActiveTab(panel);
			}
		}
	},
	renderTo: Ext.getBody()
});