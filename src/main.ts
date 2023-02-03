import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import VueRouter from "./router";
import { createPinia } from "pinia";
import VueKatex from "@hsorby/vue3-katex";
import "katex/dist/katex.min.css";

const pinia = createPinia();

createApp(App)
    .use(pinia)
    .use(VueRouter)
    .use(VueKatex)
    .mount("#app");
