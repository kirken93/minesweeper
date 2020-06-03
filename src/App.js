import React from 'react';
import logo from './logo.svg';
import './App.css';
import BoardModel from "./BoardModel.js";
import Board from "./Board.jsx";

function App() {
  const board = new BoardModel(5, 5);

  return (
    <div className="App">
      <Board board={board} />
    </div>
  );
}

export default App;
