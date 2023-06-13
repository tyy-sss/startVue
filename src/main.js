import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
import VueAxios from "vue-axios";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElIcon from "@element-plus/icons";

// 请求全局
import "@/api/request.js";

const app = createApp(App);
app.use(store).use(router).use(ElementPlus).use(VueAxios, axios).mount("#app");

// 统一注册Icon图标
Object.keys(ElIcon).forEach((key) => {
  app.component(key, ElIcon[key]);
});
