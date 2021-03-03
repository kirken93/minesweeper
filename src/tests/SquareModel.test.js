import SquareModel from"../models/SquareModel"

describe("SquareModel", () => {
  describe("create new square", () => {
    test("0, 0", () => {
      const x = 0;
      const y = 0;
      const square = SquareModel.create(x, y);
      expect(square.x).toBe(x);
      expect(square.y).toBe(y);
      expect(square.isBomb).toBe(false);
      expect(square.isExposed).toBe(false);
      expect(square.isFlagged).toBe(false);
      expect(square.data).toBe(null);
      expect(square.className).toBe("");
    });

    test("0, 0 bomb", () => {
      const x = 0;
      const y = 0;
      const square = SquareModel.create(x, y, true);
      expect(square.x).toBe(x);
      expect(square.y).toBe(y);
      expect(square.isBomb).toBe(true);
      expect(square.isExposed).toBe(false);
      expect(square.isFlagged).toBe(false);
      expect(square.data).toBe(null);
      expect(square.className).toBe("");
    });

    test("10, 10", () => {
      const x = 10;
      const y = 10;
      const square = SquareModel.create(x, y);
      expect(square.x).toBe(x);
      expect(square.y).toBe(y);
      expect(square.isBomb).toBe(false);
      expect(square.isExposed).toBe(false);
      expect(square.isFlagged).toBe(false);
      expect(square.data).toBe(null);
      expect(square.className).toBe("");
    });

    test("10, 10 bomb", () => {
      const x = 0;
      const y = 0;
      const square = SquareModel.create(x, y, true);
      expect(square.x).toBe(x);
      expect(square.y).toBe(y);
      expect(square.isBomb).toBe(true);
      expect(square.isExposed).toBe(false);
      expect(square.isFlagged).toBe(false);
      expect(square.data).toBe(null);
      expect(square.className).toBe("");
    });

    test("-1, -1", () => {
      const x = -1;
      const y = -1;
      const square = SquareModel.create(x, y);
      expect(square).toBe(null);
    });

    test("null, null", () => {
      const x = null;
      const y = null;
      const square = SquareModel.create(x, y);
      expect(square).toBe(null);
    });
  });

  describe("toggle flag", () => {
    test("toggle back and forth", () => {
      let square = SquareModel.create(0, 0);
      expect(square.isFlagged).toBe(false);
      square = square.toggleFlag();
      expect(square.isFlagged).toBe(true);
      square = square.toggleFlag();
      expect(square.isFlagged).toBe(false);
    });
  });

  describe("expose", () => {
    test("expose bomb", () => {
      let square = SquareModel.create(0, 0, true);
      expect(square.isBomb).toBe(true);
      expect(square.isExposed).toBe(false);
      square = square.expose(null);
      expect(square.isBomb).toBe(true);
      expect(square.isExposed).toBe(true);
    });

   /*  test("expose non-bomb", () => {
      let square = SquareModel.create(0, 0);
      expect(square.isBomb).toBe(false);
      expect(square.isBomb).toBe(false);
      square = square.expose(null);
      expect(square.isBomb).toBe(true);
      expect(square.isExposed).toBe(true);
    }); */
  });
});