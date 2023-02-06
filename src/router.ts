import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "./views/Home.vue";
import Game from "./views/Game.vue";

const routes: RouteRecordRaw[] = [
    {
        "path": "/",
        name: "Home",
        component: Home,
    },
    {
        "path": "/game",
        name: "Game",
        component: Game,
    },
    /*
    {
        "path": "/bigsheet",
        name: "Big Sheet",
    }
    */
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
