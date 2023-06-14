import { createRouter, createWebHistory } from "vue-router";
import { resetLoading } from "@/assets/js/utils/loading";
import store from "@/store";

const routes = [
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/Test.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/not-login/LoginView.vue"),
  },
  {
    path: "/error",
    name: "error",
    component: () => import("@/views/Error.vue"),
  },
  {
    path: "/",
    name: "main",
    component: () => import("@/views/enter-login/Main.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/enter-login/Home.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // 重置 全局loading
  resetLoading();
  //判断token是否存在
  const token = store.state.global.token;
  if (!token) {
    //没有登录 可以注册，登录，忘记密码
    if (
      to.name !== "login" &&
      to.name !== "forgetPassword" &&
      to.name !== "register" &&
      to.name !== "test"
    ) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
