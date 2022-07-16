import { request } from "@/utils/request";
import { onMounted, ref, Ref } from "vue";

export const getBannerList = <T>(params?: T) =>
  request({
    params,
    url: "/banner/list",
  });

export const useBannerList = (data: any = {}) => {
  const list: Ref<any[]> = ref([]);
  const loading = ref(true);

  const refresh = async () => {
    const res = await getBannerList(data);

    loading.value = false;

    if ((res as any).res === 0) {
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

export const deleteBannerById = (id: number) =>
  request({
    url: "/banner/" + id,
    method: "delete",
  });

export const addBanner = (data: any = {}) =>
  request({
    url: "/banner/add",
    method: "post",
    data,
  });

export const updateBanner = (data: any = {}) =>
  request({
    url: "/banner/update",
    method: "post",
    data,
  });
