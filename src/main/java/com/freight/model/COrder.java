package com.freight.model;

import java.math.*;
import java.util.*;
import javax.persistence.*;

/**
 * Auto-generated by:
 * org.acuity.AcuityCustomizer
 */
@Entity
@Table(name="c_order")
public class COrder extends com.freight.common.EntityBase {
	private static final long serialVersionUID = 1L;
	private Boolean active;
	private String additional;
	private Integer cClientId;
	private Integer cOrderId;
	private Integer cOrgId;
	private BigDecimal chargeAdditional;
	private BigDecimal chargeDelivery;
	private BigDecimal chargeDock;
	private BigDecimal chargeInsurance;
	private BigDecimal chargePackage;
	private BigDecimal chargePickup;
	private BigDecimal chargeStore;
	private BigDecimal chargeTake;
	private String clerkUserId;
	private String comment;
	private String commentReceipt;
	private Integer consigneeBpartnerId;
	private Integer consignorBpartnerId;
	private BigDecimal costAdditional;
	private BigDecimal costClaim;
	private BigDecimal costCommission;
	private BigDecimal costPaidCommission;
	private Date created;
	private Integer createdby;
	private Date dateCommission;
	private Date dateInvoice;
	private Date dateOrdered;
	private Date datePromise;
	private Integer destinationOrgId;
	private BigDecimal insuranceLimit;
	private BigDecimal invoiceCharge;
	private Integer invoiceCopies;
	private String invoiceNo;
	private BigDecimal invoiceQuota;
	private String invoiceReceiptor;
	private Integer orderedOrgId;
	private BigDecimal paidConsignee;
	private BigDecimal paidConsignor;
	private BigDecimal paidMonthly;
	private BigDecimal paidReceipt;
	private Integer receiptCopies;
	private String salesrepUserId;
	private Integer shipperBpartnerId;
	private BigDecimal totalAmount;
	private BigDecimal totalVolume;
	private BigDecimal totalWeight;
	private Date updated;
	private Integer updatedby;

	public COrder() {
	}

	public COrder(Integer cOrderId) {
		this.cOrderId = cOrderId;
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
	@Column(length=20)
	public String getAdditional() {
		return additional;
	}

	public void setAdditional(String additional) {
		this.additional = additional;
	}

	@Basic
	@Column(name="c_client_id", columnDefinition="INT", nullable=false)
	public Integer getCClientId() {
		return cClientId;
	}

	public void setCClientId(Integer cClientId) {
		this.cClientId = cClientId;
	}

	@Id
	@Column(name="c_order_id", columnDefinition="INT")
	@TableGenerator(name = "PkGen_112", table = "c_sequence", pkColumnName = "name", pkColumnValue = "C_Order", valueColumnName = "currentnextsys", allocationSize = 1 )
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "PkGen_112")
	public Integer getCOrderId() {
		return cOrderId;
	}

	public void setCOrderId(Integer cOrderId) {
		this.cOrderId = cOrderId;
	}

	@Basic
	@Column(name="c_org_id", columnDefinition="INT", nullable=false)
	public Integer getCOrgId() {
		return cOrgId;
	}

	public void setCOrgId(Integer cOrgId) {
		this.cOrgId = cOrgId;
	}

	@Basic
	@Column(name="charge_additional")
	public BigDecimal getChargeAdditional() {
		return chargeAdditional;
	}

	public void setChargeAdditional(BigDecimal chargeAdditional) {
		this.chargeAdditional = chargeAdditional;
	}

	@Basic
	@Column(name="charge_delivery")
	public BigDecimal getChargeDelivery() {
		return chargeDelivery;
	}

	public void setChargeDelivery(BigDecimal chargeDelivery) {
		this.chargeDelivery = chargeDelivery;
	}

	@Basic
	@Column(name="charge_dock")
	public BigDecimal getChargeDock() {
		return chargeDock;
	}

	public void setChargeDock(BigDecimal chargeDock) {
		this.chargeDock = chargeDock;
	}

	@Basic
	@Column(name="charge_insurance")
	public BigDecimal getChargeInsurance() {
		return chargeInsurance;
	}

	public void setChargeInsurance(BigDecimal chargeInsurance) {
		this.chargeInsurance = chargeInsurance;
	}

	@Basic
	@Column(name="charge_package")
	public BigDecimal getChargePackage() {
		return chargePackage;
	}

	public void setChargePackage(BigDecimal chargePackage) {
		this.chargePackage = chargePackage;
	}

