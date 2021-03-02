import BoardModel from "../models/BoardModel"

const assertNewBoard = (height, width, numBombs) => {
  const board = BoardModel.create(height, width, numBombs);
  expect(board.height).toBe(height);
  expect(board.width).toBe(width);
  expect(board.numBombs).toBe(numBombs);
  expect(board.squares.size).toBe(height);
  expect(board.squares.first().size).toBe(width);
  expect(board.getBombsRemaining()).toBe(numBombs);
  expect(board.getGameStatus()).toBe(null);
  expect(board.getIsGameOver()).toBe(false);
};

describe("BoardModel", () => {
  describe("create new board", () => {
    test("10x10 w/5 bombs", () => {
      const height = 10;
      const width = 10;
      const numBombs = 5;
      assertNewBoard(height, width, numBombs);
    });

    test("100x100 w/5 bombs", () => {
      const height = 100;
      const width = 100;
      const numBombs = 5;
      assertNewBoard(height, width, numBombs);
    });

    test("100x100 w/200 bombs", () => {
      const height = 100;
      const width = 100;
      const numBombs = 200;
      assertNewBoard(height, width, numBombs);
    });

    test("1000x1000 w/50 bombs", () => {
      expect(BoardModel.create(1000, 1000, 50)).toBe(null);
    });

    test("1x1 w/5 bombs", () => {
      expect(BoardModel.create(1, 1, 5)).toBe(null);
    });

    test("0x0 w/0 bombs", () => {
      expect(BoardModel.create(0, 0, 0)).toBe(null);
    });

    test("nullxnull with/null bombs", () => {
      expect(BoardModel.create(null, null, null)).toBe(null);
    });

    test("-1x-1 with/-1 bombs", () => {
      expect(BoardModel.create(-1, -1, -1)).toBe(null);
    });
  });
});