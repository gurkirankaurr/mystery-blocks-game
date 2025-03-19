import React, { useState, useEffect } from "react";
import "./LandingPage.js";
import starsImage from "../assets/stars.png";
import gridImage from "../assets/grid1.png";
import astronautImage from "../assets/astronaut image.png";
import astronautWrongImage from "../assets/astronaut-wrong.png";
import "./GameBoard.css";

const GRID_SIZE = 9;
const GAME_DURATION = 40;

const images = [
  "../assets/flip1.png",
  "../assets/flip2.png",
  "../assets/flip3.png",
  "../assets/flip4.png",
  "../assets/flip5.png",
  "../assets/flip6.png",
  "../assets/flip7.png",
  "../assets/flip8.png",
  "../assets/flip9.png",
];

const questions = [
  { image: "../assets/square image.png", correctAnswer: "Square" },
  { image: "../assets/triangle image.png", correctAnswer: "Triangle" },
  { image: "../assets/circle image.png", correctAnswer: "Circle" },
  { image: "../assets/square image.png", correctAnswer: "Square" },
  { image: "../assets/triangle image.png", correctAnswer: "Triangle" },
  { image: "../assets/circle image.png", correctAnswer: "Circle" },
  { image: "../assets/square image.png", correctAnswer: "Square" },
  { image: "../assets/triangle image.png", correctAnswer: "Triangle" },
  { image: "../assets/circle image.png", correctAnswer: "Circle" },
];

const shuffleOptions = (correctAnswer) => {
  const options = ["Square", "Triangle", "Circle", "Oval"];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  if (!options.includes(correctAnswer)) {
    options[0] = correctAnswer;
  }
  return options;
};

const MysteryBlocks = () => {
  const [revealedBlocks, setRevealedBlocks] = useState(Array(GRID_SIZE).fill(false));
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [showWrongScreen, setShowWrongScreen] = useState(false);
  const [showTimeUpScreen, setShowTimeUpScreen] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Shuffle options every time the question changes
  useEffect(() => {
    setShuffledOptions(shuffleOptions(currentQuestion.correctAnswer));
  }, [currentQuestionIndex, currentQuestion.correctAnswer]);

  // Timer countdown logic
  useEffect(() => {
    if (timeLeft > 0 && !gameFinished) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0 && !gameFinished) {
      setGameFinished(true);
      setShowTimeUpScreen(true);
    }
  }, [timeLeft, gameFinished]);

  const handleGoHome = () => {
    window.location.href = "/";
  };

  // Handle answer click
  const handleAnswerClick = (answer) => {
    if (answer === currentQuestion.correctAnswer) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
      setShowCorrectAnswer(true); // Show correct answer message

      // Reveal the block based on correct answer
      setRevealedBlocks((prev) => {
        const newRevealed = [...prev];
        const indexToFlip = correctAnswersCount;
        if (indexToFlip < GRID_SIZE) {
          newRevealed[indexToFlip] = true;
        }
        return newRevealed;
      });

      // Check if the game is finished
      if (correctAnswersCount + 1 === questions.length) {
        setGameFinished(true);
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }

      // Hide "Correct!" message after 1 second
      setTimeout(() => {
        setShowCorrectAnswer(false);
      }, 1000);
    } else {
      setShowWrongScreen(true);
      setTimeout(() => setShowWrongScreen(false), 1000);
    }
  };

  const handleRetry = () => {
    setRevealedBlocks(Array(GRID_SIZE).fill(false)); // Reset the revealed blocks
    setCorrectAnswersCount(0); // Reset correct answers count
    setCurrentQuestionIndex(0); // Start from the first question
    setGameFinished(false); // Reset game finished state
    setTimeLeft(GAME_DURATION); // Reset time
    setShowTimeUpScreen(false); // Hide time-up screen
    setShowWrongScreen(false); // Hide wrong answer screen
    setShowCorrectAnswer(false); // Hide correct answer screen
  };

  return (
    <div className="landing-page">
      <div className="stars" style={{ backgroundImage: `url(${starsImage})` }}></div>
      <div className="content title-container">
        <h1 className="title">Mystery Block</h1>
      </div>
      <h2 className="subheading">Which shape is this?</h2>
      <div className="text-center mt-4">
        <div className="shape-container">
          <img src={currentQuestion.image} alt={currentQuestion.correctAnswer} className="shape-image" />
        </div>
        <div className="options-grid">
          {shuffledOptions.map((option, index) => (
            <button key={index} className="option-button" onClick={() => handleAnswerClick(option)}>
              {index + 1}. {option}
            </button>
          ))}
        </div>
      </div>
      {!gameFinished && <div className="timer">Time Left: {timeLeft}s</div>}
      <div className="grid-container" style={{ backgroundImage: `url(${gridImage})` }}>
        {revealedBlocks.map((revealed, index) => (
          <div key={index} className={`grid-block ${revealed ? "flipped" : ""}`}>
            {revealed ? (
              <div className="revealed-block">
                <img src={images[index]} alt={`Revealed Block ${index + 1}`} className="block-image" />
              </div>
            ) : (
              <div className="cover" />
            )}
          </div>
        ))}
      </div>
      <div className="rockets-game-board">
        <img src="../assets/rocket.png" alt="Rocket Left" className="rocket rocket-left" />
        <img src="../assets/rocket.png" alt="Rocket Right" className="rocket rocket-right" />
      </div>

      {/* Wrong answer screen */}
      {showWrongScreen && (
        <div className="game-finish-animation">
          <h2 className="correct-text">Wrong!</h2>
          <img src={astronautWrongImage} alt="Astronaut" className="astronaut-image" />
        </div>
      )}

      {/* Time's up screen */}
{showTimeUpScreen && !showCorrectAnswer && (
  <div className="game-finish-animation">
    <h2 className="correct-text">Time's Up! Try Again?</h2>
    <div className="button-group">
      <button className="retry-button" onClick={handleRetry}>Retry</button>
      {/* <button className="home-button" onClick={handleGoHome}>Back to Home</button> */}
    </div>
  </div>
)}

      {/* Correct answer screen */}
      {showCorrectAnswer && !gameFinished && (
        <div className="game-finish-animation">
          <h2 className="correct-text">Correct!</h2>
          <img src={astronautImage} alt="Astronaut" className="astronaut-image" />
        </div>
      )}

      {/* Show "Next" and "Home" button if game completed in time */}
{gameFinished && timeLeft > 0 && (
  <div className="game-finish-animation">
    <h2 className="correct-text">Well Done!</h2>
    <div className="button-group">
      <button className="next-button" onClick={handleRetry}>Next</button>
      <button className="home-button" onClick={handleGoHome}>Back to Home</button>
    </div>
  </div>
)}
    </div>
  );
};

export default MysteryBlocks;
