import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './weather-event.reducer';

export const WeatherEventDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const weatherEventEntity = useAppSelector(state => state.weatherEvent.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="weatherEventDetailsHeading">Weather Event</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{weatherEventEntity.id}</dd>
          <dt>
            <span id="eventType">Event Type</span>
          </dt>
          <dd>{weatherEventEntity.eventType}</dd>
          <dt>
            <span id="eventDate">Event Date</span>
          </dt>
          <dd>{weatherEventEntity.eventDate}</dd>
          <dt>User</dt>
          <dd>{weatherEventEntity.user ? weatherEventEntity.user.login : ''}</dd>
          <dt>Location</dt>
          <dd>
            {weatherEventEntity.locations
              ? weatherEventEntity.locations.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {weatherEventEntity.locations && i === weatherEventEntity.locations.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/weather-event" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/weather-event/${weatherEventEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default WeatherEventDetail;
