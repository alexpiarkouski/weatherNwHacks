import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import WeatherEvent from './weather-event';
import WeatherEventDetail from './weather-event-detail';
import WeatherEventUpdate from './weather-event-update';
import WeatherEventDeleteDialog from './weather-event-delete-dialog';

const WeatherEventRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<WeatherEvent />} />
    <Route path="new" element={<WeatherEventUpdate />} />
    <Route path=":id">
      <Route index element={<WeatherEventDetail />} />
      <Route path="edit" element={<WeatherEventUpdate />} />
      <Route path="delete" element={<WeatherEventDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default WeatherEventRoutes;
