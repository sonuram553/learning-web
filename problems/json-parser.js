const JSONParser = (function () {
  let at, // The index of the current character
    ch, // The current character
    escapee = {
      '"': '"',
      "\\": "\\",
      "/": "/",
      b: "\b",
      f: "\f",
      n: "\n",
      r: "\r",
      t: "\t",
    },
    text;

  const error = function (m) {
    // Call error when something is wrong.
    throw {
      name: "Syntax Error",
      message: m,
      at,
      text,
    };
  };

  const next = function (c) {
    // If c parameter is provided, verify that it matches the current character.
    if (c && c !== ch) {
      error(`Expected ${c} instead of ${ch}.`);
    }

    // Get the next character. When there are no more characters,
    // return the empty string.
    ch = text.charAt(at);
    at += 1;
    return ch;
  };

  const number = function () {
    // Parse a number value.
    let number,
      string = "";

    if (ch === "-") {
      string = "-";
      next("-");
    }

    while (ch >= "0" && ch <= "9") {
      string += ch;
      next();
    }

    if (ch === ".") {
      string += ".";
      while (next() && ch >= "0" && ch <= "9") {
        string += ch;
      }
    }

    if (ch === "e" || ch === "E") {
      string += ch;
      next();
      if (ch === "-" || ch === "+") {
        string += ch;
        next();
      }
      while (ch >= "0" && ch <= "9") {
        string += ch;
        next();
      }
    }

    number = +string;
    if (isNaN(number)) {
      error("Bad number");
    } else {
      return number;
    }
  };

  const string = function () {
    // Parse a string value.
    let hex,
      i,
      string = "",
      ufff;

    // When parsing for string values, we must look for " and \ characters.
    if (ch === '"') {
      while (next()) {
        if (ch === '"') {
          next();
          return string;
        } else if (ch === "\\") {
          next();
          if (ch === "u") {
            ufff = 0;
            for (let i = 0; i < 4; i++) {
              const hex = parseInt(next(), 16);
              if (!isFinite(hex)) {
                break;
              }
              ufff = ufff * 16 + hex;
            }
            string += String.fromCharCode(ufff);
          } else if (typeof escapee[ch] === "string") {
            string += escapee[ch];
          } else {
            break;
          }
        }
        string += ch;
      }
    }
    error("Bad string");
  };

  const white = function () {
    // Skip white space
    while (ch && ch <= " ") {
      next();
    }
  };

  const word = function () {
    switch (ch) {
      case "t":
        next("t");
        next("r");
        next("u");
        next("e");
        return true;

      case "f":
        next("f");
        next("a");
        next("l");
        next("e");
        return false;

      case "n":
        next("n");
        next("u");
        next("l");
        next("l");
        return null;
    }
    error(`Unexpected ${ch}`);
  };

  let value; // Placeholder for the value function.

  const array = function () {
    // Parse an array value.
    const array = [];

    if (ch === "[") {
      next("[");
      white();
      if (ch === "]") {
        next("]");
        return array; // Empty array.
      }

      while (ch) {
        array.push(value());
        white();
        if (ch === "]") {
          next("]");
          return array;
        }
        next(",");
        white();
      }
    }

    error("Bad array");
  };

  const object = function () {
    // Parse an object value.
    let key,
      object = {};

    if (ch === "{") {
      next("{");
      white();
      if (ch === "}") {
        next("}");
        return object; // Empty object.
      }

      while (ch) {
        key = string();
        white();
        next(":");
        object[key] = value();
        white();
        if (ch === "}") {
          next("}");
          return object;
        }
        next(",");
        white();
      }
    }

    error("Bad object");
  };

  value = function () {
    // Parse a JSON value. It could be an object, an array, a number, a string
    // or a word.
    white();
    switch (ch) {
      case "{":
        return object();
      case "[":
        return array();
      case "-":
        return number();
      case '"':
        return string();
      default:
        return ch >= "0" && ch <= "9" ? number() : word();
    }
  };

  return function (source, reviver) {
    let result;
    text = source;
    at = 0;
    ch = " ";
    result = value();
    white();
    if (ch) {
      error("Syntax error");
    }

    if (typeof reviver === "function") {
      return (function walk(holder, key) {
        let value = holder[key];

        if (value && typeof value === "object") {
          for (let k in value) {
            if (Object.hasOwnProperty.call(value, k)) {
              let v = walk(value, k);
              if (v !== undefined) {
                value[k] = v;
              } else {
                delete value[k];
              }
            }
          }
        }

        return reviver.call(holder, key, value);
      })({ "": result }, "");
    } else {
      return result;
    }
  };
})();

const sampleJSON = `
  {
    "name": "Sonu Ram",
    "age": 27,
    "address": {
      "city": "Lucknow",
      "state": "UP",
      "pin": 226002
    },
    "hobby": ["Gaming", "Movies", "Coding"]
  }
`;

console.log(JSONParser(sampleJSON));
