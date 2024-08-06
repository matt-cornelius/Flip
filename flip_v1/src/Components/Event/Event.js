import React, { useState } from "react";
import Navigation from "../Navigation/Navigation";
import Parse from "parse";
import { useNavigate } from "react-router-dom";
import EventForm from "./EventForm";
import { createAttendance } from "../../Services/AttendanceService";

const Event = () => {
    const navigate = useNavigate();
    const [newEvent, setNewEvent] = useState({
        title: "",
        description: "",
        location: "",
        startTime: "",
        endTime: "",
        author: "",
        attendees: [],
        comments: [],
        image: null,
        imageUrl: "", // Add imageUrl to state
        public: false // Checkbox is unchecked by default
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewEvent({
            ...newEvent,
            image: file,
            imageUrl: URL.createObjectURL(file) // Set the image URL for preview
        });
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setNewEvent({
            ...newEvent,
            [name]: value
        });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log("Form submitted!");

        const Event = Parse.Object.extend("Event");
        const event = new Event();

        event.set("title", newEvent.title);
        event.set("description", newEvent.description);
        event.set("location", newEvent.location);
        event.set("start", new Date(newEvent.startTime));
        event.set("end", new Date(newEvent.endTime));
        event.set("author", Parse.User.current());
        event.set("comments", newEvent.comments);
        event.set("public", newEvent.public); // Set 'public' field

        // The user who submits the form is automatically added as an attendee
        createAttendance(Parse.User.current(), event);

        if (newEvent.image) {
            const parseFile = new Parse.File(newEvent.image.name, newEvent.image);
            await parseFile.save();
            event.set("image", parseFile);
        }

        console.log("Event to save:", event);

        try {
            await event.save();
            alert("Event created successfully!");
            navigate("/event-feed"); // Redirect to the event feed
        } catch (error) {
            console.error("Error while creating event: ", error);
        }
    };

    return (
        <div>
            <EventForm
                event={newEvent}
                onChange={onChangeHandler}
                onSubmit={onSubmitHandler}
                handleImageChange={handleImageChange} // Add handleImageChange to props
            />
            <Navigation />
        </div>
    );
};

export default Event;
