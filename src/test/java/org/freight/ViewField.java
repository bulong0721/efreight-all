package org.freight;

public class ViewField {

    private FieldType ftype;
    private boolean   readOnly;
    private boolean   conditionOf;
    private boolean   primarykey;
    private int       width;
    private int       flex;
    private String    refTable;
    private int       refID;
    private String    field;
    private String    label;

    public FieldType getFtype() {
        return ftype;
    }

    public void setFtype(FieldType ftype) {
        this.ftype = ftype;
    }

    public boolean isReadOnly() {
        return readOnly;
    }

    public void setReadOnly(boolean readOnly) {
        this.readOnly = readOnly;
    }

    public boolean isConditionOf() {
        return conditionOf;
    }

    public void setConditionOf(boolean conditionOf) {
        this.conditionOf = conditionOf;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getFlex() {
        return flex;
    }

    public void setFlex(int flex) {
        this.flex = flex;
    }

    public String getRefTable() {
        return refTable;
    }

    public void setRefTable(String refTable) {
        this.refTable = refTable;
    }

    public int getRefID() {
        return refID;
    }

    public void setRefID(int refID) {
        this.refID = refID;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public boolean isPrimarykey() {
        return primarykey;
    }

    public void setPrimarykey(boolean primarykey) {
        this.primarykey = primarykey;
    }

}
