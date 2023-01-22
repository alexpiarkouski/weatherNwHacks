package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.WeatherEvent;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the WeatherEvent entity.
 *
 * When extending this class, extend WeatherEventRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface WeatherEventRepository extends WeatherEventRepositoryWithBagRelationships, JpaRepository<WeatherEvent, Long> {
    @Query("select weatherEvent from WeatherEvent weatherEvent where weatherEvent.user.login = ?#{principal.username}")
    List<WeatherEvent> findByUserIsCurrentUser();

    default Optional<WeatherEvent> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findOneWithToOneRelationships(id));
    }

    default List<WeatherEvent> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships());
    }

    default Page<WeatherEvent> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships(pageable));
    }

    @Query(
        value = "select distinct weatherEvent from WeatherEvent weatherEvent left join fetch weatherEvent.user",
        countQuery = "select count(distinct weatherEvent) from WeatherEvent weatherEvent"
    )
    Page<WeatherEvent> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct weatherEvent from WeatherEvent weatherEvent left join fetch weatherEvent.user")
    List<WeatherEvent> findAllWithToOneRelationships();

    @Query("select weatherEvent from WeatherEvent weatherEvent left join fetch weatherEvent.user where weatherEvent.id =:id")
    Optional<WeatherEvent> findOneWithToOneRelationships(@Param("id") Long id);
}
