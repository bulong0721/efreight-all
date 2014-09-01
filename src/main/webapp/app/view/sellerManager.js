Ext.define('MyApp.view.sellerGrid', {
    extend: 'Ext.grid.Panel',
    header: false,
    columnLines: true,
    constructor : function(config) {
		var me = this, cfg = Ext.apply({}, config);
		me.selModel = Ext.create('Ext.selection.CheckboxModel', {
			allowDeselect: true,
			mode: 'SINGLE'
		});
		me.columns = [{
			xtype: 'rownumberer'
		},{
	        dataIndex: 'loginAccount',
	        sortable: false,	
	        flex: 1.5,
	        align: 'center',
	        text: '卖家5173账号'
	    },{
	        dataIndex: 'name',
	        sortable: false,
	        flex: 1,
	        align: 'center',
	        text: '联系人'
	    },{
	        dataIndex: 'phoneNumber',
	        sortable: false,
	        flex: 1,
	        align: 'center',
	        text: '联系电话'
	    },{
	        dataIndex: 'qq',
	        sortable: false,
	        flex: 1,
	        align: 'center',
	        text: 'QQ'
	    },{
			dataIndex: 'sellerType',
			sortable: false,
			flex: 1,
			renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
	        	return DataDictionary.rendererSubmitToDisplay(value,'sellerType');
	        },
	        align: 'center',
			text: '卖家类型'
		},/*{
	        dataIndex: 'gameAccount',
	        sortable: false,
	        flex: 1,
	        align: 'center',
	        text: '游戏账号'
	    },{
	        dataIndex: 'password',
	        sortable: false,
	        flex: 1,
	        align: 'center',
	        text: '游戏密码'
	    },{
	        dataIndex: 'gameName',
	        sortable: false,
	        flex: 1,
	        align: 'center',
	        text: '游戏名称'
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
		},*/{
			dataIndex: 'checkState',
			sortable: false,
			flex: 1,
			renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
	        	return DataDictionary.rendererSubmitToDisplay(value,'sellerState');
	        },
	        align: 'center',
			text: '审核状态'
		},{
	        dataIndex: 'notes',
	        xytpe: 'linebreakcolumn',
	        sortable: false,	
	        flex: 2,
	        align: 'center',
	        text: '备注'
	    },{
			xtype: 'datecolumn',
			format:'Y-m-d H:i:s',
			dataIndex: 'createTime',
			text: '创建时间',
			align: 'center',
			flex: 1
		},{
			xtype: 'datecolumn',
			format:'Y-m-d H:i:s',
			dataIndex: 'lastUpdateTime',
			align: 'center',
			text: '最后更新时间',
			flex: 1
		}];
		me.callParent([ cfg ]);
	}
});

//卖家库存信息
Ext.define('MyApp.order.SellerRepositoryPanel',{
	extend: 'Ext.panel.Panel',
	title: '卖家库存信息',
	padding: '5 20 5 20',
	defaults: {
		padding: '5 5 5 5'
	},
	bindData: function(record, grid, rowBodyElement){
		var me = this,
			repositoryGrid = me.getRepositoryGrid(),
			store = repositoryGrid.getStore();
		store.loadPage(1,{
			params: {
				'repository.loginAccount': record.get('loginAccount')
			}
		});
	},
	store: null,
	getStore: function(){
		var me = this;
		if(me.store==null){
			me.store = Ext.create('MyApp.store.RepositoryStore');
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
				height: 200,
				store: me.getStore(),
				dockedItems: [me.getPagingToolbar()]
			});
		}
		return me.repositoryGrid;
	},
	constructor: function(config){
		var me = this,
			cfg = Ext.apply({}, config);
		me.items = [me.getRepositoryGrid()];
		me.callParent([cfg]);
	}
});

