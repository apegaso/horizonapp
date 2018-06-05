package com.ncr.project.horizon.service.mapper;

import com.ncr.project.horizon.domain.*;
import com.ncr.project.horizon.service.dto.BIComponentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BIComponent and its DTO BIComponentDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BIComponentMapper extends EntityMapper<BIComponentDTO, BIComponent> {


    @Mapping(target = "organizations", ignore = true)
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
