import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import Vue3Transitions from "vue3-transitions";

createApp(App)
  .use(createPinia())
  .use(router)
  .use(Vue3Transitions)
  .mount("#app");
