package com.freight.common;

import java.util.List;

import com.freight.model.ADColumn;
import com.freight.model.ADRefTable;
import com.freight.util.DTOUtil;

public class LookupTable implements DwrSerializable {

    private static final long serialVersionUID = 1L;
    private int               tableID;
    private String            valueField;
    private String            displayField;
    private List<FieldModel>  fields;

    public LookupTable(ADRefTable refTable, List<ADColumn> columns) {
        this.tableID = refTable.getADTableID();
        this.valueField = refTable.getADValue();
        this.displayField = refTable.getADDisplay();
        this.fields = DTOUtil.convert2FieldList(columns);
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

    public String getValueField() {
        return valueField;
    }

    public void setValueField(String valueField) {
        this.valueField = valueField;
    }

    public String getDisplayField() {
        return displayField;
    }

    public void setDisplayField(String displayField) {
        this.displayField = displayField;
    }

}
