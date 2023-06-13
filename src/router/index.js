import { createRouter, createWebHistory } from "vue-router";
import loading from "@/assets/js/utils/loading";

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import("../views/Main.vue")
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/Test.vue"),
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
