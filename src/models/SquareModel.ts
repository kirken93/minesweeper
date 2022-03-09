import { List, Record } from "immutable";
import BoardModel from "./BoardModel";

const getColorClass = (bombCount: number) => {
  if (bombCount === 1) return "blue";
  if (bombCount === 2) return "green";
  if (bombCount === 3) return "red";
  if (bombCount === 4) return "darkblue";

  return "";
};

const SquareRecord = Record<{
  x: number;
  y: number;
  isBomb: boolean;
  isExposed: boolean;
  isFlagged: boolean;
  data: number | null;
  className: string;
}>({
  x: 0,
  y: 0,
  isBomb: false,
  isExposed: false,
  isFlagged: false,
  data: null,
  className: ""
});

class SquareModel extends SquareRecord {
  expose(squares: List<List<SquareModel>>) {
    let bombCount: number = 0;
    if (!this.isBomb) {
      const surroundingSquares = getSurroundingSquares(squares, this);
      bombCount = surroundingSquares.count((square) => square.isBomb);
    }

    return this.set("isExposed", true)
      .set("data", bombCount)
      .set("className", getColorClass(bombCount));
  }

  toggleFlag() {
    return this.set("isFlagged", !this.isFlagged);
  }

  getNeighbors(board: BoardModel) {
    return getSurroundingSquares(board.squares, this);
  }

  static create(x: number, y: number, isBomb = false) {
    if (x === null || x < 0 || y === null || y < 0) return null;

    return new SquareModel({ x, y, isBomb });
  }
}

const getSurroundingSquares = (
  squares: List<List<SquareModel>>,
  square: SquareModel
): List<SquareModel> =>
  List([
    getTopLeft(squares, square),
    getTopMiddle(squares, square),
    getTopRight(squares, square),
    getLeft(squares, square),
    getRight(squares, square),
    getBottomLeft(squares, square),
    getBottomMiddle(squares, square),
    getBottomRight(squares, square)
  ]).filter((s): s is SquareModel => s != null);

const getTopLeft = (squares: List<List<SquareModel>>, square: SquareModel) => {
  return getNeighbor(squares, [square.x - 1, square.y - 1]);
};

const getTopMiddle = (
  squares: List<List<SquareModel>>,
  square: SquareModel
) => {
  return getNeighbor(squares, [square.x - 1, square.y]);
};

const getTopRight = (squares: List<List<SquareModel>>, square: SquareModel) => {
  return getNeighbor(squares, [square.x - 1, square.y + 1]);
};

const getLeft = (squares: List<List<SquareModel>>, square: SquareModel) => {
  return getNeighbor(squares, [square.x, square.y - 1]);
};

const getRight = (squares: List<List<SquareModel>>, square: SquareModel) => {
  return getNeighbor(squares, [square.x, square.y + 1]);
};

const getBottomLeft = (
  squares: List<List<SquareModel>>,
  square: SquareModel
) => {
  return getNeighbor(squares, [square.x + 1, square.y - 1]);
};

const getBottomMiddle = (
  squares: List<List<SquareModel>>,
  square: SquareModel
) => {
  return getNeighbor(squares, [square.x + 1, square.y]);
};

const getBottomRight = (
  squares: List<List<SquareModel>>,
  square: SquareModel
) => {
  return getNeighbor(squares, [square.x + 1, square.y + 1]);
};

const getNeighbor = (
  squares: List<List<SquareModel>>,
  neighborCoordinates: [number, number]
): SquareModel | null => {
  const maxCoordinates = [
    squares.size,
    (squares.first() as List<SquareModel>).size
  ];
  if (
    neighborCoordinates[0] >= 0 &&
    neighborCoordinates[1] >= 0 &&
    neighborCoordinates[0] < maxCoordinates[0] &&
    neighborCoordinates[1] < maxCoordinates[1]
  ) {
    return squares.getIn([neighborCoordinates[0], neighborCoordinates[1]]);
  }
  return null;
};

export default SquareModel;
