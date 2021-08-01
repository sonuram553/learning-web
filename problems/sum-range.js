/* function range(start, end, step = 1) {
  const result = [];

  for (let i = start; i <= end; i += step) result.push(i);

  return result;
} */

// Handles case when step is negative
function range(start, end, step = 1) {
  const result = [];
  let i = start;

  while (true) {
    result.push(i);
    i += step;

    if ((step < 0 && i < end) || (step > 0 && i > end)) break;
  }

  return result;
}

function sum(arr) {
  let result = 0;

  for (let item of arr) result += item;

  return result;
}

console.log(range(1, 10));
console.log(range(1, 10, 2));
console.log(range(5, 2, -1));
console.log(sum(range(1, 10)));
