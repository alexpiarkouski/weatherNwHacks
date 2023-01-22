import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './location.reducer';

export const LocationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const locationEntity = useAppSelector(state => state.location.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="locationDetailsHeading">Location</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{locationEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{locationEntity.name}</dd>
          <dt>
            <span id="type">Type</span>
          </dt>
          <dd>{locationEntity.type}</dd>
          <dt>
            <span id="phone">Phone</span>
          </dt>
          <dd>{locationEntity.phone}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{locationEntity.email}</dd>
          <dt>
            <span id="address">Address</span>
          </dt>
          <dd>{locationEntity.address}</dd>
          <dt>
            <span id="serviceDate">Service Date</span>
          </dt>
          <dd>{locationEntity.serviceDate}</dd>
          <dt>
            <span id="serviceType">Service Type</span>
          </dt>
          <dd>{locationEntity.serviceType}</dd>
          <dt>
            <span id="latitude">Latitude</span>
          </dt>
          <dd>{locationEntity.latitude}</dd>
          <dt>
            <span id="longitude">Longitude</span>
          </dt>
          <dd>{locationEntity.longitude}</dd>
          <dt>User</dt>
          <dd>{locationEntity.user ? locationEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/location" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/location/${locationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default LocationDetail;
