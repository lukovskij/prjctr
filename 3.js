const checkParentheses = (str1) => {
  let str = String(str1);
  const pairs = ["[]", "()", "{}"];
  return (
    pairs.filter((el) => {
      const frst = str.indexOf(el[0]) !== -1 && str[str.indexOf(el[0])];
      const last = str.indexOf(el[1]) !== -1 && str[str.indexOf(el[1])];
      return (
        el.includes(`${frst}${last}`) &&
        str.indexOf(frst) < str.indexOf(last, str.indexOf(frst))
      );
    }).length > 0
  );
};

console.log(checkParentheses("--()--")); // true
console.log(checkParentheses("-a]--[")); // false
console.log(checkParentheses("dsa{vsfs{ad")); // false
console.log(checkParentheses("j78(g5b]uyg")); // false
console.log(checkParentheses(",m{i987y}hj")); // true
console.log(checkParentheses("dsa[3ed---:]::")); // true
