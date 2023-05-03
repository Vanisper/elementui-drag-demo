import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { setupStore } from "./store";
import { setupRouter } from "./routes";

function appInit() {
  const app = createApp(App);
  // 启用pinia 全局状态管理
  setupStore(app);
  // 挂载路由
  setupRouter(app);

  // 挂载到页面
  app.mount("#app", true);

  // 挂载到window
  window.$vue = app;
}

void appInit();
