import { createApp } from "vue";
import App from "./App";
import router from "@router";
import { createPinia } from "pinia";

const app = createApp(App);

const pinia = createPinia();

app.use(router).use(pinia).mount("#app");
