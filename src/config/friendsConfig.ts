import type { FriendLink, FriendsPageConfig } from "../types/friendsConfig";

export const friendsPageConfig: FriendsPageConfig = {
	title: "友链与交流",
	description: "优先交换真实、长期维护的个人站点",
	showCustomContent: true,
	showComment: false,
	randomizeSort: false,
};

// 暂不放置没有真实互换关系的示例链接，后续只添加长期可访问的个人站点。
export const friendsConfig: FriendLink[] = [];

export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
