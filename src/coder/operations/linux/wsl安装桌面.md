---
comment: false
permalink: /coder/operations/linux/wsl2_install_desktop.html
---

# WSL2 安装远程桌面

```bash

sudo apt-get install xfce4-terminal
sudo apt-get install xfce4



```

## 安装 VcXsrv

https://sourceforge.net/projects/vcxsrv/

## 添加配置文件

~/.bashrc

```bash

host_ip=$(cat /etc/resolv.conf | grep "nameserver" | cut -f 2 -d " ")
export ALL_PROXY="socks5://$host_ip:10809"

export DISPLAY=localhost:0.0


```

## 启动桌面

启动 XLaunch 可以无脑下一步，然后是个黑屏。

然后在 WSL2 中输入

```bash

 sudo  startxfce4

```

## 参考资料

https://learn.microsoft.com/zh-cn/windows/wsl/tutorials/gui-apps

https://blog.csdn.net/sy95122/article/details/125143100

https://blog.csdn.net/weixin_45934869/article/details/131963546
