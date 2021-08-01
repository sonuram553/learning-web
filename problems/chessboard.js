const size = 8;
let board = "";

for (let row = 0; row < size; row++) {
  for (let col = 0; col < size; col++) {
    if (row % 2 === 0) {
      if (col % 2 === 0) board += " ";
      else board += "#";
    } else if (col % 2 === 0) board += "#";
    else board += " ";
  }

  board += "\n";
}

console.log(board);
