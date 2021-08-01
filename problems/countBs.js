// Version 1
/* function countBs(str) {
  let count = 0;

  for (let ch of str) {
    if (ch == "B") count++;
  }

  return count;
}

console.log(countBs("BBBbb")); */

// Version 2
function countChar(str, char) {
  let count = 0;

  for (let ch of str) {
    if (ch == char) count++;
  }

  return count;
}

function countBs(str) {
  return countChar(str, "B");
}

console.log(countBs("abcdsfB"));
