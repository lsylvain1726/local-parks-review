import React from 'react'
import { Route, Link, Switch, BrowserRouter, Redirect } from "react-router-dom";
import VisitorFormContainer from "./VisitorFormContainer"
import ParkContainer from "./ParkContainer"
import ParkShowContainer from "./ParkShowContainer"
import StateContainer from "./StateContainer"
import ParksByStateContainer from "./ParksByStateContainer"
import Login from './Login';
const NavBar = () => {
  return(
    <BrowserRouter>
      <div className="wrapper-topbar">
        <div className="title-bar" data-responsive-toggle="responsive-menu" data-hide-for="large">
          <button className="menu-icon" type="button" data-toggle="responsive-menu"></button>
          <div className="title-bar-title">Menu</div>
        </div>
        <div className="top-bar">
          <div className="row">
            <div className="small-12 columns">
              <div className="top-bar-left">
                <Link to="/"><img src="https://local-parks.s3.us-east-2.amazonaws.com/ga-logo.jpg" alt="Park Review Logo"/></Link>
              </div>
              <div className="top-bar-right" id="responsive-menu">
              <ul className="dropdown menu" data-dropdown-menu>
                    <li><Link to="/parks">All Parks</Link></li>
                    <li>
                      <a href="#">Parks By State</a>
                      <ul className="menu vertical">
                        <li><Link to="/parks/Massachusetts">MA Parks</Link></li>
                        <li><Link to="/parks/New Hampshire">NH Parks</Link></li>
                        <li><Link to="/parks/Vermont">VT Parks</Link></li>
                      </ul>
                    </li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Switch>
        <Route exact path="/visitor" component={VisitorFormContainer} />
        <Route exact path="/parks" component={ParkContainer} />
        <Route exact path="/parks/:state/:id" component={ParkShowContainer} />
        <Route exact path="/parks/:state" component={ParksByStateContainer} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={VisitorFormContainer} />
        <Route exact path="/logout" component={StateContainer} />
        <Route exact path="/" component={StateContainer} />
      </Switch>
    </BrowserRouter>
  )
}
export default NavBar