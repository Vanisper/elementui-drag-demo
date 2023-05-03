import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import type { App } from "vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Root",
    component: () => import("../views/Root/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true,
});

export function setupRouter(app: App) {
  app.use(router);
}

export default router;
