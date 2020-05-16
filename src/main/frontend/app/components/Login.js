import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Login = (props) => {
  const defaultFormValue = {
    email: "",
    password: "",
  };
  const [visitor, setVisitor] = useState(defaultFormValue);
  const [message, setMessage] = useState(null);
  const handleInputChange = (event) => {
    setVisitor({
      ...visitor,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    submitForm();
  };
  const submitForm = () => {
    fetch("api/v1/visitors/login", {
      method: "POST",
      body: JSON.stringify(visitor),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.id) {
          setMessage(
            <div className="callout success">You have been logged in.</div>
          );
        } else {
          setMessage(
            <div className="callout alert">Wrong email or password.</div>
          );
        }
        setVisitor(defaultFormValue)
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  return (
    <div className="row">
      <div className="small-9 small-centered columns">
        <form className="log-in-form" onSubmit={handleSubmit}>
          <div className="form-icons">
            <h4 className="text-center wrapper-state-title">
              Log in with your email
            </h4>
            <div className="input-group">
              <h3>{message}</h3>
            </div>
            <div className="input-group">
              <span className="input-group-label">
                <i className="fa fa-envelope"></i>
              </span>
              <input
                className="input-group-field"
                type="text"
                id="email"
                name="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="someone@domain.com(opens in new tab)"
                value={visitor.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="input-group">
              <span className="input-group-label">
                <i className="fa fa-key"></i>
              </span>
              <input
                className="input-group-field"
                type="password"
                id="password"
                name="password"
                value={visitor.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
            </div>
          </div>
          <button className="button expanded">Sign In</button>
          <div className="input-group">
            <h4 className="text-center">
              <Link to="/signup">Create an account</Link>
            </h4>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
