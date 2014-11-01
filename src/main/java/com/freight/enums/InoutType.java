package com.freight.enums;

public enum InoutType {
    OrderIn("O+"), PickupIn("P+"), MoveIn("M+"), MoveOut("M-"), DeliveryOut("D-"), SignedOut("S-");

    private String value;

    InoutType(String type) {
        this.value = type;
    }

    public String getValue() {
        return value;
    }

    public boolean isInbound() {
        return value.endsWith("+");
    }

    public boolean isOutbound() {
        return value.endsWith("-");
    }
}
