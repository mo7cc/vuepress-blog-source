package main

import (
	"fmt"
	"sort"
)

func main() {
	nums := []int{
		0, 1, 1, 2,
	}

	results := longestConsecutive(nums)
	fmt.Println("results", results)

	results2 := longestConsecutive2(nums)
	fmt.Println("results2", results2)
}

// 暴力求解
/*
下一个减去上一个，结果为1则判定为有效
*/
func longestConsecutive(nums []int) int {
	// 去重
	hasMap := map[int]bool{}
	newArr := []int{}
	for _, v := range nums {
		if !hasMap[v] {
			hasMap[v] = true
			newArr = append(newArr, v)
		}
	}
	// 排序
	sort.Ints(newArr)

	// fmt.Println("newArr", newArr)

	lineArr := []int{}
	// result := [][]int{}

	max := 0

	if len(newArr) == 1 {
		return 1
	}

	for idx, item := range newArr {
		nextIdx := idx + 1
		if nextIdx > len(newArr)-1 {
			nextIdx = 0
		}
		now := item
		next := newArr[nextIdx]

		if next-now == 0 {
			continue
		}

		if next-now == 1 {
			lineArr = append(lineArr, item)
		} else {
			lineArr = append(lineArr, item)
			// result = append(result, lineArr)
			if len(lineArr) > max {
				max = len(lineArr)
			}
			lineArr = []int{}
		}

	}

	// fmt.Println("result", result)

	return max
}

// 利用哈希表
/*
将数组映射成哈希表
然后在哈希表中找-1的数字是否存在
*/
func longestConsecutive2(nums []int) int {
	numSet := map[int]bool{}
	for _, num := range nums {
		numSet[num] = true
	}
	longestStreak := 0
	for num := range numSet {
		if !numSet[num-1] {
			currentNum := num
			currentStreak := 1
			for numSet[currentNum+1] {
				currentNum++
				currentStreak++
			}
			if longestStreak < currentStreak {
				longestStreak = currentStreak
			}
		}
	}
	return longestStreak
}
