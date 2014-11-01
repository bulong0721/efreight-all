package com.freight.common;

import java.util.ArrayList;
import java.util.List;

import com.freight.model.ADRefList;
import com.freight.model.ADReference;

public class LookupModel implements DwrSerializable {
	private static final long serialVersionUID = 1L;
	private String name;
	private String columnName;
	private Integer refType;
	private String refClass;
	private List<ItemModel> items;

	public LookupModel() {
	}

	public LookupModel(ADReference ref) {
		this.name = ref.getName();
		this.columnName = ref.getColumnName();
		this.refType = ref.getRefType();
		this.refClass = ref.getRefClass();
		if (null != ref.getRefLists()) {
			this.items = new ArrayList<>();
			for (ADRefList refList : ref.getRefLists()) {
				this.items.add(new ItemModel(refList));
			}
		}
	}

	public List<ItemModel> getItems() {
		return items;
	}

	public void setItems(List<ItemModel> items) {
		this.items = items;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getColumnName() {
		return columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}

	public Integer getRefType() {
		return refType;
	}

	public void setRefType(Integer refType) {
		this.refType = refType;
	}

	public String getRefClass() {
		return refClass;
	}

	public void setRefClass(String refClass) {
		this.refClass = refClass;
	}

	static class ItemModel implements DwrSerializable {
		private static final long serialVersionUID = 1L;
		private String display;
		private String value;

		public ItemModel(String display, String value) {
			this.display = display;
			this.value = value;
		}

		public ItemModel(ADRefList refList) {
			this.display = refList.getName();
			this.value = refList.getValue();
		}

		public String getDisplay() {
			return display;
		}

		public void setDisplay(String display) {
			this.display = display;
		}

		public String getValue() {
			return value;
		}

		public void setValue(String value) {
			this.value = value;
		}
	}
}
