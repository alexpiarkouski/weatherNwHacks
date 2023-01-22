package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A EventAreaSegment.
 */
@Entity
@Table(name = "event_area_segment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EventAreaSegment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @DecimalMin(value = "0")
    @DecimalMax(value = "90")
    @Column(name = "min_lat")
    private Double minLat;

    @DecimalMin(value = "0")
    @DecimalMax(value = "90")
    @Column(name = "max_lat")
    private Double maxLat;

    @DecimalMin(value = "0")
    @DecimalMax(value = "90")
    @Column(name = "min_long")
    private Double minLong;

    @DecimalMin(value = "0")
    @DecimalMax(value = "90")
    @Column(name = "max_long")
    private Double maxLong;

    @ManyToOne
    private WeatherEvent weatherEvent;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public EventAreaSegment id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getMinLat() {
        return this.minLat;
    }

    public EventAreaSegment minLat(Double minLat) {
        this.setMinLat(minLat);
        return this;
    }

    public void setMinLat(Double minLat) {
        this.minLat = minLat;
    }

    public Double getMaxLat() {
        return this.maxLat;
    }

    public EventAreaSegment maxLat(Double maxLat) {
        this.setMaxLat(maxLat);
        return this;
    }

    public void setMaxLat(Double maxLat) {
        this.maxLat = maxLat;
    }

    public Double getMinLong() {
        return this.minLong;
    }

    public EventAreaSegment minLong(Double minLong) {
        this.setMinLong(minLong);
        return this;
    }

    public void setMinLong(Double minLong) {
        this.minLong = minLong;
    }

    public Double getMaxLong() {
        return this.maxLong;
    }

    public EventAreaSegment maxLong(Double maxLong) {
        this.setMaxLong(maxLong);
        return this;
    }

    public void setMaxLong(Double maxLong) {
        this.maxLong = maxLong;
    }

    public WeatherEvent getWeatherEvent() {
        return this.weatherEvent;
    }

    public void setWeatherEvent(WeatherEvent weatherEvent) {
        this.weatherEvent = weatherEvent;
    }

    public EventAreaSegment weatherEvent(WeatherEvent weatherEvent) {
        this.setWeatherEvent(weatherEvent);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EventAreaSegment)) {
            return false;
        }
        return id != null && id.equals(((EventAreaSegment) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EventAreaSegment{" +
            "id=" + getId() +
            ", minLat=" + getMinLat() +
            ", maxLat=" + getMaxLat() +
            ", minLong=" + getMinLong() +
            ", maxLong=" + getMaxLong() +
            "}";
    }
}
