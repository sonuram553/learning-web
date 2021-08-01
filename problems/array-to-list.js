let list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null,
    },
  },
};

function arrayToList(array) {
  let list = null;
  for (let i = array.length - 1; i >= 0; i--) {
    list = {value: array[i], rest: list};
  }
  return list;
}

function listToArray(list) {
  if (!list.rest) return [list.value];

  return [list.value, ...listToArray(list.rest)];
}

function prepend(item, list) {
  return { value: item, rest: list };
}

function nth(list, index) {
  let currentNode = list;
  let count = 0;

  while (count < index) {
    currentNode = currentNode.rest;
    count++;
  }

  return currentNode && currentNode.value;
}

console.log(arrayToList([1, 2, 3]));
console.log(listToArray(list));
console.log(listToArray(arrayToList([1, 2, 3])));
console.log(prepend(0, list));
console.log(nth(list, 2));
