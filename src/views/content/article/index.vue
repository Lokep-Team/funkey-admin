<style lang="scss" scoped>
@import "./index.scss";
</style>

<template>
  <div class="container">
    <a-radio-group v-model:value="status" style="margin-bottom: 16px">
      <a-radio-button value="normal">normal</a-radio-button>
      <a-radio-button value="error">error</a-radio-button>
    </a-radio-group>

    <Suspense>
      <List v-if="status === 'normal'" ref="listRef" @edit="handleEdit"></List>
      <Table v-else></Table>

      <template #fallback> Loading... </template>
    </Suspense>

    <a-modal v-model:visible="visible" title="文章编辑" @ok="submit">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 21 }"
        autocomplete="off"
      >
        <a-form-item label="标题" name="username">
          <a-input v-model:value="formState.title" />
        </a-form-item>

        <a-form-item
          label="原文链接"
          name="link"
          :rules="rulesRef.link"
          v-bind="validateInfos.link"
        >
          <a-input v-model:value="formState.link" />
        </a-form-item>

        <a-form-item
          label="文章banner"
          name="image"
          :rules="rulesRef.image"
          v-bind="validateInfos.image"
        >
          <a-input v-model:value="formState.image" />
        </a-form-item>

        <!-- <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item> -->
      </a-form>
    </a-modal>

    <div class="fixed">
      <a-tooltip title="add new article">
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
import { addArticle } from "@/api/article";
import { PlusOutlined } from "@ant-design/icons-vue";
import { useForm } from "ant-design-vue/lib/form";
import { reactive, Ref, ref, toRaw } from "vue";
import { IArticleItem } from "./hooks";
import List from "./list.vue";
import Table from "./table.vue";

const listRef: Ref<InstanceType<typeof List> | null> = ref(null);

/**
 * 弹窗新增编辑文章
 */
const visible = ref(false);
const showFormModal = () => {
  visible.value = true;
};

const rulesRef = reactive({
  link: [
    {
      required: true,
      message: "Please input your link!",
    },
    {
      pattern: /^(http|https):\/\//,
      message: "请输入http://或https://开头的地址",
    },
  ],
  image: [
    {
      pattern: /^(http|https):\/\//,
      message: "请输入http://或https://开头的地址",
    },
  ],
});
const formState = reactive({
  id: 0,
  title: "",
  link: "",
  image: "",
});

const { resetFields, validate, validateInfos } = useForm(formState, rulesRef);

const submit = () => {
  validate()
    .then(async () => {
      const { link, image, title } = toRaw(formState);

      const res = await addArticle({ link, image, title });

      if (res.res === 0) {
        resetFields();
        listRef.value!.refresh();
        visible.value = false;
      }
    })
    .catch((err) => err);
};

const handleEdit = (e: IArticleItem) => {
  formState.id = e.id;
  formState.image = e.banner;
  formState.link = e.originLink ?? "";
  formState.title = e.title;
  visible.value = true;
};

/** tab 切换 */
const status = ref("normal");
</script>
