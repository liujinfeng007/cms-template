<template>
  <a-config-provider :locale="locale">
    <component :is="layout"></component>
  </a-config-provider>
</template>
<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Basic from '@/layout/basic.vue'
import Blank from '@/layout/blank.vue'
dayjs.locale('zh-cn')

const locale = zhCN
const route = useRoute()
const layout = computed(() => {
  return route.meta.layout === 'basic' ? Basic : Blank
})
</script>
<style lang="scss" scoped></style>
