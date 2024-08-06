import React from "react";

const AuthForm = ({ user, isLogin, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="auth-form" autoComplete="off">
      {!isLogin && (
        <div>
          <div className="form-group">
            <label>First Name</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="first-name-input"
              value={user.firstName}
              onChange={onChange}
              name="firstName"
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="last-name-input"
              value={user.lastName}
              onChange={onChange}
              name="lastName"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <br />
            <input
              type="email"
              className="form-control"
              id="email-input"
              value={user.email}
              onChange={onChange}
              name="email"
              required
            />
          </div>
          <div className="form-group">
            <label>Venmo Username</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="venmo-username-input"
              value={user.venmoUsername}
              onChange={onChange}
              name="venmoUsername"
              required
            />
          </div>
          <div className="form-group">
            <label>Birth Date</label>
            <br />
            <input
              type="date"
              className="form-control"
              id="birthdate-input"
              value={user.birthDate}
              onChange={onChange}
              name="birthDate"
              required
            />
          </div>
        </div>
      )}
      <div>
        <div className="form-group">
          <label>Username</label>
          <br />
          <input
            type="text"
            className="form-control"
            id="username-input"
            value={user.username}
            onChange={onChange}
            name="username"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <br />
          <input
            type="password"
            className="form-control"
            id="password-input"
            value={user.password}
            onChange={onChange}
            name="password"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
