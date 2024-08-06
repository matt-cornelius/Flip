import React from 'react';
import { removeAttendanceByUserAndEvent } from '../../Services/AttendanceService';
import { toggleEventPublic } from '../../Services/Event/EventService';
import 'bootstrap/dist/css/bootstrap.min.css';

const EventDetails = ({ event, user }) => {

  //Function to remove the event from your calendar
  const removeEvent = async () => {
    await removeAttendanceByUserAndEvent(user.id, event.id);
    alert("Event has been removed");
  };

  //Toggles the public value of the event (makes public, as it is only called for private events).
  const handleTogglePublic = async () => {
    await toggleEventPublic(event.id);
    alert(`Event is now public`);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">{event.title}</h2>
        <p className="card-text">{event.description}</p>
        <p className="card-text"><strong>Location:</strong> {event.location}</p>
        <p className="card-text"><strong>Start:</strong> {event.start.toLocaleString()}</p>
        <p className="card-text"><strong>End:</strong> {event.end.toLocaleString()}</p>
        <button className="btn btn-danger mr-2" onClick={removeEvent}>Remove From Calendar</button>
        {!event.public && (
          <button className="btn btn-success" onClick={handleTogglePublic}>Publish Event</button>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
