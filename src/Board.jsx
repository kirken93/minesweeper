import React from "react";
import { useState} from "react";
import PropTypes from "prop-types";
import BoardModel from "./BoardModel";
import Square from "./Square.jsx";

const Board = (props) => {

  const [gameOver, setGameOver] = useState(false);

  const rows = props.board.squares.map((row, r) => {
    const rowSquares = row.map((square, s) => {

      const clickSquare = () => {
        if (gameOver) {
          return;
        }

        if (square.isBomb) {
          setGameOver(true);
        }
      };

      return <Square key={s}
                     square={square} 
                     isGameOver={gameOver}
                     onClick={clickSquare} />;
    });
    return <div key={r} className="row">{rowSquares}</div>;
  });

  return <div className="board">
    {rows}
  </div>;
};

Board.propTypes = {
  board: PropTypes.instanceOf(BoardModel).isRequired
};

export default Board;