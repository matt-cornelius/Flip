import React, { useEffect, useState } from "react";
import { checkUser, createUser } from "../../Services/Auth/AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const AuthRegister = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    birthDate: "",
    venmoUsername: ""
  });

  const [add, setAdd] = useState(false);

  useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (newUser && add) {
      const userWithDate = { ...newUser, birthDate: new Date(newUser.birthDate) };

      createUser(userWithDate).then((userCreated) => {
        if (userCreated) {
          alert(`${userCreated.get("firstName")}, you successfully registered!`);
          navigate("/");
        }
        setAdd(false);
      });
    }
  }, [navigate, newUser, add]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setAdd(true);
  };

  return (
    <div>
      <AuthForm
        user={newUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
    </div>
  );
};

export default AuthRegister;
