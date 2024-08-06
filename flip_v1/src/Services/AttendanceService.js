import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new attendance
export const createAttendance = (Attendee, Event) => {
  console.log("Creating a attendance");
  const Attendance = Parse.Object.extend("Attendance");
  const attendance = new Attendance();
  // using setter to UPDATE the object
  attendance.set("attendee", Attendee);
  attendance.set("event", Event);
  return attendance.save().then((result) => {
    // returns new attendance object
    return result;
  });
};

// READ operation - get attendances by event ID
export const getAttendanceByEvent = async (eventId) => {
  const Attendance = Parse.Object.extend("Attendance");
  const query = new Parse.Query(Attendance);
  query.equalTo("event", {
    __type: "Pointer",
    className: "Event",
    objectId: eventId,
  });
  query.include("attendee");
  const results = await query.find();
  console.log("results: ", results);
  return results;
};

// READ operation - get attendances by attendee ID
export const getAttendanceByAttendee = async (attendeeId) => {
  const Attendance = Parse.Object.extend("Attendance");
  const query = new Parse.Query(Attendance);
  query.equalTo("attendee", {
    __type: "Pointer",
    className: "_User",
    objectId: attendeeId,
  });
  query.include("event");
  const results = await query.find();
  console.log("results: ", results);
  return results;
};

// READ operation - get attendance by its own ID
export const getAttendanceById = async (id) => {
  const Attendance = Parse.Object.extend("Attendance");
  const query = new Parse.Query(Attendance);
  const result = await query.get(id);
  return result;
};

export let Attendances = {};
Attendances.collection = [];

// READ operation - get all attendances in Parse class attendance
export const getAllAttendances = async () => {
  const Attendance = Parse.Object.extend("Attendance");
  const query = new Parse.Query(Attendance);
  query.include("event");
  query.include("attendee");
  const results = await query.find();
  console.log("results: ", results);
  return results;
};

// DELETE operation - remove attendance by ID
export const removeAttendance = async (id) => {
  const Attendance = Parse.Object.extend("Attendance");
  const query = new Parse.Query(Attendance);
  const attendance = await query.get(id);
  attendance.destroy();
};

// DELETE operation - remove attendance by attendee ID and event ID
export const removeAttendanceByUserAndEvent = async (attendeeId, eventId) => {
  const Attendance = Parse.Object.extend("Attendance");
  const query = new Parse.Query(Attendance);
  query.equalTo("attendee", {
    __type: "Pointer",
    className: "_User",
    objectId: attendeeId,
  });
  query.equalTo("event", {
    __type: "Pointer",
    className: "Event",
    objectId: eventId,
  });
  const result = await query.first();
  if (result) {
    await result.destroy();
    console.log(`Attendance for attendee ${attendeeId} and event ${eventId} removed`);
  } else {
    console.log("No attendance found to remove");
  }
};
