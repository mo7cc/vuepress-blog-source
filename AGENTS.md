# AGENTS.md

## 项目简介

这是一个基于 `VuePress Theme Hope` 打造的个人博客应用。用于记录 和 存放 学习笔记、日记、常用脚本等内容。大部分的内容都是采用 Markdown 格式编写，方便阅读和维护。

日常会使用 Obsidian 进行内容的编写和管理，最后由 `VuePress` 进行渲染和发布。

`assets` 目录存放静态资源，如图片、模板、临时文件等。
`diary` 目录存放日记内容。
`docs` 目录则是 `VuePress` 的项目源码目录，用于生成网站和对外发布的文章。
`docs_draft` 目录存放草稿内容，未发布的文章会先存放在这里。
`drawing` 目录存放手绘插画。
`private` 目录存放一些不对外公开的内容。
`script` 目录存放一些常用的脚本文件。

## 开发规范

- 代码风格: Prettier + ESLint
- 命名规范: 驼峰命名
- 文件夹命名: 小写字母加下划线（kebab_case）

## 常用命令

- 本地预览: bun run dev
- 构建: bun run build
