<template>
  <a-layout has-sider class="default-layout">
    <a-layout-sider
      v-model:collapsed="collapsed"
      width="200"
      :trigger="null"
      collapsible
      class="sider-layout"
    >
      <div>
        <div v-if="collapsed" class="logo icon">
          <BankTwoTone />
        </div>
        <div class="title logo" v-else>数智网信用户中台</div>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        :theme="theme"
        mode="inline"
        class="menu-layout"
        :items="menuList"
        @click="onMenuClick"
      >
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header-layout">
        <div class="trigger-box">
          <a-tooltip v-if="collapsed" color="#ffffff">
            <template #title><div class="trigger-title">展开</div></template>
            <menu-unfold-outlined class="trigger" @click="() => (collapsed = !collapsed)" />
          </a-tooltip>
          <a-tooltip v-else color="#ffffff">
            <template #title><div class="trigger-title">收起</div></template>
            <menu-fold-outlined class="trigger" @click="() => (collapsed = !collapsed)" />
          </a-tooltip>
        </div>
        <div class="tools">
          <a-tooltip color="#ffffff">
            <template #title><div class="trigger-title">点击进入全屏</div></template>
            <FullscreenOutlined class="icon full-screen" v-show="!isFullscreen" @click="toggle" />
          </a-tooltip>
          <a-tooltip color="#ffffff">
            <template #title><div class="trigger-title">点击退出全屏</div></template>
            <FullscreenExitOutlined
              class="icon full-screen"
              v-show="isFullscreen"
              @click="toggle"
            />
          </a-tooltip>

          <a-dropdown>
            <div class="avatar-box">
              <a-avatar class="avatar icon" :src="avatarUrl"> </a-avatar><span>{{ '用户名' }}</span>
            </div>
            <template #overlay>
              <a-menu @click="handleDropMenuClick">
                <a-menu-item :key="item.key" v-for="item in dropDownMenu">
                  <component :is="item.icon"></component>
                  {{ item.name }}
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content class="content-layout">
        <div id="unique-container">
          <div class="view-outer">
            <router-view class="router-view" v-slot="{ Component }">
              <transition name="fade">
                <keep-alive v-if="$route.meta.keepAlive">
                  <component :is="Component" :key="$route.meta.name"></component>
                </keep-alive>
                <component v-else :is="Component"></component>
              </transition>
            </router-view>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BankTwoTone,
  FullscreenExitOutlined,
  FullscreenOutlined,
  ApiTwoTone
} from '@ant-design/icons-vue'
import type { MenuTheme } from 'ant-design-vue'
import { useFullscreen } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'
import avatarUrl from '@/assets/img/avatar.png'
import type { BaseType, MenuType } from '@/types/DataType'
import { useAuth } from '@/stores/auth'
import { fetchLogout } from '@/api/auth'
import { routes } from '@/router/dynamic-routes'
const selectedKeys = ref<(string | undefined)[]>()
const openKeys = ref<any>([''])
const collapsed = ref<boolean>(false)
const headerHeight = '64px' //顶部高度
const statusHeight = '0' //状态栏高度
const footerHeight = '0' //底部高度
import { generatorMenu } from '@/utils/generator-menu'

const { isFullscreen, toggle } = useFullscreen()
const theme = ref<MenuTheme>('dark')

const menuList = generatorMenu()
const store = useAuth()
const router = useRouter()
const route = useRoute()

const dropDownMenu = [{ key: 1, name: '退出登录', icon: ApiTwoTone }]

watch(
  () => route.path,
  () => {
    const selected = route.name as string
    selectedKeys.value = [selected]
    openKeys.value = route.meta.super ?? ['']
  },
  {
    immediate: true
  }
)
// 菜单点击
const onMenuClick = (item: BaseType) => {
  item?.key &&
    router.push({
      name: item.key
    })
}

// 退出登录
const handleDropMenuClick = async (e: any) => {
  if (e.key === 1) {
    // 退出登录
    const token = useAuth().token
    await fetchLogout(token)
    store.$reset()
    routes.forEach((item: any) => {
      router.removeRoute(item.name)
    })
    await router.push({
      name: 'login'
    })
    //todo 跳转登录页
  }
}
</script>
<style lang="scss" scoped>
.trigger-title {
  color: #000;
}
.default-layout {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  .icon {
    cursor: pointer;
  }
  .sider-layout {
    .logo {
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: v-bind(headerHeight);
      font-size: 30px;
    }
    .title {
      font-size: 20px;
      color: #ffffff;
      white-space: nowrap;
      background: #00284d;
    }
    .menu-layout {
      position: relative;
      height: calc(100vh - v-bind(headerHeight));
      overflow: auto;
      .nav-text {
        user-select: none;
      }
    }
  }
  .header-layout {
    padding: 0 10px 0 20px;
    height: v-bind(headerHeight);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    background: #ffffff;
    border-bottom: 1px solid rgba(238, 238, 238, 0.8);
    .trigger-box {
      display: flex;
      align-items: center;
      .trigger {
        color: #999999;
        font-size: 26px;
      }
    }
    .tools {
      display: flex;
      align-items: center;
      padding-right: 15px;
      color: #000000;
      .avatar-box {
        display: flex;
        align-items: center;
        .avatar {
          font-size: 20px;
          margin-left: 15px;
          margin-right: 10px;
        }
      }

      .full-screen {
        font-size: 20px;
        padding: 0 8px;
        color: #181818;
      }
    }
  }
  .content-layout {
    .status {
      padding-left: 15px;
      display: flex;
      align-items: center;
      height: v-bind(statusHeight);
      border: 1px solid rgb(239, 239, 245);
    }
    #unique-container {
      height: 100%;
      padding: 16px;
      background: rgba(246, 249, 248, 1);
      .view-outer {
        height: 100%;
        overflow: auto;
        .router-view {
          padding: 16px;
          background: #ffffff;
          min-height: 100%;
          overflow-y: auto;
          border-radius: 10px;
        }
      }
    }
  }
  .footer-layout {
    height: v-bind(footerHeight);
  }
}
</style>
