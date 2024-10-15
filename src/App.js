import React, { useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("#ffffff");
  const [favorites, setFavorites] = useState([]);

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleHexInput = (e) => {
    const hex = e.target.value;
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
      setColor(hex);
    }
  };

  const handleRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
    setColor(randomColor);
  };

  const addFavoriteColor = () => {
    if (!favorites.includes(color)) {
      setFavorites([...favorites, color]);
    }
  };

  const getTextColor = () => {
    const brightness =
      parseInt(color.substring(1, 3), 16) * 0.299 +
      parseInt(color.substring(3, 5), 16) * 0.587 +
      parseInt(color.substring(5, 7), 16) * 0.114;
    return brightness > 186 ? "#000000" : "#ffffff";
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Enhanced Color Picker</h1>

        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="color-input"
        />
        <input
          type="text"
          placeholder="Enter Hex Code"
          value={color}
          onChange={handleHexInput}
          className="hex-input"
        />

        <div className="buttons">
          <button onClick={handleRandomColor} className="random-btn">
            Random Color
          </button>
          <button onClick={addFavoriteColor} className="favorite-btn">
            Save Favorite
          </button>
        </div>

        <div
          className="color-box"
          style={{ backgroundColor: color, color: getTextColor() }}
        >
          <p>The background color is {color}</p>
          <p>
            {getTextColor() === "#ffffff" ? "White" : "Black"} text recommended
            for readability
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="favorites">
            <h2>Favorite Colors:</h2>
            <div className="favorite-colors">
              {favorites.map((favColor, index) => (
                <div
                  key={index}
                  className="favorite-color"
                  style={{ backgroundColor: favColor }}
                  onClick={() => setColor(favColor)}
                >
                  {favColor}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
