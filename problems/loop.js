function loop(value, test, body, update) {
  while (test(value)) {
    body(value);
    value = update(value);
  }
}

function test(value) {
  return value < 10 ? true : false;
}

function body(value) {
  console.log(value);
}

function update(value) {
  return ++value;
}

loop(0, test, body, update);
