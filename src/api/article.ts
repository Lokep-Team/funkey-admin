import { request } from "@/utils/request";

export const getArticleList = <T>(params?: T) =>
  request({
    params,
    url: "/article/list",
  });

export const addArticle = <T>(data: T) =>
  request({
    data,
    url: "/article/add",
    method: "post",
  });

export const deleteArticleById = (id: number) =>
  request({
    url: `/article/${id}`,
    method: "delete",
  });
