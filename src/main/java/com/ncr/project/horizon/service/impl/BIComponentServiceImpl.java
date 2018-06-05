package com.ncr.project.horizon.service.impl;

import com.ncr.project.horizon.service.BIComponentService;
import com.ncr.project.horizon.domain.BIComponent;
import com.ncr.project.horizon.repository.BIComponentRepository;
import com.ncr.project.horizon.service.dto.BIComponentDTO;
import com.ncr.project.horizon.service.mapper.BIComponentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing BIComponent.
 */
@Service
@Transactional
public class BIComponentServiceImpl implements BIComponentService {

    private final Logger log = LoggerFactory.getLogger(BIComponentServiceImpl.class);

    private final BIComponentRepository bIComponentRepository;

    private final BIComponentMapper bIComponentMapper;

    public BIComponentServiceImpl(BIComponentRepository bIComponentRepository, BIComponentMapper bIComponentMapper) {
        this.bIComponentRepository = bIComponentRepository;
        this.bIComponentMapper = bIComponentMapper;
    }

    /**
     * Save a bIComponent.
     *
     * @param bIComponentDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BIComponentDTO save(BIComponentDTO bIComponentDTO) {
        log.debug("Request to save BIComponent : {}", bIComponentDTO);
        BIComponent bIComponent = bIComponentMapper.toEntity(bIComponentDTO);
        bIComponent = bIComponentRepository.save(bIComponent);
        return bIComponentMapper.toDto(bIComponent);
    }

    /**
     * Get all the bIComponents.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<BIComponentDTO> findAll() {
        log.debug("Request to get all BIComponents");
        return bIComponentRepository.findAll().stream()
            .map(bIComponentMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one bIComponent by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BIComponentDTO findOne(Long id) {
        log.debug("Request to get BIComponent : {}", id);
        BIComponent bIComponent = bIComponentRepository.findOne(id);
        return bIComponentMapper.toDto(bIComponent);
    }

    /**
     * Delete the bIComponent by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BIComponent : {}", id);
        bIComponentRepository.delete(id);
    }
}
