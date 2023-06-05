import axios from "axios";
import { message } from "antd";

const request = axios.create({
  baseURL: window.location.origin,
  timeout: 3000,
});

// 响应拦截器
request.interceptors.response.use(
  (res: any) => {
    return res.data
  },
  (err: any) => {
    message.error("404");
    Promise.reject("404");
  }
);

export { request };
