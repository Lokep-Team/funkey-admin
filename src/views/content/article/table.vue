<template>
  <div class="table">
    <a-table bordered :dataSource="dataSource" :columns="columns" />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  components: {},

  setup() {
    const loading = ref(false);

    return {
      loading,
      dataSource: [
        {
          key: "1",
          name: "Mike",
          age: 32,
          address: "10 Downing Street",
        },
        {
          key: "2",
          name: "John",
          age: 42,
          address: "10 Downing Street",
        },
      ],

      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age",
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address",
        },
      ],
    };
  },
};
</script>
