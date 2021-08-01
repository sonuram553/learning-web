function parseINI(str) {
  const result = {};
  let section = result;

  str.split(/\r?\n/).forEach((line) => {
    let match;

    if ((match = line.match(/^(\w+)=(.+)$/))) section[match[1]] = match[2];
    else if ((match = line.match(/^\[(.+)\]$/)))
      section = result[match[1]] = {};
    else if (!/^\s*(;.*)?$/.test(line))
      throw new Error(`Line: ${line} - is not valid`);
  });

  return result;
}

console.log(
  parseINI(`
name=Vasilis
[address]
city=Tessaloniki`)
);
