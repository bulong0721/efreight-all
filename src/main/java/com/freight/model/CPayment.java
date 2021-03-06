package com.freight.model;

import javax.persistence.*;

import com.freight.common.EntityBase;

/**
 * Auto-generated by:
 * org.freight.AdempiereCustomizer
 */
@Entity
@Table(name="c_payment")
public class CPayment extends EntityBase {
	private static final long serialVersionUID = 1L;
	private Integer aDClientID;
	private Integer aDOrgID;
	private String aName;
	private String accountNo;
	private Boolean active;
	private Boolean allocated;
	private Boolean approved;
	private Integer cBPBankaccountID;
	private Integer cBPartnerID;
	private Integer cBankaccountID;
	private Integer cChargeID;
	private Integer cCurrencyID;
	private Integer cInvoiceID;
	private Integer cOrderID;
	private Integer cPaymentID;
	private Integer cPaymentbatchID;
	private Integer chargeAmt;
	private String checkNo;
	private String created;
	private Integer createdBy;
	private String description;
	private Integer discountAmt;
	private String name;
	private Boolean online;
	private Integer payAmt;
	private Boolean processed;
	private Boolean receipt;
	private String timeAcct;
	private String updated;
	private Integer updatedBy;
	private Integer user1ID;
	private Integer user2ID;
	private Integer writeoffAmt;

	public CPayment() {
	}

	public CPayment(Integer cPaymentID) {
		this.cPaymentID = cPaymentID;
	}

	@Basic
	@Column(name="ad_client_id", columnDefinition="INT", nullable=false)
	public Integer getADClientID() {
		return aDClientID;
	}

	public void setADClientID(Integer aDClientID) {
		this.aDClientID = aDClientID;
	}

	@Basic
	@Column(name="ad_org_id", columnDefinition="INT", nullable=false)
	public Integer getADOrgID() {
		return aDOrgID;
	}

	public void setADOrgID(Integer aDOrgID) {
		this.aDOrgID = aDOrgID;
	}

	@Basic
	@Column(name="a_name", nullable=false, length=60)
	public String getAName() {
		return aName;
	}

	public void setAName(String aName) {
		this.aName = aName;
	}

