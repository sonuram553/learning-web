// Method 1: Using Loop
function every(arr, predicate) {
  for (let item of arr) {
    if (!predicate(item)) return false;
  }

  return true;
}

// Method 2: Using Array's some method
function every_2(arr, predicate) {
  return !arr.some((item) => !predicate(item));
}

console.log(every_2([1, 2, 3, 4, 5, 6], (n) => n > 0));
