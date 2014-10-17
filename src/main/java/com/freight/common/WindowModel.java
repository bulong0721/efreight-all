package com.freight.common;

import java.util.List;

public class WindowModel implements DwrSerializable {

	private static final long serialVersionUID = 1L;
	private String name;
	private int tableID;
	private boolean infoTab;
	private List<FieldModel> fields;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getTableID() {
		return tableID;
	}

	public void setTableID(int tableID) {
		this.tableID = tableID;
	}

	public List<FieldModel> getFields() {
		return fields;
	}

	public void setFields(List<FieldModel> fields) {
		this.fields = fields;
	}

	public boolean isInfoTab() {
		return infoTab;
	}

	public void setInfoTab(boolean infoTab) {
		this.infoTab = infoTab;
	}

}
