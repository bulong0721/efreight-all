Ext.define('MyApp.view.repositoryWindow', {
    extend: 'Ext.window.Window',
    title: '新增/修改库存',
    //title: '修改库存',
    width: 600,
	closeAction: 'hide',
	modal: true,
	form: null,
	getForm: function(){
		var me = this;
		if(me.form==null){
			me.form = Ext.widget('form',{
                    layout: 'column',
					defaults: {
						margin: '5 5 5 5',
						columnWidth: .5,
						labelWidth: 90,
						readOnly: true,
						allowBlank: true,
						xtype: 'textfield'
					},
                    items: [{
					    fieldLabel: '所属客服ID',
					    disabled: true,
					    name: 'servicerId'
					},{
						fieldLabel: '卖家5173账号',
					    name: 'accountUid',
					    xtype: 'commonsellerselector',
					    listeners: {
					    	'select': function(combo, records, eOpts){
					    		var form = me.getForm().getForm(),
					    			designer = form.findField('accountUid');
					    		if(!Ext.isEmpty(records)&&records.length>0){
					    			var record = records[0];
					    			form.getRecord().set('loginAccount',record.get('loginAccount'));
					    		}else{
					    			form.getRecord().set('loginAccount','');
					    		}
					    	}
					    }
					},{
    					xtype: 'gamelinkselector',
    					itemId : 'MyApp_view_goods_gamelink_ID',
    					columnWidth: 1,
    					//allowBlank: false,
    					fieldLabel: '游戏属性'
    				},{
					    fieldLabel: '游戏账号',
					    allowBlank: false,
					    name: 'gameAccount'
					},{
					    fieldLabel: '子账号',
					    name: 'sonAccount'
					},{
					    fieldLabel: '游戏角色',
					    allowBlank: false,
					    name: 'sellerGameRole'
					},{
					    fieldLabel: '游戏币名',
					    allowBlank: false,
					    name: 'moneyName'
					},{
					    xtype: 'numberfield',
					    fieldLabel: '单价(元)',
					    allowBlank: false,
					    readOnly: false,
					    decimalPrecision: 4,
					    name: 'unitPrice',
					    minValue: 0
					},{
					    xtype: 'numberfield',
					    fieldLabel: '游戏币数目',
					    readOnly: false,
					    allowBlank: false,
					    name: 'goldCount',
					    minValue: 0
					},{
					    xtype: 'numberfield',
					    fieldLabel: '可销售库存',
					    readOnly: false,
					    allowBlank: false,
					    name: 'sellableCount',
					    minValue: 0
					}],
					buttons: [{
						text:'保存',
						handler: function() {
							var form = me.getForm().getForm(),
								record = form.getRecord(),
								url = './repository/addRepository.action',
								message = '新增';
							form.updateRecord(record);
							if(form.isValid()){
								if(me.isUpdate){
									url = './repository/modifyRepository.action';
									message = '修改'
								}
								Ext.Ajax.request({
									url : url,
									method: 'POST',
									jsonData: {
										'repository': record.data
									},
									success : function(response, opts) {
										var repositoryManager = Ext.getCmp('repositoryManager'),
											store = repositoryManager.getStore();
										Ext.ux.Toast.msg("温馨提示", message + "成功");
										me.close();
										store.load();
									},
									exception : function(response, opts) {
										var json = Ext.decode(response.responseText);
										Ext.ux.Toast.msg("温馨提示", json.message);
									}
								});
							}
						}
					}]
                });
		}
		return me.form;
	},
	isUpdate: null,
	bindData: function(record,isUpdate){
		var me = this,
			form = me.getForm().getForm(),
			servicerId = form.findField('servicerId'),
			sellableCount = form.findField('sellableCount');
		form.reset();
		form.loadRecord(record);
		me.isUpdate = isUpdate;
		if(!isUpdate){
			form.reset();
			servicerId.setValue(CurrentUser.getCurrentUser().id);
		}
		/*if(Ext.String.trim(record.get('gameName'))==="地下城与勇士"){
			sellableCount.setReadOnly(false);
			sellableCount.setVisible(true);	
		}else{
			sellableCount.setReadOnly(true);
			sellableCount.setVisible(false);
		}*/
	},
	constructor : function(config) {
		var me = this, cfg = Ext.apply({}, config);
		me.items = [me.getForm()]
		me.callParent([ cfg ]);
	}
});

