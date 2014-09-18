// ************************************** 处理浏览器兼容性问题 ************************************* //
/**
 * String对象的split方法在某些版本浏览器下不兼容
 */
var split;
// Avoid running twice; that would break the `nativeSplit` reference
split = split || function (undef) {

	var nativeSplit = String.prototype.split, compliantExecNpcg = /()??/.exec("")[1] === undef, // NPCG: nonparticipating capturing group
		self;

	self = function (str, separator, limit) {
		// If `separator` is not a regex, use `nativeSplit`
		if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
			return nativeSplit.call(str, separator, limit);
		}
		var output = [], flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
				(separator.sticky ? "y" : ""), // Firefox 3+
			lastLastIndex = 0, // Make `global` and avoid `lastIndex` issues by working with a copy
			separator = new RegExp(separator.source, flags + "g"), separator2, match, lastIndex, lastLength;
		str += ""; // Type-convert
		if (!compliantExecNpcg) {
			// Doesn't need flags gy, but they don't hurt
			separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
		}
		/* Values for `limit`, per the spec:
		 * If undefined: 4294967295 // Math.pow(2, 32) - 1
		 * If 0, Infinity, or NaN: 0
		 * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
		 * If negative number: 4294967296 - Math.floor(Math.abs(limit))
		 * If other: Type-convert, then use the above rules
		 */
		limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
			limit >>> 0; // ToUint32(limit)
		while (match = separator.exec(str)) {
			// `separator.lastIndex` is not reliable cross-browser
			lastIndex = match.index + match[0].length;
			if (lastIndex > lastLastIndex) {
				output.push(str.slice(lastLastIndex, match.index));
				// Fix browsers whose `exec` methods don't consistently return `undefined` for
				// nonparticipating capturing groups
				if (!compliantExecNpcg && match.length > 1) {
					match[0].replace(separator2, function () {
						for (var i = 1; i < arguments.length - 2; i++) {
							if (arguments[i] === undef) {
								match[i] = undef;
							}
						}
					});
				}
				if (match.length > 1 && match.index < str.length) {
					Array.prototype.push.apply(output, match.slice(1));
				}
				lastLength = match[0].length;
				lastLastIndex = lastIndex;
				if (output.length >= limit) {
					break;
				}
			}
			if (separator.lastIndex === match.index) {
				separator.lastIndex++; // Avoid an infinite loop
			}
		}
		if (lastLastIndex === str.length) {
			if (lastLength || !separator.test("")) {
				output.push("");
			}
		} else {
			output.push(str.slice(lastLastIndex));
		}
		return output.length > limit ? output.slice(0, limit) : output;
	};

	// For convenience
	String.prototype.split = function (separator, limit) {
		return self(this, separator, limit);
	};

	return self;
}();

/**
 * String对象的trim方法在某些版本浏览器下不兼容
 */
if (typeof String.prototype.trim !== "function") {
	String.prototype.trim = function () {
		return this.replace(/(^\s*)|(\s*$)/g, "");
	}
}
/**
 * Array对象的indexOf方法在某些版本浏览器下不兼容
 */
if (typeof Array.prototype.indexOf !== "function") {
	Array.prototype.indexOf = function (obj) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == obj) {
				return i;
			}
		}
		return -1;
	}
}

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

