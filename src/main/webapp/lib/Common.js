// **************************************** Override **************************************** //
/**
 * 设置EXTJS请求超时时间为300秒
 */
Ext.Ajax.timeout = 300000;//300秒

/**
 * 设置系统中window位置默认限制在它的父元素内
 */
Ext.override(Ext.window.Window, {
	constrain: true
});


Ext.define('Ext.ux.form.field.RangeDateField', {
	extend: 'Ext.form.FieldContainer',
	alias: ['widget.rangeDateField', 'widget.rangedatefield'],
	alternateClassName: ['Ext.ux.form.RangeDateField'],
	/**
	 *    @cfg {String} dateType
	 *    区间段组件的子组件的类型，默认为Extjs框架原生DateField组件。
	 */
	dateType: 'gamegolddatefield',
	/**
	 *    @cfg {String} fromName
	 *    起始日期组件name属性。
	 */
	fromName: '',
	/**
	 *    @cfg {String} toName
	 *    终止日期组件name属性。
	 */
	toName: '',
	/**
	 *    @cfg {String} fromValue
	 *    起始日期组件初始值。
	 */
	fromValue: '',
	/**
	 *    @cfg {String} toValue
	 *    终止日期组件初始值。
	 */
	toValue: '',
	/**
	 *    @cfg {Number} dateRange
	 *    起始日期和终止日期的间隔。单位：天。
	 */
	dateRange: 0,
	/**
	 *    @cfg {Boolean} time
	 *    是否提供时间选择功能。
	 */
	time: true,
	/**
	 *    @cfg {Number} increment
	 *    区间段类型为TimeField时，时间的增量，以分为单位。
	 */
	increment: 30,
	/**
	 *    @cfg {String} fieldId
	 *    当区间段类型为my97datetimefield组件时，需配置此属性。
	 *
	 *    此属性为my97datetimefield组件渲染的Dom ID属性，建议配置成复杂的字符串。
	 */
	fieldId: '',
	/**
	 *    @cfg {Boolean} allowFromBlank
	 *    起始日期组件非空标识。true不显示非空标识，false显示非空标识。
	 *    系统中，非空标识为组件前端的红色*号。
	 */
	allowFromBlank: true,
	/**
	 *    @cfg {Boolean} allowToBlank
	 *    终止日期组件非空标识。true不显示非空标识，false显示非空标识。
	 *    系统中，非空标识为组件前端的红色*号。
	 */
	allowToBlank: true,
	/**
	 *    @cfg {Boolean} disallowBlank
	 *    是否允许值为空，默认允许为空。
	 */
	disallowBlank: false,
	/**
	 *    @cfg {Boolean} fromEditable
	 *    起始日期组件是否允许编辑，默认允许编辑。
	 */
	fromEditable: true,
	/**
	 *    @cfg {Boolean} toEditable
	 *    终止日期组件是否允许编辑，默认允许编辑。
	 */
	toEditable: true,
	/**
	 *    @cfg {Boolean} editable
	 *    是否允许编辑，默认允许编辑。
	 *    此属性使起始日期组件和终止日期组件都为可编辑的。可以被单独的可编辑配置fromEditable和toEditable覆盖。
	 */
	editable: true,
	/**
	 *    @cfg {String} rangeFlag
	 *    起始日期组件和终止日期组件间隔Text。
	 */
	rangeFlag: '&nbsp;&nbsp;至&nbsp;&nbsp;',
	/**
	 * @private
	 * 组件初始化方法。
	 */
	initComponent: function () {
		var me = this;
		me.layout = 'column';
		me.initContainer();
		me.callParent(arguments);
	},
	/**
	 * @private
	 * 初始化区间容器。
	 */
	initContainer: function () {
		var me = this, fristField, toField, secondField, firstDateConfig, secondDateConfig, hasDateRange;
		if (me.disallowBlank) {
			me.allowFromBlank = false;
			me.allowToBlank = false;
		}
		if (!me.editable) {
			me.fromEditable = false;
			me.toEditable = false;
		}
		fristField = {
			itemId: 'first',
			xtype: "datefield",
			name: me.fromName,
			allowBlank: me.allowFromBlank,
			editable: me.fromEditable,
			columnWidth: .5,
			otherFieldName: 'second'
		};
		toField = {
			xtype: 'label',
			html: me.rangeFlag,
			style: {
				textAlign: 'center',
				marginTop: '5px'
			}
		};
		secondField = {
			itemId: 'second',
			xtype: "datefield",
			name: me.toName,
			allowBlank: me.allowToBlank,
			editable: me.toEditable,
			columnWidth: .5,
			otherFieldName: 'first'
		};
		hasDateRange = typeof(me.dateRange) == 'number' && me.dateRange != 0;
		me.format = me.format || 'Y-m-d';
		Ext.apply(fristField, {
			format: me.format,
			value: me.fromValue,
			listeners: {
				select: {
					fn: function (field, value) {
						field.up().child('#second').setMinValue(value);
						if (hasDateRange) {
							var maxValue = Ext.Date.add(value, Ext.Date.DAY, me.dateRange);
							field.up().child('#second').setMaxValue(maxValue);
						}
					}
				},
				scope: me
			}
		});
		Ext.apply(secondField, {
			format: me.format,
			value: me.toValue,
			listeners: {
				select: {
					fn: function (field, value) {
						field.up().child('#first').setMaxValue(value);
						if (hasDateRange) {
							var minValue = Ext.Date.add(value, Ext.Date.DAY, me.dateRange);
							field.up().child('#first').setMaxValue(minValue);
						}
					}
				}
			}
		});
		me.items = [ fristField, toField, secondField ];
	}
});

