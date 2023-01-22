import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Location from './location';
import WeatherEvent from './weather-event';
import EventAreaSegment from './event-area-segment';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="location/*" element={<Location />} />
        <Route path="weather-event/*" element={<WeatherEvent />} />
        <Route path="event-area-segment/*" element={<EventAreaSegment />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
