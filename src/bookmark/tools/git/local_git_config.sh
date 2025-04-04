#!/bin/bash

# 设置大小写敏感
git config core.ignorecase false

# 忽略文件权限变更
git config core.filemode false

# 禁用 pull.rebase
git config pull.rebase false
