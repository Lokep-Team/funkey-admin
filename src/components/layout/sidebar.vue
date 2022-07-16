<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.sidebar {
  width: 240px;
  height: 100vh;
  box-sizing: border-box;
  padding: 16px;
  background-color: #fff;
  user-select: none;

  &-header {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 48px;

    img {
      width: 40px;
      display: block;
      margin-right: 6px;
    }
  }

  // &-group {
  //   padding: 16px;
  //   font-weight: bold;
  //   font-size: 16px;
  //   & + & {
  //     margin-top: 32px;
  //   }
  // }

  &-menu {
    &-item {
      // color: #cccdce;
      color: #222;
      &--title {
        font-size: 14px;
        font-weight: 500;
        padding: 12px 16px;
        cursor: pointer;
        border-radius: 4px;
        margin-bottom: 12px;

        // transition: box-shadow 0.4s ease;

        &.is-active {
          &,
          &:hover {
            background-color: #4664e7;
            color: #fff;
            box-shadow: 0px 4px 6px 1px $base-color;
          }
        }

        &:hover {
          background-color: #f5f5f5;
        }
      }
    }
  }

  &-submenu {
    &-item {
      padding: 12px 16px;
      cursor: pointer;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      margin-bottom: 12px;
      margin-left: 1em;
      color: #999;

      transition: all 0.4s;

      &:hover {
        background-color: #f5f5f5;
      }

      .iconfont {
        color: #cdcecf;
        margin-right: 4px;
      }

      &.is-active {
        color: #4664e7;

        .iconfont {
          color: #4664e7;
        }
      }
    }
  }
}
</style>

<template>
  <div class="sidebar">
    <div class="sidebar-header align-center">
      <img src="@/assets/favicon.svg" alt="" />
      Funkey
    </div>

    <!-- <div class="sidebar-group">Overview</div> -->

    <div class="sidebar-menu">
      <div class="sidebar-menu-item" v-for="(item, index) in menu" :key="index">
        <div
          class="sidebar-menu-item--title justify-between align-center"
          :class="{
            'is-active': isMenuActive(item.path),
          }"
        >
          {{ item.meta?.title }}

          <!-- <div class="iconfont iconarrow-up-bold"></div> -->
        </div>

        <div class="sidebar-submenu">
          <div
            class="sidebar-submenu-item align-center"
            :class="{
              'is-active': isSubMenuActive(el.path),
            }"
            v-for="(el, i) in item.children"
            :key="i"
            @click="() => handleSubMenuClick(item.path, el.path)"
          >
            <div class="iconfont" :class="el.meta!.icon"></div>
            {{ el.meta?.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { routes } from "@/router/index";
import { useRoute, useRouter } from "vue-router";

const [, ...menu] = routes;
const route = useRoute();
const router = useRouter();

const isMenuActive = (path: string): boolean => {
  return route.path.indexOf(path) > -1;
};
const isSubMenuActive = (path: string): boolean => {
  return route.path.indexOf(path) > -1;
};

const handleSubMenuClick = (prefix: string, path: string) => {
  router.push([prefix, path].join("/"));
};
</script>
