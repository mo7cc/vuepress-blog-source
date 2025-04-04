#!/bin/bash

# 查看当前安装的 git 版本
git version

# 设置用户名（把 墨七 替换成你自己的名字）
git config --global user.name 墨七

# 查看设置好的用户名
git config user.name

# 设置邮箱(替换成你自己的邮箱)
git config --global user.email meichangliang@outlook.com

# 查看设置好的邮箱
git config user.email

# 禁用 pull.rebase
git config --global pull.rebase false

# 设置大小写敏感
git config --global core.ignorecase false

# 禁用中文转码
git config --global core.quotepath false

# 提交时转换为 LF，检出时不转换
git config --global core.autocrlf input

# 提交包含混合换行符的文件发出警告
git config --global core.safecrlf warn

# 忽略文件权限的变更(全局)
git config --global core.filemode false

# 设置 init 时 默认分支为 main
git config --global init.defaultBranch main

# 关闭分支显示分页 显示
git config --global pager.branch false
