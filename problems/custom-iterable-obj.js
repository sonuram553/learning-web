class Matrix {
  constructor(row, col, element = (x, y) => null) {
    this.row = row;
    this.col = col;
    this.content = [];

    for (let x = 0; x < row; x++) {
      for (let y = 0; y < col; y++) this.content[x * col + y] = element(x, y);
    }
  }

  get(x, y) {
    return this.content[x * this.col + y];
  }

  set(x, y, value) {
    this.content[x * this.col + y] = value;
  }
}

class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }

  next() {
    if (this.x === this.matrix.row) return { done: true };

    const value = {
      x: this.x,
      y: this.y,
      value: this.matrix.get(this.x, this.y),
    };

    this.y++;

    if (this.y === this.matrix.col) {
      this.x++;
      this.y = 0;
    }

    return { value, done: false };
  }
}

Matrix.prototype[Symbol.iterator] = function () {
  return new MatrixIterator(this);
};

module.exports = Matrix;

const matrix = new Matrix(3, 3);

for (let { x, y, value } of matrix) {
  console.log(x, y, value);
}
