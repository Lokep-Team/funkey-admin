<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.content {
  height: 100vh;
  flex: 1;
  box-sizing: border-box;
  padding: 24px;
  overflow-y: scroll;
}

.topbar {
  margin-bottom: 24px;

  .icons {
    .iconfont {
      font-size: 24px;
      color: #ccc;
      cursor: pointer;

      &:hover {
        color: $base-color;
      }
    }
  }
}
</style>

<template>
  <div class="layout flex">
    <SideBar />

    <div id="content" class="content">
      <div class="topbar align-center justify-between">
        <div class="flex-1">
          <router-view name="topbar"></router-view>
        </div>

        <div class="icons align-center">
          <a-space size="middle">
            <div
              class="iconfont iconnotification-filling"
              @click="toggleDrawer"
            ></div>
            <a-avatar>
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
          </a-space>
        </div>
      </div>

      <router-view v-slot="{ Component }">
        <FadeInOut :duration="200" mode="out-in">
          <component :is="Component" />
        </FadeInOut>
      </router-view>
    </div>

    <Notify />
  </div>
</template>

<script lang="ts" setup>
import SideBar from "./sidebar.vue";
import { FadeInOut } from "vue3-transitions";
import { UserOutlined } from "@ant-design/icons-vue";
import { useStore } from "@/store/index";
import Notify from "../notify/index.vue";

const mainStore = useStore();
const { toggleDrawer } = mainStore;
</script>
