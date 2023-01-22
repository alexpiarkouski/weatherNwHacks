import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEventAreaSegment } from 'app/shared/model/event-area-segment.model';
import { getEntities } from './event-area-segment.reducer';

export const EventAreaSegment = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const eventAreaSegmentList = useAppSelector(state => state.eventAreaSegment.entities);
  const loading = useAppSelector(state => state.eventAreaSegment.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="event-area-segment-heading" data-cy="EventAreaSegmentHeading">
        Event Area Segments
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/event-area-segment/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Event Area Segment
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {eventAreaSegmentList && eventAreaSegmentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Min Lat</th>
                <th>Max Lat</th>
                <th>Min Long</th>
                <th>Max Long</th>
                <th>Weather Event</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {eventAreaSegmentList.map((eventAreaSegment, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/event-area-segment/${eventAreaSegment.id}`} color="link" size="sm">
                      {eventAreaSegment.id}
                    </Button>
                  </td>
                  <td>{eventAreaSegment.minLat}</td>
                  <td>{eventAreaSegment.maxLat}</td>
                  <td>{eventAreaSegment.minLong}</td>
                  <td>{eventAreaSegment.maxLong}</td>
                  <td>
                    {eventAreaSegment.weatherEvent ? (
                      <Link to={`/weather-event/${eventAreaSegment.weatherEvent.id}`}>{eventAreaSegment.weatherEvent.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/event-area-segment/${eventAreaSegment.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/event-area-segment/${eventAreaSegment.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/event-area-segment/${eventAreaSegment.id}/delete`}
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
          !loading && <div className="alert alert-warning">No Event Area Segments found</div>
        )}
      </div>
    </div>
  );
};

export default EventAreaSegment;
