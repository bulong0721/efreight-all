package com.freight.model;

import javax.persistence.*;

import com.freight.common.EntityBase;

/**
 * Auto-generated by:
 * org.freight.AdempiereCustomizer
 */
@Entity
@Table(name="c_payment_processor")
public class CPaymentProcessor extends EntityBase {
	private static final long serialVersionUID = 1L;
	private Integer aDClientID;
	private Integer aDOrgID;
	private Boolean active;
	private String cCurrencyID;
	private Integer cPaymentProcessorID;
	private String created;
	private Integer createdBy;
	private String hostName;
	private String updated;
	private Integer updatedBy;

	public CPaymentProcessor() {
	}

	public CPaymentProcessor(Integer cPaymentProcessorID) {
		this.cPaymentProcessorID = cPaymentProcessorID;
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
	@Column(name="c_currency_id", length=45)
	public String getCCurrencyID() {
		return cCurrencyID;
	}

	public void setCCurrencyID(String cCurrencyID) {
		this.cCurrencyID = cCurrencyID;
	}

	@Id
	@Column(name="c_payment_processor_id", columnDefinition="INT")
	public Integer getCPaymentProcessorID() {
		return cPaymentProcessorID;
	}

	public void setCPaymentProcessorID(Integer cPaymentProcessorID) {
		this.cPaymentProcessorID = cPaymentProcessorID;
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
	@Column(name="host_name", length=45)
	public String getHostName() {
		return hostName;
	}

	public void setHostName(String hostName) {
		this.hostName = hostName;
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
}