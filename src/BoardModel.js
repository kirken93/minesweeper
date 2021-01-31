import SquareModel from "./SquareModel";
import { Record, List } from "immutable";
import { Simulate } from "react-dom/test-utils";

const getRandomNum = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const BoardRecord = Record({
  height: 0,
  width: 0,
  numBombs: 0,
  squares: undefined
});

class BoardModel extends BoardRecord {
  constructor(props) {

    // Create all the squares for the board
    let squares = List();
    for (var x = 0; x < props.height; x++) {
      squares = squares.set(x, List());
      for (var y = 0; y < props.width; y++) {
        squares = squares.setIn([x, y], new SquareModel({ x, y }));
      }
    }

    // Randomly assign x number of bombs across the board
    let minesSet = 0;
    while (minesSet < props.numBombs) {
      var x = getRandomNum(props.height - 1);
      var y = getRandomNum(props.width - 1);

      if (!squares.getIn([x, y]).isBomb) {
        squares = squares.setIn([x,y], new SquareModel({ x, y, isBomb: true }));
        minesSet++;
      }
    }

    super({...props, squares});
  }

  getBombsRemaining() {
    return this.squares.flatMap(row => row).count(s => s.isBomb && !s.isFlagged);
  }

  getGameStatus() {
    const bombs = this.squares.flatMap(row => row).filter(s => s.isBomb);
    if (bombs.some(b => b.isExposed)) {
      return "You lose :(";
    } else if (bombs.every(b => b.isFlagged)) {
      // TODO in this case, need to expose every square
      return "You win!";
    }

    return null;
  }

  getIsGameOver() {
    return this.getGameStatus() !== null;
  }

  static revealAll(squares) {
    let newSquares = squares;

    squares.flatMap(row => row).filter(s => !s.isExposed).forEach(s => {
      newSquares = BoardModel.reveal(newSquares, s);
    });
    return newSquares;
  }

  static reveal(squares, square) {
    let newSquares = squares;

    // set data for this square
    if (!square.isExposed) {
      const newSquare = square.expose(newSquares);
      newSquares = newSquares.setIn([square.x, square.y], newSquare);
      if (newSquare.data === 0) {
        const neighbors = SquareModel.getNeighbors(newSquares, newSquare);
        neighbors.map(neighbor => {
          newSquares = BoardModel.reveal(newSquares, neighbor);
        })
      }
    }

    const bombs = newSquares.flatMap(row => row).filter(s => s.isBomb);
    if (bombs.some(b => b.isExposed)) {
      return BoardModel.revealAll(newSquares);

    } else if (bombs.every(b => b.isFlagged)) {
      return BoardModel.revealAll(newSquares);
    }

    return newSquares;
  }
}

export default BoardModel;