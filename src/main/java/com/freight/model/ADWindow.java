package com.freight.model;

import javax.persistence.*;

import com.freight.common.EntityBase;

/**
 * Auto-generated by:
 * org.freight.AdempiereCustomizer
 */
// @MappedSuperclass
@Entity
@Table(name = "ad_tab")
public class ADWindow extends EntityBase {
    private static final long serialVersionUID = 1L;
    private Integer           aDClientID;
    private Integer           aDOrgID;
    private Integer           aDTabID;
    private Integer           aDTableID;
    private Boolean           active;
    private String            commitWarning;
    private String            created;
    private Integer           createdBy;
    private String            description;
    private Boolean           infoTab;
    private String            name;
    private Integer           parentColumnID;
    private Boolean           readonly;
    private Boolean           singleRow;
    private String            updated;
    private Integer           updatedBy;

    public ADWindow() {
    }

    public ADWindow(Integer aDTabID) {
        this.aDTabID = aDTabID;
    }

    @Basic
    @Column(name = "ad_client_id", columnDefinition = "INT", nullable = false)
    public Integer getADClientID() {
        return aDClientID;
    }

    public void setADClientID(Integer aDClientID) {
        this.aDClientID = aDClientID;
    }

    @Basic
    @Column(name = "ad_org_id", columnDefinition = "INT", nullable = false)
    public Integer getADOrgID() {
        return aDOrgID;
    }

    public void setADOrgID(Integer aDOrgID) {
        this.aDOrgID = aDOrgID;
    }

    @Id
    @Column(name = "ad_tab_id", columnDefinition = "INT")
    @TableGenerator(name = "PkGen_105", table = "ad_sequence", pkColumnName = "name", pkColumnValue = "AD_Tab", valueColumnName = "currentnextsys", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "PkGen_105")
    public Integer getADTabID() {
        return aDTabID;
    }

    public void setADTabID(Integer aDTabID) {
        this.aDTabID = aDTabID;
    }

    @Basic
    @Column(name = "ad_table_id", columnDefinition = "INT", nullable = false)
    public Integer getADTableID() {
        return aDTableID;
    }

    public void setADTableID(Integer aDTableID) {
        this.aDTableID = aDTableID;
    }

    @Basic
    @Column(nullable = false)
    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    @Basic
    @Column(name = "commit_warning")
    public String getCommitWarning() {
        return commitWarning;
    }

    public void setCommitWarning(String commitWarning) {
        this.commitWarning = commitWarning;
    }

    @Basic
    @Column(nullable = false)
    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    @Basic
    @Column(name = "created_by", columnDefinition = "INT", nullable = false)
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
    @Column(name = "info_tab", nullable = false)
    public Boolean isInfoTab() {
        return infoTab;
    }

    public void setInfoTab(Boolean infoTab) {
        this.infoTab = infoTab;
    }

    @Basic
    @Column(nullable = false, length = 60)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "parent_column_id", columnDefinition = "INT")
    public Integer getParentColumnID() {
        return parentColumnID;
    }

    public void setParentColumnID(Integer parentColumnID) {
        this.parentColumnID = parentColumnID;
    }

    @Basic
    @Column(nullable = false)
    public Boolean isReadonly() {
        return readonly;
    }

    public void setReadonly(Boolean readonly) {
        this.readonly = readonly;
    }

    @Basic
    @Column(name = "single_row", nullable = false)
    public Boolean isSingleRow() {
        return singleRow;
    }

    public void setSingleRow(Boolean singleRow) {
        this.singleRow = singleRow;
    }

    @Basic
    public String getUpdated() {
        return updated;
    }

    public void setUpdated(String updated) {
        this.updated = updated;
    }

    @Basic
    @Column(name = "updated_by", columnDefinition = "INT")
    public Integer getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(Integer updatedBy) {
        this.updatedBy = updatedBy;
    }
}