/**
 *
 */
Ext.define('Ext.ux.button.ButtonDisabledPlugin', {
	alias: ['plugin.buttonlimitingplugin', 'plugin.buttondisabledplugin'],
	/**
	 * @cfg {Number} seconds
	 * 设置按钮不可用状态持续的时间（单位：秒）。
	 */
	seconds: 2,
	/**
	 * @private
	 * 构造函数，初始化此插件的配置项。
	 */
	constructor: function (config) {
		Ext.apply(this, config);
	},
	/**
	 * @private
	 * 插件初始化方法，适用于Button组件上。在组件的initComponent方法执行完毕后调用。
	 */
	init: function (button) {
		var me = this;
		me.button = button;
		me.getDelayedTask();
		button.on('click', me.onClickButton, me);
	},
	/**
	 * @private
	 * 按钮上的click监听事件，点击后按钮变成不可用状态，利用延迟任务组件，一定时间后恢复可用状态。
	 * @return {Boolean} 返回true，继续执行其他的click监听事件。
	 */
	onClickButton: function () {
		var me = this, button = me.button;
		button.setDisabled(true);
		me.task.delay(me.seconds * 1000);
		return true;
	},
	/**
	 * @method
	 * 设置按钮disabled状态。
	 * @param {Boolean} 传入false设置按钮可用，传入true设置按钮不可用。
	 * @return {Ext.button.Button} 设置插件的按钮对象。
	 */
	setButtonDisabled: function (disabled) {
		var me = this, button = me.button;
		disabled = disabled || false;
		button.setDisabled(disabled);
		return button;
	},
	/**
	 * @method
	 * 获取插件的任务延迟对象。该方法在插件初始化时调用。
	 * @return {Ext.util.DelayedTask} 插件的任务延迟（Ext.util.DelayedTask）对象。
	 */
	getDelayedTask: function () {
		var me = this;
		if (!me.task) {
			me.task = new Ext.util.DelayedTask(me.setButtonDisabled, me);
		}
		return me.task;
	},
	/**
	 * @private
	 * 销毁插件相关的属性和对象。该方法会在组件销毁的时候自动调用。
	 */
	destory: function () {
		var me = this, button = me.button;
		Ext.destroy(me.task);
		delete me.button;
		delete me.task;
	}
});

Ext.define('Ext.ux.column.Table', {
	extend: 'Ext.grid.column.Column',
	alias: 'widget.tablecolumn',
	displayField: null,

	initComponent: function () {
		var me = this, customerRenderer = me.renderer;
		if (customerRenderer) {
			me.renderer = function (value, metadata, record, rowIndex, columnIndex, store) {
				value = customerRenderer(value, metadata, record, rowIndex, columnIndex, store);
				value = me.defaultRenderer(value, metadata, record, rowIndex, columnIndex, store);
				return value;
			};
		}
		me.callParent(arguments);
	},

	defaultRenderer: function (value, metadata, record, rowIndex, columnIndex, store) {
		var me = this;
		return record.get(me.displayField);
	}
});

Ext.define('Ext.ux.column.List', {
	extend: 'Ext.grid.column.Column',
	alias: 'widget.listcolumn',
	fieldName: null,

	initComponent: function () {
		var me = this, customerRenderer = me.renderer;
		if (customerRenderer) {
			me.renderer = function (value, metadata, record, rowIndex, columnIndex, store) {
				value = customerRenderer(value, metadata, record, rowIndex, columnIndex, store);
				value = me.defaultRenderer(value, metadata, record, rowIndex, columnIndex, store);
				return value;
			};
		}
		me.callParent(arguments);
	},

	defaultRenderer: function (value, metadata, record, rowIndex, columnIndex, store) {
		var me = this, data = Lookup.refList[me.fieldName];
		if (!Ext.isEmpty(value) && !Ext.isEmpty(data)) {
			for (var i = 0; i < data.length; i++) {
				if (value == data[i].value) {
					return data[i].display;
				}
			}
		}
		return value;
	}
});

