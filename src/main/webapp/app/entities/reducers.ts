import location from 'app/entities/location/location.reducer';
import weatherEvent from 'app/entities/weather-event/weather-event.reducer';
import eventAreaSegment from 'app/entities/event-area-segment/event-area-segment.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  location,
  weatherEvent,
  eventAreaSegment,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
