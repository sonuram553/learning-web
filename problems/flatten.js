const arr = [[1, 2, 3], [4, 5], [6], [7, 8, 9, 10]];

function flatten(arr) {
  return arr.reduce((flat, current) => flat.concat(current));
}

console.log(flatten(arr));
