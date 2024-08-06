import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../Services/UserService";
import { getAttendanceByAttendee } from "../../Services/AttendanceService";
import Navigation from "../Navigation/Navigation";
import UserCalendar from "./UserCalendar";
import EventDetails from "./EventDetails";
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  //Instiate the current user and associated events. The selectedEvent begins as null.
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      //Set user
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      //Set events by searching through attendances
      const attendances = await getAttendanceByAttendee(currentUser.id);
      const attendedEvents = attendances.map(attendance => {
        const event = attendance.get("event");
        return {
          id: event.id,
          title: event.get("title"),
          description: event.get("description"),
          location: event.get("location"),
          start: new Date(event.get("start")),
          end: new Date(event.get("end")),
          public: event.get("public"), // Ensure the public property is included
        };
      });
      setEvents(attendedEvents);
    };

    fetchProfileData();
  }, []);

  //Function to set the selectedEvent is instantiated here to be passed into the EventDetails component.
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  //Basic profile page, styled using Bootstrap
  return (
    <div className="container">
      <h1 className="text-center my-4">Profile</h1>
      {user && (
        <div className="row mb-4">
          <div className="col text-center">
            <h2>{user.get("firstName")} {user.get("lastName")}</h2>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-md-8">
          <UserCalendar events={events} onSelectEvent={handleEventSelect} />
        </div>
        <div className="col-md-4">
          {selectedEvent && <EventDetails event={selectedEvent} user={user} />}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Profile;
