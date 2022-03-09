import React from "react";
import BoardModel from "../models/BoardModel";
import Square from "./Square";

interface IProps {
  board: BoardModel;
  setBoard: (board: BoardModel) => void;
  newGame: () => void;
}

const Board = (props: IProps) => {
  const { board } = props;
  const [time, setTime] = React.useState(0);

  const reset = () => {
    setTime(0);
  };

  const newGame = () => {
    props.newGame();
    reset();
  };

  React.useEffect(() => {
    const squares = board.squares.flatMap((row) => row);

    // Game hasn't started yet
    if (squares.every((s) => !s.isExposed)) return;

    // Game has ended
    if (board.getIsGameOver()) return;

    const intervalId = setInterval(() => {
      setTime(time + 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [time, board]);

  const status = board.getGameStatus();
  let statusRow = null;
  if (status) {
    statusRow = (
      <div className="row">
        <div>{status}</div>
      </div>
    );
  }

  const header = (
    <div className="header">
      <div className="row">
        <div>{board.getBombsRemaining()}</div>
        <div>
          <button type="button" onClick={newGame}>
            <span role="img" aria-label="New Game">
              😊
            </span>
          </button>
        </div>
        <div>{time}</div>
      </div>
      {statusRow}
    </div>
  );

  const rows = board.squares.map((row, r) => (
    <div key={r} className="row">
      {row.map((square, s) => {
        const onClick = square.isFlagged
          ? null
          : () => props.setBoard(board.revealSquare(square));
        const flag = square.isExposed
          ? null
          : () => props.setBoard(board.flagSquare(square));
        return <Square key={s} square={square} onClick={onClick} flag={flag} />;
      })}
    </div>
  ));

  return (
    <div className="board">
      {header}
      {rows}
    </div>
  );
};
export default Board;
