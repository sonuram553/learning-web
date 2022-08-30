const update = require("immutability-helper");

const arr = [4, 5, 6];
const updatedArr = update(arr, { $unshift: [1, 2, 3] });
console.log(updatedArr);
