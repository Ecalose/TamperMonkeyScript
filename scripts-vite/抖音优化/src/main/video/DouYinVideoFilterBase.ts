import { DOMUtils, log, utils } from "@/env";
import { UtilsDictionary } from "@whitesev/utils/dist/types/src/Dictionary";
import { GM_deleteValue, GM_getValue, GM_setValue } from "ViteGM";

/**
 * 视频信息处理过后的数据结构
 */
export interface DouYinVideoHandlerInfo {
	/** 作者名 */
	nickname?: string;
	/** 作者uid */
	uid?: string;
	/** 视频描述 */
	desc?: string;
	/** 视频话题 */
	textExtra: string[];
	/** 视频标签 */
	videoTag: string[];
	/** 收藏数量 */
	collectCount: number;
	/** 评论数量 */
	commentCount: number;
	/** 点赞数量 */
	diggCount: number;
	/** 分享数量 */
	shareCount: number;
	/** 视频时长（单位：毫秒） */
	duration: number;
	/** 是否是直播 */
	isLive: boolean;
	/** 是否是广告 */
	isAds: boolean;
}

/** 抖音视频的awemeInfo对象信息 */
export type DouYinVideoAwemeInfo = {
	/** 创作者信息 */
	authorInfo: {
		/** 头像 */
		avatarUri: string;
		/** 视频创作者名 */
		nickname: string;
		/** 视频创作者uid */
		uid: string;
	};
	/** 视频id */
	awemeId: string;
	/** 直播间信息（如果存在） */
	cellRoom:
		| undefined
		| {
				/** 直播数据 */
				rawdata: {
					id_str: string;
					/** 直播间所有者信息 */
					owner: {
						/** 头像信息 */
						avatar_thumb: {
							/** 头像链接，但是这个链接参数有问题，需补充路径，即/aweme/ */
							uri: string;
							/** 头像链接数组，建议这个，包含完整的https:... */
							url_list: string[];
						};
						/** 用户id？可能是 */
						id_str: string;
						sec_uid: string;
						/** 直播间id（房间号） */
						web_rid: string;
						/** 用户名 */
						nickname: string;
					};
					/** 直播间标题 */
					title: string;
					/** 直播间人数 */
					user_count: number;
					/** 直播间状态 */
					stats: {
						/** 人数总数量（简称人气值） */
						total_user_str: string;
						/** 在线观众人数 */
						user_count_str: string;
					};
					/** 推流信息 */
					stream_url: {
						extra: {
							width: number;
							height: number;
						};
						/** 推流地址字典 */
						flv_pull_url: {
							[key: string]: string;
						};
						/** 推流地址 */
						hls_pull_url: string;
						/** 推流地址字典 */
						hls_pull_url_map: {
							[key: string]: string;
						};
					};
				};
		  };
	/** 视频创建时间 */
	createTime: number;
	/** 视频描述 */
	desc: string;
	/** 是否是广告 */
	isAds: boolean;
	isFriendLimit: boolean;
	isPrivate: boolean;
	/** 广告信息(如果存在) */
	rawAdData: string | undefined;
	seriesInfo: {};
	shareInfo: {
		/** 视频分享链接的描述 */
		shareLinkDesc: string;
		/** 视频分享链接 */
		shareUrl: string;
	};
	stats: {
		/** 评论数量 */
		commentCount: number;
		/** 点赞数量 */
		diggCount: number;
		/** 分享数量 */
		shareCount: number;
		playCount: number;
		/** 收藏数量 */
		collectCount: number;
		/** 下载数量 */
		downloadCount: number;
		/** 转发数量 */
		forwardCount: number;
		/** 在线观看数量 */
		liveWatchCount: number;
	};
	suggestWords: [
		{
			scene: string;
			words: {
				word: string;
				wordId: string;
				info: string;
			}[];
			hintText: string;
			iconUrl: string;
		}
	][];
	/**话题 */
	textExtra: [];
	video: {
		/** 视频宽度 */
		width: number;
		/** 视频高度 */
		height: number;
		/** 视频分辨率 */
		ratio: string;
		/** 视频时长（单位：毫秒） */
		duration: number;
		/** 视频大小（单位：字节） */
		dataSize: number;
		uri: string;
		playAddr: {
			src: string;
		}[];
		/** 视频播放地址大小 */
		playAddrSize: number;
		playAddrFileHash: string;
		playApi: string;
		playAddrH265: {
			src: string;
		}[];
		/** 视频播放地址大小 */
		playAddrH265Size: number;
		playAddrH265FileHash: string;
		playApiH265: string;
		bitRateList: {
			uri: string;
			dataSize: number;
			width: number;
			height: number;
			playAddr: {
				src: string;
			}[];
			playApi: string;
			isH265: number;
			qualityType: number;
			bitRate: number;
			videoFormat: string;
			gearName: string;
			fps: number;
			playerAccessKey: string;
			featureId: string;
			format: string;
			fileId: string;
			pktOffsetMap: {
				time: number;
				offset: number;
			}[];
			realBitrate: number;
		}[];
		bitRateAudioList: {
			realBitrate: number;
			audioQuality: number;
			bitrate: number;
			codecType: string;
			fileHash: string;
			fileId: string;
			logoType: string;
			mediaType: string;
			quality: string;
			size: number;
			qualityDesc: string;
			urlList: {
				src: string;
			}[];
			indexRange: string;
			initRange: string;
			checkInfo: string;
			firstSegmentRange: string;
		}[];
		/** 视频封面 */
		cover: string;
		/** 视频封面url数组 */
		coverUrlList: string[];
		/** 视频封面uri */
		dynamicCover: string;
		/** 视频封面uri */
		coverUri: string;
		/** 原始封面 */
		originCover: string;
		/** 原始封面 */
		rawCover: string;
		/** 原始封面url数组 */
		originCoverUrlList: string[];
		/** 高斯模糊封面 */
		gaussianCover: string;
		meta: {};
		bigThumbs: {
			duration: number;
			fext: string;
			img_num: number;
			img_url: string[];
			img_urls: string[];
			img_x_len: number;
			img_x_size: number;
			img_y_len: number;
			img_y_size: number;
			interval: number;
			uri: string;
			uris: string[];
		}[];
		videoModel: null;
	};
	/** 视频标签 */
	videoTag: [];
	webRawData: {
		brandAd?: {
			is_ad?: boolean;
		};
		insertInfo?: {
			is_ad?: boolean;
		};
	};
};

