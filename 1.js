const groupBy = (array, func) => {
  if (
    Array.isArray(array) &&
    array.filter((el) => String(el).indexOf(".")).length > 0
  ) {
    return array.reduce((acc, item) => {
      const key = String(func(item)).split(".")[0];
      if (acc.hasOwnProperty(key)) {
        acc[key] = [...acc[key], item];
      } else {
        acc[key] = [item];
      }
      return acc;
    }, {});
  }
  return null;
};

console.log(groupBy([-3.6, -3.7, 6.4, 8.9], Math.floor));
// { '3': [3.6, 3.7], '6': [6.4], '8': [8.9] }
