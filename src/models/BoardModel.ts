import SquareModel from "./SquareModel";
import { Record, List } from "immutable";

const getRandomNum = (max: number, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const BoardRecord = Record({
  height: 0,
  width: 0,
  numBombs: 0,
  squares: List<List<SquareModel>>()
});

class BoardModel extends BoardRecord {
  constructor(props: { height: number; width: number; numBombs: number }) {
    // Create all the squares for the board
    let squares = List<List<SquareModel>>();
    for (var i = 0; i < props.height; i++) {
      squares = squares.set(i, List<SquareModel>());
      for (var j = 0; j < props.width; j++) {
        squares = squares.setIn([i, j], SquareModel.create(i, j));
      }
    }

    // Randomly assign x number of bombs across the board
    let minesSet = 0;
    while (minesSet < props.numBombs) {
      var x = getRandomNum(props.height - 1);
      var y = getRandomNum(props.width - 1);

      if (!(squares.getIn([x, y]) as SquareModel).isBomb) {
        squares = squares.setIn([x, y], SquareModel.create(x, y, true));
        minesSet++;
      }
    }

    super({ ...props, squares });
  }

  getBombsRemaining() {
    return this.squares
      .flatten()
      .count((s: SquareModel) => s.isBomb && !s.isFlagged);
  }

  getGameStatus() {
    const squares = this.squares.flatten();
    if (squares.every((s: SquareModel) => s.isExposed)) {
      const bombs = squares.filter((s: SquareModel) => s.isBomb);
      if (bombs.every((b: SquareModel) => b.isFlagged)) {
        return "You win!";
      } else if (bombs.some((b: SquareModel) => b.isExposed)) {
        return "You lose :(";
      }
    }
    return null;
  }

  getIsGameOver() {
    return this.getGameStatus() !== null;
  }

  flagSquare(square: SquareModel) {
    if (square.isExposed) return this;

    let newBoard = this.set(
      "squares",
      this.squares.setIn([square.x, square.y], square.toggleFlag())
    );
    if (
      newBoard.squares
        .flatten()
        .filter((s: SquareModel) => s.isBomb)
        .every((b: SquareModel) => b.isFlagged)
    ) {
      newBoard.squares.flatten().forEach((s: SquareModel) => {
        newBoard = newBoard.revealSquare(s);
      });
    }

    return newBoard;
  }

  revealSquare(square: SquareModel) {
    if (square.isExposed) {
      return this;
    } else {
      // expose the square
      const newSquare = square.expose(this.squares);
      let newBoard = this.set(
        "squares",
        this.squares.setIn([square.x, square.y], newSquare)
      );
      if (newSquare.data === 0) {
        // reveal all neighbors
        newSquare.getNeighbors(newBoard).forEach((neighbor) => {
          newBoard = newBoard.revealSquare(neighbor);
        });
      }

      // game ending condition where all squares are revealed
      const bombs = newBoard.squares
        .flatten()
        .filter((s: SquareModel) => s.isBomb);
      if (
        bombs.some((b: SquareModel) => b.isExposed) ||
        bombs.every((b: SquareModel) => b.isFlagged)
      ) {
        newBoard.squares.flatten().forEach((s: SquareModel) => {
          newBoard = newBoard.revealSquare(s);
        });
      }

      return newBoard;
    }
  }

  static create(height: number, width: number, numBombs: number) {
    if (
      !height ||
      !width ||
      !numBombs ||
      height < 0 ||
      width < 0 ||
      numBombs < 0 ||
      height * width < numBombs ||
      height * width >= 1000000
    ) {
      return null;
    }

    return new BoardModel({ height, width, numBombs });
  }
}

export default BoardModel;
