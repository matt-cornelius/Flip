import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new event with a title, description, location, author, start, and end
export const createEvent = (Title, Description, Location, Author, Start, End, Public) => {
  console.log("Creating: ", Title);
  const Event = Parse.Object.extend("Event");
  const event = new Event();
  // using setter to UPDATE the object
  event.set("title", Title);
  event.set("description", Description);
  event.set("location", Location);
  event.set("author", Author);
  event.set("start", Start);
  event.set("end", End);
  event.set("public", Public);
  return event.save().then((result) => {
    // returns new event object
    return result;
  });
};

// READ operation - get event by ID
export const getEventById = async (id) => {
  const Event = Parse.Object.extend("Event");
  const query = new Parse.Query(Event);
  const result = await query.get(id);
  return result;
};

// READ operation - get all public events
export const getPublicEvents = async () => {
  const Event = Parse.Object.extend("Event");
  const query = new Parse.Query(Event);
  query.equalTo("public", true); // Filter events with "public" property set to true
  const results = await query.find();
  return results;
};

// READ operation - get all private events that belong to the user
export const getPrivateEvents = async () => {
  const Event = Parse.Object.extend("Event");
  const query = new Parse.Query(Event);
  query.equalTo("public", false); // Filter events with "public" property set to false
  query.equalTo("author", Parse.User.current());
  const results = await query.find();
  return results;
};

export let Events = {};
Events.collection = [];

// READ operation - get all events in Parse class event
export const getAllEvents = async () => {
  const Event = Parse.Object.extend("Event");
  const query = new Parse.Query(Event);
  query.include("author");  // Include the pointer to the author
  const results = await query.find();
  return results;
};

// UPDATE operation - change the contents of the event by ID
export const changeEventContents = async (id, Title, Description, Location, Start, End, Public) => {
  const Event = Parse.Object.extend("Event");
  const query = new Parse.Query(Event);
  const event = await query.get(id);
  event.set("title", Title);
  event.set("description", Description);
  event.set("location", Location);
  event.set("start", Start);
  event.set("end", End);
  event.set("public", Public);
  const result = await event.save();
  return result;
};

// DELETE operation - remove event by ID
export const removeEvent = async (id) => {
  const Event = Parse.Object.extend("Event");
  const query = new Parse.Query(Event);
  const event = await query.get(id);
  event.destroy();
};

// UPDATE operation - toggle the public property of an event
export const toggleEventPublic = async (eventId) => {
  const Event = Parse.Object.extend("Event");
  const query = new Parse.Query(Event);
  const event = await query.get(eventId);
  event.set("public", !event.get("public"));
  await event.save();
  console.log(`Event ${eventId} public property toggled to ${event.get("public")}`);
};