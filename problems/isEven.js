function isEven(num) {
  if (num == 0) return true;
  if (num == 1) return false;
  if (num < 0) return isEven(-num);

  return isEven(num - 2);
}

console.log(isEven(0));
console.log(isEven(1));
console.log(isEven(2));
console.log(isEven(3));
console.log(isEven(-1));
