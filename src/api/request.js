import axios from "axios";
import loading from "@/assets/js/utils/loading";

//1.利用axios对象的方法create，去创建一个axios实例。
const requests = axios.create({
  //配置对象
  //接口当中：路径都带有/api     基础路径，发送请求的时候，路径当中会出现api
  baseURL: "http://127.0.0.1:8080/",
  //代表请求超时的时间
  timeout: 5000,
});

//请求拦截器：
requests.interceptors.request.use((config) => {
  //解析和上传到后端的时候进行loading加载显示
  loading.startLoading();
  return config;
}),
  (error) => {
    //关闭loading
    loading.endLoading();
    return Promise.reject(error);
  };

//响应拦截器
requests.interceptors.response.use(
  (res) => {
    loading.startLoading();
    return res;
  },
  (error) => {
    loading.endLoading();
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
    return;
  }
);

//对外暴露
export default requests;
