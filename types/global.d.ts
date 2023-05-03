import type { App } from "vue";
declare global {
  interface Window {
    $vue: App<Element>;
  }
}
