import axios from "axios";
import { startLoading, endLoading } from "@/assets/js/utils/loading";
import router from "@/router";
import store from "@/store";

const pz = "http://192.168.50.139:63010/";
const lyh = "http://192.168.50.245:63010/";
//1.利用axios对象的方法create，去创建一个axios实例。
const requests = axios.create({
  //配置对象
  //接口当中：路径都带有/api     基础路径，发送请求的时候，路径当中会出现api
  baseURL: pz,
  //代表请求超时的时间
  timeout: 5000,
});

//请求拦截器：
requests.interceptors.request.use((config) => {
  if (config.showLoading === undefined) {
    //解析和上传到后端的时候进行loading加载显示
    config.showLoading = true;
    startLoading();
  }
  const token = store.state.global.token;
  if (token !== null || token !== "") {
    config.headers.Authorization = `Bearer ${store.state.global.token}`;
  }
  return config;
}),
  (error) => {
    return Promise.reject(error);
  };

//响应拦截器
requests.interceptors.response.use(
  (res) => {
    if (res.config.showLoading) {
      endLoading();
    }
    return res;
  },
  (error) => {
    if (error.response !== null && error.response !== undefined) {
      const errorStatus = error.response.status;
      const errorText = error.response.statusText;
      if (errorStatus === 403) {
        ElMessage.error({ message: "权限不足" });
      } else if (errorStatus === 401) {
        ElMessage.error({ message: "尚未登录，请登录" });
        router.replace("/");
      } else {
        router.push({
          path: "/error",
          query: { errorNum: errorStatus, errorText: errorText },
        });
      }
    } else {
      router.push({
        path: "/error",
      });
    }
    return;
  }
);

//对外暴露
export default requests;
