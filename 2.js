const invert = (obj) => {
  const objKeys = Object.keys(obj);
  if (!objKeys.length) return null;

  return objKeys.reduce((acc, item) => {
    const key = obj[item];
    // для перевірки наявності подібних ключів консоь знизу :)
    if (acc.hasOwnProperty(key)) {
      acc[key] = [...acc[key], item];
    } else {
      acc[key] = item;
    }
    return acc;
  }, {});
};

console.log(invert({ a: "some", b: "object", c: 1 }));
console.log(invert({ a: "some", test: "some", b: "object", c: 1 }));
// { 'some': 'a', 'object': 'b', '1': 'c' }
