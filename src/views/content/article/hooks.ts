import { onMounted, Ref, ref } from "vue";
import { getArticleList } from "@/api/article";
import { IResponseData } from "@/utils/request";

// 文章来源 0-全部 1-wechat 2-juejin 3-zhihu 100-其他
enum EOrigin {
  ALL = 0,
  WECHAT = 1,
  JUEJIN = 2,
  ZHIHU = 3,
}

type Bool = 0 | 1;

interface IArticleParam {
  title?: string;
  origin?: EOrigin;
  createAt?: string;
  star?: Bool;
  tag?: string;
  timeStart?: string;
  timeEnd?: string;
}

export interface IArticleItem {
  id: number;
  aid: string;
  title: string;
  origin: EOrigin;
  originLink?: string;
  author: string;
  authorAvatar: string;
  tag: string | null;
  banner: string;
  updateAt: string;
}

export const useArticleList = (
  data: IArticleParam = {}
): {
  list: IArticleItem[];
  loading: Ref<boolean>;
  refresh: () => Promise<void>;
} => {
  const list: Ref<IArticleItem[]> = ref([]);
  const loading = ref(true);

  const refresh = async () => {
    const res = await getArticleList(data);

    loading.value = false;

    if (res.res === 0) {
      list.value = res.data;
    }
  };

  onMounted(() => refresh());

  return {
    list: list.value || [],
    loading,
    refresh,
  };
};
