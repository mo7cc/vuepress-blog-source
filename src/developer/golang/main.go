// 2>/dev/null ; gorun "$0" "$@" ; exit $?
package main

import (
	"fmt"
	"os"
	"os/exec"
)

func main() {
	fmt.Println("Hello", os.Args[1])

	cmd := exec.Command("git", "version")
	// 带输出的执行
	out, _ := cmd.CombinedOutput()

	fmt.Println(111, string(out))

	str, _ := os.Getwd()
	fmt.Println("当前目录为", str)
	os.Exit(42)
}
