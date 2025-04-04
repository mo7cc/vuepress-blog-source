---
icon: bing
permalink: /bookmark/photos/bing_img_api.html
---

# 必应每日壁纸 api

采用 golang 编写，每日定时爬取 https://cn.bing.com 当日的 7 张壁纸，并将链接固定下来进行 302 重定向。 idx 参数分别对应 当日壁纸数组 的序号，`idx=1` 时则返回当天壁纸。

支持 `http` 以及 `https` 。

## HTML 和 Markdown 使用

```html
<img src="//file.mo7.cc/api/public/bz" />

<img src="//file.mo7.cc/api/public/bz?idx=3" />
```

```markdown
![](//file.mo7.cc/api/public/bz?idx=1)
![](//file.mo7.cc/api/public/bz?idx=3)
![](//file.mo7.cc/api/public/bz)
```

![](//file.mo7.cc/api/public/bz?idx=1)
![](//file.mo7.cc/api/public/bz?idx=3)
![](//file.mo7.cc/api/public/bz)

> 当 `idx` 参数小于 1 时，则会随机返回一张壁纸

## api 接口返回当日 json 数据

```js
axios({
  method: 'get',
  url: '//file.mo7.cc/api/public/url',
  params: {},
}).then((response) => {
  const imgList = response.data.Data;
  console.log(imgList);
});
```

API 完整地址:
https://file.mo7.cc/api/public/url

::: info

程序采用 golang 编写，采用 302 重定向返回图片，流量消耗可以忽略不计。程序定时爬取数据并缓存在内存中，因此可以支持极高的并发。欢迎食用 ~

:::
