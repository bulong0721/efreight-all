package com.freight.model;

import java.math.*;
import java.util.*;
import javax.persistence.*;

/**
 * Auto-generated by:
 * org.acuity.AcuityCustomizer
 */
@Entity
@Table(name="c_inout_line")
public class CInoutLine extends com.freight.common.EntityBase {
	private static final long serialVersionUID = 1L;
	private Boolean active;
	private Integer cClientId;
	private Integer cInoutId;
	private Integer cInoutLineId;
	private Integer cOrderLineId;
	private Integer cOrgId;
	private BigDecimal confirmedQty;
	private Date created;
	private Integer createdby;
	private BigDecimal moveQty;
	private BigDecimal pickQty;
	private BigDecimal scrappedQty;
	private BigDecimal targetQty;
	private Date updated;
	private Integer updatedby;

	public CInoutLine() {
	}

	public CInoutLine(Integer cInoutLineId) {
		this.cInoutLineId = cInoutLineId;
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
	@Column(name="c_client_id", columnDefinition="INT", nullable=false)
	public Integer getCClientId() {
		return cClientId;
	}

	public void setCClientId(Integer cClientId) {
		this.cClientId = cClientId;
	}

	@Basic
	@Column(name="c_inout_id", columnDefinition="INT", nullable=false)
	public Integer getCInoutId() {
		return cInoutId;
	}

	public void setCInoutId(Integer cInoutId) {
		this.cInoutId = cInoutId;
	}

	@Id
	@Column(name="c_inout_line_id", columnDefinition="INT")
	@TableGenerator(name = "PkGen_107", table = "c_sequence", pkColumnName = "name", pkColumnValue = "C_Inout_Line", valueColumnName = "currentnextsys", allocationSize = 1 )
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "PkGen_107")
	public Integer getCInoutLineId() {
		return cInoutLineId;
	}

	public void setCInoutLineId(Integer cInoutLineId) {
		this.cInoutLineId = cInoutLineId;
	}

	@Basic
	@Column(name="c_order_line_id", columnDefinition="INT", nullable=false)
	public Integer getCOrderLineId() {
		return cOrderLineId;
	}

	public void setCOrderLineId(Integer cOrderLineId) {
		this.cOrderLineId = cOrderLineId;
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
	@Column(name="confirmed_qty")
	public BigDecimal getConfirmedQty() {
		return confirmedQty;
	}

	public void setConfirmedQty(BigDecimal confirmedQty) {
		this.confirmedQty = confirmedQty;
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
	@Column(name="move_qty", nullable=false)
	public BigDecimal getMoveQty() {
		return moveQty;
	}

	public void setMoveQty(BigDecimal moveQty) {
		this.moveQty = moveQty;
	}

	@Basic
	@Column(name="pick_qty")
	public BigDecimal getPickQty() {
		return pickQty;
	}

	public void setPickQty(BigDecimal pickQty) {
		this.pickQty = pickQty;
	}

	@Basic
	@Column(name="scrapped_qty")
	public BigDecimal getScrappedQty() {
		return scrappedQty;
	}

	public void setScrappedQty(BigDecimal scrappedQty) {
		this.scrappedQty = scrappedQty;
	}

	@Basic
	@Column(name="target_qty")
	public BigDecimal getTargetQty() {
		return targetQty;
	}

	public void setTargetQty(BigDecimal targetQty) {
		this.targetQty = targetQty;
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