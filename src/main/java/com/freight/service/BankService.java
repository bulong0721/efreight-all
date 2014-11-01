package com.freight.service;

import java.util.List;

import com.freight.common.BusinessException;
import com.freight.model.*;

public interface BankService {
    
    CBank createBank(String bankName, String address1, String postalAddress1, String city, String routingNumber) throws BusinessException;

    CBankAccount createBankAccount(int bankId, String accountNo, String accountType, double currentBalance) throws BusinessException;

    List<CBank> getAllBanks() throws BusinessException;

    CBank getBank(int bankId) throws BusinessException;

    CBank editBank(int bankId, String address1, String postalAddress1, String city) throws BusinessException;

    void deleteBank(int bankId) throws BusinessException;

    int getOrCreateBank() throws BusinessException;

    int getDefaultBankAccountId(int adOrgId) throws BusinessException;

    List<CBankAccount> getBankAccounts() throws BusinessException;

    List<CBankAccount> getBankAccounts(int adOrgId) throws BusinessException;

}
