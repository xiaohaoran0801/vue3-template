import axios from "axios";
import { errorCodeType } from "./errorCode";
import { useMessage } from "naive-ui";

const message = useMessage();
// 创建axios实例
const service = axios.create({
  // 服务接口请求
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时设置
  // timeout: 15000,
  headers: { "Content-Type": "application/jsoncharset=utf-8" },
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token放在请求头
    // config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // get请求映射params参数
    if (config.method === "get" && config.params) {
      let url = config.url + "?";
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName];
        const part = encodeURIComponent(propName) + "=";
        if (value !== null && typeof value !== "undefined") {
          // 对象处理
          if (typeof value === "object") {
            for (const key of Object.keys(value)) {
              const params = propName + "[" + key + "]";
              const subPart = encodeURIComponent(params) + "=";
              url += subPart + encodeURIComponent(value[key]) + "&";
            }
          } else {
            url += part + encodeURIComponent(value) + "&";
          }
        }
      }
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res: any) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCodeType(code) || res.data.msg;
    if (code === 200) {
      return Promise.resolve(res.data);
    }
    message.error(msg);
    return Promise.reject(res.data);
  },
  (error) => {
    console.log("err" + error);
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    message.error({
      message: message,
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
