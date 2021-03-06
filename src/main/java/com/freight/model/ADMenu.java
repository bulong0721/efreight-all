package com.freight.model;

import javax.persistence.*;

import com.freight.common.EntityBase;

/**
 * Auto-generated by:
 * org.freight.AdempiereCustomizer
 */
@Entity
@Table(name="ad_menu")
public class ADMenu extends EntityBase {
	private static final long serialVersionUID = 1L;
	private Integer aDClientID;
	private Integer aDOrgID;
	private String action;
	private Integer aDMenuID;
	private Integer adWindowId;
	private String created;
	private Integer createdby;
	private String description;
	private String formPrototype;
	private String image;
	private Boolean isactive;
	private String name;
	private Integer seqNo;
	private String updated;
	private Integer updatedby;
	private ADTree aDTree;

	public ADMenu() {
	}

	public ADMenu(Integer aDMenuID) {
		this.aDMenuID = aDMenuID;
	}

	@Basic
	@Column(name="AD_CLIENT_ID", columnDefinition="INT", nullable=false)
	public Integer getADClientID() {
		return aDClientID;
	}

	public void setADClientID(Integer aDClientID) {
		this.aDClientID = aDClientID;
	}

	@Basic
	@Column(name="AD_ORG_ID", columnDefinition="INT", nullable=false)
	public Integer getADOrgID() {
		return aDOrgID;
	}

	public void setADOrgID(Integer aDOrgID) {
		this.aDOrgID = aDOrgID;
	}

	@Basic
	@Column(length=1)
	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	@Id
	@Column(name="AD_MENU_ID", columnDefinition="INT")
	public Integer getADMenuID() {
		return aDMenuID;
	}

	public void setADMenuID(Integer aDMenuID) {
		this.aDMenuID = aDMenuID;
	}

	@Basic
	@Column(name="AD_WINDOW_ID", columnDefinition="INT")
	public Integer getAdWindowId() {
		return adWindowId;
	}

	public void setAdWindowId(Integer adWindowId) {
		this.adWindowId = adWindowId;
	}

	@Basic
	@Column(columnDefinition="TIMESTAMP", nullable=false)
	public String getCreated() {
		return created;
	}

	public void setCreated(String created) {
		this.created = created;
	}

	@Basic
	@Column(name ="created_by", columnDefinition="INT", nullable=false)
	public Integer getCreatedby() {
		return createdby;
	}

	public void setCreatedby(Integer createdby) {
		this.createdby = createdby;
	}

	@Basic
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Basic
	@Column(name="FORM_PROTOTYPE", length=60)
	public String getFormPrototype() {
		return formPrototype;
	}

	public void setFormPrototype(String formPrototype) {
		this.formPrototype = formPrototype;
	}

	@Basic
	@Column(length=60)
	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	@Basic
	@Column(nullable=false)
	public Boolean isIsactive() {
		return isactive;
	}

	public void setIsactive(Boolean isactive) {
		this.isactive = isactive;
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
	@Column(name="SEQ_NO", columnDefinition="INT", nullable=false)
	public Integer getSeqNo() {
		return seqNo;
	}

	public void setSeqNo(Integer seqNo) {
		this.seqNo = seqNo;
	}

	@Basic
	@Column(columnDefinition="TIMESTAMP", nullable=false)
	public String getUpdated() {
		return updated;
	}

	public void setUpdated(String updated) {
		this.updated = updated;
	}

	@Basic
	@Column(name ="updated_by", columnDefinition="INT", nullable=false)
	public Integer getUpdatedby() {
		return updatedby;
	}

	public void setUpdatedby(Integer updatedby) {
		this.updatedby = updatedby;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "AD_TREE_ID")
	public ADTree getTree() {
		return aDTree;
	}

	public void setTree (ADTree aDTree) {
		this.aDTree = aDTree;
	}
}