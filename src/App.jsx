import React, { useState, useEffect } from "react";
import "./App.css";

const wordsList = [
  "hello", "world", "react", "javascript", "developer",
  "keyboard", "speed", "typing", "test", "challenge",
  "algorithm", "asynchronous", "component", "interface",
  "performance", "optimization", "integration", "synchronous",
  "encapsulation", "polymorphism", "inheritance", "abstraction",
  "functional", "immutable", "prototype", "declaration",
  "expression", "callback", "middleware", "concurrency"
];


const App = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [typedWord, setTypedWord] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);

 
  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft]);

  useEffect(() => {
    generateNewWord();
  }, []);

  const generateNewWord = () => {
    const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    setCurrentWord(randomWord);
  };

  const handleInputChange = (e) => {
    setTypedWord(e.target.value);

    if (e.target.value.trim() === currentWord) {
      setScore(prev => prev + 1);
      setTypedWord("");
      generateNewWord();
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setTypedWord("");
    setGameStarted(true);
    generateNewWord();
  };

  return (
    <div className="container">
      <h1>⌨️ Typing Speed Test</h1>

      <div className="info">
        <p><strong>Time Left:</strong> {timeLeft}s</p>
        <p><strong>Score:</strong> {score}</p>
      </div>

      {timeLeft > 0 && gameStarted ? (
        <>
          <div className="word-box">
            <h2>Type this word:</h2>
            <p className="word">{currentWord}</p>
          </div>
          <input
            type="text"
            value={typedWord}
            onChange={handleInputChange}
            placeholder="Start typing..."
            autoFocus
          />
        </>
      ) : gameStarted ? (
        <div className="result">
          <h2>⏱ Time's up!</h2>
          <h3>Your WPM: {score}</h3>
        </div>
      ) : (
        <p>Click the button to begin your test!</p>
      )}

      <button onClick={startGame}>
        {gameStarted && timeLeft > 0 ? "Restart" : "Start Test"}
      </button>
    </div>
  );
};

export default App;
