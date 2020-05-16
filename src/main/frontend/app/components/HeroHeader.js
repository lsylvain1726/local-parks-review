import React from "react"

const HeroHeader = (props) => {
  return (
      <div className="hero-header">
        <div className="hero-img">
          <img src="https://local-parks.s3.us-east-2.amazonaws.com/hero-pexels-615348.jpg" alt="Hero Image" />
        </div>
        <div className="hero-caption">
          <h2>Find A Park Today!</h2>
            <p>For an America longing for the outdoors after many weeks of being home during the coronavirus outbreak, national parks may seem like an ideal escape.</p>
            <p>National parks are undeniably awesome, but they often overshadow the equally great and way more accessible and numerous state parks. There are more than 10,000 of them across the country, and odds are good that there’s a pretty great one within a short drive from your house.</p>
            <p>Find out which parks are opened and enjoy a wonderful day by yourself or with your family and friends.</p>
        </div>
      </div>
  )
}

export default HeroHeader