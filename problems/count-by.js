function countBy(items, groupName) {
  const counts = [];

  for (let item of items) {
    const name = groupName(item);
    const known = counts.findIndex((count) => count.name === name);

    if (known === -1) counts.push({ name, count: 1 });
    else counts[known].count++;
  }

  return counts;
}

module.exports = countBy;

console.log(countBy([1, 2, 3, 4, 5], (n) => n > 2));
