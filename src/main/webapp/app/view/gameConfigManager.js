Ext.define('MyApp.view.GameConfigWindow', {
    extend: 'Ext.window.Window',
    title: '新增/修改游戏配置信息',
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
						margin: '10 10 5 5',
						columnWidth: .5,
						labelWidth: 130,
						xtype: 'textfield'
					},
                    items: [/*{
                    	xtype: 'commongameselector',
					    fieldLabel: '游戏名称',
					    allowBlank: false,
					    name: 'gameName'
					},*/{
						fieldLabel: '游戏名称',
					    allowBlank: false,
					    name: 'gameName'
					},{
					    fieldLabel: '地点名称',
					    allowBlank: false,
					    name: 'placeName'
					},{
					    xtype: 'numberfield',
					    fieldLabel: '邮寄时间(分钟)',
					    allowBlank: false,
					    name: 'mailTime',
					    minValue: 0
					},{
					    xtype: 'numberfield',
					    fieldLabel: '自动打款时间(分钟)',
					    allowBlank: false,
					    name: 'autoPlayTime',
					    minValue: 0
					},{
					    xtype: 'filefield',
					    name: 'images',
					    columnWidth: 1,
					    itemId: 'placeImage',
					    vtype: 'image',
					    fieldLabel: '地点截图'
					},{
					    xtype: 'filefield',
					    name: 'images',
					    itemId: 'gameImage',
					    columnWidth: 1,
					    vtype: 'image',
					    fieldLabel: '游戏商品图片'
					}],
					buttons: [{
						text:'保存',
						handler: function() {
							var formView = me.getForm(),
								gameImage = formView.getComponent('gameImage'),
								placeImage = formView.getComponent('placeImage'),
								form = formView.getForm(),params,
								record = form.getRecord(),
								url = './order/addGameConfig.action',
								message = '新增';
							if(!form.isValid()){
								return;
							}
							form.updateRecord(record);
							params = {
								'gameConfig.placeName': record.get('placeName'),
								'gameConfig.gameName': record.get('gameName'),
								'gameConfig.mailTime': record.get('mailTime'),
								'gameConfig.autoPlayTime': record.get('autoPlayTime'),
								'gameConfig.gameImage': gameImage.getValue(),
								'gameConfig.placeImage': placeImage.getValue()
							};
							if(me.isUpdate){
								url = './order/modifyGameConfig.action';
								message = '修改';
								Ext.Object.merge(params,{
									'gameConfig.id': record.get('id')
								});
							}
							form.submit({
								url : url,
								method: 'POST',
								params: params,
								success : function(from, action, json) {
									var gameConfigManager = Ext.getCmp('gameConfigManager'),
										store = gameConfigManager.getStore();
									Ext.ux.Toast.msg("温馨提示", message + "成功");
									me.close();
									store.load();
								},
								exception : function(from, action, json) {
									Ext.ux.Toast.msg("温馨提示", json.message);
								}
							});
						}
					}]
                });
		}
		return me.form;
	},
	isUpdate: null,
	bindData: function(record,isUpdate){
		var me = this,
			form = me.getForm().getForm();
		form.reset();
		form.loadRecord(record);
		me.isUpdate = isUpdate;
		if(!isUpdate){
			form.reset();
		}
	},
	constructor : function(config) {
		var me = this, cfg = Ext.apply({}, config);
		me.items = [me.getForm()]
		me.callParent([ cfg ]);
	}
});

Ext.define('MyApp.view.gameConfigImage', {
	extend: 'Ext.Img',
	src: null,
	height: 246,
	width: 450,
	bindData : function(record, value, metadata, store, view) {
		var me = this;
		if(Ext.isEmpty(record.get('placeImage'))){
			return false;
		}else{
			me.setSrc(SystemUtil.getImageUrl(record.get('placeImage'), 'imageTradePlaceSizeList'));
			return true;			
		}
	},
	constructor : function(config) {
		var me = this, cfg = Ext.apply({}, config);
		me.callParent([ cfg ]);
	}
});

Ext.define('MyApp.view.imageGoodsImage', {
	extend : 'Ext.Img',
	src: null,
	height: 55,
	width: 55,
	bindData : function(record, value, metadata, store, view) {
		var me = this;
		if(Ext.isEmpty(record.get('gameImage'))){
			return false;
		}else{
			me.setSrc(SystemUtil.getImageUrl(record.get('gameImage'), 'imageGoodsFileSize'));
			return true;			
		}
	},
	constructor : function(config) {
		var me = this, cfg = Ext.apply({}, config);
		me.callParent([ cfg ]);
	}
});

/*
 * 游戏配置管理页面
 */
