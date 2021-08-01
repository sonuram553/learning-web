function reverseArray(arr) {
  const reversed = [];

  for (let j = arr.length - 1; j >= 0; j--) {
    reversed.push(arr[j]);
  }

  return reversed;
}

function reverseArrayInplace(arr) {
  const size = arr.length;

  for (let i = 0; i < Math.floor(size / 2); i++) {
    let lhs = arr[i];
    arr[i] = arr[size - 1 - i];
    arr[size - 1 - i] = lhs;
  }

  return arr;
}

console.log(reverseArray([1, 2, 3, 4]));
console.log(reverseArrayInplace([1, 2, 3, 4, 5]));