Ext.define('Ext.ux.data.reader.DynamicMetaReader', {
	extend: 'Ext.data.reader.Json',
	alias: 'reader.meta',
	alternateClassName: 'Ext.data.reader.DynamicMetaReader',

	readRecords: function (data) {
		if (data.lookupTable) {
			var columns = [], modelFields = [];
			Ext.Array.each(data.lookupTable.fields, function (field) {
				var column, columnCfg, modelField, modelFieldCfg;
				if (15 == field.refType || 16 == field.refType || 24 == field.refType) {
					columnCfg = {xtype: 'datecolumn', width: 90};
					modelFieldCfg = {type: 'date'};
				} else if (22 == field.refType) {
					columnCfg = {xtype: 'numbercolumn', width: 90};
					modelFieldCfg = {type: 'float'};
				} else if (11 == field.refType || 13 == field.refType) {
					columnCfg = {width: 90};
					modelFieldCfg = {type: 'int'};
				} else if (20 == field.refType) {
					columnCfg = {xtype: 'checkcolumn', width: 65};
					modelFieldCfg = {type: 'boolean'};
				} else if (36 == field.refType) {
					columnCfg = {width: 200};
				} else {
					columnCfg = {width: 75};
				}
				if (!field.primaryKey) {
					column = Ext.apply({text: field.label, dataIndex: field.fieldName}, columnCfg);
					Ext.Array.push(columns, column);
				}
				if (!field.fieldOnly) {//Model Field
					modelField = {name: field.fieldName};
					Ext.Array.push(modelFields, Ext.apply(modelField, modelFieldCfg));
				}
			});
			data.metaData = { fields: modelFields, columns: columns, valueField: data.lookupTable.valueField, displayField: data.lookupTable.displayField };
		}
		return this.callParent([data]);
	}
});

Ext.define('Ext.ux.util.LookupTableKeyNav', {
	extend: 'Ext.util.KeyNav',

	constructor: function (config) {
		this.picker = config.picker;
		this.field = config.field;
		this.callParent([config.target, Ext.apply({}, config, this.defaultHandlers)]);
	},

	defaultHandlers: {
		up: function () {
			this.goUp(1);
		},
		down: function () {
			this.goDown(1);
		},
		home: function () {
			this.highlightAt(0);
		},
		end: function () {
			var count = this.getPicker().getStore().getCount();
			if (count > 0) {
				this.highlightAt(count - 1);
			}
		},
		enter: function (e) {
			this.selectHighlighted(e);
		}
	},
	goUp: function (n) {
		var grid = this.getPicker(), store = grid.getStore(), sm = grid.getSelectionModel(), lastSelected = sm.lastSelected, count = store.getCount(), nextIndex = count - n;

		if (count > 0) {
			if (lastSelected) {
				nextIndex = store.indexOf(lastSelected) - n;
				if (nextIndex < 0) {
					nextIndex = count - 1;
				}
			}
			this.highlightAt(nextIndex);
		}
	},
	goDown: function (n) {
		var grid = this.getPicker(), store = grid.getStore(), sm = grid.getSelectionModel(), lastSelected = sm.lastSelected, count = store.getCount(), nextIndex = 0;
		if (count > 0) {
			if (lastSelected) {
				nextIndex = store.indexOf(lastSelected) + n;
				if (nextIndex >= count) {
					nextIndex = 0;
				}
			}
			this.highlightAt(nextIndex);
		}
	},
	getPicker: function () {
		var me = this;
		return me.picker;
	},
	highlightAt: function (index) {
		var me = this;
		me.getPicker().getSelectionModel().select(index, false, true);
	},
	selectHighlighted: function (e) {
		var me = this;
		var selection = this.getPicker().getSelectionModel().getSelection(), selected = selection && selection[0];
		if (selected) {
			me.field.handleItemClick(null, selected);
		}
	}
});

