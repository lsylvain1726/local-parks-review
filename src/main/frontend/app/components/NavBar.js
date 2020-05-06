import React from 'react'
import { Route, Link, Switch, BrowserRouter, Redirect } from "react-router-dom";
import ReviewFormContainer from "./ReviewFormContainer"
import ParkContainer from "./ParkContainer"
import ParkShowContainer from "./ParkShowContainer"

const NavBar = () => {
  return(
    <BrowserRouter>
      <h1>Test</h1>
      <ul className="dropdown menu" data-dropdown-menu>
        <li><Link to="/review">Review</Link></li>
        <li><Link to="/parks">Parks</Link></li>
      </ul>

      <Switch>
        <Route exact path="/review" component={ReviewFormContainer} />
        <Route exact path="/parks" component={ParkContainer} />
        <Route exact path="/:state/:id" component={ParkShowContainer} />
      </Switch>
     
    </BrowserRouter>
  )
}

export default NavBar