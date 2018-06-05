package com.ncr.project.horizon.service.mapper;

import com.ncr.project.horizon.domain.*;
import com.ncr.project.horizon.service.dto.BIComponentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BIComponent and its DTO BIComponentDTO.
 */
@Mapper(componentModel = "spring", uses = {OrganizationMapper.class})
public interface BIComponentMapper extends EntityMapper<BIComponentDTO, BIComponent> {

    @Mapping(source = "organization.id", target = "organizationId")
    BIComponentDTO toDto(BIComponent bIComponent);

    @Mapping(source = "organizationId", target = "organization")
    BIComponent toEntity(BIComponentDTO bIComponentDTO);

    default BIComponent fromId(Long id) {
        if (id == null) {
            return null;
        }
        BIComponent bIComponent = new BIComponent();
        bIComponent.setId(id);
        return bIComponent;
    }
}
