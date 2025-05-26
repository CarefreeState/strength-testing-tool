import axios from "axios";
import { message } from 'antd';

const request = axios.create(
  {
    // 根域名配置
    baseURL: "http://localhost:1177",
    // 超时时间
    timeout: 5_000,
  }
)

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    // 5.返回错误对象
    return Promise.reject(err);
  }
)

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    message.error('发生错误')
    return Promise.reject(err);
  }
)

export default request;