<template>
  <a-table :dataSource="list" :columns="columns" />
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
  list: Array,
});

const columns = [
  {
    title: "Banner",
    key: "imgUrl",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
  },
];
</script>
