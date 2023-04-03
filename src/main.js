import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueTheMask from "vue-the-mask";

createApp(App).use(VueTheMask).use(store).use(router).mount("#app");
