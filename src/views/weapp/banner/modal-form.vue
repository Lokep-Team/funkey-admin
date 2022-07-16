<template>
  <a-modal
    :visible="visible"
    title="Edit Banner"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @update:visible="updateVisible"
    @cancel="handleCancel"
  >
    <a-form
      :model="formModel"
      name="formModel"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
      autocomplete="off"
    >
      <a-form-item label="Image" name="image" :rules="rulesRef.image">
        <!-- TODO 之后换成七牛云直传 -->
        <a-input v-model:value="formModel.image" />
      </a-form-item>

      <a-form-item label="Date" name="date" :rules="rulesRef.date">
        <a-range-picker
          v-model:value="formModel.date"
          inputReadOnly
          style="width: 100%"
        />
      </a-form-item>

      <a-form-item label="LinkType" name="linkType">
        <a-select
          v-model:value="formModel.linkType"
          placeholder="Select a Link Type"
          allowClear
          :options="linkTypeOptions"
        ></a-select>
      </a-form-item>

      <a-form-item
        v-if="
          formModel.linkType === EBannerLinkType.MiniProgram ||
          formModel.linkType === EBannerLinkType.H5
        "
        label="Link"
        name="link"
      >
        <a-input v-model:value="formModel.link" />
      </a-form-item>

      <a-form-item
        v-if="formModel.linkType === EBannerLinkType.MiniProgramOut"
        label="AppID"
        name="appid"
      >
        <a-input v-model:value="formModel.appid" />
      </a-form-item>

      <a-form-item
        v-if="formModel.linkType === EBannerLinkType.Text"
        label="Toast"
        name="content"
      >
        <a-input v-model:value="formModel.content" />
      </a-form-item>

      <!-- 是否冻结 -->
      <a-form-item label="Frozen" name="status">
        <a-switch v-model:checked="formModel.status"></a-switch>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { addBanner, updateBanner } from "@/api/banner";
import dayjs from "dayjs";
import {
  reactive,
  ref,
  toRefs,
  defineProps,
  defineEmits,
  unref,
  Ref,
} from "vue";
import { EBannerLinkType, IBanner } from "./index";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:visible", "refresh"]);

// form
const formModel = reactive<IBanner>({
  id: "",
  appid: "",
  image: "",
  date: [],
  status: false,
  linkType: 0,
  link: "",
  content: "",
});

const rulesRef = reactive({
  image: [
    {
      required: true,
      message: "Please Input Your Banner Picture!",
    },
    {
      pattern: /^(http|https):\/\//,
      message: "请输入http://或https://开头的地址",
    },
  ],
  date: [
    {
      required: true,
      message: "Please Choose Banner Exhibit Time",
    },
  ],
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

// modal
const confirmLoading = ref(false);
const { visible } = toRefs(props);

const handleOk = async () => {
  let res = { res: -1 };
  const {
    id = "",
    appid = null,
    image = "",
    date = [],
    status = false,
    linkType = 0,
    link = "",
    content = "",
  } = unref(formModel);
  const [startDate, endDate] = date;

  const params = {
    id,
    appid,
    imgUrl: image,
    onlineTimeStart: dayjs(startDate).format("YYYY-MM-DD hh:mm:ss"),
    onlineTimeEnd: dayjs(endDate).format("YYYY-MM-DD hh:mm:ss"),
    isFrozen: Number(status),
    jumpType: linkType,
    url: link,
    content,
  };

  confirmLoading.value = true;

  if (formModel.id) {
    res = await updateBanner({ ...params });
  } else {
    res = await addBanner({ ...params });
  }

  if (res.res === 0) {
    emits("update:visible", !visible.value);
    emits("refresh");
  }
  confirmLoading.value = false;
};

const updateVisible = (e: Ref<boolean>) => {
  emits("update:visible", e);
};

const handleCancel = () => {
  emits("update:visible", !visible.value);
};
</script>
