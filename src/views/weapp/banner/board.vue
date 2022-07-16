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
      <a-card
        hoverable
        :loading="loading"
        v-for="(item, index) in scheduledList"
        :key="index"
      >
        <template #cover>
          <img alt="example" :src="(item as any).imgUrl" />
        </template>
        <template #actions>
          <span key="comment-basic-like">
            <a-tooltip title="Like">
              <LikeFilled />
              <span style="padding-left: 8px; cursor: auto"> 0 </span>
            </a-tooltip>
          </span>

          <edit-outlined key="edit" />

          <!-- 删除 -->
          <a-popconfirm
            placement="top"
            ok-text="Yes"
            cancel-text="No"
            @confirm="() => handleDelete((item as any).id)"
          >
            <template #title>
              <p>Are you sure to delete this banner?</p>
            </template>
            <delete-outlined />
          </a-popconfirm>
        </template>
      </a-card>
    </a-space>

    <a-space class="list" direction="vertical" size="middle">
      <a-button block>{{ listStatusMap.get(1) }} </a-button>
      <a-card
        hoverable
        :loading="loading"
        v-for="(item, index) in onProgressList"
        :key="index"
      >
        <template #cover>
          <img alt="example" :src="(item as any).imgUrl" />
        </template>
        <template #actions>
          <span key="comment-basic-like">
            <a-tooltip title="Like">
              <LikeFilled />
              <span style="padding-left: 8px; cursor: auto"> 0 </span>
            </a-tooltip>
          </span>

          <edit-outlined key="edit" />

          <!-- 删除 -->
          <a-popconfirm
            placement="top"
            ok-text="Yes"
            cancel-text="No"
            @confirm="() => handleDelete((item as any).id)"
          >
            <template #title>
              <p>Are you sure to delete this banner?</p>
            </template>
            <delete-outlined />
          </a-popconfirm>
        </template>
      </a-card>
    </a-space>

    <a-space class="list" size="middle" direction="vertical">
      <a-button block>{{ listStatusMap.get(2) }} </a-button>
      <a-card
        hoverable
        :loading="loading"
        v-for="(item, index) in completedList"
        :key="index"
      >
        <template #cover>
          <img alt="example" :src="(item as any).imgUrl" />
        </template>
        <template #actions>
          <span key="comment-basic-like">
            <a-tooltip title="Like">
              <LikeFilled />
              <span style="padding-left: 8px; cursor: auto"> 0 </span>
            </a-tooltip>
          </span>
          <edit-outlined key="edit" />

          <!-- 删除 -->
          <a-popconfirm
            placement="top"
            ok-text="Yes"
            cancel-text="No"
            @confirm="() => handleDelete((item as any).id)"
          >
            <template #title>
              <p>Are you sure to delete this banner?</p>
            </template>
            <delete-outlined />
          </a-popconfirm>
        </template>
        <!-- <a-card-meta title="Card title" description="This is the description">
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-card-meta> -->
      </a-card>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
import { deleteBannerById } from "@/api/banner";
import {
  EditOutlined,
  LikeFilled,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import dayjs from "dayjs";
import { computed, ref, defineEmits, defineProps } from "vue";

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["refresh"]);

const listStatusMap = new Map([
  [0, "Scheduled"],
  [1, "On Progress"],
  [2, "Completed"],
]);

const current = dayjs().format("YYYY-MM-DD hh:mm:ss");

const scheduledList = computed(() =>
  props.list.filter((item: any) => item.onlineTimeStart > current)
);
const onProgressList = computed(() =>
  props.list.filter(
    (item: any) =>
      item.onlineTimeStart <= current || item.onlineTimeEnd >= current
  )
);
const completedList = computed(() =>
  props.list.filter((item: any) => item.onlineTimeEnd < current)
);

const loading = ref(false);

const handleDelete = async (id: number) => {
  await deleteBannerById(id);
  message.success("xiu~，删除成功");
  emit("refresh");
};
</script>
