package com.freight.model;

import javax.persistence.*;

import com.freight.common.EntityBase;

/**
 * Auto-generated by:
 * org.freight.AdempiereCustomizer
 */
@Entity
@Table(name="c_cash")
public class CCash extends EntityBase {
	private static final long serialVersionUID = 1L;
	private Integer aDClientID;
	private Integer aDOrgID;
	private Boolean active;
	private Boolean apprvoed;
	private Integer cCashID;
	private Integer cCashbookID;
	private String created;
	private Integer createdBy;
	private String dateAcct;
	private String description;
	private Integer endBalance;
	private String name;
	private Integer startBalance;
	private String updated;
	private Integer updatedBy;
	private Integer user1ID;
	private Integer user2ID;

	public CCash() {
	}

	public CCash(Integer cCashID) {
		this.cCashID = cCashID;
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
	public Boolean isApprvoed() {
		return apprvoed;
	}

	public void setApprvoed(Boolean apprvoed) {
		this.apprvoed = apprvoed;
	}

	@Id
	@Column(name="c_cash_id", columnDefinition="INT")
	public Integer getCCashID() {
		return cCashID;
	}

	public void setCCashID(Integer cCashID) {
		this.cCashID = cCashID;
	}

	@Basic
	@Column(name="c_cashbook_id", columnDefinition="INT", nullable=false)
	public Integer getCCashbookID() {
		return cCashbookID;
	}

	public void setCCashbookID(Integer cCashbookID) {
		this.cCashbookID = cCashbookID;
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
	@Column(name="date_acct", columnDefinition="TIMESTAMP", nullable=false)
	public String getDateAcct() {
		return dateAcct;
	}

	public void setDateAcct(String dateAcct) {
		this.dateAcct = dateAcct;
	}

	@Basic
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Basic
	@Column(name="end_balance", nullable=false)
	public Integer getEndBalance() {
		return endBalance;
	}

	public void setEndBalance(Integer endBalance) {
		this.endBalance = endBalance;
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
	@Column(name="start_balance", nullable=false)
	public Integer getStartBalance() {
		return startBalance;
	}

	public void setStartBalance(Integer startBalance) {
		this.startBalance = startBalance;
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
}