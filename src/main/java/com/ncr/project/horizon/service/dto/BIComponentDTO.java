package com.ncr.project.horizon.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the BIComponent entity.
 */
public class BIComponentDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String key;

    private String auth;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getAuth() {
        return auth;
    }

    public void setAuth(String auth) {
        this.auth = auth;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BIComponentDTO bIComponentDTO = (BIComponentDTO) o;
        if(bIComponentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bIComponentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BIComponentDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", key='" + getKey() + "'" +
            ", auth='" + getAuth() + "'" +
            "}";
    }
}
