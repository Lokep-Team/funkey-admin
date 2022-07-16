<style lang="scss" scoped>
.article {
  &-item {
    &:nth-child(3n) {
      margin-right: 0;
    }

    &--banner {
      width: 100%;
      height: 200px;
      display: flex;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &--menu {
      padding: 0 0 5px;

      &-option {
        padding: 5px;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #666;
        border-radius: 4px;
        cursor: default;
        user-select: none;

        &:first-child {
          cursor: pointer;
          &:hover {
            color: #1890ff;
            background-color: #eee;
          }
        }
      }

      &-qrcode {
        margin-top: 10px;
      }
    }
  }
}
</style>

<template>
  <a-card hoverable :loading="loading">
    <template #cover>
      <!-- https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png -->
      <div class="article-item--banner justify-between align-center">
        <img alt="example" :src="imgPrefixer(banner)" />
      </div>
    </template>
    <template #actions>
      <!-- 收藏人数 -->
      <span key="comment-basic-like">
        <a-tooltip title="Like">
          <star-outlined />
          <span style="padding-left: 8px; cursor: auto"> 0 </span>
        </a-tooltip>
      </span>

      <!-- 操作原链接 -->
      <a-tooltip placement="top" color="white">
        <template #title>
          <div class="article-item--menu">
            <div
              class="article-item--menu-option"
              v-if="isSupported"
              @click="copy()"
            >
              <copy-outlined />
              复制链接
            </div>

            <div class="article-item--menu-option">
              <wechat-outlined />
              微信扫一扫
            </div>

            <div class="article-item--menu-qrcode align-center justify-center">
              <QrcodeVue
                :value="originLink"
                :size="80"
                :marign="50"
                level="H"
                background="transparent"
              />
            </div>
          </div>
        </template>

        <scan-outlined />
      </a-tooltip>

      <!-- 编辑 -->
      <edit-outlined key="edit" @click="handleEdit" />

      <!-- 删除 -->
      <a-popconfirm
        placement="top"
        ok-text="Yes"
        cancel-text="No"
        @confirm="handleDelete"
      >
        <template #title>
          <p>Are you sure to delete this article?</p>
        </template>
        <delete-outlined />
      </a-popconfirm>
    </template>

    <a-card-meta :title="title" :description="author">
      <template #avatar>
        <a-avatar size="large" :src="imgPrefixer(authorAvatar!)" />
      </template>
      <!-- <template #des></template> -->
    </a-card-meta>
  </a-card>
</template>

<script lang="ts" setup>
import {
  EditOutlined,
  StarOutlined,
  DeleteOutlined,
  ScanOutlined,
  CopyOutlined,
  WechatOutlined,
  SmileOutlined,
} from "@ant-design/icons-vue";
import QrcodeVue from "qrcode.vue";
import { useClipboard } from "@vueuse/core";
import { message, notification } from "ant-design-vue";
import { h, defineEmits, defineProps, unref, watch } from "vue";
import { deleteArticleById } from "@/api/article";
import { isString } from "@vue/shared";

const DEFAULT_BANNER =
  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";

const props = defineProps({
  id: Number,
  loading: Boolean,
  title: String,
  author: String,
  authorAvatar: String,
  banner: {
    type: String,
    default:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png", // eslint-disable-line vue/valid-define-props
  },
  originLink: String,
});

const emit = defineEmits(["refresh", "edit"]);

const openNotification = () => {
  notification.open({
    key: "asdfsa",
    message: "Copied",
    description: props.title,
    icon: () => h(SmileOutlined, { style: "color: #108ee9" }),
  });
};

function imgPrefixer(src: string) {
  if (!src || !isString(src)) return DEFAULT_BANNER;

  if (src.indexOf("qpic") > -1) {
    return `https://images.weserv.nl/?url=${src}`;
  }

  return src;
}

const source = `
作者：${props.author}
链接：${props.originLink}
来源：稀土掘金
链接收录仅用于学习，著作权归作者所有，如有冒犯，请联系 iamlokep@163.com。
`;
const { isSupported, copy, copied } = useClipboard({
  source,
});

watch(copied, (v) => {
  if (v) {
    openNotification();
  }
});

// 删除
const handleDelete = async () => {
  if (!props.id) return false;

  await deleteArticleById(props.id);
  message.success("xiu~，删除成功");

  emit("refresh");
};

// 编辑
const handleEdit = () => {
  emit("edit", {
    ...unref(props),
  });
};
</script>
