package org.freight;

public enum FieldType {
    Integer(10), Decimal(11), DateTime(12), Date(13), Time(14), TextLong(15), Location(16), List(17), Table(18),
    YesNo(19);

    private int value;

    private FieldType(int value){
        this.value = value;
    }

    public int getValue() {
        return value;
    }

}
