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
 * A Location.
 */
@Entity
@Table(name = "location")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Location implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Min(value = 1000000000)
    @Max(value = 9999999999L)
    @Column(name = "phone")
    private Integer phone;

    @Column(name = "email")
    private String email;

    @Column(name = "address")
    private String address;

    @Min(value = 19700101)
    @Max(value = 21001231)
    @Column(name = "service_date")
    private Integer serviceDate;

    @Column(name = "service_type")
    private String serviceType;

    @DecimalMin(value = "0")
    @DecimalMax(value = "90")
    @Column(name = "latitude")
    private Double latitude;

    @DecimalMin(value = "0")
    @DecimalMax(value = "90")
    @Column(name = "longitude")
    private Double longitude;

    @ManyToOne
    private User user;

    @ManyToMany(mappedBy = "locations")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<WeatherEvent> weatherEvents = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Location id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Location name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return this.type;
    }

    public Location type(String type) {
        this.setType(type);
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getPhone() {
        return this.phone;
    }

    public Location phone(Integer phone) {
        this.setPhone(phone);
        return this;
    }

    public void setPhone(Integer phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return this.email;
    }

    public Location email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return this.address;
    }

    public Location address(String address) {
        this.setAddress(address);
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getServiceDate() {
        return this.serviceDate;
    }

    public Location serviceDate(Integer serviceDate) {
        this.setServiceDate(serviceDate);
        return this;
    }

    public void setServiceDate(Integer serviceDate) {
        this.serviceDate = serviceDate;
    }

    public String getServiceType() {
        return this.serviceType;
    }

    public Location serviceType(String serviceType) {
        this.setServiceType(serviceType);
        return this;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public Double getLatitude() {
        return this.latitude;
    }

    public Location latitude(Double latitude) {
        this.setLatitude(latitude);
        return this;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return this.longitude;
    }

    public Location longitude(Double longitude) {
        this.setLongitude(longitude);
        return this;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Location user(User user) {
        this.setUser(user);
        return this;
    }

    public Set<WeatherEvent> getWeatherEvents() {
        return this.weatherEvents;
    }

    public void setWeatherEvents(Set<WeatherEvent> weatherEvents) {
        if (this.weatherEvents != null) {
            this.weatherEvents.forEach(i -> i.removeLocation(this));
        }
        if (weatherEvents != null) {
            weatherEvents.forEach(i -> i.addLocation(this));
        }
        this.weatherEvents = weatherEvents;
    }

    public Location weatherEvents(Set<WeatherEvent> weatherEvents) {
        this.setWeatherEvents(weatherEvents);
        return this;
    }

    public Location addWeatherEvent(WeatherEvent weatherEvent) {
        this.weatherEvents.add(weatherEvent);
        weatherEvent.getLocations().add(this);
        return this;
    }

    public Location removeWeatherEvent(WeatherEvent weatherEvent) {
        this.weatherEvents.remove(weatherEvent);
        weatherEvent.getLocations().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Location)) {
            return false;
        }
        return id != null && id.equals(((Location) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Location{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", phone=" + getPhone() +
            ", email='" + getEmail() + "'" +
            ", address='" + getAddress() + "'" +
            ", serviceDate=" + getServiceDate() +
            ", serviceType='" + getServiceType() + "'" +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            "}";
    }
}
