<template>
  <a-modal
    v-model:visible="modalVisible"
    title="Edit Banner"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      :model="formModel"
      name="formModel"
      ref="formRef"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
      autocomplete="off"
    >
      <a-form-item
        label="Title"
        name="title"
        :rules="[{ required: true, message: 'Please input banner title!' }]"
      >
        <a-input v-model:value="formModel.title" />
      </a-form-item>

      <a-form-item
        label="Description"
        name="description"
        :rules="[
          { required: true, message: 'Please input banner description!' },
        ]"
      >
        <a-input v-model:value="formModel.description" />
      </a-form-item>

      <a-form-item
        label="LinkType"
        name="linkType"
        :rules="[{ required: true, message: 'Please select link type!' }]"
      >
        <a-select
          v-model:value="formModel.linkType"
          placeholder="Select a person"
          style="width: 200px"
          :options="linkTypeOptions"
        ></a-select>
      </a-form-item>

      <a-form-item
        label="Link"
        name="link"
        :rules="[{ required: true, message: 'Please select link type!' }]"
      >
        <a-input v-model:value="formModel.link" />
      </a-form-item>

      <a-form-item label="Image" name="image">
        <a-upload
          v-model:file-list="uploadState.fileList"
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img
            v-if="uploadState.imageUrl"
            :src="uploadState.imageUrl"
            alt="avatar"
          />
          <div v-else>
            <loading-outlined v-if="uploadState.loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-form-item>

      <a-form-item label="Status" name="status">
        <a-switch v-model:checked="formSwitch"></a-switch>
      </a-form-item>

      <a-form-item label="Date" name="date">
        <a-range-picker v-model:value="formModel.date" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import {
  reactive,
  ref,
  toRefs,
  defineProps,
  defineEmits,
  watchEffect,
  onBeforeMount,
} from "vue";
import { FormInstance } from "ant-design-vue";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { EBannerLinkType, IBanner } from "./index";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const modalVisible = ref(false);

onBeforeMount(() => {
  modalVisible.value = visible.value;
});

watchEffect(() => {
  emits("update:visible", false);
});

const emits = defineEmits(["update:visible"]);

// form
const formRef = ref<FormInstance>();
const formModel = reactive<IBanner>({
  id: "",
  title: "",
  description: "",
  image: "",
  date: [],
  status: -1,
  linkType: 0,
  link: "",
});

const linkTypeOptions: Array<{ label: string; value: EBannerLinkType }> = [
  {
    label: "None",
    value: EBannerLinkType.None,
  },
  {
    label: "MiniProgram",
    value: EBannerLinkType.MiniProgram,
  },
  {
    label: "H5",
    value: EBannerLinkType.H5,
  },
  {
    label: "Text",
    value: EBannerLinkType.Text,
  },
  {
    label: "MiniProgramOut",
    value: EBannerLinkType.MiniProgramOut,
  },
];

const formSwitch = ref<boolean>(false);

// uploader
const uploadState = reactive({
  fileList: [],
  imageUrl: "",
  loading: false,
});
const beforeUpload = () => {
  console.log("beforeUpload");
};
const handleChange = () => {
  console.log("handleChange");
};

// modal
const confirmLoading = ref(false);
const { visible } = toRefs(props);

const handleOk = () => {
  confirmLoading.value = true;
  setTimeout(() => {
    visible.value = false;
    confirmLoading.value = false;
  }, 2000);

  emits("update:visible", !visible.value);
};
const handleCancel = () => {
  formRef.value!.resetFields();
  modalVisible.value = false;
};
</script>
