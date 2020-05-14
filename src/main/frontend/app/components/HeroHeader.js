import React from "react"

const HeroHeader = (props) => {
  return (
      <div className="hero-header">
        <div className="hero-img">
          <img src="https://local-parks.s3.us-east-2.amazonaws.com/hero-pexels-615348.jpg" alt="Hero Image" />
        </div>
        <div className="hero-caption">
          <h2>Find A Park Today!</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
      </div>
  )
}

export default HeroHeader