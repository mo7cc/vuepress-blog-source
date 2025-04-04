// 暴力求解
var longestConsecutive = function (nums) {
  //去重
  const hasMap = {};
  const newArr = [];
  for (const item of nums) {
    if (!hasMap[item]) {
      hasMap[item] = true;
      newArr.push(item);
    }
  }
  // 排序
  newArr.sort((a, b) => {
    return a - b;
  });

  let lineArr = [];
  let result = [];

  let max = 0;

  if (newArr.length == 1) {
    return 1;
  }

  for (let i = 0; i < newArr.length; i++) {
    let nextIdx = i + 1;
    if (nextIdx > newArr.length) {
      nextIdx = 0;
    }
    const now = newArr[i];
    const next = newArr[nextIdx];
    if (next - now == 0) {
      continue;
    }
    if (next - now == 1) {
      lineArr.push(now);
    } else {
      lineArr.push(now);
      result.push(lineArr);
      if (lineArr.length > max) {
        max = lineArr.length;
      }
      lineArr = [];
    }
  }

  console.log('result', result);

  return max;
};

// 代码执行块
(function () {
  const nums = [100, 4, 200, 1, 3, 2];
  const result = longestConsecutive(nums);
  console.log('result', result);
})();
