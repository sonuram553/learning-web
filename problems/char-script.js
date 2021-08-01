const SCRIPTS = require("./scripts");

function charScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => code >= from && code < to))
      return script;
  }
}

module.exports = charScript;

console.log(charScript("んにちは世".charCodeAt(0)));
