import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "./views/Home.vue";
import Game from "./views/Game.vue";
import Results from "./views/Results.vue";

const routes: RouteRecordRaw[] = [
    {
        "path": "/",
        name: "Home",
        component: Home,
    },
    {
        "path": "/game/score-attack",
        name: "Score Attack",
        component: Game,
    },
    {
        "path": "/game/practice",
        name: "Practice",
        component: Game,
    },
    {
        "path": "/results",
        name: "Results",
        component: Results,
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
