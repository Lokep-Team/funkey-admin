<style lang="scss" scoped>
.list {
  flex: 1;

  & + & {
    margin-left: 16px;
  }
}
</style>
<template>
  <div class="board flex">
    <a-space class="list" direction="vertical" size="middle">
      <a-button block>{{ listStatusMap.get(0) }} </a-button>
      <a-card hoverable :loading="loading">
        <template #cover>
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        </template>
        <template #actions>
          <span key="comment-basic-like">
            <a-tooltip title="Like">
              <LikeFilled />
              <span style="padding-left: 8px; cursor: auto"> 0 </span>
            </a-tooltip>
          </span>
          <edit-outlined key="edit" />
          <delete-outlined />
        </template>
        <a-card-meta title="Card title" description="This is the description">
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-card-meta>
      </a-card>
    </a-space>

    <a-space class="list" direction="vertical" size="middle">
      <a-button block>{{ listStatusMap.get(1) }} </a-button>
      <a-card hoverable :loading="loading">
        <template #cover>
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        </template>
        <template #actions>
          <span key="comment-basic-like">
            <a-tooltip title="Like">
              <LikeFilled />
              <span style="padding-left: 8px; cursor: auto"> 0 </span>
            </a-tooltip>
          </span>
          <edit-outlined key="edit" />
          <delete-outlined />
        </template>
        <a-card-meta title="Card title" description="This is the description">
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-card-meta>
      </a-card>
    </a-space>
    <a-space class="list" size="middle" direction="vertical">
      <a-button block>{{ listStatusMap.get(2) }} </a-button>
      <a-card hoverable :loading="loading">
        <template #cover>
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        </template>
        <template #actions>
          <span key="comment-basic-like">
            <a-tooltip title="Like">
              <LikeFilled />
              <span style="padding-left: 8px; cursor: auto"> 0 </span>
            </a-tooltip>
          </span>
          <edit-outlined key="edit" />
          <delete-outlined />
        </template>
        <a-card-meta title="Card title" description="This is the description">
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-card-meta>
      </a-card>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
import {
  EditOutlined,
  LikeFilled,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";

const listStatusMap = new Map([
  [0, "Scheduled"],
  [1, "On Progress"],
  [2, "Completed"],
]);
const loading = ref(false);
</script>
