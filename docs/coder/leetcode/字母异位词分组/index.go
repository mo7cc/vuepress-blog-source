package main

import (
	"fmt"
	"sort"
	"strings"
)

func main() {
	strs := []string{"eat", "tea", "tan", "ate", "nat", "bat"}

	results := groupAnagrams(strs)
	fmt.Println("results", results)
}

// 暴力求解
func groupAnagrams(strs []string) [][]string {
	hasMap := map[string][]string{}
	for _, v := range strs {
		splitStr := strings.Split(v, "")
		sort.Strings(splitStr)
		sortStr := strings.Join(splitStr, "")
		hasMap[sortStr] = append(hasMap[sortStr], v)
	}

	returnVal := [][]string{}

	for _, v := range hasMap {
		returnVal = append(returnVal, v)
	}

	return returnVal
}
