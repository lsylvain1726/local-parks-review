import React, { useState } from "react";
const VisitorFormContainer = () => {
  const defaultFormValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [visitor, setVisitor] = useState(defaultFormValue);
  const [msg, setMsg] = useState("");

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

  const clearForm = () => {
      setVisitor(defaultFormValue)
  }

  const submitForm = () => {
    fetch("/api/v1/visitors", {
      method: "POST",
      body: JSON.stringify(visitor),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          console.log(response.json().data);
          clearForm()
        } else {
          throw new Error(`${response.status} (${response.statusText})`);
        }
      })
      .then((data) => {
        if (data.id === null) {
          setVisitor(data);
          setMsg(
            <div className="callout alert">
              Email already exists, please choose another one!
            </div>
          );
        } else {
          clearForm();
          setMsg(<div className="callout success">Visitor saved!</div>);
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-icons">
          <h4>Register</h4>
          {msg}
          <div className="input-group">
            <span className="input-group-label">
              <i className="fa fa-user"></i>
            </span>
            <input
              className="input-group-field"
              type="text"
              id="firstName"
              name="firstName"
              value={visitor.firstName}
              onChange={handleInputChange}
              placeholder="First name"
              required
            />
          </div>
          <div className="input-group">
            <span className="input-group-label">
              <i className="fa fa-user-o"></i>
            </span>
            <input
              className="input-group-field"
              type="text"
              id="lastName"
              name="lastName"
              value={visitor.lastName}
              onChange={handleInputChange}
              placeholder="Last name"
              required
            />
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
        <button className="button expanded">Sign Up</button>
      </form>
    </div>
  );
};
export default VisitorFormContainer;