Ext.define('Gamegold.form.field.RangeDateField', {
	extend: 'Ext.form.FieldContainer',
	alias: ['widget.rangeDateField', 'widget.rangedatefield'],
	alternateClassName: ['Gamegold.form.RangeDateField'],
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

if (Gamegold === undefined) {
	Ext.ns('Gamegold');
}
;

Gamegold.JsLoader = function () {
	this.load = function (url) {
		var me = this, scripts = document.getElementsByTagName("script"), len = scripts.length, i, script, head;
		for (i = 0; i < len; i++) {
			if (scripts[i].src && scripts[i].src.indexOf(url) != -1) {
				me.onSuccess();
				return;
			}
		}
		script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		head = document.getElementsByTagName("head")[0];
		try {
			head.appendChild(script);
			script.onload = script.onreadystatechange = function () {
				if (script.readyState && script.readyState != 'loaded' && script.readyState != 'complete') return;
				script.onreadystatechange = script.onload = null;
				me.onSuccess();
			}
		} catch (e) {
			if (typeof(me.onFailure) == 'function') {
				me.onFailure();
			} else {
				throw "Failed to load javaScript file dynamical!";
			}
		}
	}
};

/**
 *    @docauthor ztjie
 *    此插件使用于按钮上，使按钮在点击后一定时间内处于不可用状态（disabled），从而防止用户连续点击按钮。
 *    通常可以用来防止用户连续提交而造成的服务器性能问题。
 *    此插件的功能和设计参考12306订票查询按钮。
 *    # 插件示例
 *    <pre><code>
 *    @example
 *    Ext.create('Ext.button.Button', {
 *		frame: true,
 *		text: '阻止按钮连续点击插件',
 *		maxWidth: 200,
 *		height: 30,
 *		//插件配置代码
 *		plugins: {
 *			ptype: 'buttondisabledplugin',
 *			seconds: 5
 *		},
 *		renderTo : Ext.getBody()
 *	});
 *    </code></pre>
 */
Ext.define('Gamegold.button.ButtonDisabledPlugin', {
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


/**
 *    @docauthor ztjie
 *    单选选择器，公共选择器之一。
 *    封装combobox，提供触发按钮查询、回车查询、分页栏、条目模板自定义、查询参数定义等配置功能。
 *
 */
Ext.define('Gamegold.selector.SingleSelector', {
	extend: 'Ext.form.ComboBox',
	alias: ['widget.singleselector', 'widget.dynamiccomboselector'],
	alternateClassName: ['Gamegold.commonselector.DynamicComboSelector'],
	/**
	 * @cfg {String} triggerCls
	 * 触发按钮样式。
	 */
	triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
	/**
	 * @cfg {Number} listWidth
	 * 下拉列表宽度。
	 */
	listWidth: this.width,
	/**
	 * @cfg {Boolean} multiSelect
	 * 是否支持多选。
	 */
	multiSelect: false,
	/**
	 * @cfg {Boolean} isPaging
	 * 是否支持分页。
	 */
	isPaging: false,
	/**
	 * @cfg {Boolean} isEnterQuery
	 * 是否支持回车查询。
	 */
	isEnterQuery: false,
	/**
	 * @cfg {String} displayField
	 * 显示的字段。
	 */
	displayField: null,
	/**
	 * @cfg {String} valueField
	 * 显示字段对应的关键字。
	 */
	valueField: null,
	/**
	 * @cfg {String} showContent
	 * 下拉条目的显示模板。
	 */
	showContent: null,
	/**
	 * @cfg {Object} queryParam
	 * 查询参数。
	 */
	queryParam: null,
	/**
	 * @cfg {String} triggerAction
	 * 触发动作。
	 */
	triggerAction: 'query',
	/**
	 * @cfg {Number} minChars
	 * 查询条件显示结果的最小字符数。
	 */
	minChars: 0,
	/**
	 * @cfg {Boolean} hideTrigger
	 * 是否隐藏触发按钮。
	 */
	hideTrigger: false,
	/**
	 * @cfg {Boolean} queryAllFlag
	 * 是否支持查询全部。
	 */
	queryAllFlag: true,
	/**
	 * @cfg {Number} validValueLength
	 * 查询条件的最小字符串长度。
	 */
	validValueLength: 0,
	/**
	 * @cfg {Object} listConfig
	 * 下拉列表的配置对象。
	 *   - {@link Ext.view.BoundList#cls} - 默认为空。
	 *   - {@link Ext.view.BoundList#emptyText} - 默认为空字符串。
	 *   - {@link Ext.view.BoundList#itemSelector} - 默认为BoundList定义的字符串。
	 *   - {@link Ext.view.BoundList#loadingText} - 默认为 "Loading..."
	 *   - {@link Ext.view.BoundList#minWidth} - 默认为 70
	 *   - {@link Ext.view.BoundList#maxWidth} - 默认为 `undefined`
	 *   - {@link Ext.view.BoundList#maxHeight} - 默认为 `300`
	 *   - {@link Ext.view.BoundList#resizable} - 默认为 `false`
	 *   - {@link Ext.view.BoundList#shadow} - 默认为 `'sides'`
	 *   - {@link Ext.view.BoundList#width} - 默认为 `undefined` （自动匹配宽度，如果combobox的{@link #matchFieldWidth}属性设置为true）
	 */
	listConfig: {
		getInnerTpl: function () {
			var comboObj = this.up('combo'), content = comboObj.showContent, keyArr = comboObj.getKeyWords(content);
			if (keyArr.length == 2) {
				return Ext.String.format('<div class="common-combo-item"><span>{{1}}</span><span>{{0}}</span></div>', keyArr[0], keyArr[1]);
			} else {
				return this.up('combo').showContent;
			}
		}
	},
	/**
	 * @method
	 * 获取下拉条目模板中的关键字。
	 * @param {String} 下拉条目模板。
	 * @return {Array} 关键字数组。
	 */
	getKeyWords: function (content) {
		var conArr = content.split("}"), conEle, result = [], conIndex;
		for (var i = 0, len = conArr.length; i < len; i++) {
			conEle = conArr[i];
			conIndex = conEle.indexOf("{");
			if (conIndex != -1) {
				result.push(conEle.substring(conEle.indexOf("{") + 1, conEle.length));
			}
		}
		return result;
	},
	getValueModel: function () {
		var models = this.valueModels;
		if (Ext.isEmpty(models) && models.length > 0) {
			return models[0];
		} else {
			return null;
		}
	},
	/**
	 * @private
	 * combobox的change监听事件。
	 */
	handleChange: function (combo, newValue, oldValue) {
		if (combo.isExpanded == true) {
			combo.collapse();
		}
	},
	/**
	 * @private
	 * combobox的keypress监听事件。
	 */
	handleKeyPress: function (combo, event, eOpts) {
		var me = this;
		if (event.getKey() == event.ENTER) {
			if (me.queryAllFlag) {
				me.enterQueryAction();
			} else {
				if (Ext.isEmpty(me.getValue())) {
					me.setActiveErrors(["请输入查询条件!"]);
					this.doComponentLayout();
				} else {
					me.enterQueryAction();
				}
			}
		}
	},
	/**
	 * @private
	 * combobox的store对象的beforeLoad监听事件。
	 */
	handleBeforeLoad: function (st, operation, e) {
		var me = this, searchParams = operation.params;
		if (Ext.isEmpty(searchParams)) {
			searchParams = {};
			Ext.apply(operation, {
				params: searchParams
			});
		}
		searchParams[me.queryParam] = me.rawValue;
	},
	/**
	 * @protected
	 * 初始化监听事件方法。
	 */
	initEvents: function () {
		var me = this;
		me.callParent(arguments);
		if (me.isEnterQuery == true) {
			me.mon(me, 'change', me.handleChange, me);
			me.mon(me, 'keypress', me.handleKeyPress, me);
		}
		me.mon(me.store, 'beforeLoad', me.handleBeforeLoad, me);
	},
	/**
	 * @private
	 * 组件初始化方法。
	 */
	initComponent: function () {
		var me = this;
		me.on('expand', function (combo, eOpts) {
			combo.getPicker().minWidth = me.listWidth;
			combo.getPicker().setWidth(me.listWidth);
		});
		if (me.isPaging == true) {
			me.pageSize = me.store.pageSize;
		}
		if (me.showContent == null) {
			me.showContent = '{' + me.displayField + '}';
		}
		if (me.isEnterQuery == true) {
			me.enableKeyEvents = true;
			me.queryDelay = 1000000;
		}
		this.callParent(arguments);
	},
	/**
	 * @method
	 * combobox触发按钮的绑定事件。
	 */
	onTriggerClick: function () {
		var me = this;
		if (me.queryAllFlag) {
			me.queryAction();
		} else {
			if (Ext.isEmpty(me.getValue())) {
				me.setActiveErrors(["请输入查询条件!"]);
				this.doComponentLayout();
			} else {
				me.queryAction();
			}
		}
	},
	/**
	 * @method
	 * combobox回车键的监听事件。
	 * @param {Ext.form.ComboBox} combobox组件。
	 */
	enterQueryAction: function () {
		var me = this, clearvalueplugin = me.getPlugin('clearvalueplugin'), value = me.getValue();
		if (me.validValueLength != 0 && (!Ext.isEmpty(value) && value.length < me.validValueLength)) {
			me.setActiveErrors(["请输入至少" + me.validValueLength + "个字符!"]);
			me.doComponentLayout();
			return;
		}
		me.store.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				if (records.length > 0) {
					me.expand();
				} else {
					operation.params[me.queryParam] = "";
					me.lastQuery = undefined;
				}
			}
		});
		if (!Ext.isEmpty(clearvalueplugin)) {
			me.hasSearch = true;
			me.triggerCell.item(0).setDisplayed(true);
		}
	},
	/**
	 * @method
	 * combobox查询事件。
	 */
	queryAction: function () {
		var me = this, value;
		if (!me.readOnly && !me.disabled) {
			if (me.isExpanded) {
				me.collapse();
			} else {
				me.onFocus({});
				value = me.getValue();
				if (me.validValueLength != 0 && (!Ext.isEmpty(value) && value.length < me.validValueLength)) {
					me.setActiveErrors(["请输入至少" + me.validValueLength + "个字符!"]);
					me.doComponentLayout();
					return;
				}
				if (me.triggerAction === 'all') {
					me.doQuery(me.allQuery, true);
				} else {
					me.doQuery(me.getRawValue(), false, true);
				}
			}
			me.inputEl.focus();
		}
	}
});

Ext.define('Lookup', {
	singleton: true,
	refList: null,

	getListStore: function (fieldName) {
		var data = Lookup.refList[fieldName];
		return Ext.create('Ext.data.Store', {
			fields: [
				{name: 'display', type: 'string'},
				{name: 'value'}
			],
			data: Ext.clone(data)
		});

	},

	createLookupList: function (field, cfg) {
		var me = this;
		return Ext.create('Ext.form.ComboBox', Ext.applyIf({
			fieldLabel: field.label,
			store: me.getListStore(field.fieldName),
			queryMode: 'local',
			displayField: 'display',
			valueField: 'value'
		}, cfg));
	},

	createLookupTable: function (field, cfg) {

	},

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

//数据字典
/**********************************************************************
 * 业务字典提供方法
 */
/**********************************************************************/
var dataDictionary = new Ext.util.HashMap();
dataDictionary.add('check', [
	{value: true, display: '是'},
	{value: false, display: '否'}
]);
dataDictionary.add('sex', [
	{value: '1', display: '男'},
	{value: '0', display: '女'}
]);

/**********************************************************************/
//业务字典信息类
Ext.define('DataDictionary', {
	singleton: true,
	/**
	 * 通过词条代码获得业务字典数据
	 * @param termsCode 词条代码
	 * @param valueCodes 条目编码数组
	 * @returns 业务字典数据
	 */
	getDataByTermsCode: function (termsCode, valueCodes) {
		if (dataDictionary != null && termsCode != null) {
			var data = Ext.clone(dataDictionary.get(termsCode));
			if (!Ext.isEmpty(valueCodes)) {
				var reslutArray = new Array();
				if (Ext.isArray(valueCodes)) {
					for (var i = 0; i < data.length; i++) {
						if (Ext.Array.contains(valueCodes, data[i].value)) {
							reslutArray.push(data[i]);
						}
					}
				} else {
					for (var i = 0; i < data.length; i++) {
						if (valueCodes == data[i].value) {
							reslutArray.push(data[i]);
						}
					}
				}
				//此处当valueCodes为数组，但是内容无法识别(undefined)时，返回全部数据
				if (reslutArray != null && reslutArray.length > 0) {
					return reslutArray;
				} else {
					return data;
				}
				//return reslutArray;
			}
			return data;
		}
		return null;
	},
	/**
	 * 通过多个词条代码获得业务字典数据数组
	 * @param termsCodes 词条代码数组
	 * @returns 业务字典数据数组
	 */
	getDataByTermsCodes: function (termsCodes) {
		if (termsCodes == null) {
			return null;
		}
		var data = new Array();
		for (var i = 0; i < termsCodes.length; i++) {
			data.push(DataDictionary.getDataByTermsCode(termsCodes[i]));
		}
		return data;
	},
	/**
	 * 根据数据字典名称获取对应的store,如果没有则返回[],不影响整个页面的渲染
	 * @param termsCode 词条代码
	 * @param id 如果想要通过store id 查询store的话就传id,否则可以不用传
	 * @param anyRecords 如果想增加一些记录到这个数据字典中，可以通过这个参数传入，
	 *                     些参数可以是一个数据数组，也可以是一个数据
	 * @param valueCodes 条目编码数组
	 * @returns
	 */
	getDataDictionaryStore: function (termsCode, id, anyRecords, valueCodes) {
		var data = DataDictionary.getDataByTermsCode(termsCode, valueCodes);
		if (!Ext.isEmpty(data)) {
			if (!Ext.isEmpty(anyRecords)) {
				if (Ext.isArray(anyRecords)) {
					for (var i = 0; i < anyRecords.length; i++) {
						data.unshift(anyRecords[i]);
					}
				} else {
					data.unshift(anyRecords);
				}
			}
			var json = {
				fields: ['value', 'display'],
				data: data
			};
			if (!Ext.isEmpty(id)) {
				json["id"] = id;
			}
			return Ext.create('Ext.data.Store', json);
		} else {
			return [];
		}
	},
	/**
	 * 根据数据字典名称获取对应的combo组件
	 * @param termsCode 词条代码
	 * @param config combo的一些配置信息
	 * @param anyRecords 如果想增加一些记录到这个数据字典中，可以通过这个参数传入，
	 *                     些参数可以是一个数据数组，也可以是一个数据
	 * @param id 如果想要通过store id 查询store的话就传id,否则可以不用传
	 * @returns
	 */
	getDataDictionaryCombo: function (termsCode, config, anyRecords, id, valueCodes) {
		if (Ext.isEmpty(config)) {
			config = {};
		}
		var store = DataDictionary.getDataDictionaryStore(termsCode, id, anyRecords, valueCodes), cfg = Ext.apply({
			store: store,
			displayField: 'display',
			valueField: 'value'
		}, config);
		return Ext.create('Ext.form.ComboBox', cfg);

	},
	/**
	 *将业务字典的displayValue（数据字典显示值）转换成描述submitValue（提交值）
	 * 使用方法rendererDictionary(displayValue,’abc’);
	 * @param value  所要转换的值
	 * @param termsCode 词条代码
	 */
	rendererDisplayToSubmit: function (displayValue, termsCode) {
		var data = DataDictionary.getDataByTermsCode(termsCode);
		if (!Ext.isEmpty(displayValue) && !Ext.isEmpty(data)) {
			for (var i = 0; i < data.length; i++) {
				if (displayValue == data[i].display) {
					return data[i].value;
				}
			}
		}
		return displayValue;
	},
	/**
	 *将业务字典的submitValue（提交值）转换成描述displayValue（数据字典显示值）
	 * 使用方法rendererDictionary(value,’abc’);
	 * @param value  所要转换的值
	 * @param termsCode 词条代码
	 */
	rendererSubmitToDisplay: function (submitValue, termsCode) {
		var data = DataDictionary.getDataByTermsCode(termsCode);
		if (!Ext.isEmpty(submitValue) && !Ext.isEmpty(data)) {
			for (var i = 0; i < data.length; i++) {
				if (submitValue == data[i].value) {
					return data[i].display;
				}
			}
		}
		return submitValue;
	}
});