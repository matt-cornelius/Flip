// EventForm.js
import React from "react";

const EventForm = ({ event, onChange, onSubmit, handleImageChange }) => {
  const { title, description, location, startTime, endTime, public: isPublic, imageUrl } = event;

  const formatDateTimeLocal = (dateString) => {
    const date = new Date(dateString);
    const pad = (num) => (num < 10 ? '0' : '') + num;
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <div>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <br />
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={onChange}
            required
          />
        </div>
        <br />
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={onChange}
            required
          />
        </div>
        <br />
        <div>
          <label>Start Time</label>
          <input
            type="datetime-local"
            name="startTime"
            value={formatDateTimeLocal(startTime)}
            onChange={onChange}
            required
          />
        </div>
        <br />
        <div>
          <label>End Time</label>
          <input
            type="datetime-local"
            name="endTime"
            value={formatDateTimeLocal(endTime)}
            onChange={onChange}
            required
          />
        </div>
        <br />
        <div>
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imageUrl && <img src={imageUrl} alt="Event" style={{ width: "200px", marginTop: "10px" }} />}
        </div>
        <br />
        <div>
          <label>Make Public?</label>
          <input
            type="checkbox"
            name="public"
            checked={isPublic}
            onChange={(e) => onChange({ target: { name: e.target.name, value: e.target.checked } })}
          />
        </div>
        <br />
        <button type="submit">Save Changes</button>
      </div>
    </form>
  );
};

export default EventForm;
