import { Record, List } from "immutable";

const getColorClass = (bombCount) => {
  if (bombCount === 1)
    return "blue";
  if (bombCount === 2)
    return "green";
  if (bombCount === 3)
    return "red";
  if (bombCount === 4)
    return "darkblue";
};

const SquareRecord = Record({
  x: 0,
  y: 0,
  isBomb: false,
  isExposed: false,
  isFlagged: false,
  data: null,
  className: ""
});

class SquareModel extends SquareRecord {
  expose(squares) {
    let bombCount;
    if (!this.isBomb) {
      const surroundingSquares = getSurroundingSquares(squares, this);
      bombCount = surroundingSquares.count(square => square.isBomb);
    }

    return this.set("isExposed", true).set('data', bombCount).set("className", getColorClass(bombCount));
  }

  toggleFlag() {
    return this.set("isFlagged", !this.isFlagged);
  }

  getNeighbors(board) {
    return getSurroundingSquares(board.squares, this);
  }

  static create(x, y, isBomb = false) {
    if (x === null || x < 0 || y === null || y < 0)
      return null;

    return new SquareModel({ x, y, isBomb });
  }
}

const getSurroundingSquares = (squares, square) => List([
  getTopLeft(squares, square),
  getTopMiddle(squares, square),
  getTopRight(squares, square),
  getLeft(squares, square),
  getRight(squares, square),
  getBottomLeft(squares, square),
  getBottomMiddle(squares, square),
  getBottomRight(squares, square)
]).filter(s => s != null);

const getTopLeft = (squares, square) => {
  return getNeighbor(squares, [square.x - 1, square.y - 1]);
};

const getTopMiddle = (squares, square) => {
  return getNeighbor(squares, [square.x - 1, square.y]);
};

const getTopRight = (squares, square) => {
  return getNeighbor(squares, [square.x - 1, square.y + 1]);
};

const getLeft = (squares, square) => {
  return getNeighbor(squares, [square.x, square.y - 1]);
};

const getRight = (squares, square) => {
  return getNeighbor(squares, [square.x, square.y + 1]);
};

const getBottomLeft = (squares, square) => {
  return getNeighbor(squares, [square.x + 1, square.y - 1]);
};

const getBottomMiddle = (squares, square) => {
  return getNeighbor(squares, [square.x + 1, square.y]);
};

const getBottomRight = (squares, square) => {
  return getNeighbor(squares, [square.x + 1, square.y + 1]);
};

const getNeighbor = (squares, neighborCoordinates) => {
  const maxCoordinates = [squares.size, squares.first().size];
  if (neighborCoordinates[0] >= 0
    && neighborCoordinates[1] >= 0
    && neighborCoordinates[0] < maxCoordinates[0]
    && neighborCoordinates[1] < maxCoordinates[1]) {
      return squares.getIn(neighborCoordinates);
    }
    return null;
};

export default SquareModel;