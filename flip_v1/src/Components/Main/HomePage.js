import React from "react";
import "../../App.css"; // Make sure to import the CSS file
import BetFeed from "../Feed/BetFeed";

const HomePage = () => {
  return (
    <div className="homepage">
      <h1 className="homepage-title">Welcome to Home Page</h1>
      <div className="homepage-content">
        <BetFeed />
      </div>
    </div>
  );
};

export default HomePage;