	@Basic
	@Column(name="charge_pickup")
	public BigDecimal getChargePickup() {
		return chargePickup;
	}

	public void setChargePickup(BigDecimal chargePickup) {
		this.chargePickup = chargePickup;
	}

	@Basic
	@Column(name="charge_store")
	public BigDecimal getChargeStore() {
		return chargeStore;
	}

	public void setChargeStore(BigDecimal chargeStore) {
		this.chargeStore = chargeStore;
	}

	@Basic
	@Column(name="charge_take")
	public BigDecimal getChargeTake() {
		return chargeTake;
	}

	public void setChargeTake(BigDecimal chargeTake) {
		this.chargeTake = chargeTake;
	}

	@Basic
	@Column(name="clerk_user_id", length=20)
	public String getClerkUserId() {
		return clerkUserId;
	}

	public void setClerkUserId(String clerkUserId) {
		this.clerkUserId = clerkUserId;
	}

	@Basic
	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	@Basic
	@Column(name="comment_receipt", length=80)
	public String getCommentReceipt() {
		return commentReceipt;
	}

	public void setCommentReceipt(String commentReceipt) {
		this.commentReceipt = commentReceipt;
	}

	@Basic
	@Column(name="consignee_bpartner_id", columnDefinition="INT", nullable=false)
	public Integer getConsigneeBpartnerId() {
		return consigneeBpartnerId;
	}

	public void setConsigneeBpartnerId(Integer consigneeBpartnerId) {
		this.consigneeBpartnerId = consigneeBpartnerId;
	}

	@Basic
	@Column(name="consignor_bpartner_id", columnDefinition="INT", nullable=false)
	public Integer getConsignorBpartnerId() {
		return consignorBpartnerId;
	}

	public void setConsignorBpartnerId(Integer consignorBpartnerId) {
		this.consignorBpartnerId = consignorBpartnerId;
	}

	@Basic
	@Column(name="cost_additional")
	public BigDecimal getCostAdditional() {
		return costAdditional;
	}

	public void setCostAdditional(BigDecimal costAdditional) {
		this.costAdditional = costAdditional;
	}

	@Basic
	@Column(name="cost_claim")
	public BigDecimal getCostClaim() {
		return costClaim;
	}

	public void setCostClaim(BigDecimal costClaim) {
		this.costClaim = costClaim;
	}

	@Basic
	@Column(name="cost_commission")
	public BigDecimal getCostCommission() {
		return costCommission;
	}

	public void setCostCommission(BigDecimal costCommission) {
		this.costCommission = costCommission;
	}

	@Basic
	@Column(name="cost_paid_commission")
	public BigDecimal getCostPaidCommission() {
		return costPaidCommission;
	}

	public void setCostPaidCommission(BigDecimal costPaidCommission) {
		this.costPaidCommission = costPaidCommission;
	}

	@Basic
	@Column(nullable=false)
	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	@Basic
	@Column(columnDefinition="INT", nullable=false)
	public Integer getCreatedby() {
		return createdby;
	}

	public void setCreatedby(Integer createdby) {
		this.createdby = createdby;
	}

	@Basic
	@Column(name="date_commission")
	public Date getDateCommission() {
		return dateCommission;
	}

	public void setDateCommission(Date dateCommission) {
		this.dateCommission = dateCommission;
	}

	@Basic
	@Column(name="date_invoice")
	public Date getDateInvoice() {
		return dateInvoice;
	}

	public void setDateInvoice(Date dateInvoice) {
		this.dateInvoice = dateInvoice;
	}

	@Basic
	@Column(name="date_ordered", nullable=false)
	public Date getDateOrdered() {
		return dateOrdered;
	}

	public void setDateOrdered(Date dateOrdered) {
		this.dateOrdered = dateOrdered;
	}

	@Basic
	@Column(name="date_promise", nullable=false)
	public Date getDatePromise() {
		return datePromise;
	}

	public void setDatePromise(Date datePromise) {
		this.datePromise = datePromise;
	}

	@Basic
	@Column(name="destination_org_id", columnDefinition="INT", nullable=false)
	public Integer getDestinationOrgId() {
		return destinationOrgId;
	}

	public void setDestinationOrgId(Integer destinationOrgId) {
		this.destinationOrgId = destinationOrgId;
	}

	@Basic
	@Column(name="insurance_limit")
	public BigDecimal getInsuranceLimit() {
		return insuranceLimit;
	}

