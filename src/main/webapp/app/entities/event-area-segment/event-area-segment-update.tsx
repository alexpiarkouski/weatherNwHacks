import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IWeatherEvent } from 'app/shared/model/weather-event.model';
import { getEntities as getWeatherEvents } from 'app/entities/weather-event/weather-event.reducer';
import { IEventAreaSegment } from 'app/shared/model/event-area-segment.model';
import { getEntity, updateEntity, createEntity, reset } from './event-area-segment.reducer';

export const EventAreaSegmentUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const weatherEvents = useAppSelector(state => state.weatherEvent.entities);
  const eventAreaSegmentEntity = useAppSelector(state => state.eventAreaSegment.entity);
  const loading = useAppSelector(state => state.eventAreaSegment.loading);
  const updating = useAppSelector(state => state.eventAreaSegment.updating);
  const updateSuccess = useAppSelector(state => state.eventAreaSegment.updateSuccess);

  const handleClose = () => {
    navigate('/event-area-segment');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getWeatherEvents({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...eventAreaSegmentEntity,
      ...values,
      weatherEvent: weatherEvents.find(it => it.id.toString() === values.weatherEvent.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...eventAreaSegmentEntity,
          weatherEvent: eventAreaSegmentEntity?.weatherEvent?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="test8App.eventAreaSegment.home.createOrEditLabel" data-cy="EventAreaSegmentCreateUpdateHeading">
            Create or edit a Event Area Segment
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="event-area-segment-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Min Lat"
                id="event-area-segment-minLat"
                name="minLat"
                data-cy="minLat"
                type="text"
                validate={{
                  min: { value: 0, message: 'This field should be at least 0.' },
                  max: { value: 90, message: 'This field cannot be more than 90.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Max Lat"
                id="event-area-segment-maxLat"
                name="maxLat"
                data-cy="maxLat"
                type="text"
                validate={{
                  min: { value: 0, message: 'This field should be at least 0.' },
                  max: { value: 90, message: 'This field cannot be more than 90.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Min Long"
                id="event-area-segment-minLong"
                name="minLong"
                data-cy="minLong"
                type="text"
                validate={{
                  min: { value: 0, message: 'This field should be at least 0.' },
                  max: { value: 90, message: 'This field cannot be more than 90.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Max Long"
                id="event-area-segment-maxLong"
                name="maxLong"
                data-cy="maxLong"
                type="text"
                validate={{
                  min: { value: 0, message: 'This field should be at least 0.' },
                  max: { value: 90, message: 'This field cannot be more than 90.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                id="event-area-segment-weatherEvent"
                name="weatherEvent"
                data-cy="weatherEvent"
                label="Weather Event"
                type="select"
              >
                <option value="" key="0" />
                {weatherEvents
                  ? weatherEvents.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/event-area-segment" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default EventAreaSegmentUpdate;
