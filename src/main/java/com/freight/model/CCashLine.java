package com.freight.model;

import javax.persistence.*;

import com.freight.common.EntityBase;

/**
 * Auto-generated by:
 * org.freight.AdempiereCustomizer
 */
@Entity
@Table(name="c_cash_line")
public class CCashLine extends EntityBase {
	private static final long serialVersionUID = 1L;
	private Integer aDClientID;
	private Integer aDOrgID;
	private Boolean active;
	private Integer amount;
	private Integer cCashID;
	private Integer cCashLineID;
	private Integer cChargeID;
	private Integer cCurrencyID;
	private Integer cInvoiceID;
	private Integer cPaymentID;
	private String cashType;
	private String created;
	private Integer createdBy;
	private String description;
	private Integer discountAmt;
	private String name;
	private Boolean processed;
	private String updated;
	private Integer updatedBy;
	private Integer writeoffAmt;

	public CCashLine() {
	}

	public CCashLine(Integer cCashLineID) {
		this.cCashLineID = cCashLineID;
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
	@Column(nullable=false)
	public Boolean isActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	@Basic
	@Column(nullable=false)
	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	@Basic
	@Column(name="c_cash_id", columnDefinition="INT", nullable=false)
	public Integer getCCashID() {
		return cCashID;
	}

	public void setCCashID(Integer cCashID) {
		this.cCashID = cCashID;
	}

	@Id
	@Column(name="c_cash_line_id", columnDefinition="INT")
	public Integer getCCashLineID() {
		return cCashLineID;
	}

	public void setCCashLineID(Integer cCashLineID) {
		this.cCashLineID = cCashLineID;
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
	@Column(name="c_payment_id", columnDefinition="INT")
	public Integer getCPaymentID() {
		return cPaymentID;
	}

	public void setCPaymentID(Integer cPaymentID) {
		this.cPaymentID = cPaymentID;
	}

	@Basic
	@Column(name="cash_type", nullable=false, length=1)
	public String getCashType() {
		return cashType;
	}

	public void setCashType(String cashType) {
		this.cashType = cashType;
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
	@Column(nullable=false, length=65)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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
	@Column(name="writeoff_amt")
	public Integer getWriteoffAmt() {
		return writeoffAmt;
	}

	public void setWriteoffAmt(Integer writeoffAmt) {
		this.writeoffAmt = writeoffAmt;
	}
}