Ext.define('MyApp.view.repositoryGrid', {
    extend: 'Ext.grid.Panel',
    header: false,
    autoScroll: true,
    columnLines: true,
    columns: [{
		xtype: 'rownumberer'
	},{
        dataIndex: 'loginAccount',
        sortable: false,
        flex: 1.5,
        align: 'center',
        text: '卖家5173<br/>账号'
    },{
        dataIndex: 'gameAccount',
        sortable: false,
        flex: 1.5,
        align: 'center',
        text: '游戏账号'
    },{
        dataIndex: 'sellerGameRole',
        sortable: false,
        flex: 1,
        align: 'center',
        text: '卖家游戏<br/>角色名'
    },{
        dataIndex: 'gameName',
        sortable: false,
        flex: 1.5,
        align: 'center',
        text: '游戏名称'
    },{
        dataIndex: 'moneyName',
        sortable: false,
        flex: 1,
        align: 'center',
        text: '游戏币名'
    },{
		dataIndex: 'region',
		sortable: false,
		text: '所在区',
		align: 'center',
		flex: 1
	},{
		dataIndex: 'server',
		sortable: false,
		flex: 1,
		align: 'center',
		text: '所在服'
	},{
		dataIndex: 'gameRace',
		sortable: false,
		flex: 1,
		align: 'center',
		text: '所在阵营'
	},{
		dataIndex: 'unitPrice',
		sortable: false,
		flex: 1,
		renderer: function(v) {
            return Ext.util.Format.currency(v, '￥', 4);
        },
        align: 'center',
		text: '单价'
	},{
		dataIndex: 'goldCount',
		sortable: false,
		flex: 1,
		align: 'center',
		text: '游戏币数目'
	},{
		dataIndex: 'sellableCount',
		sortable: false,
		flex: 1,
		align: 'center',
		text: '可销售库存'
	}],
    constructor : function(config) {
		var me = this, cfg = Ext.apply({}, config);
		me.selModel = Ext.create('Ext.selection.CheckboxModel', {
			allowDeselect: true,
			mode: 'MULTI'
		})
		me.callParent([ cfg ]);
	}
});

Ext.define('MyApp.view.uploadWindow', {
    extend: 'Ext.window.Window',
    title: '上传库存',
    width: 500,
	closeAction: 'hide',
	modal: true,
	form: null,
	getForm: function(){
		var me = this;
		if(me.form==null){
			me.form = Ext.widget('form',{
                    layout: 'column',
					defaults: {
						margin: '5 5 5 5',
						labelWidth: 90
					},
                    items: [{
					    xtype: 'filefield',
					    name: 'repositoryFile',
					    columnWidth: 1,
					    allowBlank: false,
					    vtype: 'excel',
					    fieldLabel: '库存文件'
					}]
                });
		}
		return me.form;
	},
	constructor : function(config) {
		var me = this, cfg = Ext.apply({}, config);
		me.items = [me.getForm()];
		me.buttons = [{
			text:'保存',
			handler: function() {
				var form = me.getForm().getForm();
				if(!form.isValid()){
					return;
				}
				form.submit({
					url : './repository/uploadRepository.action',
					method: 'POST',
					success : function(from, action, json) {
						var repositoryManager = Ext.getCmp('repositoryManager'),
							store = repositoryManager.getStore();
						Ext.ux.Toast.msg("温馨提示", "上传成功");
						me.close();
						store.load();
					},
					exception : function(from, action, json) {
						Ext.ux.Toast.msg("温馨提示", json.message);
					}
				});
			}
		}];
		me.callParent([ cfg ]);
	}
});

/*
 * 库存管理页面
 */
