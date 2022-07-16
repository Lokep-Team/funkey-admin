<style lang="scss" scoped>
@import "./index.scss";
</style>

<template>
  <div class="container">
    <Topbar class="topbar" @change="handleTabChange" />

    <Board
      v-show="currentTab == listTypeMap.get(0)"
      :list="list"
      @refresh="refresh"
    />

    <Table
      v-show="currentTab == listTypeMap.get(1)"
      :list="list"
      @refresh="refresh"
    />

    <ModalForm v-model:visible="visible" @refresh="refresh" />

    <div class="fixed">
      <a-tooltip title="add new banner">
        <a-button
          type="primary"
          size="large"
          shape="circle"
          @click="showFormModal"
        >
          <plus-outlined />
        </a-button>
      </a-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PlusOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import Board from "./board.vue";
import ModalForm from "./modal-form.vue";
import Topbar from "@/views/weapp/banner/topbar.vue";
import { useBannerList } from "@/api/banner";
import { listTypeMap } from "./index";

const visible = ref(false);
const showFormModal = () => {
  visible.value = true;
};

/**
 * INSERT INTO `Funkey`.`banner`
 * (`id`, `img_url`, `jump_type`, `url`, `appid`, `is_delete`, `is_frozen`, `online_time_start`, `online_time_end`, `content`, `position`, `create_at`)
 * VALUES
 * (7, 'https://tva2.sinaimg.cn/large/69697000gy1h2f8dyrfhuj20u00gv7ja.jpg', 0, NULL, NULL, 0, 0, '2022-06-27 17:00:02', '2023-06-27 17:00:02', NULL, 0, NULL);
 */

const { list, refresh } = useBannerList();

const currentTab = ref(listTypeMap.get(0));
const handleTabChange = (index: number) =>
  (currentTab.value = listTypeMap.get(index));
</script>
