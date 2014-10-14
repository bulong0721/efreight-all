package com.freight.common;

import java.io.Serializable;
import java.util.List;

public class PageResult<T> implements Serializable {

	private static final long serialVersionUID = 1L;
	private int total;
	private List<T> rows;
	private LookupTable lookupTable;

	public PageResult(List<T> rows, int total) {
		super();
		this.rows = rows;
		this.total = total;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public List<T> getRows() {
		return rows;
	}

	public void setRows(List<T> rows) {
		this.rows = rows;
	}

	public LookupTable getLookupTable() {
		return lookupTable;
	}

	public void setLookupTable(LookupTable lookupTable) {
		this.lookupTable = lookupTable;
	}

}
