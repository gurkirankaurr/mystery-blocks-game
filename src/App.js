import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import LandingPage from "./components/LandingPage";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div>
      {gameStarted ? (
        <GameBoard />
      ) : (
        <LandingPage onStartGame={() => setGameStarted(true)} />
      )}
    </div>
  );
};

export default App;