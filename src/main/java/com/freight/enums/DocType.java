package com.freight.enums;

public enum DocType {
    New(0, "NEW", "** New **"),
    AR_Invoice(116, "ARI", "AR Invoice"),
    AR_Receipt(119, "ARR", "AR Receipt"),
    AP_Invoice(123, "API", "AP Invoice"),
    AP_Payment(125, "APP", "AP Payment"),
    Standard_Order(132, "SOO", "Standard Order"),
    Purchase_Order(126, "POO", "Purchase Order"),
    Payment_Allocation(137, "CMA", "Payment Allocation"),
    Cash_Journal(141, "CMC", "Cash Journal");

    private int    docTypeID;
    private String baseType;
    private String description;

    private DocType(int docTypeID, String baseType, String description) {
        this.docTypeID = docTypeID;
        this.baseType = baseType;
        this.description = description;
    }

    public int getDocTypeID() {
        return docTypeID;
    }

    public String getBaseType() {
        return baseType;
    }

    public String getDescription() {
        return description;
    }

}
