package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.WeatherEvent;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class WeatherEventRepositoryWithBagRelationshipsImpl implements WeatherEventRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<WeatherEvent> fetchBagRelationships(Optional<WeatherEvent> weatherEvent) {
        return weatherEvent.map(this::fetchLocations);
    }

    @Override
    public Page<WeatherEvent> fetchBagRelationships(Page<WeatherEvent> weatherEvents) {
        return new PageImpl<>(
            fetchBagRelationships(weatherEvents.getContent()),
            weatherEvents.getPageable(),
            weatherEvents.getTotalElements()
        );
    }

    @Override
    public List<WeatherEvent> fetchBagRelationships(List<WeatherEvent> weatherEvents) {
        return Optional.of(weatherEvents).map(this::fetchLocations).orElse(Collections.emptyList());
    }

    WeatherEvent fetchLocations(WeatherEvent result) {
        return entityManager
            .createQuery(
                "select weatherEvent from WeatherEvent weatherEvent left join fetch weatherEvent.locations where weatherEvent is :weatherEvent",
                WeatherEvent.class
            )
            .setParameter("weatherEvent", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<WeatherEvent> fetchLocations(List<WeatherEvent> weatherEvents) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, weatherEvents.size()).forEach(index -> order.put(weatherEvents.get(index).getId(), index));
        List<WeatherEvent> result = entityManager
            .createQuery(
                "select distinct weatherEvent from WeatherEvent weatherEvent left join fetch weatherEvent.locations where weatherEvent in :weatherEvents",
                WeatherEvent.class
            )
            .setParameter("weatherEvents", weatherEvents)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
