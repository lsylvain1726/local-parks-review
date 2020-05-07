import React, { useState } from "react";
const VisitorFormContainer = () => {
  const defaultFormValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [visitor, setVisitor] = useState(defaultFormValue);
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
          console.log(response);
          clearForm()
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-icons">
          <h4>Register</h4>
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