Ext.define('MyApp.view.repositoryManager', {
    extend: 'Ext.panel.Panel',
    id: 'repositoryManager',
    closable: true,
    title: '库存管理',
    toolbar: null,
	getToolbar: function(){
		var me = this;
		if(Ext.isEmpty(me.toolbar)){
			me.toolbar = Ext.widget('toolbar',{
				dock: 'top',
				items: [{
					text: '上传库存',
					listeners: {
						click: {
							fn: me.uploadRepository,
							scope: me
						}
					}
				},'-',{
					text: '修改库存',
					//text: '修改游戏币数目',
					listeners: {
						click: {
							fn: me.modifyRepository,
							scope: me
						}
					}
				},'-',{
					text: '批量删除',
					listeners: {
						click: {
							fn: me.deleteAllRepository,
							scope: me
						}
					}
				},'-',{
				    text: '导出',
				    listeners: {
				        click: {
				            fn: me.exportRepository,
				            scope: me
				        }
				    }
				}]
			});
		}
		return me.toolbar;
	},
	// 导出库存
	exportRepository: function(button, e, eOpts){
		var me = this,url,
			queryForm = me.getQueryForm(),
			gameName = queryForm.getForm().findField('gameName');
		if (queryForm != null) {
			var values = queryForm.getValues();
			var params = {
				'repository.loginAccount': Ext.String.trim(values.loginAccount),
				'repository.gameName': Ext.String.trim(gameName.getRawValue()),
				'repository.region': Ext.String.trim(values.region),
				'repository.server': Ext.String.trim(values.server),
				'repository.sellerGameRole': Ext.String.trim(values.sellerGameRole)
			}
		}
		url = './repository/exportRepository.action?' + Ext.urlEncode(params);
		window.open(url);
	},
	uploadWindow: null,
	getUploadWindow: function(){
		if(this.uploadWindow == null){
			this.uploadWindow = new MyApp.view.uploadWindow();
		}
		return this.uploadWindow;
	},
	// 上传库存信息
	uploadRepository: function(button, e, eOpts) {
		var window = this.getUploadWindow(),
			form = window.getForm().getForm();
		form.reset();
		window.show();
    },
	repositoryWindow: null,
	getRepositoryWindow: function(){
		if(this.repositoryWindow == null){
			this.repositoryWindow = new MyApp.view.repositoryWindow();
		}
		return this.repositoryWindow;
	},
	// 新增库存信息
    addRepository: function(button, e, eOpts) {
		var window = this.getRepositoryWindow();
		window.bindData(Ext.create('MyApp.model.RepositoryModel'), false);
		window.show();
    },
    // 修改库存信息
    modifyRepository: function(button, e, eOpts) {
		var grid = this.getRepositoryGrid(),
			selModel = grid.getSelectionModel(),
			selRecords = selModel.getSelection(),
			window = this.getRepositoryWindow();
    	if(selRecords == null||selRecords.length<=0){
    		Ext.ux.Toast.msg("温馨提示", "请先选择要修改的库存信息");
    		return;
    	}
    	window.bindData(selRecords[0], true);
		window.show();
    },
    // 批量删除库存信息
    deleteAllRepository: function(button, e, eOpts) {
    	var grid = this.getRepositoryGrid(),
			selModel = grid.getSelectionModel(),
			selRecords = selModel.getSelection(),repositoryIds=[];
    	if(selRecords == null||selRecords.length<=0){
    		Ext.ux.Toast.msg("温馨提示", "请先选择要删除的库存信息");
    		return;
    	}
		Ext.Array.each(selRecords, function(record, index, records){
			repositoryIds.push(record.get('id'));
		});
    	Ext.MessageBox.confirm('温馨提示', '确定删除该库存信息吗？', function(btn){
			if(btn == 'yes'){
				Ext.Ajax.request({
					url : './repository/deleteRepository.action',
					params: {'repositoryIds': repositoryIds},
					success : function(response, opts) {
						Ext.ux.Toast.msg("温馨提示", "删除成功！");
						grid.getStore().load();
						grid.getSelectionModel().deselectAll();
					},
					exception : function(response, opts) {
						var json = Ext.decode(response.responseText);
						Ext.ux.Toast.msg("温馨提示", json.message);
					}
				});
    		}else{
    			return;
    		}
		});
    },
    queryForm: null,
	getQueryForm: function(){
		var me = this;
		if(me.queryForm==null){
			me.queryForm = Ext.widget('form',{
                layout: 'column',
				defaults: {
					margin: '10 10 10 10',
					labelWidth: 80,
					xtype: 'textfield'
				},
                items: [{
				    fieldLabel: '卖家5173账号',
				    columnWidth: .25,
				    labelWidth: 100,
				    name: 'loginAccount'
				},{
					xtype: 'gamelinkselector',
					itemId : 'MyApp_view_goods_gamelink_ID',
					columnWidth: .5,
					allowBlank: true,
					fieldLabel: '游戏属性'
				},{
				    fieldLabel: '游戏角色名',
				    columnWidth: .25,
				    name: 'sellerGameRole'
				}/*,{
				    fieldLabel: '所在区',
				    name: 'region'
				},{
				    fieldLabel: '所在服',
				    name: 'server'
				}*/],
                buttons: [{
					text:'重置',
					handler: function() {
						me.getQueryForm().getForm().reset();
					}
				},'->',{
					text:'查询',
					handler: function() {
						me.getPagingToolbar().moveFirst();
					}
				}]
            });
		}
		return this.queryForm;
	},
	store: null,
	getStore: function(){
		var me = this;
		if(me.store==null){
			me.store = Ext.create('MyApp.store.RepositoryStore',{
				autoLoad: true,
				listeners: {
					beforeload : function(store, operation, eOpts) {
						var queryForm = me.getQueryForm(),
							gameName = queryForm.getForm().findField('gameName');
						if (queryForm != null) {
							var values = queryForm.getValues();
							Ext.apply(operation, {
								params: {
									'repository.loginAccount': Ext.String.trim(values.loginAccount),
									'repository.gameName': Ext.String.trim(gameName.getRawValue()),
									'repository.region': Ext.String.trim(values.region),
									'repository.server': Ext.String.trim(values.server),
									'repository.sellerGameRole': Ext.String.trim(values.sellerGameRole)
								}
							});	
						}
					}
				}
			});
		}
		return me.store;
	},
	pagingToolbar: null,
	getPagingToolbar: function(){
		var me = this;
		if(me.pagingToolbar==null){
			me.pagingToolbar = Ext.widget('pagingtoolbar',{
				store: me.getStore(),
				dock: 'bottom',
				displayInfo: true
			});
		}
		return me.pagingToolbar;
	},
	repositoryGrid: null,
	getRepositoryGrid: function(){
		var me = this;
		if(Ext.isEmpty(me.repositoryGrid)){
			me.repositoryGrid = Ext.create('MyApp.view.repositoryGrid',{
				store: me.getStore(),
				dockedItems: [me.getToolbar(),me.getPagingToolbar()]
			});
		}
		return me.repositoryGrid;
	},
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [me.getQueryForm(),me.getRepositoryGrid()]
        });
        me.callParent(arguments);
    }
});