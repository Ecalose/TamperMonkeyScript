import { NetDiskAuthorization_Lanzouyx } from "./NetDiskAuthorization_Lanzouyx";
import { NetDiskAuthorization_123pan } from "./NetDiskAuthorization_123pan";

/** 网盘-直链鉴权获取处理 */
export const NetDiskAuthorization = {
	/**
	 * 运行于ready
	 */
	init() {
		Object.keys(NetDiskAuthorization.netDisk).forEach((keyName) => {
			this.netDisk[keyName]();
		});
	},
	netDisk: <
		{
			[key: string]: Function;
		}
	>{
		/**
		 * 123网盘，一般用于>100MB的文件直链获取
		 */
		_123pan: NetDiskAuthorization_123pan,
		/**
		 * 蓝奏优选
		 */
		lanzouyx: NetDiskAuthorization_Lanzouyx,
	},
};
