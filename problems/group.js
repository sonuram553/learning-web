class Group {
  members = [];

  add(value) {
    if (!this.has(value)) this.members.push(value);
  }

  delete(value) {
    this.members = this.members.filter((member) => member !== value);
  }

  has(value) {
    return this.members.includes(value);
  }

  static from(iterable) {
    const group = new Group();

    for (let value of iterable) {
      if (!group.has(value)) group.add(value);
    }

    return group;
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

class GroupIterator {
  constructor(group) {
    this.group = group;
    this.index = 0;
  }

  next() {
    if (this.index === this.group.members.length) return { done: true };

    const value = {
      value: this.group.members[this.index],
      done: false,
    };

    this.index++;

    return value;
  }
}

/* Group.prototype[Symbol.iterator] = function () {
  return new GroupIterator(this);
}; */

const group = Group.from([10, 20, 10]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

for (let member of group) {
  console.log(member);
}
