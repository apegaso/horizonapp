package com.ncr.project.horizon.service.mapper;

import com.ncr.project.horizon.domain.*;
import com.ncr.project.horizon.service.dto.OrganizationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Organization and its DTO OrganizationDTO.
 */
@Mapper(componentModel = "spring", uses = {BIComponentMapper.class})
public interface OrganizationMapper extends EntityMapper<OrganizationDTO, Organization> {

    @Mapping(source = "bIComponent.id", target = "bIComponentId")
    OrganizationDTO toDto(Organization organization);

    @Mapping(source = "bIComponentId", target = "bIComponent")
    Organization toEntity(OrganizationDTO organizationDTO);

    default Organization fromId(Long id) {
        if (id == null) {
            return null;
        }
        Organization organization = new Organization();
        organization.setId(id);
        return organization;
    }
}
