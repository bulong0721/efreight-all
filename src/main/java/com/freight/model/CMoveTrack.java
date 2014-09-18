package com.freight.model;

import javax.persistence.*;

import com.freight.common.EntityBase;

/**
 * Auto-generated by:
 * org.freight.AdempiereCustomizer
 */
@Entity
@Table(name="c_move_track")
public class CMoveTrack extends EntityBase {
	private static final long serialVersionUID = 1L;
	private Integer aDClientID;
	private Integer aDOrgID;
	private Boolean active;
	private Integer cMoveID;
	private Integer cMoveTrackID;
	private String comment;
	private String contactDriver;
	private String created;
	private Integer createdBy;
	private String expectNote;
	private String timePosition;
	private String updated;
	private Integer updatedBy;

	public CMoveTrack() {
	}

	public CMoveTrack(Integer cMoveTrackID) {
		this.cMoveTrackID = cMoveTrackID;
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
	@Column(name="c_move_id", columnDefinition="INT", nullable=false)
	public Integer getCMoveID() {
		return cMoveID;
	}

	public void setCMoveID(Integer cMoveID) {
		this.cMoveID = cMoveID;
	}

	@Id
	@Column(name="c_move_track_id", columnDefinition="INT")
	@TableGenerator(name = "PkGen_120", table = "ad_sequence", pkColumnName = "name", pkColumnValue = "C_Move_Track", valueColumnName = "currentnextsys", allocationSize = 1 )
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "PkGen_120")
	public Integer getCMoveTrackID() {
		return cMoveTrackID;
	}

	public void setCMoveTrackID(Integer cMoveTrackID) {
		this.cMoveTrackID = cMoveTrackID;
	}

	@Basic
	@Column(length=50)
	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	@Basic
	@Column(name="contact_driver", nullable=false, length=20)
	public String getContactDriver() {
		return contactDriver;
	}

	public void setContactDriver(String contactDriver) {
		this.contactDriver = contactDriver;
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
	@Column(name="expect_note", length=50)
	public String getExpectNote() {
		return expectNote;
	}

	public void setExpectNote(String expectNote) {
		this.expectNote = expectNote;
	}

	@Basic
	@Column(name="time_position", nullable=false)
	public String getTimePosition() {
		return timePosition;
	}

	public void setTimePosition(String timePosition) {
		this.timePosition = timePosition;
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