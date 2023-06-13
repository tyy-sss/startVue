import { createRouter, createWebHistory } from "vue-router";
import loading from "@/assets/js/utils/loading";

const routes = [
  {
    path: "/test",
    name: "test",
    component: () => import("../views/Test.vue"),
  },
  {
    path:'/',
    name:'login',
    component: () => import("../views/not-login/LoginView.vue"),
  },
  {
    path: "/error",
    name: "error",
    component: () => import("../views/Error.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // 重置 全局loading
  loading.resetLoading();
  next();
});

export default router;
