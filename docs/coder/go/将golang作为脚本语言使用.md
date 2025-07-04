---
permalink: /coder/go/golang_shell.html
---

# 将 golang 作为脚本语言使用

::: warning

该文档有待补充和完善

:::

为什么？

https://github.com/erning/gorun

## 使用方式

```bash
# 安装 gorun
go install github.com/erning/gorun@latest

# 添加环境变量
sudo ln -s ~/go/bin/gorun /usr/local/bin/gorun

# 使用方式
gorun demo.go

```

## 区别

```go title="file:main.go"
// 2>/dev/null ; gorun "$0" "$@" ; exit $?
package main

import (
	"fmt"
	"os"
)

func main() {
	fmt.Println("Hello", os.Args[1])
	os.Exit(42)
}
```

```bash
go run ./main.go
echo $?
# 执行的结果是 1

go build ./main.go
./main
echo $?
# 执行的结果是 42

```

gorun 将：
将文件写入 `$TMPDIR` （或 `/tmp`）中的安全目录下，这样就不会触及实际脚本位置（可能是只读的）
避免同一文件的并行执行之间的竞争
自动清理一段时间内未使用的旧编译文件（无竞争）
取代流程，而不是使用子流程
正确地将参数传递给已编译的应用程序
处理好 GOROOT、GOROOT_FINAL 和工具链的位置
支持嵌入的 go.mod、go.sum 和用于编译的环境变量 - 可以确保可重复构建
