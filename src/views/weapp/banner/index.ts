/**
 * 小程序Banner 配置链接跳转类型
 ** 0-无跳转
 ** 1-小程序(内部)
 ** 2-H5
 ** 3-文字弹窗
 ** 4-小程序(外部)
 */
export enum EBannerLinkType {
  None = 0,
  MiniProgram = 1, // 跳转小程序原生页面
  H5 = 2, // 跳转小程序webview
  Text = 3, // Toast弹窗
  MiniProgramOut = 4,
}

export enum EBannerStatus {
  Deleted = 0,
  Normal = 1,
  Disabled = 2,
}

// 建议尺寸686*250，大小不超过200k
export const BannerConfig = {
  width: 686,
  height: 250,
  size: 200 * 1024,
};

/**
 * 小程序Banner
 */
export interface IBanner {
  id?: string;
  linkType: EBannerLinkType;
  link?: string;
  image: string;
  date: Array<Date>;
  status: boolean;
  content?: string;
  appid?: string;
}

export const listTypeMap = new Map([
  [0, "List"],
  [1, "Board"],
  [2, "Calendar"],
]);
