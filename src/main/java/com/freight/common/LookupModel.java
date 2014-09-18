package com.freight.common;

public class LookupModel implements DwrSerializable {

    private static final long serialVersionUID = 1L;
    private String            display;
    private String            value;

    public LookupModel(String display, String value){
        super();
        this.display = display;
        this.value = value;
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
