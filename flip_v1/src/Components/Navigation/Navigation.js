import React from "react";
import { Link } from "react-router-dom";
import '../../App.css'

const Navigation = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/Bet">
        <button>Make New Bet</button>
      </Link>
      <Link to="/Profile">
        <button>Profile</button>
      </Link>
    </div>
  );
};

export default Navigation;
