import React from 'react';
import { useState, useReducer } from "react";
import './App.css';
import BoardModel from "./BoardModel.js";
import Board from "./Board.jsx";

// TODO make these configurable
const height = 10;
const width = 10;
const numBombs = 10;
const createNewBoard = () => { return new BoardModel({ height, width, numBombs }) };

function App() {
  const [board, setBoard] = useState(createNewBoard());
  const newGame = () => setBoard(createNewBoard());

  return (
    <div className="App">
      <Board board={board} setBoard={setBoard} newGame={newGame} />
    </div>
  );
}

export default App;
