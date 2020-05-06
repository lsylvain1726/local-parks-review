import React from 'react'
import { Route, Link, Switch, BrowserRouter, Redirect } from "react-router-dom";
import ReviewFormContainer from "./ReviewFormContainer"

const NavBar = (props) => {
  return(
    <BrowserRouter>
      <h1>Test</h1>
      <ul className="dropdown menu" data-dropdown-menu>
        <li><Link to="/review">Review</Link></li>
      </ul>

      <Switch>
        <Route exact path="/review" component={ReviewFormContainer} />
      </Switch>
     
    </BrowserRouter>
  )
}

export default NavBar