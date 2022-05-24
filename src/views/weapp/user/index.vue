<style lang="scss" scoped>
.topbar {
  // padding: 12px;
  // background: pink;
}

.card {
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
  width: 320px;
  height: 320px;

  transition: box-shadow 0.7s;

  &:hover {
    box-shadow: 0 1px 2px -2px #00000029, 0 3px 6px #0000001f,
      0 5px 12px 4px #00000017;
  }
}
</style>

<template>
  <div class="container">
    <div class="topbar align-center">
      <div class="search"></div>

      <div class="tabs"></div>

      <div class="btns"></div>

      <div class="icons"></div>
    </div>

    <div class="">
      <div class="card"></div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
