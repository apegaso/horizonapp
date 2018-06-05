package com.ncr.project.horizon.service;

import com.ncr.project.horizon.service.dto.BIComponentDTO;
import java.util.List;

/**
 * Service Interface for managing BIComponent.
 */
public interface BIComponentService {

    /**
     * Save a bIComponent.
     *
     * @param bIComponentDTO the entity to save
     * @return the persisted entity
     */
    BIComponentDTO save(BIComponentDTO bIComponentDTO);

    /**
     * Get all the bIComponents.
     *
     * @return the list of entities
     */
    List<BIComponentDTO> findAll();

    /**
     * Get the "id" bIComponent.
     *
     * @param id the id of the entity
     * @return the entity
     */
    BIComponentDTO findOne(Long id);

    /**
     * Delete the "id" bIComponent.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
