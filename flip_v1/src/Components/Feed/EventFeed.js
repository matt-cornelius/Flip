import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import { getPublicEvents, removeEvent } from "../../Services/Event/EventService";
import { getCommentsByEvent, removeComment, getAllComments } from '../../Services/CommentService';
import { getAttendanceByEvent, removeAttendanceByUserAndEvent, getAllAttendances, createAttendance } from "../../Services/AttendanceService";
import { getUser, logOut } from "../../Services/Auth/AuthService"; // Ensure AuthService is correctly imported
import SwipeCard from '../SwipeCard/SwipeCard'; // Import SwipeCard component
import '../../App.css'; // Import the updated CSS file

const EventFeed = () => {
  const [events, setEvents] = useState([]);
  const [comments, setComments] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [userAttendances, setUserAttendances] = useState({});
  const navigate = useNavigate(); // Initialize navigate
  const [currentUser, setCurrentUser] = useState(null); // Use state for currentUser

  const fetchEvents = async () => {
    const events = await getPublicEvents();
    console.log("Fetched events:", events);
    setEvents(events);
  };

  useEffect(() => {
    try {
      const user = getUser();
      setCurrentUser(user);
      fetchEvents();

      getAllComments().then((comments) => {
        console.log("Fetched comments:", comments);
        setComments(comments);
      });

      getAllAttendances().then((attendances) => {
        console.log("Fetched attendances:", attendances);
        setAttendances(attendances);
        // Initialize userAttendances
        const userAttendances = {};
        attendances.forEach(attendance => {
          if (attendance.get("attendee").id === user.id) {
            const eventId = attendance.get("event").id;
            if (!userAttendances[eventId]) {
              userAttendances[eventId] = [];
            }
            userAttendances[eventId].push(attendance);
          }
        });
        setUserAttendances(userAttendances);
      });
    } catch (error) {
      console.error("Error fetching user or events:", error);
      if (error.message === "No user is currently logged in.") {
        // Redirect to login page
        navigate("/login");
      } else if (error.message.includes("Invalid session token")) {
        // Log out and redirect to login
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleDelete = async (id) => {
    const eventComments = await getCommentsByEvent(id);
    const eventAttendances = await getAttendanceByEvent(id);

    for (const comment of eventComments) {
      await removeComment(comment.id);
    }

    for (const attendance of eventAttendances) {
      await removeAttendanceByUserAndEvent(attendance.get("attendee").id, id);
    }

    await removeEvent(id);
    fetchEvents(); // Fetch updated events after deletion
  };

  const handleEdit = (id) => {
    navigate(`/edit-event/${id}`);
  };

  const handleRSVP = async (event) => {
    try {
      await createAttendance(currentUser, event);
      alert("You have successfully RSVP'd to the event!");

      // Update userAttendances
      setUserAttendances(prev => {
        const updated = { ...prev };
        if (!updated[event.id]) {
          updated[event.id] = [];
        }
        updated[event.id].push({
          id: `temp-${Date.now()}`,
          get: (field) => currentUser[field]
        });
        return updated;
      });

      // Refresh attendances
      const newAttendances = await getAttendanceByEvent(event.id);
      setAttendances(prev => [
        ...prev.filter(att => att.get("event").id !== event.id),
        ...newAttendances
      ]);

    } catch (error) {
      console.error("Error RSVPing:", error);
      alert("Failed to RSVP. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="event-feed-container">
      <div className="event-feed">
        <h1>Event Feed</h1>
        <ul>
          {events.map((event) => {
            console.log("Rendering event:", event);
            return (
              <li key={event.id} className="event">
                <div className="swipe-card">
                  <SwipeCard event={event} onSwipeRight={handleRSVP} /> {/* Use SwipeCard component */}
                </div>
                <h2>{event.get("title")}</h2>
                <p>{event.get("description")}</p>
                <p>Location: {event.get("location")}</p>
                <p>Start: {formatDate(event.get("start"))}</p>
                <p>End: {formatDate(event.get("end"))}</p>
                <p>Author: {event.get("author").get("firstName")} {event.get("author").get("lastName")}</p>
                <ul className="attendees">
                  <h4>Attendees:</h4>
                  {attendances.filter(attendance => attendance.get("event").id === event.id).map((attendance) => {
                    const attendee = attendance.get("attendee");
                    return attendee ? (
                      <li key={attendance.id}>
                        <p>{attendee.get("firstName")} {attendee.get("lastName")}</p>
                      </li>
                    ) : null;
                  })}
                  {userAttendances[event.id]?.map((attendance) => {
                    const { attendee } = attendance;
                    return attendee ? (
                      <li key={attendance.id}>
                        <p>{attendee.get("firstName")} {attendee.get("lastName")}</p>
                      </li>
                    ) : null;
                  })}
                </ul>
                <div className="comments">
                  <br />
                  <h4>Comments:</h4>
                  <ul>
                    {comments.filter(comment => comment.get("event").id === event.id).map((comment) => (
                      <li key={comment.id}>
                        <p>{comment.get("text")}</p>
                        <p>Author: {comment.get("author").get("firstName")} {comment.get("author").get("lastName")}</p>
                      </li>
                    ))}
                  </ul>
                  <hr />
                </div>
                {event.get("author").id === currentUser.id && (
                  <div className="buttons">
                    <button onClick={() => handleEdit(event.id)}>Edit</button>
                    <button onClick={() => handleDelete(event.id)}>Delete</button>
                  </div>
                )}
                <button onClick={() => handleRSVP(event)}>RSVP</button>
              </li>
            );
          })}
        </ul>
      </div>
      <Navigation />
    </div>
  );
};

export default EventFeed;
