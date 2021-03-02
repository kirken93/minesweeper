import React from 'react';
import { useState } from "react";
import './styles//App.css';
import BoardModel from "./models/BoardModel.js";
import Board from "./components/Board.jsx";
import TextField from "./components/TextField"

const createNewBoard = (height, width, numBombs) => {
  if (height * width < numBombs) {
    alert("Cannot have more mines than squares");
    return null;
  }

  return new BoardModel({ height, width, numBombs });
};

function App() {
  const [height, setHeight] = useState(10);
  const [width, setWidth] = useState(10);
  const [numBombs, setNumBombs] = useState(10);

  const [board, setBoard] = useState(createNewBoard(height, width, numBombs));
  const newGame = () => {
    setBoard(createNewBoard(height, width, numBombs));
  };

  return (
    <div className="App">
      <Board board={board} setBoard={setBoard} newGame={newGame} />
      <div>
        <TextField label="Height"
                   value={height}
                   onChange={setHeight}
                   id="height" />
        <TextField label="Width"
                   value={width}
                   onChange={setWidth}
                   id="width" />
        <TextField label="Bombs"
                   value={numBombs}
                   onChange={setNumBombs}
                   id="bombs" />
      </div>
    </div>
  );
}

export default App;
