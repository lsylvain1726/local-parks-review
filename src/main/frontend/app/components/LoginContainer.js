import React, { useEffect, useState } from "react";
import Login from "./Login"
import { Link } from "react-router-dom";

const LoginContainer = () => {
    const [loginForm, setLoginForm] = useState(null)
    const [visitor, setVisitor] = useState(null);

  useEffect(() => {
    fetch("/api/v1/visitors/isLoggedIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.email == "anonymousUser") {
            setLoginForm(
            <Login />
          );
        } else {
          setLoginForm(
            <div className="callout text-center">
              <Link className="button alert large" to="/logout">Log Out</Link>
            </div>
          );
          setVisitor(data.email);
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, [visitor]);

  return <div>
      { loginForm }
  </div>;
};

export default LoginContainer;
