package com.ncr.project.horizon.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A BIComponent.
 */
@Entity
@Table(name = "bi_component")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BIComponent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "jhi_key", nullable = false)
    private String key;

    @Column(name = "auth")
    private String auth;

    @ManyToOne
    private Organization organization;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public BIComponent name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKey() {
        return key;
    }

    public BIComponent key(String key) {
        this.key = key;
        return this;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getAuth() {
        return auth;
    }

    public BIComponent auth(String auth) {
        this.auth = auth;
        return this;
    }

    public void setAuth(String auth) {
        this.auth = auth;
    }

    public Organization getOrganization() {
        return organization;
    }

    public BIComponent organization(Organization organization) {
        this.organization = organization;
        return this;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BIComponent bIComponent = (BIComponent) o;
        if (bIComponent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bIComponent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BIComponent{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", key='" + getKey() + "'" +
            ", auth='" + getAuth() + "'" +
            "}";
    }
}
