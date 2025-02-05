import React from "react";
import "./LandingPage.css";
import starsImage from "../assets/stars.png"; // Import the stars image dynamically

const LandingPage = ({ onStartGame }) => {
  return (
    <div className="landing-page">
      {/* Starry background container with dynamically applied image */}
      <div
        className="stars"
        style={{
          backgroundImage: `url(${starsImage})`, // Dynamically applied background image
        }}
      ></div>

      {/* Main content */}
      <div className="content">
        <h1 className="title">Mystery Block</h1>
        <img
          src="./assets/astronaut.png"
          alt="Astronaut"
          className="astronaut"
        />
        <h2 className="subheading">Can You Unmask the Mystery?</h2>
        <p className="description">
          Guess the answer correctly, and watch the mystery image slowly come to
          life! Incorrect guesses keep the mystery hidden... How far can you go?
        </p>
        <button className="play-button" onClick={onStartGame}>
          Play Now
        </button>
      </div>

      {/* Rocket images */}
      <div className="rockets">
        <img
          src="./assets/rocket.png"
          alt="Rocket Left"
          className="rocket rocket-left"
        />
        <img
          src="./assets/rocket.png"
          alt="Rocket Right"
          className="rocket rocket-right"
        />
      </div>

      {/* Clouds */}
      <div className="clouds">
        <img src="./assets/clouds.png" alt="Clouds" />
      </div>
    </div>
  );
};

export default LandingPage;
