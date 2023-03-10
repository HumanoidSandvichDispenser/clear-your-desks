/**
 * Copyright (C) 2023  HumanoidSandvichDispenser/sandvichxyz/pyrofromcsgo
 *     This program comes with ABSOLUTELY NO WARRANTY. This is free software,
 *     and you are welcome to redistribute it under certain conditions.
 */

import { createApp } from "vue";
import "./style.css";

import App from "./App.vue";
import VueRouter from "./router";
import { createPinia } from "pinia";

import VueKatex from "@hsorby/vue3-katex";

import "katex/dist/katex.min.css";
import "mathlive/dist/mathlive-fonts.css";
import "mathlive/dist/mathlive";

import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";

const pinia = createPinia();

createApp(App)
    .use(pinia)
    .use(VueRouter)
    .use(VueKatex)
    .use(BootstrapIcon)
    .mount("#app");