Ext.define('MyApp.view.gameConfigManager', {
    extend: 'Ext.panel.Panel',
    id: 'gameConfigManager',
    closable: true,
    title: '游戏配置管理',
    toolbar: null,
	getToolbar: function(){
		var me = this;
		if(Ext.isEmpty(me.toolbar)){
			me.toolbar = Ext.widget('toolbar',{
				dock: 'top',
				items: [{
					text: '新增',
					listeners: {
						click: {
							fn: me.addGameConfig,
							scope: me
						}
					}
				},'-',{
					text: '修改',
					listeners: {
						click: {
							fn: me.modifyGameConfig,
							scope: me
						}
					}
				},'-',{
					text: '删除',
					listeners: {
						click: {
							fn: me.deleteGameConfig,
							scope: me
						}
					}
				}]
			});
		}
		return me.toolbar;
	},
	gameConfigWindow: null,
	getGameConfigWindow: function(){
		if(this.gameConfigWindow == null){
			this.gameConfigWindow = new MyApp.view.GameConfigWindow();
		}
		return this.gameConfigWindow;
	},
	// 新增游戏配置地信息
    addGameConfig: function(button, e, eOpts) {
		var window = this.getGameConfigWindow();
		window.bindData(Ext.create('MyApp.model.GameConfigModel'), false);
		window.show();
    },
    // 修改游戏配置地信息
    modifyGameConfig: function(button, e, eOpts) {
		var grid = this.getGameConfigGrid(),
			selModel = grid.getSelectionModel(),
			selRecords = selModel.getSelection(),
			window = this.getGameConfigWindow();
    	if(selRecords == null||selRecords.length<=0){
    		Ext.ux.Toast.msg("温馨提示", "请先选择要修改的游戏配置信息");
    		return;
    	}
    	window.bindData(selRecords[0], true);
		window.show();
    },
    // 删除游戏配置信息
    deleteGameConfig: function(button, e, eOpts) {
    	var grid = this.getGameConfigGrid(),
			selModel = grid.getSelectionModel(),
			selRecords = selModel.getSelection();
    	if(selRecords == null||selRecords.length<=0){
    		Ext.ux.Toast.msg("温馨提示", "请先选择要删除的游戏配置信息");
    		return;
    	}
		var record = selRecords[0];
    	Ext.MessageBox.confirm('温馨提示', '确定删除该游戏配置息吗？', function(btn){
			if(btn == 'yes'){
				Ext.Ajax.request({
					url : './order/deleteGameConfig.action',
					params: {'id': record.get('id')},
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
					columnWidth: .2,
					labelWidth: 80,
					xtype: 'textfield'
				},
                items: [{
				    fieldLabel: '游戏名称',
				    name: 'gameName'
				},{
				    fieldLabel: '地点名称',
				    name: 'placeName'
				}],
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
			me.store = Ext.create('MyApp.store.GameConfigStore',{
				autoLoad: true,
				listeners: {
					beforeload : function(store, operation, eOpts) {
						var queryForm = me.getQueryForm();
						if (queryForm != null) {
							var values = queryForm.getValues();
							Ext.apply(operation, {
								params: {
									'gameConfig.placeName': Ext.String.trim(values.placeName),
									'gameConfig.gameName': Ext.String.trim(values.gameName)
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
	gameConfigGrid: null,
	getGameConfigGrid: function(){
		var me = this;
		if(Ext.isEmpty(me.gameConfigGrid)){
			me.gameConfigGrid = Ext.widget('gridpanel',{
                header: false,
                columnLines: true,
                store: me.getStore(),
				columns: [{
					xtype: 'rownumberer'
				},{
					dataIndex: 'gameImage',
					text: '游戏商品图片',
					align: 'center',
					xtype: 'tipcolumn',
					tipConfig: {
						trackMouse: true,
					    hideDelay: 500
					},
					tipBodyElement:'MyApp.view.imageGoodsImage',
					flex: 2
				},{
					dataIndex: 'placeImage',
					text: '地点截图',
					align: 'center',
					xtype: 'tipcolumn',
					tipConfig: {
						trackMouse: true,
					    hideDelay: 500
					},
					tipBodyElement:'MyApp.view.gameConfigImage',
					flex: 2
				},{
                    dataIndex: 'gameName',
                    sortable: false,
                    flex: 1,
                    align: 'center',
                    text: '游戏名称'
                },{
					dataIndex: 'placeName',
					sortable: false,
					align: 'center',
					text: '地点名称',
					flex: 1
				},{
					dataIndex: 'mailTime',
					sortable: false,
					align: 'center',
					flex: 1,
					text: '邮寄时间(分钟)'
				},{
					dataIndex: 'autoPlayTime',
					sortable: false,
					align: 'center',
					flex: 1,
					text: '自动打款时间<br/>(分钟)'
				},{
					xtype: 'datecolumn',
					format:'Y-m-d H:i:s',
					dataIndex: 'createTime',
					align: 'center',
					text: '创建时间',
					flex: 1.5
				},{
					xtype: 'datecolumn',
					format:'Y-m-d H:i:s',
					dataIndex: 'lastUpdateTime',
					align: 'center',
					text: '最后更新时间',
					flex: 1.5
				}],
				dockedItems: [me.getToolbar(),me.getPagingToolbar()],
				selModel: Ext.create('Ext.selection.CheckboxModel', {
					allowDeselect: true,
					mode: 'SINGLE'
				})
			});
		}
		return me.gameConfigGrid;
	},
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [me.getQueryForm(),me.getGameConfigGrid()]
        });
        me.callParent(arguments);
    }
});