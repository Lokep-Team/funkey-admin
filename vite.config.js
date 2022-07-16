/* eslint-disable */
import legacyPlugin from "@vitejs/plugin-legacy";
import * as path from "path";
import vuePlugin from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import ViteComponents from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

import {
  createStyleImportPlugin,
} from "vite-plugin-style-import";

// @see https://cn.vitejs.dev/config/
export default ({ command, mode }) => {
  let rollupOptions = {};

  let optimizeDeps = {};

  let alias = {
    ".git": path.resolve(__dirname, "./.git"),
    node_modules: path.resolve(__dirname, "./node_modules"),
    public: path.resolve(__dirname, "./public"),
    src: path.resolve(__dirname, "./src"),
    tests: path.resolve(__dirname, "./tests"),
    "@": path.resolve(__dirname, "./src"),
    vue$: "vue/dist/vue.runtime.esm-bundler.js",
  };

  let proxy = {};

  let define = {
    "process.env.NODE_ENV": '"development"',
  };

  let esbuild = {};

  return {
    base: "./", // index.html文件所在位置
    root: "./", // js导入的资源路径，src
    resolve: {
      alias,
    },
    define: define,
    server: {
      // 代理
      proxy,
    },
    build: {
      target: "es2015",
      minify: "terser", // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
      manifest: false, // 是否产出maifest.json
      sourcemap: false, // 是否产出soucemap.json
      outDir: "build", // 产出目录
      rollupOptions,
    },
    esbuild,
    optimizeDeps,
    plugins: [
      legacyPlugin({
        targets: [
          "Android > 39",
          "Chrome >= 60",
          "Safari >= 10.1",
          "iOS >= 10.3",
          "Firefox >= 54",
          "Edge >= 15",
        ],
      }),
      vuePlugin(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        dts: true,
        imports: ["vue", "vue-router"],
      }),
      ViteComponents({
        dts: true,
        resolvers: [AntDesignVueResolver()],
      }),
      createStyleImportPlugin({
        libs: [
          // 如果没有你需要的resolve，可以在lib内直接写，也可以给我们提供PR
          {
            libraryName: 'ant-design-vue',
            esModule: true,
            resolveStyle: (name) => {
              return `ant-design-vue/es/${name}/style/index`
            },
          },
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true,
        },
      },
    },
  };
};
