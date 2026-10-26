# 凌辞的博客

一个基于 Astro 与 Firefly 的长期个人站点，记录网站运营、前端开发、内容方法与日常思考。

- 站点：<https://greenfinchgreen-gif.github.io/Firefly/>
- 仓库：<https://github.com/greenfinchgreen-gif/Firefly>
- 运营规则：[docs/site-operation-rules.md](docs/site-operation-rules.md)

## 技术栈

- Astro 7
- Svelte 5
- TypeScript 6
- Tailwind CSS 4
- Pagefind
- Swup

要求 Node.js `>=22.23.0`、pnpm `11.22.0`。

## 本地开发

```bash
pnpm install
pnpm dev
```

默认开发地址为 `http://localhost:4321`。

## 检查与构建

```bash
pnpm check
pnpm type-check
pnpm build
pnpm preview
```

`pnpm build` 会生成图标、LQIP、Astro 构建、字体子集和 Pagefind 搜索索引。

## 目录

```text
src/
├── components/        # Astro 与 Svelte 组件
├── config/            # 站点、导航、侧边栏和功能配置
├── content/
│   ├── dynamic/       # 动态
│   ├── posts/         # 文章
│   ├── projects/      # 项目
│   └── spec/          # 关于、友链和留言等固定页面
├── layouts/           # 页面布局
├── pages/             # Astro 路由
├── styles/            # 全局与页面样式
└── utils/             # 内容、路由、日期和图像工具
docs/
└── site-operation-rules.md  # 站点运营与开发限制
```

## 内容发布

新文章放在 `src/content/posts`，URL 由文件路径决定。例如：

```text
src/content/posts/site-notes.md
→ /posts/site-notes/
```

最小 Frontmatter：

```yaml
---
title: "文章标题"
published: 2026-10-26
description: "文章摘要"
image: ""
tags:
  - 站点运营
category: "网站运营"
draft: false
comment: false
---
```

当前评论服务尚未配置，因此页面开关中的 `guestbook` 为 `false`，文章默认不加载评论。

## 部署

GitHub Pages 项目页部署在 `/Firefly/` 子路径。部署工作流通过 `BASE_PATH` 控制 Astro `base`：

```yaml
env:
  BASE_PATH: /Firefly
```

本地默认使用根路径 `/`。如后续绑定自定义域名，应同时调整：

- `src/config/siteConfig.ts` 的 `site_url`
- `astro.config.mjs` 的 `base`
- GitHub Pages 的 `CNAME`
- 部署工作流中的 `BASE_PATH`

## 运营原则

- 不展示没有后端支持的评论、打赏、友链或相册入口。
- 不保留 1970 年模板文章、测试动态和示例项目。
- 删除或批量覆盖前建立可恢复备份。
- 修改后运行 Astro 诊断、TypeScript 检查和生产构建。
- 不提交密钥、Token、密码或本地缓存。

完整限制见 [docs/site-operation-rules.md](docs/site-operation-rules.md)。

## 开源与许可

本站基于开源主题 [Firefly](https://github.com/CuteLeaf/Firefly) 构建。Firefly 延续了 [Fuwari](https://github.com/saicaca/fuwari) 的设计与实现基础。

保留上游项目的 MIT 许可、版权声明和页脚署名。本站文章默认采用 CC BY-NC-SA 4.0 许可。

详细许可见 [LICENSE](LICENSE)。
