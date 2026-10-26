---
title: "Firefly 的 Frontmatter 与 URL 规则"
published: 2026-10-24
description: "从内容集合、文件路径、排序到系列顺序，整理 Firefly 文章系统里真正影响路由和维护的字段。"
image: ""
tags:
  - Firefly
  - Astro
  - Markdown
  - Frontmatter
category: "技术笔记"
comment: false
series: "Firefly 实战笔记"
seriesOrder: 1
---

给 Astro 博客加文章时，最容易混淆的是“文件名、Frontmatter 字段和最终 URL 到底谁决定什么”。

Firefly 的内容系统并不复杂，但必须把几个概念分开：

- 内容集合决定文件从哪里读取。
- 文件路径决定文章 ID。
- 路由把文章 ID 转成 URL。
- Frontmatter 决定标题、日期、分类、系列和展示行为。

## 内容集合的位置

Firefly 在 `src/content.config.ts` 中定义集合。文章读取规则是：

```ts
loader: glob({
  pattern: "**/*.{md,mdx}",
  base: "./src/content/posts",
})
```

因此下面两个文件都会成为文章：

```text
src/content/posts/site-notes.md
src/content/posts/guide/astro-basics.mdx
```

文件后缀可以是 `.md` 或 `.mdx`，子目录也会被递归读取。

## 文件路径就是文章 ID

文章路由在 `src/pages/posts/[...slug].astro` 中读取排序后的内容，再把 `entry.id` 去掉扩展名作为 URL 参数。

例如：

| 文件 | 文章 ID | URL |
| --- | --- | --- |
| `guide/astro-basics.md` | `guide/astro-basics` | `/posts/guide/astro-basics/` |
| `site-notes.mdx` | `site-notes` | `/posts/site-notes/` |

站点的 `trailingSlash` 配置为 `always`，所以内部链接应保留末尾斜杠。

这也意味着重命名文件或移动目录会改变 URL。旧文章已经有外部引用时，改名就需要同步处理重定向，否则旧链接会失效。

## `slug` 不是当前文章 schema 的字段

Firefly 的模板示例文章里有时会出现 `slug`，但当前 `src/content.config.ts` 的文章 schema 并没有定义它，路由也不读取它。

真正决定文章 URL 的是文件路径。

因此新文章不应依赖 `slug`：

```yaml
---
title: "文章标题"
published: 2026-10-24
description: "文章摘要"
image: ""
tags: [Astro, Firefly]
category: "技术笔记"
draft: false
---
```

如果希望 URL 是英文，最稳妥的做法是直接用英文文件名，而不是在 Frontmatter 里再写一个看似有效、实际不参与路由的字段。

## 一篇有效文章至少需要什么

`title` 和 `published` 是必填项。一个适合长期维护的最小示例是：

```yaml
---
title: "文章标题"
published: 2026-10-24
description: "一句话说明这篇文章解决什么问题"
image: ""
tags:
  - Astro
  - 静态站点
category: "技术笔记"
draft: false
comment: false
---
```

常用字段的作用如下：

| 字段 | 作用 |
| --- | --- |
| `title` | 文章标题 |
| `published` | 发布时间，参与排序和展示 |
| `updated` | 可选更新时间 |
| `description` | 列表摘要、页面描述与分享摘要 |
| `image` | 封面图；留空则不显示 |
| `tags` | 标签列表 |
| `category` | 分类 |
| `pinned` | 是否优先排在普通文章前 |
| `draft` | 是否为草稿 |
| `comment` | 是否允许渲染评论组件 |
| `series` | 系列名称 |
| `seriesOrder` | 系列内顺序 |

## 日期与排序

文章列表先按 `pinned` 排序，再按 `published` 降序排列。也就是说：

1. 置顶文章永远排在普通文章前。
2. 同为置顶或同为普通文章时，日期更新的在前。

系列页使用另一套规则：先按 `seriesOrder` 升序，没有设置序号的排最后，然后才按发布日期和标题兜底。

这是一套很实用的分工：

- 首页和归档表达“最近写什么”。
- 系列页表达“应该按什么顺序读”。

如果系列已经有明确阅读顺序，就为每篇设置 `seriesOrder`。否则系列导航会按日期倒序，读者可能先看到结论，再看到前置概念。

## 草稿的边界

生产构建会过滤 `draft: true` 的文章，开发环境仍允许查看草稿。

这带来一个容易误解的地方：本地 `pnpm dev` 能看到草稿，不代表部署后的站点也能看到。

草稿适合：

- 还没写完的正文
- 暂时缺少事实核验的内容
- 等待图片或数据的文章

不适合：

- 包含密钥或私人信息的临时记录
- 已经能公开但忘记切换状态的文章

涉及敏感信息时，不要依赖 `draft` 隐藏，直接不把内容放进仓库。

## 修改文章时的检查顺序

发布或调整一篇已有文章时，按下面顺序检查最省时间：

1. 文件名和目录是否仍符合预期 URL。
2. `title`、`description` 是否与正文一致。
3. `published` 是否有效。
4. 分类和标签是否使用现有口径。
5. 系列名与 `seriesOrder` 是否正确。
6. `draft` 是否已经切换为 `false`。
7. 站内链接是否带有正确的路径和末尾斜杠。

把“文件路径决定 URL”这条规则记住以后，Frontmatter 就不再承担它本来没有的职责，文章维护会稳定很多。
