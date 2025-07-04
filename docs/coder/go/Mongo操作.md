---
permalink: /coder/go/go_mongo.html
---

# mongo - golang 操作

::: warning

该文档有待补充和完善

:::

任务：

1. 创建一个数据库，名为：bz
2. 创建一个长度为 8 的固定集合
3. 获取地址数组插入

```json
{
  "_id": 1,
  "url": "xxxx"
}
```

4. 获取地址数组进行返回与填充

```js
db.createCollection('bingUrl', { capped: true, size: 8 });

db.bingUrl.isCapped();

db.bingUrl.insert({
  _id: 0,
  url: 'https://bing.com',
});
```

属性 1:对固定集合进行插入速度极快
属性 2:按照插入顺序的查询输出速度极快
属性 3:能够在插入最新数据时,淘汰最早的数据

## 使用文档
