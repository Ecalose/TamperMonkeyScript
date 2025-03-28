<template>
	<div class="post-list">
		<div class="post-list-item" v-for="item in postList">
			<div class="user-info" @click="gotoUserHome(item.replyer.portrait)">
				<div class="user-avatar">
					<img :src="TiebaUrlHandler.getUserAvatar(item.replyer.portrait)" alt="" />
				</div>
				<div class="user-info-text">
					<div class="user-name">
						{{
							item.replyer.name_show ||
							item.replyer.name
						}}
					</div>
					<div class="user-time">
						评论了你的{{ item.is_floor === 1 ? "回复" : "帖子" }} {{ utils.formatTime(Number(item.time) * 1000) }}
					</div>
				</div>
			</div>
			<div class="reply-content">
				{{ item.content }}
			</div>
			<div class="post-info">
				<div class="quote-user" v-if="item.quote_pid"
					@click="gotoLzlPost(item.thread_id, item.post_id, item.quote_pid)">
					{{ item.quote_user.name_show || item.quote_user.name }}：{{ item.quote_content }}
				</div>
				<div class="post-info__inner" @click="gotoPost(item.thread_id)">
					<div class=" post-image" v-if="item?.thread_img_url || item?.thread_content?.img">
						<img :src="item?.thread_img_url || item?.thread_content?.img" alt=""></img>
					</div>
					<div class="post-content">{{ item.title || item.thread_content.title }}</div>
				</div>
			</div>
			<div class="fname-text" @click="gotoForum(item.fname)">{{
				item.fname }}</div>
		</div>
		<el-empty description="暂无更多数据" v-if="postList.length === 0" />
		<div id="load-more" class="bottom-msg" v-show="hasMore && postList.length != 0">
			正在加载...
		</div>
		<div class="bottom-msg" v-show="!hasMore && postList.length != 0">已无更多</div>
	</div>
</template>

<script lang="ts" setup>
import { $, log, utils } from "@/env";
import { TiebaSmallAppApi } from "../api/TiebaSmallAppApi";
import { TiebaUrlHandler } from "../handler/TiebaUrlHandler";

let pn = ref(1);
let isFirstLoad = ref(false);
let isLoading = ref(false);
let hasMore = ref(true);
let postList = ref<
	Required<Exclude<
		Awaited<ReturnType<typeof TiebaSmallAppApi.replyme>>,
		undefined
	>>["reply_list"][0][]
>([]);

let observe = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				loadMore();
			}
		});
	},
	{
		root: null,
		rootMargin: "0px 0px 0px 0px",
		threshold: 0.2,
	}
);
const cancleScrollListener = () => {
	observe?.disconnect();
	isLoading.value = false;
	log.info("移除滚动监听");
};

let loadMore = async () => {
	let data = await TiebaSmallAppApi.replyme(pn.value);
	log.info(data);
	hasMore.value = Boolean(data?.has_more);
	if (!hasMore.value) {
		cancleScrollListener();
	}
	if (data) {
		pn.value++;
		if (Array.isArray(data.reply_list)) {
			postList.value = postList.value.concat(data.reply_list);
		}
		if (!isFirstLoad.value) {
			isFirstLoad.value = true;
			if (hasMore.value) {
				log.success(`设置监听滚动加载`);
				observe.observe($("#load-more")!);
			}
		}
	}
};
let gotoUserHome = function (portrait: string) {
	window.open(TiebaUrlHandler.getUserHome(portrait), "_blank");
};
let gotoPost = function (postId: string | number) {
	window.open(TiebaUrlHandler.getPost(postId), "_blank");
};
let gotoForum = function (fName: string) {
	window.open(TiebaUrlHandler.getForum(fName), "_blank");
};
let gotoLzlPost = function (tid: string | number, pid: string | number, targetId: string | number) {
	window.open(TiebaUrlHandler.getPost(tid) + `pages/uni-pb/uni-pb?pid=${pid}&from=msg&targetId=${targetId}&tid=${tid}`, "_blank");
}

onMounted(async () => {
	postList.value = [];
	const loading = ElLoading.service({
		lock: true,
		text: "Loading",
		background: "rgba(0, 0, 0, 0.7)",
	});
	try {
		await loadMore()
	} catch (error) {
		log.error(error)
	}
	loading.close();
});
</script>

<style scoped>
.post-list-item {
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 10px 15px;
	border-bottom: 5px solid #efefef;
}

.post-list-item:last-child {
	border-bottom: 0;
}

.user-info {
	display: flex;
	align-items: center;
	gap: 5px;
}



.user-time {
	font-size: 0.8em;
	color: #999;
}

.user-avatar img {
	width: 35px;
	height: 35px;
	border-radius: 50%;
}

.reply-content {
	font-size: 0.9em;
	color: #4a4a4a;
}

.post-info {
	display: flex;
	align-items: center;
	background-color: #efefef;
	color: #434343;
	border-radius: 6px;
}

.post-info__inner {
	display: flex;
	align-items: center;
	height: 100px;
	width: 100%;
}

.post-content {
	overflow: hidden;
	line-clamp: 2;
	-webkit-line-clamp: 2;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	color: #545454;
	margin-left: 5px;
}

.post-info:has(.quote-user) {
	flex-direction: column;
	align-items: start;
	padding: 10px;
	gap: 10px;
}

.post-info:has(.quote-user) .post-content {
	flex: 1;
	align-content: center;
	padding: 0px 10px;
	margin-left: 0px;
	background: #fff;
	height: inherit;
}

.post-image {
	width: 100px;
	height: 100px;
}

.post-image img {
	width: inherit;
	height: inherit;
	border-radius: 6px;
}

.fname-text {
	color: #999;
}

.bottom-msg {
	text-align: center;
	color: #999;
	padding: 10px 0;
}
</style>