Ext.define('Ext.ux.LookupTable', {
	extend: 'Ext.form.field.Picker',
	alias: ['widget.lookuptable'],
	triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
	listWidth: 400,
	valueField: null,
	displayField: null,
	record: null,
	refValueID: null,
	store: null,

	createStore: function () {
		var me = this;
		me.store = Ext.create('Ext.data.Store', {
			fields: [],
			metaDemand: true,
			listeners: {
				metachange: function (store, meta) {
					me.getPicker().reconfigure(store, meta.columns);
					store.metaDemand = false;
					me.valueField = meta.valueField;
					me.displayField = meta.displayField;
				},
				beforeload: function (store, operation, eOpts) {
					Ext.apply(operation, {
						params: {
							rawValue: me.getRawValue(),
							metaDemand: store.metaDemand
						}
					});
				}
			},
			autoDestroy: true,
			autoLoad: false,
			proxy: {
				type: 'dwr',
				passDwrStoreParams: true,
				dwrFunction: facade.lookup4Table,
				dwrParams: [me.refValueID],
				reader: {
					type: 'meta',
					root: 'rows',
					totalProperty: 'total'
				}
			}
		});
	},

	createComponent: function () {
		var me = this, picker = Ext.create("Ext.grid.Panel", {
			floating: true,
			store: me.store,
			columns: [],
			width: me.listWidth,
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					store: me.store,
					dock: 'bottom',
					displayInfo: true
				}
			]
		});
		return picker;
	},

	createPicker: function () {
		var me = this, picker = me.createComponent();
		picker.on("itemclick", me.handleItemClick, me);
		me.on("focus", me.onFocusHandler, me);
		return picker;
	},

	onFocusHandler: function () {
		var me = this;
		if (!me.isExpanded) {
			this.expand();
			this.focus();
		}
	},

	handleItemClick: function (view, record, item, index, e, eOpts) {
		var me = this;
		me.record = record;
		var oldValue = me.getValue();
		var newValue = record.get(me.displayField);
		me.setRawValue(record.get(me.displayField));
		me.fireEvent("change", me, newValue, oldValue, null);
		me.collapse();
	},

	handleChange: function (picker, newValue, oldValue) {
		if (picker.isExpanded == true) {
			picker.collapse();
		}
	},

	onExpand: function () {
		var me = this, keyNav = me.listKeyNav;
		if (keyNav) {
			keyNav.enable();
		} else {
			keyNav = me.listKeyNav = Ext.create('Ext.ux.util.LookupTableKeyNav', {
				target: me.inputEl, forceKeyDown: true, field: me, picker: me.getPicker()
			});
		}
		Ext.defer(keyNav.enable, 1, keyNav);
		me.focusWithoutSelection(10);
	},

	focusWithoutSelection: function (delay) {
		function focus() {
			var me = this, previous = me.selectOnFocus;
			me.selectOnFocus = false;
			me.inputEl.focus();
			me.selectOnFocus = previous;
		}

		return function (delay) {
			if (Ext.isNumber(delay)) {
				Ext.defer(focus, delay, this);
			} else {
				focus.call(this);
			}
		};
	}(),

	onCollapse: function () {
		var me = this, keyNav = me.listKeyNav;
		if (keyNav) {
			keyNav.disable();
		}
	},

	onTriggerClick: function () {
		var me = this;
		me.callParent(arguments);
		me.doRemoteQuery();
	},

	doRemoteQuery: function () {
		var me = this;
		if (Ext.isEmpty(me.getRawValue())) {
			this.doComponentLayout();
		} else {
			me.store.loadPage(1);
		}
	},

	getValue: function () {
		var me = this;
		if (null != me.record) {
			var value = me.record.get(me.valueField);
			return value;
		}
		if (null == value) {
			return me.getRawValue();
		}
		return this.value;
	},

	getSubmitValue: function () {
		return this.getValue();
	},

	getRecord: function () {
		return this.record;
	},

	initEvents: function () {
		var me = this;
		me.callParent(arguments);
		me.createStore();
		me.mon(me, 'change', me.handleChange, me);
	},

	initComponent: function () {
		var me = this;
		me.on('expand', function (picker, eOpts) {
			picker.getPicker().minWidth = me.listWidth;
			picker.getPicker().setWidth(me.listWidth);
		});
		me.callParent(arguments);
	}
});

Ext.define('Ext.ux.LookupList', {
	extend: 'Ext.form.field.ComboBox',
	alias: ['widget.lookuplist'],
	displayField: 'display',
	valueField: 'value',
	queryMode: 'local',
	editable: false,
	fieldName: null,

	createStore: function () {
		var me = this, data = Lookup.refList[me.fieldName];
		return Ext.create('Ext.data.Store', {
			fields: [
				{name: 'display', type: 'string'},
				{name: 'value'}
			],
			data: Ext.clone(data)
		});
	},

	getSubmitValue: function () {
		var me = this, value = me.callParent(arguments);
		if (value) {
			return value;
		}
		return me.getRawValue();
	},

	initComponent: function () {
		var me = this;
		me.store = me.createStore();
		me.callParent(arguments);
	}
});

Ext.define('Lookup', {
	singleton: true,
	refList: null,

	loadRefList: function () {
		var me = this;
		if (null != me.refList) {
			return;
		}
		facade.getAllRefList(function (data) {
			if (null != data) {
				Lookup.refList = data;
			}
		});
	}
});