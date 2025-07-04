var groupAnagrams = function (strs) {
  const hasMap = {};
  for (let i = 0; i < strs.length; i++) {
    const el = strs[i];
    let splitStr = el.split('');
    splitStr = splitStr.sort();
    let sortStr = splitStr.join('');

    if (hasMap[sortStr]) {
      hasMap[sortStr].push(el);
    } else {
      hasMap[sortStr] = [el];
    }
  }

  let returnVal = [];

  for (const key in hasMap) {
    if (Object.hasOwnProperty.call(hasMap, key)) {
      const el = hasMap[key];
      returnVal.push(el);
    }
  }

  return returnVal;
};
// 代码执行块
(function () {
  const strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];

  const result = groupAnagrams(strs);
  console.log('result', result);
})();
