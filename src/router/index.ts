import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/admin/login/index.vue"),
  },

  {
    path: "/content",
    name: "Content",
    meta: {
      title: "内容中心",
    },
    component: () =>
      import(/* webpackChunkName: "content" */ "@/components/layout/index.vue"),
    children: [
      {
        path: "article",
        name: "Article",
        meta: {
          title: "文章管理",
          icon: "icontxt",
        },
        component: () =>
          import(
            /* webpackChunkName: "article" */ "@/views/content/article/index.vue"
          ),
      },
      {
        path: "video",
        name: "Video",
        meta: {
          title: "视频管理",
          icon: "icondianying1",
        },
        component: () =>
          import(
            /* webpackChunkName: "video" */ "@/views/content/video/index.vue"
          ),
      },
    ],
  },

  {
    path: "/weapp",
    name: "Weapp",
    meta: {
      title: "小程序管理",
      icon: "iconxiaochengxu",
    },
    component: () =>
      import(/* webpackChunkName: "weapp" */ "@/components/layout/index.vue"),
    children: [
      {
        path: "banner",
        name: "Banner",
        meta: {
          title: "Banner管理",
          icon: "icontupian",
        },
        components: {
          default: () =>
            import(
              /* webpackChunkName: "user" */ "@/views/weapp/banner/index.vue"
            ),
          topbar: () =>
            import(
              /* webpackChunkName: "user" */ "@/views/weapp/banner/topbar.vue"
            ),
        },
      },
      {
        path: "tool",
        name: "Tool",
        meta: {
          title: "Tool管理",
          icon: "icongongjuxiang",
        },
        components: {
          default: () =>
            import(
              /* webpackChunkName: "user" */ "@/views/weapp/tool/index.vue"
            ),
        },
      },
      {
        path: "user",
        name: "User",
        meta: {
          title: "用户管理",
          icon: "iconwodexiao",
        },
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/weapp/user/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
