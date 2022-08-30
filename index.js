(() => {
  console.log("this is the start");

  setTimeout(() => {
    console.log("Callback 1: this is a msg from callback.");
  }); // has a default time value of 0

  console.log("this is just a message");

  setTimeout(() => {
    console.log("Callback 2: this is a msg from callback.");
  }, 0);

  console.log("this is the end");
})();
