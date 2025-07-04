package main

import (
	"fmt"
)

func main() {
	nums := []int{1, 2, 0, 3, 4, 0, 1, 0, 5, 0}
	fmt.Println("nums", nums)
	moveZeroes(nums)
	fmt.Println("nums", nums)

	nums2 := []int{0, 3, 4, 0, 1, 0, 5, 0}
	fmt.Println("nums2", nums2)
	moveZeroes2(nums2)
	fmt.Println("nums2", nums2)
}

// 暴力求解
/*
标记非 0 的值，然后进行替换
*/
func moveZeroes(nums []int) {
	notZero := []int{}
	for _, item := range nums {
		if item != 0 {
			notZero = append(notZero, item)
		}
	}

	for idx := range nums {
		if idx <= len(notZero)-1 {
			nums[idx] = notZero[idx]
		} else {
			nums[idx] = 0
		}
	}
}

// 非0值移动

func moveZeroes2(nums []int) {
	j := 0
	for _, v := range nums {
		if v != 0 {
			nums[j] = v
			j++
		}
	}
	// 将其余值设为0
	for i := j; i < len(nums); i++ {
		nums[i] = 0
	}
}
