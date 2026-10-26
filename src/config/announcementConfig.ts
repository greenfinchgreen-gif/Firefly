import type { AnnouncementConfig } from "../types/announcementConfig";

export const announcementConfig: AnnouncementConfig = {
	// 公告标题，留空则走i18n默认标题
	title: "",

	// 公告内容
	content:
		"这里记录网站运营、技术实践与内容方法。新文章会持续补充，欢迎从归档或系列开始阅读。",

	// 是否允许用户关闭公告
	closable: true,

	link: {
		// 启用链接
		enable: true,
		// 链接文本
		text: "浏览归档",
		// 链接 URL
		url: "/archive/",
		// 内部链接
		external: false,
	},
};
