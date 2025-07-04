package main

import (
	"fmt"
	"sort"
)

func main() {
	nums := []int{
		-1, 0, 1, 2, -1, -4,
	}

	results := threeSum(nums)
	fmt.Println("results", results)
}

// 暴力求解
/*
 */
func threeSum(nums []int) [][]int {
	ans := [][]int{}
	sort.Ints(nums)
	n := len(nums)

	// 枚举a
	for first := range nums {
		if first > 0 && nums[first] == nums[first-1] {
			continue
		}
		// c 对应的指针初始指向数组的最右端
		third := n - 1
		target := -1 * nums[first]
		// 枚举B
		for second := first + 1; second < n; second++ {
			// 需要和上一次枚举的数不同threeSum
			if second > first+1 && nums[second] == nums[second-1] {
				continue
			}
			// 需要保证 b 的指针在 c 的指针的左侧
			for second < third && nums[second]+nums[third] > target {
				third--
			}

			// 如果指针重合，随着 b 后续的增加
			// 就不会有满足 a+b+c=0 并且 b<c 的 c 了，可以退出循环
			if second == third {
				break
			}
			if nums[second]+nums[third] == target {
				ans = append(ans, []int{nums[first], nums[second], nums[third]})
			}

		}

	}

	return ans
}
