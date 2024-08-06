import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new comment with text, an author, and an event
export const createComment = (Text, Author, Event) => {
  console.log("Creating a comment");
  const Comment = Parse.Object.extend("Comment");
  const comment = new Comment();
  // using setter to UPDATE the object
  comment.set("text", Text);
  comment.set("author", Author);
  comment.set("event", Event);
  return comment.save().then((result) => {
    // returns new comment object
    return result;
  });
};

// READ operation - get comments by event ID
export const getCommentsByEvent = async (eventId) => {
  const Comment = Parse.Object.extend("Comment");
  const query = new Parse.Query(Comment);
  query.equalTo("event", {
    __type: "Pointer",
    className: "Event",
    objectId: eventId,
  });
  const results = await query.find();
  console.log("results: ", results);
  return results;
};

// READ operation - get comment by ID
export const getCommentById = async (id) => {
  const Comment = Parse.Object.extend("Comment");
  const query = new Parse.Query(Comment);
  const result = await query.get(id);
  return result;
};

export let Comments = {};
Comments.collection = [];

// READ operation - get all comments in Parse class comment
export const getAllComments = async () => {
  const Comment = Parse.Object.extend("Comment");
  const query = new Parse.Query(Comment);
  const results = await query.find();
  console.log("results: ", results);
  return results;
};

// DELETE operation - remove comment by ID
export const removeComment = async (id) => {
  const Comment = Parse.Object.extend("Comment");
  const query = new Parse.Query(Comment);
  const comment = await query.get(id);
  comment.destroy();
};