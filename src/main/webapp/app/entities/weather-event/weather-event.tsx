import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IWeatherEvent } from 'app/shared/model/weather-event.model';
import { getEntities } from './weather-event.reducer';

export const WeatherEvent = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const weatherEventList = useAppSelector(state => state.weatherEvent.entities);
  const loading = useAppSelector(state => state.weatherEvent.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="weather-event-heading" data-cy="WeatherEventHeading">
        Weather Events
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/weather-event/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Weather Event
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {weatherEventList && weatherEventList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Event Type</th>
                <th>Event Date</th>
                <th>User</th>
                <th>Location</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {weatherEventList.map((weatherEvent, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/weather-event/${weatherEvent.id}`} color="link" size="sm">
                      {weatherEvent.id}
                    </Button>
                  </td>
                  <td>{weatherEvent.eventType}</td>
                  <td>{weatherEvent.eventDate}</td>
                  <td>{weatherEvent.user ? weatherEvent.user.login : ''}</td>
                  <td>
                    {weatherEvent.locations
                      ? weatherEvent.locations.map((val, j) => (
                          <span key={j}>
                            <Link to={`/location/${val.id}`}>{val.id}</Link>
                            {j === weatherEvent.locations.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/weather-event/${weatherEvent.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/weather-event/${weatherEvent.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/weather-event/${weatherEvent.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Weather Events found</div>
        )}
      </div>
    </div>
  );
};

export default WeatherEvent;
