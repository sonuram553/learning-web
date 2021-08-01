function stripComments(code) {
  return code.replace(/(\/\/.*)|(\/\*[^]*?\*\/)/g, "");
  return code.replace(/(\/\/.*)|(\/\*[^]*\*\/)/g, "");
}

console.log(
  stripComments(`
what is your name
// My name is ram
Your name is /*
Hello world */

Not A comment

/* comment */
`)
);
