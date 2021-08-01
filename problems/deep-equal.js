function deepEqual(left, right) {
  if (left === right) return true;
  if (!isObject(left) || !isObject(right)) return false;

  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);

  if (leftKeys.length !== rightKeys.length) return false;

  for (let key of leftKeys) {
    if (!rightKeys.includes(key) || !deepEqual(left[key], right[key]))
      return false;
  }

  return true;
}

function isObject(value) {
  return typeof value === "object" && value !== null;
}

const obj1 = { name: "Sonu", age: 20, address: { pincode: 220220 } };
const obj2 = { name: "Sonu", age: 20 };
const obj3 = { name: "Sonu", age: 20, address: { pincode: 220220 } };

console.log(deepEqual(obj1, obj2));
console.log(deepEqual(obj1, obj3));
console.log(isObject(null));
console.log(isObject({}));
