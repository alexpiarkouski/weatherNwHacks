package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.WeatherEvent;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface WeatherEventRepositoryWithBagRelationships {
    Optional<WeatherEvent> fetchBagRelationships(Optional<WeatherEvent> weatherEvent);

    List<WeatherEvent> fetchBagRelationships(List<WeatherEvent> weatherEvents);

    Page<WeatherEvent> fetchBagRelationships(Page<WeatherEvent> weatherEvents);
}
