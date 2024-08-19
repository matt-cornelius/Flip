import Parse from "parse";

// CREATE operation - new bet with a title, description, location, author, start, and end
export const createBet = (Title, Description, Location, Author, Start, End, Public) => {
  console.log("Creating: ", Title);
  const Bet = Parse.Object.extend("Bet");
  const bet = new Bet();
  bet.set("title", Title);
  bet.set("description", Description);
  bet.set("location", Location);
  bet.set("author", Author);
  bet.set("start", Start);
  bet.set("end", End);
  bet.set("public", Public);
  return bet.save().then((result) => {
    return result;
  });
};

// READ operation - get bet by ID
export const getBetById = async (id) => {
  const Bet = Parse.Object.extend("Bet");
  const query = new Parse.Query(Bet);
  const result = await query.get(id);
  return result;
};

// READ operation - get all public bets
export const getPublicBets = async () => {
  const Bet = Parse.Object.extend("Bet");
  const query = new Parse.Query(Bet);
  query.equalTo("public", true); // Filter bets with "public" property set to true
  const results = await query.find();
  return results;
};

// READ operation - get all private bets that belong to the user
export const getPrivateBets = async () => {
  const Bet = Parse.Object.extend("Bet");
  const query = new Parse.Query(Bet);
  query.equalTo("public", false); // Filter bets with "public" property set to false
  query.equalTo("author", Parse.User.current());
  const results = await query.find();
  return results;
};

// READ operation - get all bets in Parse class bet
export const getAllBets = async () => {
  const Bet = Parse.Object.extend("Bet");
  const query = new Parse.Query(Bet);
  query.include("author");  // Include the pointer to the author
  const results = await query.find();
  return results;
};

// UPDATE operation - change the contents of the bet by ID
export const changeBetContents = async (id, Title, Description, Location, Start, End, Public) => {
  const Bet = Parse.Object.extend("Bet");
  const query = new Parse.Query(Bet);
  const bet = await query.get(id);
  bet.set("title", Title);
  bet.set("description", Description);
  bet.set("location", Location);
  bet.set("start", Start);
  bet.set("end", End);
  bet.set("public", Public);
  const result = await bet.save();
  return result;
};

// DELETE operation - remove bet by ID
export const removeBet = async (id) => {
  const Bet = Parse.Object.extend("Bet");
  const query = new Parse.Query(Bet);
  const bet = await query.get(id);
  bet.destroy();
};

// UPDATE operation - toggle the public property of a bet
export const toggleBetPublic = async (betId) => {
  const Bet = Parse.Object.extend("Bet");
  const query = new Parse.Query(Bet);
  const bet = await query.get(betId);
  bet.set("public", !bet.get("public"));
  await bet.save();
  console.log(`Bet ${betId} public property toggled to ${bet.get("public")}`);
};
