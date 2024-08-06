import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkUser } from "../../Services/Auth/AuthService";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (checkUser()) {
      navigate("/HomePage");
    }
  }, [navigate]);

  return (
    <div className="landing-page">
      <h1 className="landing-title">Landing Page</h1>
      <div className="landing-buttons">
        <Link to="/auth/register">
          <button className="landing-button">Sign Up</button>
        </Link>
        <Link to="/auth/login">
          <button className="landing-button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
