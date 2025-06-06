import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
// Import the components that we want to route between
import AuthModule from "./Auth/Auth.js";
import AuthRegister from "./Auth/AuthRegister";
import AuthLogin from "./Auth/AuthLogin";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.js";
import HomePage from "./Main/HomePage.js";
import EventFeed from "./Feed/EventFeed.js";
import EditEvent from "./Event/EditEvent.js"
import Profile from "./Profile/Profile.js";
import Event from "./Event/Event.js";
import LandingPage from "./Main/LandingPage.js";
import Bet from "./Bet/Bet.js";
import BetFeed from "./Feed/BetFeed.js";
import AcceptBetForm from "./Bet/AcceptBetForm.js";
import EditBet from "./Bet/EditBet.js";

// Routes are enumerated below, with two routes being protected.
export default function Components() {
  return (
    <Router>
      <Routes>
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthModule />} />
        <Route path="/auth/register" element={<AuthRegister />} />
        <Route path="/auth/login" element={<AuthLogin />} />
        <Route
          path="/HomePage"
          element={<ProtectedRoute path="/HomePage" element={HomePage} />}
        />
        <Route
          path="/EventFeed"
          element={<ProtectedRoute path="/EventFeed" element={EventFeed} />}
        />
        <Route
          path="/BetFeed"
          element={<ProtectedRoute path="/BetFeed" element={BetFeed} />}
        />
        <Route
          path="/Profile"
          element={<ProtectedRoute path="/Profile" element={Profile} />}
        />
        <Route
          path="/Event"
          element={<ProtectedRoute path="/Event" element={Event} />}
        />
        <Route
          path="/Bet"
          element={<ProtectedRoute path="/Bet" element={Bet} />}
        />
        <Route
          path="/accept-bet"
          element={<ProtectedRoute path="/AcceptBet" element={AcceptBetForm} />}
        />
        <Route
          path="/edit-event/:eventId"
          element={<ProtectedRoute path="/edit-event/:eventId" element={EditEvent} />}
        />
        <Route 
          path="/edit-bet/:betId" 
          element={<ProtectedRoute element={<EditBet />} />}
        />
        
        <Route path="*" element={<Navigate to="/LandingPage" replace />} />
      </Routes>
    </Router>
  );
}
