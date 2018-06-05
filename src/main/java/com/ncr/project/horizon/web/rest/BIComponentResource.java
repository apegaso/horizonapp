package com.ncr.project.horizon.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ncr.project.horizon.service.BIComponentService;
import com.ncr.project.horizon.web.rest.errors.BadRequestAlertException;
import com.ncr.project.horizon.web.rest.util.HeaderUtil;
import com.ncr.project.horizon.service.dto.BIComponentDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BIComponent.
 */
@RestController
@RequestMapping("/api")
public class BIComponentResource {

    private final Logger log = LoggerFactory.getLogger(BIComponentResource.class);

    private static final String ENTITY_NAME = "bIComponent";

    private final BIComponentService bIComponentService;

    public BIComponentResource(BIComponentService bIComponentService) {
        this.bIComponentService = bIComponentService;
    }

    /**
     * POST  /bi-components : Create a new bIComponent.
     *
     * @param bIComponentDTO the bIComponentDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bIComponentDTO, or with status 400 (Bad Request) if the bIComponent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bi-components")
    @Timed
    public ResponseEntity<BIComponentDTO> createBIComponent(@Valid @RequestBody BIComponentDTO bIComponentDTO) throws URISyntaxException {
        log.debug("REST request to save BIComponent : {}", bIComponentDTO);
        if (bIComponentDTO.getId() != null) {
            throw new BadRequestAlertException("A new bIComponent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BIComponentDTO result = bIComponentService.save(bIComponentDTO);
        return ResponseEntity.created(new URI("/api/bi-components/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bi-components : Updates an existing bIComponent.
     *
     * @param bIComponentDTO the bIComponentDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bIComponentDTO,
     * or with status 400 (Bad Request) if the bIComponentDTO is not valid,
     * or with status 500 (Internal Server Error) if the bIComponentDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bi-components")
    @Timed
    public ResponseEntity<BIComponentDTO> updateBIComponent(@Valid @RequestBody BIComponentDTO bIComponentDTO) throws URISyntaxException {
        log.debug("REST request to update BIComponent : {}", bIComponentDTO);
        if (bIComponentDTO.getId() == null) {
            return createBIComponent(bIComponentDTO);
        }
        BIComponentDTO result = bIComponentService.save(bIComponentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bIComponentDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bi-components : get all the bIComponents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bIComponents in body
     */
    @GetMapping("/bi-components")
    @Timed
    public List<BIComponentDTO> getAllBIComponents() {
        log.debug("REST request to get all BIComponents");
        return bIComponentService.findAll();
        }

    /**
     * GET  /bi-components/:id : get the "id" bIComponent.
     *
     * @param id the id of the bIComponentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bIComponentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/bi-components/{id}")
    @Timed
    public ResponseEntity<BIComponentDTO> getBIComponent(@PathVariable Long id) {
        log.debug("REST request to get BIComponent : {}", id);
        BIComponentDTO bIComponentDTO = bIComponentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bIComponentDTO));
    }

    /**
     * DELETE  /bi-components/:id : delete the "id" bIComponent.
     *
     * @param id the id of the bIComponentDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bi-components/{id}")
    @Timed
    public ResponseEntity<Void> deleteBIComponent(@PathVariable Long id) {
        log.debug("REST request to delete BIComponent : {}", id);
        bIComponentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
