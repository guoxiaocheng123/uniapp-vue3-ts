/**
 * 首页-banner ts 类型
 */
export type BannerItem = {
  id: string,
  // 图片链接
  imgUrl: string,
  // 跳转链接
  hrefUrl: string,
  // 跳转类型
  type: number
}
/**
 * 首页-前台分类 ts 类型
 */
export type CategoryItem = {
  id: string,
  // 分类名称
  name: string,
  // 图标链接
  icon: string
}
