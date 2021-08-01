class PGroup {
  constructor(members) {
    if (typeof members === "string") this.members = members.split("");
    else this.members = members;
  }

  add(value) {
    if (!this.has(value)) return new PGroup([...this.members, value]);
    return this;
  }

  delete(value) {
    if (!this.has(value)) return this;
    return new PGroup(this.members.filter((member) => member !== value));
  }

  has(value) {
    return this.members.includes(value);
  }
}

const pgroup = new PGroup([1, 2]);

console.log(pgroup.delete("a"));
console.log(pgroup);
