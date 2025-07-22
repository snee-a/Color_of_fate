import React, { useState } from "react";
import "./App.css"; // custom styles

function App() {
  const [number, setNumber] = useState(null);
  const [advice, setAdvice] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  const colors = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Purple",
    "Orange",
    "Pink",
    "Cyan",
    "Magenta",
    "Turquoise",
  ];

  const getLuck = async () => {
    const randomNumber = Math.floor(Math.random() * 10);
    setNumber(randomNumber + 1);
    setColor(colors[randomNumber]);

    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setAdvice(data.slip.advice);
    } catch (err) {
      setAdvice("Could not fetch advice right now. Try again.");
    }
  };

  return (
    <div
      className="app-container"
      style={{ backgroundColor: color.toLowerCase() || "#1f1f1f" }}
    >
      <div className="content-card">
        <h1 className="app-title">🎨 Color of Fate 🔮</h1>

        <input
          type="text"
          className="name-input"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="glow-button" onClick={getLuck}>
          Reveal My Luck
        </button>

        {number && (
          <div className="result-box animate-fade-in">
            <h2>Hey <span className="username">{name || "Stranger"}</span>! 🌟</h2>
            <p>Your Lucky Number: <strong>{number}</strong></p>
            <p>Your Lucky Color: <strong>{color}</strong></p>
            <p className="advice">"{advice}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;