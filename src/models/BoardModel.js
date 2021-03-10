import SquareModel from "./SquareModel";
import { Record, List } from "immutable";

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
    for (var i = 0; i < props.height; i++) {
      squares = squares.set(i, List());
      for (var j = 0; j < props.width; j++) {
        squares = squares.setIn([i, j], SquareModel.create(i, j));
      }
    }

    // Randomly assign x number of bombs across the board
    let minesSet = 0;
    while (minesSet < props.numBombs) {
      var x = getRandomNum(props.height - 1);
      var y = getRandomNum(props.width - 1);

      if (!squares.getIn([x, y]).isBomb) {
        squares = squares.setIn([x,y], SquareModel.create(x, y, true));
        minesSet++;
      }
    }

    super({...props, squares});
  }

  getBombsRemaining() {
    return this.squares.flatMap(row => row).count(s => s.isBomb && !s.isFlagged);
  }

  getGameStatus() {
    const squares = this.squares.flatMap(row => row);
    if (squares.every(s => s.isExposed)) {
      const bombs = squares.filter(s => s.isBomb);
      if (bombs.every(b => b.isFlagged)) {
        return "You win!";
      } else if (bombs.some(b => b.isExposed)) {
        return "You lose :(";
      }
    }
    return null;
  }

  getIsGameOver() {
    return this.getGameStatus() !== null;
  }

  clickSquare(square) {
    if (square.isExposed)
      return this;

    if (square.isBomb) {
      return this.set("squares", BoardModel.revealAll(this.squares));
    } else {
      return this.set("squares", BoardModel.reveal(this.squares, square));
    }
  }

  flagSquare(square) {
    if (square.isExposed)
      return this;

    let newBoard = this.set("squares", this.squares.setIn([square.x, square.y], square.toggleFlag()));
    if (newBoard.squares.flatMap(r => r).filter(s => s.isBomb).every(b => b.isFlagged)) {
      newBoard = this.set("squares", BoardModel.revealAll(newBoard.squares));
    }

    return newBoard;
  }

  static create(height, width, numBombs) {
    if ((!height || !width || !numBombs) || (height < 0 || width < 0 || numBombs < 0)
      || height * width < numBombs || height * width >= 1000000) {
      return null;
    }

    return new BoardModel({ height, width, numBombs });
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
        neighbors.forEach(neighbor => {
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