Ext.define('MyApp.view.auditSellerWindow', {
    extend: 'Ext.window.Window',
    width: 450,
    title: '卖家审核',
	closeAction: 'hide',
	modal: true,
	form: null,
	getForm: function(){
		var me = this;
		if(me.form==null){
			me.form = Ext.widget('form',{
                    layout: 'column',
					defaults: {
						margin: '10 10 10 10',
						columnWidth: 1,
						labelWidth: 100
					},
                    items: [{
                    	xtype: 'textfield',
						name: 'loginAccount',
						readOnly: true,
						fieldLabel: '卖家5173账号'
					},{
						xtype: 'textarea',
						name: 'notes',
						height: 100,
						fieldLabel: '理由'
					}],
                    buttons: [{
						text:'保存',
						handler: function() {
							var sellerManager = Ext.getCmp('sellerManager'),
								store = sellerManager.getStore(),
								form = me.getForm(),
								record = form.getRecord();
							if (form.isValid()) {
								form.updateRecord(record);
								Ext.Ajax.request({
									url : './repository/auditSeller.action',
									jsonData: {
										'seller': record.data,
										'audit': me.audit
									},
									success : function(response, opts) {
										Ext.ux.Toast.msg("温馨提示", "审核成功！");
										store.load();
										me.close();
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
		return this.form;
	},
	audit: null,
	bindData: function(record, audit){
		var me = this,
			form = me.getForm().getForm();
		me.audit = audit;
		form.loadRecord(record);
	},
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [me.getForm()]
        });
        me.callParent(arguments);
    }
});

/*
 * 卖家管理页面
 */
Ext.define('MyApp.view.sellerManager', {
    extend: 'Ext.panel.Panel',
    id: 'sellerManager',
    closable: true,
    title: '卖家审核',
    toolbar: null,
	getToolbar: function(){
		var me = this;
		if(Ext.isEmpty(me.toolbar)){
			me.toolbar = Ext.widget('toolbar',{
				dock: 'top',
				items: [{
					text: '审核通过',
					handler: function(){
						me.auditSeller(1);
					}
				},'-',{
					text: '审核不通过',
					handler: function(){
						me.auditSeller(2);
					}
				}]
			});
		}
		return me.toolbar;
	},
	window: null,
	getWindow: function(){
		var me = this;
		if(me.window==null){
			me.window = Ext.create('MyApp.view.auditSellerWindow');
		}
		return me.window;
	},
	auditSeller: function(audit){
		var grid = this.getSellerGrid(),
			window = this.getWindow(),
			selModel = grid.getSelectionModel(),
			selRecords = selModel.getSelection();
		if(selRecords == null||selRecords.length<=0){
			Ext.ux.Toast.msg("温馨提示", "请先选择要审核的卖家信息");
			return;
		}
		var record = selRecords[0];
		if(record.get('checkState')==audit){
			if(audit==1){
				Ext.ux.Toast.msg("温馨提示", "该卖家审核状态已为通过");
			}else{
				Ext.ux.Toast.msg("温馨提示", "该卖家审核状态已为不通过");
			}
			return;
		}
		window.bindData(record, audit);
		window.show();
	},
    queryForm: null,
	getQueryForm: function(){
		var me = this;
		if(me.queryForm==null){
			me.queryForm = Ext.widget('form',{
                layout: 'column',
				defaults: {
					margin: '10 10 10 10',
					columnWidth: .25,
					labelWidth: 80,
					xtype: 'textfield'
				},
                items: [DataDictionary.getDataDictionaryCombo('sellerState',{
                	fieldLabel: '审核状态',
                	labelWidth: 80,
                	columnWidth: .25,
					name: 'checkState',
					editable: false
				},{value: null,display: '全部'}),{
				    fieldLabel: '卖家5173账号',
				    columnWidth: .25,
				    labelWidth: 100,
				    name: 'loginAccount'
				},{
				    fieldLabel: '联系人',
				    name: 'name'
				},{
				    fieldLabel: '联系电话',
				    name: 'phoneNumber'
				},{
			        fieldLabel: '创建日期',
			        columnWidth: .5,
			        xtype: 'rangedatefield',
			        //起始日期组件的name属性。
			        fromName: 'createStartTime',
			        //终止日期组件的name属性。
			        toName: 'createEndTime'
			    },{
					fieldLabel: '审核客服',
					hidden: CurrentUser.getUserTypeCode()!=2&&CurrentUser.getUserTypeCode()!=3,
				    name: 'auditServiceAccount'
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
			me.store = Ext.create('MyApp.store.SellerStore',{
				autoLoad: true,
				listeners: {
					beforeload : function(store, operation, eOpts) {
						var queryForm = me.getQueryForm();
						if (queryForm != null) {
							var values = queryForm.getValues();
							Ext.apply(operation, {
								params: {
									'auditServiceAccount': Ext.String.trim(values.auditServiceAccount),
									'seller.loginAccount': Ext.String.trim(values.loginAccount),
									'seller.name': Ext.String.trim(values.name),
									'seller.checkState': values.checkState,
									'seller.phoneNumber': Ext.String.trim(values.phoneNumber),
									'createStartTime': values.createStartTime,
									'createEndTime': values.createEndTime
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
	sellerGrid: null,
	getSellerGrid: function(){
		var me = this;
		if(Ext.isEmpty(me.sellerGrid)){
			me.sellerGrid = Ext.create('MyApp.view.sellerGrid',{
				store: me.getStore(),
				dockedItems: [me.getToolbar(),me.getPagingToolbar()],
				plugins: [{
                    ptype: 'gamegoldrowexpander',
                    header: true,
                    rowsExpander: false,
                    rowBodyElement : 'MyApp.order.SellerRepositoryPanel'
                }]
			});
		}
		return me.sellerGrid;
	},
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [me.getQueryForm(),me.getSellerGrid()]
        });
        me.callParent(arguments);
    }
});