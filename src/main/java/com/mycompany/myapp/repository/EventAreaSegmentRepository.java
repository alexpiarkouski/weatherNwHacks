package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.EventAreaSegment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the EventAreaSegment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventAreaSegmentRepository extends JpaRepository<EventAreaSegment, Long> {}