type CheckRuleDetail = {
	/** 视频信息的键（awemeInfo） */
	videoInfoKey: string;
	/** 视频信息的值（awemeInfo） */
	videoInfoValue: any;
	/** 自定义规则的键 */
	ruleKey: string;
	/** 自定义规则的值 */
	ruleValue: RegExp | string | undefined | null;
};
export class DouYinVideoFilterBase {
	/** 存储的键 */
	key: string;
	$data = {
		__rule: null as any as UtilsDictionary<
			keyof DouYinVideoHandlerInfo,
			RegExp | string
		>,
		/**
		 * 解析出的规则
		 */
		get rule() {
			if (this.__rule == null) {
				this.__rule = new utils.Dictionary<
					keyof DouYinVideoHandlerInfo,
					RegExp | string
				>();
			}
			return this.__rule;
		},
		/**
		 * 多组规则
		 */
		moreRule: <
			{
				[k in keyof DouYinVideoHandlerInfo]?: RegExp | string;
			}[]
		>[],
	};
	$flag = {
		/** 是否屏蔽直播 */
		isBlockLiveVideo: false,
		/** 是否屏蔽广告 */
		isBlockAdsVideo: false,
	};
	constructor(config: {
		/** 存储的键 */
		key: string;
		/** 是否屏蔽在直播 */
		isBlockLiveVideo?: boolean;
		/** 是否屏蔽广告 */
		isBlockAdsVideo?: boolean;
	}) {
		this.key = config.key;
		this.$flag.isBlockLiveVideo = Boolean(config.isBlockLiveVideo);
		this.$flag.isBlockAdsVideo = Boolean(config.isBlockAdsVideo);
		this.initLocalRule();
	}
	/**
	 * 解析awemeInfo转为规则过滤的字典
	 * @param awemeInfo
	 * @param showLog 是否显示日志输出
	 */
	getAwemeInfoDictData(
		awemeInfo: DouYinVideoAwemeInfo,
		showLog: boolean = false
	): DouYinVideoHandlerInfo {
		let authorInfo =
			awemeInfo?.["authorInfo"] ||
			// @ts-ignore
			awemeInfo?.["author"];
		/** 视频作者名字 */
		let nickname: string = authorInfo?.["nickname"]?.toString();
		/** 视频作者uid */
		let uid: string = authorInfo?.["uid"]?.toString();
		/** 视频描述 */
		let desc: string = awemeInfo?.["desc"]?.toString();
		/** 收藏数量 */
		let collectCount: number =
			awemeInfo?.["stats"]?.["collectCount"] ||
			// @ts-ignore
			awemeInfo?.["statistics"]?.["collect_count"];
		/** 评论数量 */
		let commentCount: number =
			awemeInfo?.["stats"]?.["commentCount"] ||
			// @ts-ignore
			awemeInfo?.["statistics"]?.["comment_count"];
		/** 点赞数量 */
		let diggCount: number =
			awemeInfo?.["stats"]?.["diggCount"] ||
			// @ts-ignore
			awemeInfo?.["statistics"]?.["digg_count"];
		/** 分享数量 */
		let shareCount: number =
			awemeInfo?.["stats"]?.["shareCount"] ||
			// @ts-ignore
			awemeInfo?.["statistics"]?.["share_count"];
		/** 视频时长 */
		let duration: number = awemeInfo?.["video"]?.["duration"];
		let textExtraObj: any[] =
			// @ts-ignore
			awemeInfo?.["textExtra"] || awemeInfo?.["text_extra"];
		/** 视频标签 */
		let textExtra: string[] = [];
		/** 是否是直播间 */
		let isLive: boolean = false;
		/** 是否是广告 */
		let isAds: boolean = false;

		if (typeof textExtraObj === "object" && Array.isArray(textExtraObj)) {
			textExtraObj?.forEach((item) => {
				textExtra.push(item?.["hashtagName"] || item?.["hashtag_name"]);
			});
		}
		let videoTagObj: any[] =
			// @ts-ignore
			awemeInfo?.["videoTag"] || awemeInfo?.["video_tag"];
		let videoTag: string[] = [];
		if (typeof videoTagObj === "object" && Array.isArray(videoTagObj)) {
			videoTagObj.forEach((item) => {
				videoTag.push(item?.["tagName"] || item?.["tag_name"]);
			});
		}

		if (typeof awemeInfo["cellRoom"] === "object") {
			isLive = true;
			if (showLog) {
				log.success("直播间：cellRoom is not null");
			}
		}

		if (awemeInfo["isAds"]) {
			isAds = true;
			if (showLog) {
				log.success("广告：isAds is true");
			}
		} else if (
			typeof awemeInfo["rawAdData"] === "string" &&
			utils.isNotNull(awemeInfo["rawAdData"])
		) {
			isAds = true;
			if (showLog) {
				log.success("广告：rawAdData is not null");
			}
		} else if (awemeInfo["webRawData"]?.["brandAd"]?.["is_ad"]) {
			isAds = true;
			if (showLog) {
				log.success("广告：webRawData.brandAd.is_ad is true");
			}
		} else if (awemeInfo["webRawData"]?.["insertInfo"]?.["is_ad"]) {
			isAds = true;
			if (showLog) {
				log.success("广告：webRawData.insertInfo.is_ad is true");
			}
		}
		return {
			nickname,
			uid,
			desc,
			textExtra,
			videoTag,
			collectCount,
			commentCount,
			diggCount,
			shareCount,
			duration,
			isLive,
			isAds,
		};
	}
	/**
	 * 根据视频信息，判断是否需要屏蔽
	 */
	checkFilterWithRule(details: CheckRuleDetail): boolean {
		if (details.videoInfoValue == null) {
			// awemeInfo的值为空
			return false;
		}
		if (details.ruleValue == null) {
			// 自定义规则的值为空
			return false;
		}
		if (typeof details.videoInfoValue === "string") {
			/* awemeInfo的值是字符串 */
			/* 使用自定义规则的值进行匹配 */
			if (Boolean(details.videoInfoValue.match(details.ruleValue))) {
				return true;
			}
		} else if (typeof details.videoInfoValue === "object") {
			if (Array.isArray(details.videoInfoValue)) {
				/* awemeInfo的值是字符串数组 */
				/* 使用自定义规则的值进行遍历匹配 */
				let findValue = details.videoInfoValue.find((awemeInfoDictValue) => {
					if (
						typeof awemeInfoDictValue === "string" &&
						details.ruleValue != null
					) {
						return Boolean(awemeInfoDictValue.match(details.ruleValue));
					} else {
						return false;
					}
				});
				if (findValue) {
					return true;
				}
			}
		} else if (typeof details.videoInfoValue === "number") {
			if (typeof details.ruleValue === "string") {
				/* awemeInfo的值是数字，用于比较 */
				/* 自定义规则的值是数字，用于比较 */
				let ruleValue = details.ruleValue.trim();
				let compareNumberMatch = ruleValue.match(/(\d+)/);
				if (!compareNumberMatch) {
					log.warn("过滤器-解析比较大小的数字失败: ", details);
					return false;
				}
				let compareNumber = Number(compareNumberMatch[1]);
				// tag的值是数字，用于比较
				if (ruleValue.startsWith(">")) {
					if (ruleValue.startsWith(">=")) {
						// >=
						if (details.videoInfoValue >= compareNumber) {
							return true;
						}
					} else {
						// >
						if (details.videoInfoValue > compareNumber) {
							return true;
						}
					}
				} else if (ruleValue.startsWith("<")) {
					if (ruleValue.startsWith("<=")) {
						// <=
						if (details.videoInfoValue <= compareNumber) {
							return true;
						}
					} else {
						// <
						if (details.videoInfoValue < compareNumber) {
							return true;
						}
					}
				} else if (ruleValue.startsWith("=")) {
					// =
					if (details.videoInfoValue === compareNumber) {
						return true;
					}
				} else {
					// 未经允许的比较符号
					log.warn("过滤器-自定义屏蔽-未经允许的比较符号: ", details);
					return false;
				}
			}
		} else if (typeof details.videoInfoValue === "boolean") {
			if (typeof details.ruleValue === "string") {
				/* awemeInfo的值是boolean */
				let trimRuleValue = details.ruleValue.trim();
				return details.videoInfoValue.toString() === trimRuleValue;
			}
		}
		return false;
	}
	/**
	 * 检测视频是否可以屏蔽，可以屏蔽返回true
	 * @param awemeInfo 视频信息结构
	 */
	checkAwemeInfoIsFilter(awemeInfo: DouYinVideoAwemeInfo): boolean {
		let awemeInfoTagDict = this.getAwemeInfoDictData(awemeInfo);
		let flag = false;
		if (!flag) {
			if (this.$flag.isBlockLiveVideo && awemeInfoTagDict.isLive) {
				log.success("过滤器-屏蔽直播");
				flag = true;
			}
		}
		if (!flag) {
			if (this.$flag.isBlockAdsVideo && awemeInfoTagDict.isAds) {
				log.success("过滤器-屏蔽广告");
				flag = true;
			}
		}
		/* 遍历自定义规则 */
		if (!flag) {
			for (const [ruleKey, ruleValue] of this.$data.rule.entries()) {
				if (!Reflect.has(awemeInfoTagDict, ruleKey)) {
					continue;
				}
				/** 解析出的标签的名字 */
				let tagKey = ruleKey;
				/** 解析出的标签的值 */
				let tagValue = awemeInfoTagDict[tagKey];
				/** 配置 */
				let details = {
					videoInfoKey: tagKey,
					videoInfoValue: tagValue,
					ruleKey: ruleKey,
					ruleValue: ruleValue,
				} as CheckRuleDetail;
				let checkFlag = this.checkFilterWithRule(details);
				if (checkFlag) {
					flag = true;
					log.success(["过滤器-自定义屏蔽: ", details, awemeInfoTagDict]);
					break;
				}
			}
		}
		/* 遍历多组自定义规则 */
		if (!flag) {
			for (const rule of this.$data.moreRule) {
				// 循环单条多组规则
				let moreRuleFlag = true;
				for (const [ruleKey, ruleValue] of Object.entries(rule)) {
					// 判断该规则中的key是否存在于视频信息中
					// 只要有一个不在，那就该条规则不成立
					if (!Reflect.has(awemeInfoTagDict, ruleKey)) {
						moreRuleFlag = false;
						break;
					}
					/** 解析出的标签的名字 */
					let tagKey = ruleKey as keyof DouYinVideoHandlerInfo;
					/** 解析出的标签的值 */
					let tagValue = awemeInfoTagDict[tagKey];

					let details = {
						videoInfoKey: tagKey,
						videoInfoValue: tagValue,
						ruleKey: ruleKey,
						ruleValue: ruleValue,
					};
					let checkFlag = this.checkFilterWithRule(details);
					if (!checkFlag) {
						// 只要有一个不在，那就该条规则不成立
						moreRuleFlag = false;
						break;
					}
				}
				if (moreRuleFlag) {
					flag = true;
					log.success([
						"多组过滤器-自定义屏蔽: ",
						rule,
						this.getAwemeInfoDictData(awemeInfo),
					]);
					break;
				}
			}
		}
		return flag;
	}
	/**
	 * 移除视频
	 */
	removeAweme(videoList: any[], deleteIndex: number): void;
	removeAweme($video: HTMLElement): void;
	removeAweme(...args: any[]) {
		if (args.length === 1) {
			let $video = args[0];
			if ($video != null && $video instanceof HTMLElement) {
				$video.remove();
			}
		} else if (args.length === 2) {
			let videoList = args[0];
			let deleteIndex = args[1];
			if (typeof deleteIndex === "number") {
				let item = videoList[deleteIndex];
				if (item != null && item instanceof Element) {
					item?.remove();
				}
				videoList.splice(deleteIndex, 1);
			}
		}
	}
	/**
	 * 解析并初始化自定义规则
	 */
	initLocalRule() {
		let localRule = this.get().trim();
		let localRuleSplit = localRule.split("\n");
		this.$data.rule.clear();
		this.$data.moreRule = [];
		localRuleSplit.forEach((item) => {
			if (utils.isNull(item)) {
				return;
			}
			/* 去除左右空格 */
			let trimItem = item.trim();
			/* 按##分割 */
			let itemSplit = trimItem.split("##");
			if (itemSplit.length < 2) {
				/* 分割出的应该是["tagName",..."tagValue"] */
				return;
			}
			let keyName = itemSplit[0];
			/* 去除第一个tagName，后面的都是value */
			itemSplit.shift();
			if (keyName === "more") {
				// 多组规则组合
				let keyValue = itemSplit.join("##");
				let moreItemSplit = keyValue.split("##");
				let moreRule = {};
				for (let index = 0; index < moreItemSplit.length; index += 2) {
					let ruleKey = moreItemSplit[index];
					let ruleValue = moreItemSplit[index + 1];
					try {
						if (ruleValue.match(/^>|<|=/g)) {
							// 数值比较的
							Reflect.set(moreRule, ruleKey, ruleValue.trim());
						} else {
							// 正则匹配的
							let regExpKeyValue = new RegExp(ruleValue, "g");
							Reflect.set(moreRule, ruleKey, regExpKeyValue);
						}
					} catch (error) {
						log.error("多组-自定义视频过滤规则-正则解析错误：" + error);
						log.error("多组-错误的规则：" + item);
					}
				}
				this.$data.moreRule.push(moreRule);
			} else {
				let keyValue = itemSplit.join("");
				if (keyValue.trim() === "") {
					// 忽略空值
					return;
				}
				try {
					if (keyValue.match(/^>|<|=/g)) {
						// 数值比较的
						this.$data.rule.set(keyName as any, keyValue.trim());
					} else {
						// 正则匹配的
						let regExpKeyValue = new RegExp(keyValue, "g");
						this.$data.rule.set(keyName as any, regExpKeyValue);
					}
				} catch (error) {
					log.error("自定义视频过滤规则-正则解析错误：" + error);
					log.error("错误的规则：" + item);
				}
			}
		});
	}
	/**
	 * 更新规则
	 */
	updateRule(ruleText: string) {
		ruleText = ruleText.trim();
		if (ruleText == "") {
			return;
		}
		let localRule = this.get().trim();
		localRule = localRule + "\n" + ruleText;
		this.set(localRule);
		this.initLocalRule();
	}
	set(value: string) {
		GM_setValue(this.key, value);
	}
	get() {
		return GM_getValue(this.key, "");
	}
	/**
	 * 清空存储的值
	 */
	clear() {
		this.set("");
	}
	/**
	 * 销毁存储的值
	 */
	destory() {
		GM_deleteValue(this.key);
	}
}
