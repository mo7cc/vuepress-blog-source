package main

import (
	"log"
	"net/http"
	"os"
	"path"
)

func main() {
	// 设置静态文件目录
	pwd, _ := os.Getwd()
	StaticDir := path.Join(pwd, "/dist")
	fs := http.FileServer(http.Dir(StaticDir))

	// 启动服务器
	prot := "9988"
	HostPath := "0.0.0.0:" + prot
	OpenHost := "http://localhost:" + prot

	// 创建自定义的处理函数
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// 添加自定义的返回头
		w.Header().Set("ServerName", "mo7-cc-static-serve")
		w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
		w.Header().Set("Pragma", "no-cache")
		w.Header().Set("Expires", "0")
		// 处理静态文件
		fs.ServeHTTP(w, r)
	})

	log.Println(OpenHost)
	err := http.ListenAndServe(HostPath, nil)
	if err != nil {
		log.Fatal(err)
	}
}
