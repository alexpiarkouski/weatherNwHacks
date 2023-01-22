package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A WeatherEvent.
 */
@Entity
@Table(name = "weather_event")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WeatherEvent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "event_type")
    private String eventType;

    @Min(value = 19700101)
    @Max(value = 21001231)
    @Column(name = "event_date")
    private Integer eventDate;

    @OneToMany(mappedBy = "weatherEvent")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<EventAreaSegment> eventAreaSegments = new HashSet<>();

    @ManyToOne
    private User user;

    @ManyToMany
    @JoinTable(
        name = "rel_weather_event__location",
        joinColumns = @JoinColumn(name = "weather_event_id"),
        inverseJoinColumns = @JoinColumn(name = "location_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Location> locations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public WeatherEvent id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEventType() {
        return this.eventType;
    }

    public WeatherEvent eventType(String eventType) {
        this.setEventType(eventType);
        return this;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public Integer getEventDate() {
        return this.eventDate;
    }

    public WeatherEvent eventDate(Integer eventDate) {
        this.setEventDate(eventDate);
        return this;
    }

    public void setEventDate(Integer eventDate) {
        this.eventDate = eventDate;
    }

    public Set<EventAreaSegment> getEventAreaSegments() {
        return this.eventAreaSegments;
    }

    public void setEventAreaSegments(Set<EventAreaSegment> eventAreaSegments) {
        if (this.eventAreaSegments != null) {
            this.eventAreaSegments.forEach(i -> i.setWeatherEvent(null));
        }
        if (eventAreaSegments != null) {
            eventAreaSegments.forEach(i -> i.setWeatherEvent(this));
        }
        this.eventAreaSegments = eventAreaSegments;
    }

    public WeatherEvent eventAreaSegments(Set<EventAreaSegment> eventAreaSegments) {
        this.setEventAreaSegments(eventAreaSegments);
        return this;
    }

    public WeatherEvent addEventAreaSegment(EventAreaSegment eventAreaSegment) {
        this.eventAreaSegments.add(eventAreaSegment);
        eventAreaSegment.setWeatherEvent(this);
        return this;
    }

    public WeatherEvent removeEventAreaSegment(EventAreaSegment eventAreaSegment) {
        this.eventAreaSegments.remove(eventAreaSegment);
        eventAreaSegment.setWeatherEvent(null);
        return this;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public WeatherEvent user(User user) {
        this.setUser(user);
        return this;
    }

    public Set<Location> getLocations() {
        return this.locations;
    }

    public void setLocations(Set<Location> locations) {
        this.locations = locations;
    }

    public WeatherEvent locations() {
        this.setLocations();
        return this;
    }

    private void setLocations() {
        Set<Location> userLocations = user.getLocations();
        Set<Location> locations = new HashSet<>();
        for (Location location : userLocations) {
            for (EventAreaSegment segment : eventAreaSegments) {
                if (compareLat(location, segment) && compareLong(location, segment)) {
                    locations.add(location);
                }
            }
        }
    }

    private boolean compareLong(Location location, EventAreaSegment segment) {
        return (location.getLongitude() >= segment.getMinLong()) && (location.getLongitude() <= segment.getMaxLong());
    }

    private boolean compareLat(Location location, EventAreaSegment segment) {
        return (location.getLatitude() >= segment.getMinLat()) && (location.getLongitude() <= segment.getMaxLat());
    }

    public WeatherEvent locations(Set<Location> locations) {
        this.setLocations(locations);
        return this;
    }

    public WeatherEvent addLocation(Location location) {
        this.locations.add(location);
        location.getWeatherEvents().add(this);
        return this;
    }

    public WeatherEvent removeLocation(Location location) {
        this.locations.remove(location);
        location.getWeatherEvents().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WeatherEvent)) {
            return false;
        }
        return id != null && id.equals(((WeatherEvent) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WeatherEvent{" +
            "id=" + getId() +
            ", eventType='" + getEventType() + "'" +
            ", eventDate=" + getEventDate() +
            "}";
    }
}
