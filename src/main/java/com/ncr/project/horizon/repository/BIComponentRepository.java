package com.ncr.project.horizon.repository;

import com.ncr.project.horizon.domain.BIComponent;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BIComponent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BIComponentRepository extends JpaRepository<BIComponent, Long> {

}
