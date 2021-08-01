const box = {
  _content: [],
  locked: true,

  get content() {
    if (this.locked) throw new Error("Locked!!");
    else return this._content;
  },

  unlock() {
    this.locked = false;
  },

  lock() {
    this.locked = true;
  },
};

function withBoxUnlocked(fn) {
  const { locked } = box;

  if (!locked) return fn();

  box.unlock();

  try {
    return fn();
  } finally {
    box.lock();
    console.log("Box locked!!");
  }
}

withBoxUnlocked(() => {
  console.log("Function called");
  throw new Error("Error Ocurred!!");
});
