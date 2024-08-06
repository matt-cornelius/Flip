import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, changeEventContents } from "../../Services/Event/EventService";
import EventForm from "./EventForm";

const EditEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    getEventById(eventId).then((event) => {
      setEvent({
        title: event.get("title"),
        description: event.get("description"),
        location: event.get("location"),
        startTime: event.get("start").toISOString().slice(0, 16), // format for input type="datetime-local"
        endTime: event.get("end").toISOString().slice(0, 16),   // format for input type="datetime-local"
        public: event.get("public"),
        imageUrl: event.get("image") ? event.get("image").url() : null,
      });
    });
  }, [eventId]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const startTime = new Date(event.startTime);
    const endTime = new Date(event.endTime);

    await changeEventContents(eventId, event.title, event.description, event.location, startTime, endTime, event.public);
    navigate("/event-feed");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Handle the image file as needed, such as uploading it and getting a URL
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  return event ? (
    <EventForm
      event={event}
      onChange={handleChange}
      onSubmit={handleEditSubmit}
      handleImageChange={handleImageChange}
    />
  ) : (
    <p>Loading...</p>
  );
};

export default EditEvent;
