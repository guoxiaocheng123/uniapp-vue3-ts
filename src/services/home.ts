import type { BannerItem } from "@/types/home"
import { http } from "@/utils/http"

/**
 * 首页-banner区
 * @param distributionSite 投放位置(1为首页，2为分类商品页，默认为1)
 * @returns
 */
export const getHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: { distributionSite }
  })
}
