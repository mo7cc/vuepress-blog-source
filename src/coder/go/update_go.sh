#!/bin/bash

# 查看系统类型
arch
# 下载地址(x86_64)
DownloadUrl="https://dl.google.com/go/go1.23.6.linux-amd64.tar.gz"

# 下载地址(aarch64 arm64)
# DownloadUrl="https://dl.google.com/go/go1.23.6.linux-arm64.tar.gz"

# 其余系统类型的下载地址可以查看 https://golang.google.cn/dl/

# 开始下载
curl -o "goPackage" "${DownloadUrl}"

# 删除老版本(亲测，不删除老版本会出现各种莫名其妙的问题)
rm -rf /usr/lib/go

# 解压 goPackage 到 /usr/lib/go
sudo tar -zxvf goPackage -C /usr/lib

#  删除 goPackage
rm -rf goPackage
