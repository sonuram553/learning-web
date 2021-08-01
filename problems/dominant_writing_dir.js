const countBy = require("./count-by");
const charScript = require("./char-script");

function dominantWritingDir(text) {
  const scripts = countBy(text, (char) => {
    const script = charScript(char.codePointAt(0));
    return script ? script.direction : "None";
  }).filter(({ name }) => name !== "None");

  return scripts.reduce((max, script) =>
    max.count > script.count ? max : script
  );
}

console.log(dominantWritingDir("Hey"));
console.log(dominantWritingDir("Hey, مساء الخير"));
