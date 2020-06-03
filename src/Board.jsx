import React from "react";
import PropTypes from "prop-types";
import BoardModel from "./BoardModel";
import Square from "./Square.jsx";

const Board = (props) => {
  const rows = props.board.squares.map((row, r) => {
    const rowSquares = row.map((square, s) => <Square key={s} square={square} />);
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