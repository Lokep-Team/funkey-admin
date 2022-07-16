<style lang="scss">
@import "@/assets/styles/variables.scss";

.tab {
  &-item {
    font-size: 16px;
    color: #777;
    user-select: none;
    cursor: pointer;
    align-items: flex-end;
    padding: 0 12px;

    border-bottom: 2px solid transparent;
    transition: all 0.4s;
    box-sizing: border-box;
    text-align: center;

    & + & {
      margin-left: 12px;
    }

    &.is-active {
      border-bottom: 2px solid $base-color;
    }
  }
}
</style>

<template>
  <div class="tabs flex">
    <div
      class="tab-item"
      :class="{
        'is-active': currentListType === key,
      }"
      v-for="(value, key) in listTypeMap"
      :key="key"
      @click="handleTabClick(key)"
    >
      {{ value[1] }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";
import { listTypeMap } from "./index";

const emit = defineEmits(["change"]);

const currentListType = ref(0);
const handleTabClick = (key: number) => {
  currentListType.value = key;
  emit("change", currentListType);
};
</script>
