import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './event-area-segment.reducer';

export const EventAreaSegmentDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const eventAreaSegmentEntity = useAppSelector(state => state.eventAreaSegment.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="eventAreaSegmentDetailsHeading">Event Area Segment</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{eventAreaSegmentEntity.id}</dd>
          <dt>
            <span id="minLat">Min Lat</span>
          </dt>
          <dd>{eventAreaSegmentEntity.minLat}</dd>
          <dt>
            <span id="maxLat">Max Lat</span>
          </dt>
          <dd>{eventAreaSegmentEntity.maxLat}</dd>
          <dt>
            <span id="minLong">Min Long</span>
          </dt>
          <dd>{eventAreaSegmentEntity.minLong}</dd>
          <dt>
            <span id="maxLong">Max Long</span>
          </dt>
          <dd>{eventAreaSegmentEntity.maxLong}</dd>
          <dt>Weather Event</dt>
          <dd>{eventAreaSegmentEntity.weatherEvent ? eventAreaSegmentEntity.weatherEvent.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/event-area-segment" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/event-area-segment/${eventAreaSegmentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default EventAreaSegmentDetail;
