<style lang="scss" scoped>
.container {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
}

.leftbar {
  flex: 1;
}

.content {
  flex-shrink: 0;
  width: 300px;
}

.form-item {
  margin-bottom: 10px;

  &-input {
    width: 100%;
    display: block;
    height: 32px;
    border-radius: 4px;
    border: none;
    outline: none;
    background-color: #ebf0f6;
  }
}
</style>

<template>
  <div class="container align-center">
    <div class="leftbar"></div>
    <div class="content">
      <div class="form-item">
        <input class="form-item-input" type="text" />
      </div>
      <div class="form-item">
        <a-input></a-input>
      </div>
      <a-button type="primary" block>Log in </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
