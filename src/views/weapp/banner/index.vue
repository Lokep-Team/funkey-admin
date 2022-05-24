<style lang="scss" scoped>
@import "./index.scss";
</style>

<template>
  <div class="container">
    <Board />

    <ModalForm v-model:visible="visible" />

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

const visible = ref(false);
const showFormModal = () => {
  visible.value = true;
};
</script>
