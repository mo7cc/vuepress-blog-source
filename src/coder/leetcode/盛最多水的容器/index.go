package main

import (
	"fmt"
)

func main() {
	nums := []int{
		1, 8, 6, 2, 5, 4, 8, 3, 7,
	}
	results := maxArea(nums)
	fmt.Println("results", results)
}

// 暴力求解
/*
计算最大容积
容积的公式为 底*高

底 = 当前下标和未来下标的差
高 = 二者之间最大值
*/
func maxArea(height []int) int {
	res := 0             // 最大面积
	l := 0               // 最左边
	r := len(height) - 1 // 最右边

	for l < r {

		y := 0
		x := r - l

		if height[l] < height[r] {
			y = height[l]
			l++
		} else {
			y = height[r]
			r--
		}
		are := y * x
		if are > res {
			res = are
		}
	}

	return res
}
