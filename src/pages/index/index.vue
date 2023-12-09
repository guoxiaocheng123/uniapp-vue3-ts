<script setup lang="ts">
import { ref } from "vue";
import { getHomeBannerAPI } from "@/services/home";
import type { BannerItem } from "@/types/home";
import { onLoad } from "@dcloudio/uni-app";
import CustomNavbar from './components/CustomNavbar.vue'
// 存储banner接口数据
const bannerList = ref<BannerItem[]>([])
// 获取banner接口数据
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
// 页面加载
onLoad(() => { getHomeBannerData() })
</script>

<template>
  <!-- 导航栏 -->
  <CustomNavbar />
  <!-- 轮播图 -->
  <XtxSwiper :bannerList="bannerList" />
</template>

<style lang="scss">
//
</style>
