import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import EventAreaSegment from './event-area-segment';
import EventAreaSegmentDetail from './event-area-segment-detail';
import EventAreaSegmentUpdate from './event-area-segment-update';
import EventAreaSegmentDeleteDialog from './event-area-segment-delete-dialog';

const EventAreaSegmentRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<EventAreaSegment />} />
    <Route path="new" element={<EventAreaSegmentUpdate />} />
    <Route path=":id">
      <Route index element={<EventAreaSegmentDetail />} />
      <Route path="edit" element={<EventAreaSegmentUpdate />} />
      <Route path="delete" element={<EventAreaSegmentDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default EventAreaSegmentRoutes;
