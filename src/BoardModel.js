import SquareModel from "./SquareModel";

class BoardModel {
  constructor(height, width) {
    this.height = height;
    this.width = width;

    let squares = [];
    for (var x = 0; x < height; x++) {
      squares[x] = [];
      for (var y = 0; y < width; y++) {
        squares[x][y] = new SquareModel(x, y, true);
      }
    }
    this.squares = squares;
  }
}

export default BoardModel;