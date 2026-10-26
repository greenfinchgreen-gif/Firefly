import type { BooknavGroup, BooknavPageConfig } from "../types/booknavConfig";

export const booknavPageConfig: BooknavPageConfig = {
	title: "书签导航",
	description: "日常开发、内容维护与设计工具",
	favicon: {
		enabled: true,
		api: "https://a.favicon.im/{domain}",
	},
};

export const booknavConfig: BooknavGroup[] = [
	{
		id: "dev",
		name: "开发",
		icon: "material-symbols:code-rounded",
		desc: "站点开发常用的框架与文档",
		weight: 100,
		items: [
			{
				title: "GitHub",
				url: "https://github.com",
				desc: "代码托管与协作平台",
				icon: "fa7-brands:github",
				weight: 10,
			},
			{
				title: "MDN Web Docs",
				url: "https://developer.mozilla.org/zh-CN/",
				desc: "Web 平台技术文档",
				weight: 9,
			},
			{
				title: "Astro",
				url: "https://astro.build",
				desc: "本站使用的内容驱动 Web 框架",
				weight: 8,
			},
			{
				title: "Svelte",
				url: "https://svelte.dev",
				desc: "编译式前端组件框架",
				weight: 7,
			},
			{
				title: "Tailwind CSS",
				url: "https://tailwindcss.com",
				desc: "原子化 CSS 框架",
				weight: 6,
			},
		],
	},
	{
		id: "project",
		name: "项目",
		icon: "material-symbols:rocket-launch",
		desc: "本站与上游模板",
		weight: 90,
		items: [
			{
				title: "凌辞的博客源码",
				url: "https://github.com/greenfinchgreen-gif/Firefly",
				desc: "本站当前仓库",
				icon: "/favicon/firefly-32.png",
				weight: 10,
			},
			{
				title: "Firefly 上游",
				url: "https://github.com/CuteLeaf/Firefly",
				desc: "本站使用的 Astro 博客主题",
				weight: 9,
			},
		],
	},
	{
		id: "design",
		name: "设计",
		icon: "material-symbols:palette-outline-rounded",
		desc: "图标与视觉资源",
		weight: 80,
		items: [
			{
				title: "Iconify",
				url: "https://icon-sets.iconify.design",
				desc: "开源图标集合",
				weight: 10,
			},
			{
				title: "iconfont",
				url: "https://www.iconfont.cn",
				desc: "阿里巴巴矢量图标库",
				weight: 9,
			},
		],
	},
	{
		id: "tools",
		name: "工具",
		icon: "material-symbols:build-outline-rounded",
		desc: "图片处理与内容发布辅助",
		weight: 70,
		items: [
			{
				title: "TinyPNG",
				url: "https://tinypng.com",
				desc: "在线压缩 PNG / JPEG",
				weight: 10,
			},
			{
				title: "Squoosh",
				url: "https://squoosh.app",
				desc: "图片压缩与格式转换",
				weight: 9,
			},
		],
	},
];
