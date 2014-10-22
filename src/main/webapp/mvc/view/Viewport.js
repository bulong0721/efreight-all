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

	imageTpl: new Ext.XTemplate('<tpl for=".">', '<div style="margin: 10px 30px 10px 30px; padding: 10px; text-align: center" class="thumb-wrap">', '<img width="48" height="48" src="images/{image}" />', '<br/><strong>{itemName}</strong>', '</div>', '</tpl>'),

	loadMenu: function () {
		var me = this;
		facade.getMenuItems(function (records) {
			Ext.Array.each(records.rows, function (tree) {
				var menuPanel = Ext.create('Ext.panel.Panel', {
					title: tree.treeName,
					iconCls: tree.iconClass,
					layout: 'fit'
				});
				tree.items.sort(function (l, r) {
					return l.seqNo - r.seqNo;
				});
				var viewStore = Ext.create('Ext.data.Store', {
					model: 'MyApp.model.MenuModel',
					data: tree.items
				});
				var menuView = Ext.create('Ext.view.View', {
					deferInitialRefresh: false,
					overflowY: 'scroll',
					autoScroll: true,
					store: viewStore,
					overItemCls: 'menu_item_over',
					tpl: me.imageTpl,
					itemSelector: 'div.thumb-wrap',
					listeners: {
						itemclick: {
							fn: me.buttonItemClick
						}
					}
				});
				menuPanel.add(menuView);
				Ext.getCmp('westTabPanel').add(menuPanel);
			});
		});
	},

	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			items: [
				{
					xtype: 'toolbar',
					region: 'north',
					height: 50,
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
					title: '系统导航',
					xtype: 'panel',
					id: 'westTabPanel',
					layout: 'accordion',
					collapsible: true,
					split: true
				},
				{
					region: 'center',
					xtype: 'tabpanel',
					flex: 5,
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
		me.loadMenu();
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
	buttonItemClick: function (dataview, record, item, index, e, eOpts) {
		if (record == null || record.raw == null) {
			return;
		}
		var model = record.raw, action = model.action, ctrlID = action + "_" + model.itemName;
		var panel = Ext.getCmp(ctrlID);
		if (null == panel) {
			if ("W" == action) {
				facade.getWindowModel(model.windowID, function (winModel) {
					if (null != winModel) {
						panel = Ext.create("MyApp.view.ADWindowPanel", {
							title: model.itemName,
							windowModel: winModel,
							tableID: winModel.tableID,
							id: ctrlID,
							tabConfig: {}
						});
						Ext.getCmp('centerTabPanel').add(panel);
						Ext.getCmp('centerTabPanel').setActiveTab(panel);
					}
				});
			} else if ("F" == action) {
				panel = Ext.create(model.formPrototype, {
					id: ctrlID,
					title: model.itemName,
					tabConfig: {}
				});
				Ext.getCmp('centerTabPanel').add(panel);
				Ext.getCmp('centerTabPanel').setActiveTab(panel);
			}
		} else {
			Ext.getCmp('centerTabPanel').setActiveTab(panel);
		}
	},
	renderTo: Ext.getBody()
});