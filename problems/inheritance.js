const Matrix = require("./custom-iterable-obj");

class SymmetricMatrix extends Matrix {
  constructor(size, element = (x, y) => null) {
    super(size, size, (x, y) => {
      if (x < y) return element(x, y);
      else return element(y, x);
    });
  }

  set(x, y, value) {
    super.set(x, y, value);
    if (x !== y) super.set(y, x, value);
  }
}

const matrix = new SymmetricMatrix(3);
matrix.set(0, 1, 100)
matrix.set(1, 1, 100)
matrix.set(1, 2, 100)

console.log(matrix);
