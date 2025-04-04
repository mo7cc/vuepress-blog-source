// 暴力求解
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    const el = nums[i];
    const diff = target - el;
    const idxOf = nums.indexOf(diff);
    if (idxOf > -1 && idxOf != i) {
      return [i, idxOf];
    }
  }
  return;
};

// 利用哈希map
var twoSum2 = function (nums, target) {
  var map = {};
  for (let i = 0; i < nums.length; i++) {
    const el = nums[i];
    const res = map[target - el];
    if (res !== undefined) {
      return [res, i];
    }
    map[el] = i;
  }
  return;
};

// 代码执行块
(function () {
  const nums = [2, 7, 11, 15];
  const target = 9;
  // const result = twoSum(nums, target);
  // console.log('result', result);

  const result2 = twoSum2(nums, target);
  console.log('result2', result2);
})();
