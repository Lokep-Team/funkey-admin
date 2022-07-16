<style lang="scss" scoped>
.article {
  &-list {
    flex-wrap: wrap;
    width: 100%;
  }

  &-item {
    flex-shrink: 0;
    margin-right: 20px;
    margin-bottom: 20px;
    width: 300px;
  }
}
</style>
<template>
  <div class="article-list flex">
    <div
      class="article-item"
      v-for="item in list"
      :key="(item as IArticleChild).id"
    >
      <ArticleItem
        :loading="loading"
        :id="(item as IArticleChild).id"
        :title="(item as IArticleChild).title"
        :author="(item as IArticleChild).author"
        :author-avatar="(item as IArticleChild).authorAvatar"
        :banner="(item as IArticleChild).banner"
        :origin-link="(item as IArticleChild).originLink"
        @refresh="refresh"
        @edit="handleEdit"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineExpose, defineEmits } from "vue";
import ArticleItem from "./article-item.vue";
import { useArticleList, IArticleItem } from "./hooks";

type IArticleChild = IArticleItem;

const emit = defineEmits(["edit"]);

const { loading, list = [], refresh } = await useArticleList({});

const handleEdit = (e: IArticleChild) => emit("edit", e);

defineExpose({
  refresh,
});
</script>
