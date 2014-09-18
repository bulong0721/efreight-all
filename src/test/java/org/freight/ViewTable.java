package org.freight;

import java.util.ArrayList;
import java.util.List;

public class ViewTable {

    private String          tableName;
    private List<ViewField> fields = new ArrayList<>();

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public List<ViewField> getFields() {
        return fields;
    }

    public void setFields(List<ViewField> fields) {
        this.fields = fields;
    }

}