	public void setInsuranceLimit(BigDecimal insuranceLimit) {
		this.insuranceLimit = insuranceLimit;
	}

	@Basic
	@Column(name="invoice_charge")
	public BigDecimal getInvoiceCharge() {
		return invoiceCharge;
	}

	public void setInvoiceCharge(BigDecimal invoiceCharge) {
		this.invoiceCharge = invoiceCharge;
	}

	@Basic
	@Column(name="invoice_copies", columnDefinition="INT")
	public Integer getInvoiceCopies() {
		return invoiceCopies;
	}

	public void setInvoiceCopies(Integer invoiceCopies) {
		this.invoiceCopies = invoiceCopies;
	}

	@Basic
	@Column(name="invoice_no", length=20)
	public String getInvoiceNo() {
		return invoiceNo;
	}

	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}

	@Basic
	@Column(name="invoice_quota")
	public BigDecimal getInvoiceQuota() {
		return invoiceQuota;
	}

	public void setInvoiceQuota(BigDecimal invoiceQuota) {
		this.invoiceQuota = invoiceQuota;
	}

	@Basic
	@Column(name="invoice_receiptor", length=10)
	public String getInvoiceReceiptor() {
		return invoiceReceiptor;
	}

	public void setInvoiceReceiptor(String invoiceReceiptor) {
		this.invoiceReceiptor = invoiceReceiptor;
	}

	@Basic
	@Column(name="ordered_org_id", columnDefinition="INT", nullable=false)
	public Integer getOrderedOrgId() {
		return orderedOrgId;
	}

	public void setOrderedOrgId(Integer orderedOrgId) {
		this.orderedOrgId = orderedOrgId;
	}

	@Basic
	@Column(name="paid_consignee")
	public BigDecimal getPaidConsignee() {
		return paidConsignee;
	}

	public void setPaidConsignee(BigDecimal paidConsignee) {
		this.paidConsignee = paidConsignee;
	}

	@Basic
	@Column(name="paid_consignor")
	public BigDecimal getPaidConsignor() {
		return paidConsignor;
	}

	public void setPaidConsignor(BigDecimal paidConsignor) {
		this.paidConsignor = paidConsignor;
	}

	@Basic
	@Column(name="paid_monthly")
	public BigDecimal getPaidMonthly() {
		return paidMonthly;
	}

	public void setPaidMonthly(BigDecimal paidMonthly) {
		this.paidMonthly = paidMonthly;
	}

	@Basic
	@Column(name="paid_receipt")
	public BigDecimal getPaidReceipt() {
		return paidReceipt;
	}

	public void setPaidReceipt(BigDecimal paidReceipt) {
		this.paidReceipt = paidReceipt;
	}

	@Basic
	@Column(name="receipt_copies", columnDefinition="INT")
	public Integer getReceiptCopies() {
		return receiptCopies;
	}

	public void setReceiptCopies(Integer receiptCopies) {
		this.receiptCopies = receiptCopies;
	}

	@Basic
	@Column(name="salesrep_user_id", length=20)
	public String getSalesrepUserId() {
		return salesrepUserId;
	}

	public void setSalesrepUserId(String salesrepUserId) {
		this.salesrepUserId = salesrepUserId;
	}

	@Basic
	@Column(name="shipper_bpartner_id", columnDefinition="INT")
	public Integer getShipperBpartnerId() {
		return shipperBpartnerId;
	}

	public void setShipperBpartnerId(Integer shipperBpartnerId) {
		this.shipperBpartnerId = shipperBpartnerId;
	}

	@Basic
	@Column(name="total_amount", nullable=false)
	public BigDecimal getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}

	@Basic
	@Column(name="total_volume", nullable=false)
	public BigDecimal getTotalVolume() {
		return totalVolume;
	}

	public void setTotalVolume(BigDecimal totalVolume) {
		this.totalVolume = totalVolume;
	}

	@Basic
	@Column(name="total_weight", nullable=false)
	public BigDecimal getTotalWeight() {
		return totalWeight;
	}

	public void setTotalWeight(BigDecimal totalWeight) {
		this.totalWeight = totalWeight;
	}

	@Basic
	public Date getUpdated() {
		return updated;
	}

	public void setUpdated(Date updated) {
		this.updated = updated;
	}

	@Basic
	@Column(columnDefinition="INT")
	public Integer getUpdatedby() {
		return updatedby;
	}

	public void setUpdatedby(Integer updatedby) {
		this.updatedby = updatedby;
	}
}