	@Basic
	@Column(name="account_no", nullable=false, length=20)
	public String getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}

	@Basic
	@Column(nullable=false)
	public Boolean isActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	@Basic
	@Column(nullable=false)
	public Boolean isAllocated() {
		return allocated;
	}

	public void setAllocated(Boolean allocated) {
		this.allocated = allocated;
	}

	@Basic
	@Column(nullable=false)
	public Boolean isApproved() {
		return approved;
	}

	public void setApproved(Boolean approved) {
		this.approved = approved;
	}

	@Basic
	@Column(name="c_bp_bankaccount_id", columnDefinition="INT")
	public Integer getCBPBankaccountID() {
		return cBPBankaccountID;
	}

	public void setCBPBankaccountID(Integer cBPBankaccountID) {
		this.cBPBankaccountID = cBPBankaccountID;
	}

	@Basic
	@Column(name="c_bpartner_id", columnDefinition="INT")
	public Integer getCBPartnerID() {
		return cBPartnerID;
	}

	public void setCBPartnerID(Integer cBPartnerID) {
		this.cBPartnerID = cBPartnerID;
	}

	@Basic
	@Column(name="c_bankaccount_id", columnDefinition="INT")
	public Integer getCBankaccountID() {
		return cBankaccountID;
	}

	public void setCBankaccountID(Integer cBankaccountID) {
		this.cBankaccountID = cBankaccountID;
	}

	@Basic
	@Column(name="c_charge_id", columnDefinition="INT")
	public Integer getCChargeID() {
		return cChargeID;
	}

	public void setCChargeID(Integer cChargeID) {
		this.cChargeID = cChargeID;
	}

	@Basic
	@Column(name="c_currency_id", columnDefinition="INT")
	public Integer getCCurrencyID() {
		return cCurrencyID;
	}

	public void setCCurrencyID(Integer cCurrencyID) {
		this.cCurrencyID = cCurrencyID;
	}

	@Basic
	@Column(name="c_invoice_id", columnDefinition="INT")
	public Integer getCInvoiceID() {
		return cInvoiceID;
	}

	public void setCInvoiceID(Integer cInvoiceID) {
		this.cInvoiceID = cInvoiceID;
	}

	@Basic
	@Column(name="c_order_id", columnDefinition="INT")
	public Integer getCOrderID() {
		return cOrderID;
	}

	public void setCOrderID(Integer cOrderID) {
		this.cOrderID = cOrderID;
	}

	@Id
	@Column(name="c_payment_id", columnDefinition="INT")
	public Integer getCPaymentID() {
		return cPaymentID;
	}

	public void setCPaymentID(Integer cPaymentID) {
		this.cPaymentID = cPaymentID;
	}

	@Basic
	@Column(name="c_paymentbatch_id", columnDefinition="INT")
	public Integer getCPaymentbatchID() {
		return cPaymentbatchID;
	}

	public void setCPaymentbatchID(Integer cPaymentbatchID) {
		this.cPaymentbatchID = cPaymentbatchID;
	}

	@Basic
	@Column(name="charge_amt")
	public Integer getChargeAmt() {
		return chargeAmt;
	}

	public void setChargeAmt(Integer chargeAmt) {
		this.chargeAmt = chargeAmt;
	}

	@Basic
	@Column(name="check_no", length=20)
	public String getCheckNo() {
		return checkNo;
	}

	public void setCheckNo(String checkNo) {
		this.checkNo = checkNo;
	}

	@Basic
	@Column(nullable=false)
	public String getCreated() {
		return created;
	}

	public void setCreated(String created) {
		this.created = created;
	}

	@Basic
	@Column(name="created_by", columnDefinition="INT", nullable=false)
	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	@Basic
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Basic
	@Column(name="discount_amt")
	public Integer getDiscountAmt() {
		return discountAmt;
	}

	public void setDiscountAmt(Integer discountAmt) {
		this.discountAmt = discountAmt;
	}

	@Basic
	@Column(nullable=false, length=60)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Basic
	@Column(nullable=false)
	public Boolean isOnline() {
		return online;
	}

	public void setOnline(Boolean online) {
		this.online = online;
	}

	@Basic
	@Column(name="pay_amt", nullable=false)
	public Integer getPayAmt() {
		return payAmt;
	}

	public void setPayAmt(Integer payAmt) {
		this.payAmt = payAmt;
	}

	@Basic
	@Column(nullable=false)
	public Boolean isProcessed() {
		return processed;
	}

	public void setProcessed(Boolean processed) {
		this.processed = processed;
	}

	@Basic
	@Column(nullable=false)
	public Boolean isReceipt() {
		return receipt;
	}

	public void setReceipt(Boolean receipt) {
		this.receipt = receipt;
	}

	@Basic
	@Column(name="time_acct", columnDefinition="TIMESTAMP", nullable=false)
	public String getTimeAcct() {
		return timeAcct;
	}

	public void setTimeAcct(String timeAcct) {
		this.timeAcct = timeAcct;
	}

	@Basic
	public String getUpdated() {
		return updated;
	}

	public void setUpdated(String updated) {
		this.updated = updated;
	}

	@Basic
	@Column(name="updated_by", columnDefinition="INT")
	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	@Basic
	@Column(name="user1_id", columnDefinition="INT")
	public Integer getUser1ID() {
		return user1ID;
	}

	public void setUser1ID(Integer user1ID) {
		this.user1ID = user1ID;
	}

	@Basic
	@Column(name="user2_id", columnDefinition="INT")
	public Integer getUser2ID() {
		return user2ID;
	}

	public void setUser2ID(Integer user2ID) {
		this.user2ID = user2ID;
	}

	@Basic
	@Column(name="writeoff_amt")
	public Integer getWriteoffAmt() {
		return writeoffAmt;
	}

	public void setWriteoffAmt(Integer writeoffAmt) {
		this.writeoffAmt = writeoffAmt;
	}
}