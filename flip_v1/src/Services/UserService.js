import Parse from "parse";

//READ - calls the current user - perhaps this would go better in AuthServices?
export const getCurrentUser = async () => {
  const currentUser = Parse.User.current();
  if (!currentUser) {
    throw new Error("No user is currently logged in");
  }
  await currentUser.fetch();  // Fetch the latest data from the server
  return currentUser;
};
