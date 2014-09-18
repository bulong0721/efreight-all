package com.freight.model;

import javax.persistence.*;

import com.freight.common.EntityBase;

/**
 * Auto-generated by:
 * org.freight.AdempiereCustomizer
 */
@Entity
@Table(name="ad_field_v")
public class ADFieldV extends EntityBase {
	private static final long serialVersionUID = 1L;
	private Integer aDColumnID;
	private Integer aDFieldID;
	private Integer aDReferenceID;
	private Integer aDReferenceValueID;
	private Integer aDTabID;
	private String columnName;
	private String defaultValue;
	private Integer displayLength;
	private Boolean displayed;
	private Integer encrypted;
	private Boolean fieldOnly;
	private Boolean identifier;
	private Boolean mandatory;
	private String name;
	private Boolean parimayKey;
	private String propertyName;
	private Boolean readonly;
	private Boolean selectionColumn;
	private Integer seqNo;
	private String tabName;
	private String tableName;
	private String valueMax;
	private String valueMin;
	private String vformat;
	private Boolean view;

	public ADFieldV() {
	}

	public ADFieldV(Integer aDFieldID) {
		this.aDFieldID = aDFieldID;
	}

	@Basic
	@Column(name="ad_column_id", columnDefinition="INT")
	public Integer getADColumnID() {
		return aDColumnID;
	}

	public void setADColumnID(Integer aDColumnID) {
		this.aDColumnID = aDColumnID;
	}

	@Id
	@Column(name="ad_field_id", columnDefinition="INT")
	public Integer getADFieldID() {
		return aDFieldID;
	}

	public void setADFieldID(Integer aDFieldID) {
		this.aDFieldID = aDFieldID;
	}

	@Basic
	@Column(name="ad_reference_id")
	public Integer getADReferenceID() {
		return aDReferenceID;
	}

	public void setADReferenceID(Integer aDReferenceID) {
		this.aDReferenceID = aDReferenceID;
	}

	@Basic
	@Column(name="ad_reference_value_id")
	public Integer getADReferenceValueID() {
		return aDReferenceValueID;
	}

	public void setADReferenceValueID(Integer aDReferenceValueID) {
		this.aDReferenceValueID = aDReferenceValueID;
	}

	@Basic
	@Column(name="ad_tab_id", columnDefinition="INT", nullable=false)
	public Integer getADTabID() {
		return aDTabID;
	}

	public void setADTabID(Integer aDTabID) {
		this.aDTabID = aDTabID;
	}

	@Basic
	@Column(name="column_name", length=40)
	public String getColumnName() {
		return columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}

	@Basic
	@Column(name="default_value", length=60)
	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	@Basic
	@Column(name="display_length")
	public Integer getDisplayLength() {
		return displayLength;
	}

	public void setDisplayLength(Integer displayLength) {
		this.displayLength = displayLength;
	}

	@Basic
	@Column(nullable=false)
	public Boolean isDisplayed() {
		return displayed;
	}

	public void setDisplayed(Boolean displayed) {
		this.displayed = displayed;
	}

	@Basic
	@Column(columnDefinition="INT UNSIGNED")
	public Integer getEncrypted() {
		return encrypted;
	}

	public void setEncrypted(Integer encrypted) {
		this.encrypted = encrypted;
	}

	@Basic
	@Column(name="field_only", nullable=false)
	public Boolean isFieldOnly() {
		return fieldOnly;
	}

	public void setFieldOnly(Boolean fieldOnly) {
		this.fieldOnly = fieldOnly;
	}

	@Basic
	public Boolean isIdentifier() {
		return identifier;
	}

	public void setIdentifier(Boolean identifier) {
		this.identifier = identifier;
	}

	@Basic
	@Column(columnDefinition="INT UNSIGNED")
	public Boolean isMandatory() {
		return mandatory;
	}

	public void setMandatory(Boolean mandatory) {
		this.mandatory = mandatory;
	}

	@Basic
	@Column(nullable=false, length=60)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Basic
	@Column(name="parimay_key")
	public Boolean isParimayKey() {
		return parimayKey;
	}

	public void setParimayKey(Boolean parimayKey) {
		this.parimayKey = parimayKey;
	}

	@Basic
	@Column(name="property_name", length=40)
	public String getPropertyName() {
		return propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}

	@Basic
	@Column(nullable=false)
	public Boolean isReadonly() {
		return readonly;
	}

	public void setReadonly(Boolean readonly) {
		this.readonly = readonly;
	}

	@Basic
	@Column(name="selection_column")
	public Boolean isSelectionColumn() {
		return selectionColumn;
	}

	public void setSelectionColumn(Boolean selectionColumn) {
		this.selectionColumn = selectionColumn;
	}

	@Basic
	@Column(name="seq_no")
	public Integer getSeqNo() {
		return seqNo;
	}

	public void setSeqNo(Integer seqNo) {
		this.seqNo = seqNo;
	}

	@Basic
	@Column(name="tab_name", nullable=false, length=60)
	public String getTabName() {
		return tabName;
	}

	public void setTabName(String tabName) {
		this.tabName = tabName;
	}

	@Basic
	@Column(name="table_name", nullable=false, length=40)
	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	@Basic
	@Column(name="value_max", length=20)
	public String getValueMax() {
		return valueMax;
	}

	public void setValueMax(String valueMax) {
		this.valueMax = valueMax;
	}

	@Basic
	@Column(name="value_min", length=20)
	public String getValueMin() {
		return valueMin;
	}

	public void setValueMin(String valueMin) {
		this.valueMin = valueMin;
	}

	@Basic
	@Column(length=60)
	public String getVformat() {
		return vformat;
	}

	public void setVformat(String vformat) {
		this.vformat = vformat;
	}

	@Basic
	@Column(nullable=false)
	public Boolean isView() {
		return view;
	}

	public void setView(Boolean view) {
		this.view = view;
	}
}