import React, {Fragment} from 'react'
import { Route, BrowserRouter } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import ReviewSliderContainer from "./ReviewSliderContainer"

const App = (props) => {
  return (
    <Fragment>
      <BrowserRouter>
        <Route path="/" component={NavBar} />
      </BrowserRouter>
      <ReviewSliderContainer />
      <Footer />
    </Fragment>
  )
}

export default App