import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../../Services/Auth/AuthService";
import Navigation from "../Navigation/Navigation";

const AuthModule = () => {

  //alertShown is used to debug an issue where the alert appeared twice on activation
  const navigate = useNavigate();
  const alertShown = useRef(false);

  // Users who are already logged in will be redirected back home
  useEffect(() => {
    if (checkUser() && !alertShown.current) {
      alert("You are already logged in");
      navigate("/HomePage");
      alertShown.current = true;
    }
  }, [navigate]);

  return (
    <div>
      <h2>This is the Auth module</h2>
      <br />
      <Link to="/auth/register">
        <button>Register</button>
      </Link>
      <br />
      <br />
      <Link to="/auth/login">
        <button>Login</button>
      </Link>
      <br />
      <br />
      <Navigation />
    </div>
  );
};

export default AuthModule;
