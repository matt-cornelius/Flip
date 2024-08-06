import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//localizer is used to properly display date and time data
const localizer = momentLocalizer(moment);

const UserCalendar = ({ events, onSelectEvent }) => {

  //Pass the function into onSelectEvent
  const handleSelectEvent = (event) => {
    onSelectEvent(event);
  };

  //Pass appropriate props into the Calendar component imported from react-big-calendar
  return (
    <div className="card mb-4">
      <div className="card-body">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={handleSelectEvent}
        />
      </div>
    </div>
  );
};

export default UserCalendar;
