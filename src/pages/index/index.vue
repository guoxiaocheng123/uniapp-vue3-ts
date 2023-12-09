<script setup lang="ts">
import { ref } from "vue";
import { getHomeBannerAPI, getHomeCategoryAPI } from "@/services/home";
import type { BannerItem, CategoryItem } from "@/types/home";
import { onLoad } from "@dcloudio/uni-app";
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from "./components/CategoryPanel.vue";
// 获取banner接口数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
// 获取前台分类接口数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}
// 页面加载
onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
})
</script>

<template>
  <!-- 导航栏 -->
  <CustomNavbar />
  <!-- 轮播图 -->
  <XtxSwiper :bannerList="bannerList" />
  <!-- 分类面板 -->
  <CategoryPanel :categoryList="categoryList" />
</template>

<style lang="scss">
page {
  background: #f7f7f7;
}
</style>
