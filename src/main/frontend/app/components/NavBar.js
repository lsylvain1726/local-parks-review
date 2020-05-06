import React from 'react'
import { Route, Link, Switch, BrowserRouter, Redirect } from "react-router-dom";
import ReviewFormContainer from "./ReviewFormContainer"
import ListContainer from "./ListContainer"
import ParkShowContainer from "./ParkShowContainer"

const NavBar = () => {
  return(
    <BrowserRouter>

      <ul className="dropdown menu" data-dropdown-menu>
        <li><Link to="/review">Review</Link></li>
        <li><Link to="/parks">Parks</Link></li>
      </ul>

      <Switch>
        <Route exact path="/review" component={ReviewFormContainer} />
        <Route exact path="/parks" component={ListContainer} />
        <Route exact path="/:state/:id" component={ParkShowContainer} />
      </Switch>
     
    </BrowserRouter>
  )
}

export default NavBar