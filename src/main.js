import "./assets/reset.css";
import "./assets/global.module.css";

import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "pwacompat";
import { workBox } from "./workBox";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");

if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  // Register the service worker after event listeners have been added.
  // By default this method delays registration until after the window has loaded.
  workBox.register();
}
