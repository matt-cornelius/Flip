import React from "react";
import { Link } from "react-router-dom";
import './Navigation.css';

const Navigation = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/EventFeed">
        <button>Event Feed</button>
      </Link>
      <Link to="/Event">
        <button>Make New Event</button>
      </Link>
      <Link to="/Profile">
        <button>Profile</button>
      </Link>
    </div>
  );
};

export default Navigation;

