<template>
  <a-drawer
    v-model:visible="drawerVisible"
    class="custom-class"
    title="Basic Drawer"
    placement="right"
    @after-visible-change="afterVisibleChange"
  >
    <a-comment>
      <template #author><a>Han Solo</a></template>
      <template #avatar>
        <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      </template>
      <template #content>
        <p>
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
        </p>
      </template>
      <template #datetime>
        <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
          <span>{{ time() }}</span>
        </a-tooltip>
      </template>
      <template #actions>
        <span key="comment-basic-reply-to">Reply to</span>
      </template>
    </a-comment>

    <a-empty />
  </a-drawer>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/store/index";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const mainStore = useStore();

const { drawerVisible } = storeToRefs(mainStore);

const afterVisibleChange = (visible: boolean) => {
  console.log("afterVisibleChange", visible);
};

dayjs.extend(relativeTime);
const time = () => dayjs().fromNow();
</script>
