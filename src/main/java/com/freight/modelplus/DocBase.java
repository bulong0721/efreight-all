package com.freight.modelplus;

import com.freight.enums.DocStatus;

public interface DocBase {

    boolean processIt(String action) throws Exception;

    boolean unlockIt();

    boolean invalidateIt();

    DocStatus prepareIt();

    boolean approveIt();

    boolean rejectIt();

    DocStatus completeIt();

    boolean voidIt();

    boolean closeIt();

    boolean reverseCorrectIt();

    boolean reverseAccrualIt();

    boolean reActivateIt();
    
    String getDocumentNo();
}
