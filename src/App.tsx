import React from "react";
import { useState } from "react";
import "./styles/App.scss";
import BoardModel from "./models/BoardModel";
import Board from "./components/Board";
import TextField from "./components/TextField";

function App() {
  const [height, setHeight] = useState(10);
  const [width, setWidth] = useState(10);
  const [numBombs, setNumBombs] = useState(10);

  const [board, setBoard] = useState(
    BoardModel.create(height, width, numBombs)
  );
  const newGame = () => {
    setBoard(BoardModel.create(height, width, numBombs));
  };

  let boardComponent = null;
  if (board != null) {
    boardComponent = (
      <Board board={board} setBoard={setBoard} newGame={newGame} />
    );
  }

  return (
    <div className="App">
      {boardComponent}
      <div>
        <TextField
          label="Height"
          value={height}
          onChange={setHeight}
          id="height"
        />
        <TextField label="Width" value={width} onChange={setWidth} id="width" />
        <TextField
          label="Bombs"
          value={numBombs}
          onChange={setNumBombs}
          id="bombs"
        />
      </div>
    </div>
  );
}

export default App;
