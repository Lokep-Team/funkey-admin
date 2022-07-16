import { message } from "ant-design-vue";
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
} from "axios";

export interface IResponseData<T> {
  /**
   * 状态码
   * @type { number }
   */
  res: number;

  /**
   * 数据
   * @type { T }
   */
  data: T;

  /**
   * 消息
   * @type { string }
   */
  msg: string;
}

const service: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  // baseURL: "https://www.iamlokep.top/api",
});

export const request = (config: AxiosRequestConfig): Promise<IResponseData> =>
  new Promise((resolve) => {
    service(config)
      .then((response: AxiosResponse<IResponseData>) => {
        const { status, data: res } = response;
        handleHttpStaus(status);

        if (res.res === 0) {
          resolve(res);
        } else {
          message.error(res.msg);
        }
      })
      .catch((err: AxiosError) => {
        const { response } = err;
        handleHttpStaus(response!.status);
      });
  });

function handleHttpStaus(code: number) {
  if (code === 200) {
    return true;
  }

  if (code === 404) {
    message.error("服务走丢了");
  }

  if (code >= 500) {
    message.error("服务异常，请稍后再试");
  }

  return false;
}
