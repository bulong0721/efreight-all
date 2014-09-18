package com.freight.common;

public class FieldModel implements DwrSerializable {

    private static final long serialVersionUID = 1L;
    private String            label;
    private String            fieldName;
    private String            defaultValue;
    private String            valueMax;
    private String            valueMin;
    private String            vformat;
    private Integer           seqNo;
    private Integer           refType;
    private Integer           refValueID;
    private Integer           displayLength;
    private Boolean           displayed;
    private Boolean           fieldOnly;
    private Boolean           identifier;
    private Boolean           mandatory;
    private Boolean           parimayKey;
    private Boolean           readonly;
    private Boolean           selection;
    private String            columnName;

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getDefaultValue() {
        return defaultValue;
    }

    public void setDefaultValue(String defaultValue) {
        this.defaultValue = defaultValue;
    }

    public String getValueMax() {
        return valueMax;
    }

    public void setValueMax(String valueMax) {
        this.valueMax = valueMax;
    }

    public String getValueMin() {
        return valueMin;
    }

    public void setValueMin(String valueMin) {
        this.valueMin = valueMin;
    }

    public String getVformat() {
        return vformat;
    }

    public void setVformat(String vformat) {
        this.vformat = vformat;
    }

    public Integer getSeqNo() {
        return seqNo;
    }

    public void setSeqNo(Integer seqNo) {
        this.seqNo = seqNo;
    }

    public Integer getRefType() {
        return refType;
    }

    public void setRefType(Integer refType) {
        this.refType = refType;
    }

    public Integer getRefValueID() {
        return refValueID;
    }

    public void setRefValueID(Integer refValueID) {
        this.refValueID = refValueID;
    }

    public Integer getDisplayLength() {
        return displayLength;
    }

    public void setDisplayLength(Integer displayLength) {
        this.displayLength = displayLength;
    }

    public Boolean getDisplayed() {
        return displayed;
    }

    public void setDisplayed(Boolean displayed) {
        this.displayed = displayed;
    }

    public Boolean getFieldOnly() {
        return fieldOnly;
    }

    public void setFieldOnly(Boolean fieldOnly) {
        this.fieldOnly = fieldOnly;
    }

    public Boolean getIdentifier() {
        return identifier;
    }

    public void setIdentifier(Boolean identifier) {
        this.identifier = identifier;
    }

    public Boolean getMandatory() {
        return mandatory;
    }

    public void setMandatory(Boolean mandatory) {
        this.mandatory = mandatory;
    }

    public Boolean getParimayKey() {
        return parimayKey;
    }

    public void setParimayKey(Boolean parimayKey) {
        this.parimayKey = parimayKey;
    }

    public Boolean getReadonly() {
        return readonly;
    }

    public void setReadonly(Boolean readonly) {
        this.readonly = readonly;
    }

    public Boolean isSelection() {
        return selection;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public void setSelection(Boolean selection) {
        this.selection = selection;
    }

}
