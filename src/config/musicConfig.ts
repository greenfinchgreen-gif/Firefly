import type { MusicPlayerConfig } from "../types/musicConfig";

export const musicPlayerConfig: MusicPlayerConfig = {
	// 在确认可合法使用的音乐素材前关闭播放器。
	showInNavbar: false,
	showInSidebar: false,
	mode: "local",
	volume: 0.7,
	playMode: "list",
	showLyrics: false,
	meting: {
		api: "",
		server: "netease",
		type: "playlist",
		id: "",
		auth: "",
		fallbackApis: [],
	},
	local: {
		playlist: [],
	},
};
